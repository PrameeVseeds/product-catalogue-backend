import type { Request, Response } from "express";
import * as subcategoryService from "../services/subcategoryService.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import { sendNotFound, sendSuccess, sendUnexpectedError, } from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateSubcategory } from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getActiveSubcategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    sendSuccess(res, 200, "Subcategories retrieved successfully.",
      await subcategoryService.getActiveSubcategories()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve subcategories:", error);
  }
};

export const getAllSubcategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    sendSuccess(res, 200, "Subcategories retrieved successfully.",
      await subcategoryService.getAllSubcategories()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve subcategories:", error);
  }
};

export const getSubcategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const subcategory = await subcategoryService.getSubcategoryBySlug(
      String(req.params.slug)
    );

    if (!subcategory) return sendNotFound(res, "Subcategory not found.");

    sendSuccess(res, 200, "Subcategory retrieved successfully.", subcategory);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve subcategory:", error);
  }
};

export const createSubcategory = async (req: Request, res: Response): Promise<void> => {
  const validation = validateSubcategory(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res, 201, "Subcategory created successfully.",
      await subcategoryService.createSubcategory(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create subcategory:", error);
    }
  }
};

export const updateSubcategory = async (req: Request, res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Subcategory ID");
  const bodyValidation = validateSubcategory(req.body as Record<string, unknown>);

  if (!idValidation.isValid) return sendBadRequest(res, idValidation.message);
  if (!bodyValidation.isValid) return sendBadRequest(res, bodyValidation.message);

  try {
    const subcategory = await subcategoryService.updateSubcategory(
      idValidation.data,
      bodyValidation.data
    );

    if (!subcategory) return sendNotFound(res, "Subcategory not found.");

    sendSuccess(res, 200, "Subcategory updated successfully.", subcategory);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update subcategory:", error);
    }
  }
};

export const deleteSubcategory = async (req: Request, res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Subcategory ID");

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const deleted = await subcategoryService.deleteSubcategory(validation.data);

    if (!deleted) return sendNotFound(res, "Subcategory not found.");

    sendSuccess(res, 200, "Subcategory deleted successfully.");
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to delete subcategory:", error);
    }
  }
};
