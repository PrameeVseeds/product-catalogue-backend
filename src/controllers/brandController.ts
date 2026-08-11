import type { Request, Response } from "express";
import * as brandService from "../services/brandService.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateBrand } from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getActiveBrands = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Brands retrieved successfully.",
      await brandService.getActiveBrands()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve brands:", error);
  }
};

export const getAllBrands = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Brands retrieved successfully.",
      await brandService.getAllBrands()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve brands:", error);
  }
};

export const getBrandBySlug = async (req: Request,res: Response): Promise<void> => {
  try {
    const brand = await brandService.getBrandBySlug(String(req.params.slug));

    if (!brand) return sendNotFound(res, "Brand not found.");

    sendSuccess(res, 200, "Brand retrieved successfully.", brand);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve brand:", error);
  }
};

export const createBrand = async (req: Request,res: Response): Promise<void> => {
  const validation = validateBrand(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,"Brand created successfully.",
      await brandService.createBrand(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create brand:", error);
    }
  }
};

export const updateBrand = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Brand ID");
  const bodyValidation = validateBrand(req.body as Record<string, unknown>);

  if (!idValidation.isValid) return sendBadRequest(res, idValidation.message);
  if (!bodyValidation.isValid) return sendBadRequest(res, bodyValidation.message);

  try {
    const brand = await brandService.updateBrand(
      idValidation.data,
      bodyValidation.data
    );

    if (!brand) return sendNotFound(res, "Brand not found.");

    sendSuccess(res, 200, "Brand updated successfully.", brand);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update brand:", error);
    }
  }
};

export const deleteBrand = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Brand ID");

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const deleted = await brandService.deleteBrand(validation.data);

    if (!deleted) return sendNotFound(res, "Brand not found.");

    sendSuccess(res, 200, "Brand deleted successfully.");
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to delete brand:", error);
    }
  }
};
