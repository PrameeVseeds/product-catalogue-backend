import type { Request, Response } from "express";
import { sendBadRequest } from "../utils/responseHelper.js";
import { sendSuccess, sendUnexpectedError } from "../utils/controllerUtils.js";
import { extractSpecificationsFromDatasheet, ProductSpecificationExtractionError } from "../services/productSpecificationExtractionService.js";
import { validateDatasheetExtractionRequest } from "../validators/productSpecificationExtractionValidator.js";

export const extractProductSpecifications = async (req: Request, res: Response): Promise<void> => {
  const validation = validateDatasheetExtractionRequest(req.body as Record<string, unknown>);
  if (!validation.isValid) 
    return sendBadRequest(res, validation.message);
  try {
    sendSuccess(res, 200, "Specifications extracted successfully.", 
    await extractSpecificationsFromDatasheet(validation.data.specificationFileUrl));
  } catch (error) {
    if (error instanceof ProductSpecificationExtractionError) {
      sendBadRequest(res, error.message);
      return;
    }
    sendUnexpectedError(res, "Product specification extraction failed:", error);
  }
};
