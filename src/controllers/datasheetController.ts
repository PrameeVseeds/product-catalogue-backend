import type { Request, Response } from "express";
import fs from "fs";
import { getProductDatasheetData } from "../services/datasheetService.js";
import { resolveDatasheetUploadPath } from "../services/uploadService.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { createProductDatasheetPdf } from "../utils/pdfGenerator.js";
import { normalizeSlug } from "../utils/slugUtils.js";

const getSafeDatasheetFilename = (slug: string): string => {
  return `${slug}-datasheet.pdf`;
};

export const getProductDatasheet = async (req: Request,res: Response): Promise<void> => {
  const slug = normalizeSlug(String(req.params.slug));
  const selectedModel =
    typeof req.query.model === "string" ? req.query.model.trim() : "";

  if (!slug) {
    sendBadRequest(res, "Product slug is invalid.");
    return;
  }

  try {
    const datasheetData = await getProductDatasheetData(slug, selectedModel || undefined);

    if (!datasheetData) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    const storedPath = datasheetData.product.datasheetFileUrl;
    if (storedPath && !selectedModel) {
      const uploadedPath = resolveDatasheetUploadPath(storedPath);
      if (uploadedPath) {
        try {
          await fs.promises.access(uploadedPath, fs.constants.R_OK);
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `inline; filename="${getSafeDatasheetFilename(slug)}"`,
          );
          res.sendFile(uploadedPath);
          return;
        } catch {
          console.warn(
            `Uploaded datasheet is unavailable for product ${slug}; using generated PDF.`,
          );
        }
      } else {
        console.warn(
          `Stored datasheet path is invalid for product ${slug}; using generated PDF.`,
        );
      }
    }

    const document = await createProductDatasheetPdf(datasheetData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${getSafeDatasheetFilename(slug)}"`
    );

    document.on("error", (error) => {
      console.error("Product datasheet PDF generation failed:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Internal server error.",
        });
      }
    });

    document.pipe(res);
    document.end();
  } catch (error) {
    if (error instanceof Error && error.message === "PRODUCT_MODEL_NOT_FOUND") {
      sendBadRequest(res, "Model is invalid for this product.");
      return;
    }
    console.error("Failed to generate product datasheet:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
};
