import type { Request, Response } from "express";
import * as homeSectionService from "../services/homeSectionService.js";
import {isServiceError,sendConflict,sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateHomeSection } from "../validators/homeSectionValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getVisibleHomeSections = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Home sections retrieved successfully.",await homeSectionService.getVisibleHomeSections());
  } 
  catch (error) {
    sendUnexpectedError(res, "Failed to retrieve home sections:", error);
  }
};

export const getAllHomeSections = async (_req: Request, res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Home sections retrieved successfully.",await homeSectionService.getAllHomeSections());
  } 
  catch (error) {
    sendUnexpectedError(res, "Failed to retrieve home sections:", error);
  }
};

export const createHomeSection = async (req: Request,res: Response): Promise<void> => {
  const validation = validateHomeSection(req.body as Record<string, unknown>);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res,201,"Home section created successfully.",
      await homeSectionService.createHomeSection(validation.data)
    );
  } 
  catch (error) {
    if (isServiceError(error, "HOME_SECTION_KEY_EXISTS")) {
      sendConflict(res, "Home section key already exists.");
      return;
    }

    sendUnexpectedError(res, "Failed to create home section:", error);
  }
};

export const updateHomeSection = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Home section ID");
  const bodyValidation = validateHomeSection(req.body as Record<string, unknown>);

  if (!idValidation.isValid) {
    sendBadRequest(res, idValidation.message);
    return;
  }

  if (!bodyValidation.isValid) {
    sendBadRequest(res, bodyValidation.message);
    return;
  }

  try {
    const section = await homeSectionService.updateHomeSection(
      idValidation.data,
      bodyValidation.data
    );

    if (!section) {
      sendNotFound(res, "Home section not found.");
      return;
    }

    sendSuccess(res, 200, "Home section updated successfully.", section);
  } catch (error) {
    if (isServiceError(error, "HOME_SECTION_KEY_EXISTS")) {
      sendConflict(res, "Home section key already exists.");
      return;
    }

    sendUnexpectedError(res, "Failed to update home section:", error);
  }
};

export const deleteHomeSection = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Home section ID");

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    const deleted = await homeSectionService.deleteHomeSection(validation.data);

    if (!deleted) {
      sendNotFound(res, "Home section not found.");
      return;
    }

    sendSuccess(res, 200, "Home section deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete home section:", error);
  }
};
