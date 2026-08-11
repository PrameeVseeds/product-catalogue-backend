import type { Request, Response } from "express";
import { getProductDatasheetData } from "../services/datasheetService.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { createProductDatasheetPdf } from "../utils/pdfGenerator.js";
import { normalizeSlug } from "../utils/slugUtils.js";

const getSafeDatasheetFilename = (slug: string): string => {
  return `${slug}-datasheet.pdf`;
};

export const getProductDatasheet = async (req: Request,res: Response): Promise<void> => {
  const slug = normalizeSlug(String(req.params.slug));

  if (!slug) {
    sendBadRequest(res, "Product slug is invalid.");
    return;
  }

  try {
    const datasheetData = await getProductDatasheetData(slug);

    if (!datasheetData) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    const document = createProductDatasheetPdf(datasheetData);

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
    console.error("Failed to generate product datasheet:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
};
