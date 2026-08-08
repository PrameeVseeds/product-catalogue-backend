import type { Request, Response } from "express";
import * as socialMediaService from "../services/socialMediaService.js";
import {isServiceError,sendConflict,sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateSocialMediaLink } from "../validators/socialMediaValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getActiveSocialLinks = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Social media links retrieved successfully.",
      await socialMediaService.getActiveSocialLinks()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve social links:", error);
  }
};

export const getAllSocialLinks = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Social media links retrieved successfully.",
      await socialMediaService.getAllSocialLinks()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve social links:", error);
  }
};

export const createSocialLink = async (req: Request,res: Response): Promise<void> => {
  const validation = validateSocialMediaLink(req.body as Record<string, unknown>);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res,201,"Social media link created successfully.",
      await socialMediaService.createSocialLink(validation.data)
    );
  } catch (error) {
    if (isServiceError(error, "SOCIAL_PLATFORM_EXISTS")) {
      sendConflict(res, "Social media platform already exists.");
      return;
    }

    sendUnexpectedError(res, "Failed to create social link:", error);
  }
};

export const updateSocialLink = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Social media link ID");
  const bodyValidation = validateSocialMediaLink(
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
    const link = await socialMediaService.updateSocialLink(
      idValidation.data,
      bodyValidation.data
    );

    if (!link) {
      sendNotFound(res, "Social media link not found.");
      return;
    }

    sendSuccess(res, 200, "Social media link updated successfully.", link);
  } catch (error) {
    if (isServiceError(error, "SOCIAL_PLATFORM_EXISTS")) {
      sendConflict(res, "Social media platform already exists.");
      return;
    }

    sendUnexpectedError(res, "Failed to update social link:", error);
  }
};

export const deleteSocialLink = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Social media link ID");

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    const deleted = await socialMediaService.deleteSocialLink(validation.data);

    if (!deleted) {
      sendNotFound(res, "Social media link not found.");
      return;
    }

    sendSuccess(res, 200, "Social media link deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete social link:", error);
  }
};
