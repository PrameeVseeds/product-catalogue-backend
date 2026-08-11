import type { Request, Response } from "express";
import * as categoryBrandService from "../services/categoryBrandService.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateCategoryBrand } from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getAllCategoryBrands = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,
      "Category-brand relations retrieved successfully.",
      await categoryBrandService.getAllCategoryBrands()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve category-brand relations:", error);
  }
};

export const getBrandsByCategorySlug = async (req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,
      "Category brands retrieved successfully.",
      await categoryBrandService.getBrandsByCategorySlug(String(req.params.slug))
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve category brands:", error);
  }
};

export const createCategoryBrand = async (req: Request,res: Response): Promise<void> => {
  const validation = validateCategoryBrand(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,
      "Category-brand relation created successfully.",
      await categoryBrandService.createCategoryBrand(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create category-brand relation:", error);
    }
  }
};

export const updateCategoryBrand = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Category-brand ID");
  const bodyValidation = validateCategoryBrand(req.body as Record<string, unknown>);

  if (!idValidation.isValid) return sendBadRequest(res, idValidation.message);
  if (!bodyValidation.isValid) return sendBadRequest(res, bodyValidation.message);

  try {
    const relation = await categoryBrandService.updateCategoryBrand(
      idValidation.data,
      bodyValidation.data
    );

    if (!relation) return sendNotFound(res, "Category-brand relation not found.");

    sendSuccess(res, 200, "Category-brand relation updated successfully.", relation);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update category-brand relation:", error);
    }
  }
};

export const deleteCategoryBrand = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Category-brand ID");

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const deleted = await categoryBrandService.deleteCategoryBrand(validation.data);

    if (!deleted) return sendNotFound(res, "Category-brand relation not found.");

    sendSuccess(res, 200, "Category-brand relation deleted successfully.");
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to delete category-brand relation:", error);
    }
  }
};
