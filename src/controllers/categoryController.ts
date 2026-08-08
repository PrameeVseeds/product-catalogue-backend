import type { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";
import { sendNotFound, sendSuccess, sendUnexpectedError, } from "../utils/controllerUtils.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateCategory } from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getActiveCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    sendSuccess(res, 200, "Categories retrieved successfully.",
      await categoryService.getActiveCategories()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve categories:", error);
  }
};

export const getAllCategories = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Categories retrieved successfully.",
      await categoryService.getAllCategories()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve categories:", error);
  }
};

export const getCategoryBySlug = async (req: Request,res: Response): Promise<void> => {
  try {
    const category = await categoryService.getCategoryBySlug(
      String(req.params.slug)
    );

    if (!category) {
      sendNotFound(res, "Category not found.");
      return;
    }

    sendSuccess(res, 200, "Category retrieved successfully.", category);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve category:", error);
  }
};

export const createCategory = async (req: Request,res: Response): Promise<void> => {
  const validation = validateCategory(req.body as Record<string, unknown>);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res,201,"Category created successfully.",
      await categoryService.createCategory(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create category:", error);
    }
  }
};

export const updateCategory = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Category ID");
  const bodyValidation = validateCategory(req.body as Record<string, unknown>);

  if (!idValidation.isValid) return sendBadRequest(res, idValidation.message);
  if (!bodyValidation.isValid) return sendBadRequest(res, bodyValidation.message);

  try {
    const category = await categoryService.updateCategory(
      idValidation.data,
      bodyValidation.data
    );

    if (!category) return sendNotFound(res, "Category not found.");

    sendSuccess(res, 200, "Category updated successfully.", category);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update category:", error);
    }
  }
};

export const deleteCategory = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Category ID");

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const deleted = await categoryService.deleteCategory(validation.data);

    if (!deleted) return sendNotFound(res, "Category not found.");

    sendSuccess(res, 200, "Category deleted successfully.");
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to delete category:", error);
    }
  }
};
