import type { Request, Response } from "express";
import * as homeSectionService from "../services/homeSectionService.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateHomeSectionItem } from "../validators/homeSectionValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getSectionItems = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.sectionId, "Home section ID");

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    const items = await homeSectionService.getSectionItems(validation.data);

    if (!items) {
      sendNotFound(res, "Home section not found.");
      return;
    }

    sendSuccess(res, 200, "Home section items retrieved successfully.", items);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve home section items:", error);
  }
};

export const createSectionItem = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.sectionId, "Home section ID");
  const bodyValidation = validateHomeSectionItem(
    req.body as Record<string, unknown>
  );

  if (!idValidation.isValid) {
    sendBadRequest(res, idValidation.message);
    return;
  }

  if (!bodyValidation.isValid) {
    sendBadRequest(res, bodyValidation.message);
    return;
  }

  try {
    const item = await homeSectionService.createSectionItem(
      idValidation.data,
      bodyValidation.data
    );

    if (!item) {
      sendNotFound(res, "Home section not found.");
      return;
    }

    sendSuccess(res, 201, "Home section item created successfully.", item);
  } catch (error) {
    sendUnexpectedError(res, "Failed to create home section item:", error);
  }
};

export const updateSectionItem = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Home section item ID");
  const bodyValidation = validateHomeSectionItem(
    req.body as Record<string, unknown>
  );

  if (!idValidation.isValid) {
    sendBadRequest(res, idValidation.message);
    return;
  }

  if (!bodyValidation.isValid) {
    sendBadRequest(res, bodyValidation.message);
    return;
  }

  try {
    const item = await homeSectionService.updateSectionItem(
      idValidation.data,
      bodyValidation.data
    );

    if (!item) {
      sendNotFound(res, "Home section item not found.");
      return;
    }

    sendSuccess(res, 200, "Home section item updated successfully.", item);
  } catch (error) {
    sendUnexpectedError(res, "Failed to update home section item:", error);
  }
};

export const deleteSectionItem = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Home section item ID");

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    const deleted = await homeSectionService.deleteSectionItem(validation.data);

    if (!deleted) {
      sendNotFound(res, "Home section item not found.");
      return;
    }

    sendSuccess(res, 200, "Home section item deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete home section item:", error);
  }
};
