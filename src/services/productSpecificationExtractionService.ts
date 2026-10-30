import fs from "fs/promises";
import { extractPdfText, PdfTextExtractionError } from "./pdfTextExtractionService.js";
import { parseProductSpecifications } from "./productSpecificationParser.js";
import { hasPdfSignature, resolveSpecificationPdfUploadPath } from "./uploadService.js";
import type { ProductExtractionResult } from "../interfaces/productExtractionInterface.js";

const MAX_DATASHEET_SIZE_IN_BYTES = 10 * 1024 * 1024;

export class ProductSpecificationExtractionError extends Error {}

export const extractSpecificationsFromDatasheet = async (specificationFileUrl: string): Promise<ProductExtractionResult> => {
  const filePath = resolveSpecificationPdfUploadPath(specificationFileUrl);
  if (!filePath) 
    throw new ProductSpecificationExtractionError("Specification PDF file path is invalid.");

  try {
    const [stats, validSignature] = await Promise.all([fs.stat(filePath), hasPdfSignature(filePath)]);
    if (stats.size > MAX_DATASHEET_SIZE_IN_BYTES || !validSignature) {
      throw new ProductSpecificationExtractionError("Only valid PDF datasheets up to 10 MB are supported.");
    }
    const text = await extractPdfText(await fs.readFile(filePath));
    return parseProductSpecifications(text);
  } catch (error) {
    if (error instanceof ProductSpecificationExtractionError) throw error;
    if (error instanceof PdfTextExtractionError && error.code === "NO_TEXT") {
      return {
        productName: null, modelNumber: null, brand: null, description: null,
        features: [], specifications: [],
        warnings: ["This PDF may be scanned or image-based. Automatic text extraction was not possible."],
      };
    }
    if (error instanceof PdfTextExtractionError) 
      throw new ProductSpecificationExtractionError(error.message);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      throw new ProductSpecificationExtractionError("The uploaded datasheet could not be found.");
    }
    throw new ProductSpecificationExtractionError("Unable to extract specifications from this PDF.");
  }
};
