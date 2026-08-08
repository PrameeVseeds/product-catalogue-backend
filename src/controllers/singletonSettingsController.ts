import type { Request, Response } from "express";
import {sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import * as settingsService from "../services/singletonSettingsService.js";
import {validateContactSettings,validateEnquirySettings,validateHeroSettings,
  validateSiteSettings,validateThemeSettings,} from "../validators/singletonSettingsValidator.js";

const getSingletonSettings = async (res: Response,successMessage: string,errorMessage: string,loader:
   () => Promise<unknown>): Promise<void> => {
  try {
    sendSuccess(res, 200, successMessage, await loader());
  } catch (error) {
    sendUnexpectedError(res, errorMessage, error);
  }
};

const updateSingletonSettings = async <T>(req: Request,res: Response,
  validator: (body: Record<string, unknown>) => { isValid: true; data: T } | { isValid: false; message: string },
  updater: (input: T) => Promise<unknown>,
  successMessage: string,
  errorMessage: string
): Promise<void> => {
  const validation = validator(req.body as Record<string, unknown>);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res, 200, successMessage, await updater(validation.data));
  } catch (error) {
    sendUnexpectedError(res, errorMessage, error);
  }
};

export const getSiteSettings = async ( _req: Request,res: Response): Promise<void> => {
  await getSingletonSettings(
    res,
    "Site settings retrieved successfully.",
    "Failed to retrieve site settings:",
    settingsService.getSiteSettings
  );
};

export const updateSiteSettings = async (req: Request,res: Response): Promise<void> => {
  await updateSingletonSettings(
    req,
    res,
    validateSiteSettings,
    settingsService.updateSiteSettings,
    "Site settings updated successfully.",
    "Failed to update site settings:"
  );
};

export const getThemeSettings = async (_req: Request,res: Response): Promise<void> => {
  await getSingletonSettings(res,
    "Theme settings retrieved successfully.",
    "Failed to retrieve theme settings:",
    settingsService.getThemeSettings
  );
};

export const updateThemeSettings = async (req: Request,res: Response): Promise<void> => {
  await updateSingletonSettings(
    req,
    res,
    validateThemeSettings,
    settingsService.updateThemeSettings,
    "Theme settings updated successfully.",
    "Failed to update theme settings:"
  );
};

export const getHeroSettings = async (_req: Request,res: Response): Promise<void> => {
  await getSingletonSettings(
    res,
    "Hero settings retrieved successfully.",
    "Failed to retrieve hero settings:",
    settingsService.getHeroSettings
  );
};

export const updateHeroSettings = async (req: Request,res: Response): Promise<void> => {
  await updateSingletonSettings(
    req,
    res,
    validateHeroSettings,
    settingsService.updateHeroSettings,
    "Hero settings updated successfully.",
    "Failed to update hero settings:"
  );
};

export const getContactSettings = async (_req: Request,res: Response): Promise<void> => {
  await getSingletonSettings(
    res,
    "Contact settings retrieved successfully.",
    "Failed to retrieve contact settings:",
    settingsService.getContactSettings
  );
};

export const updateContactSettings = async (req: Request,res: Response): Promise<void> => {
  await updateSingletonSettings(
    req,
    res,
    validateContactSettings,
    settingsService.updateContactSettings,
    "Contact settings updated successfully.",
    "Failed to update contact settings:"
  );
};

export const getEnquirySettings = async (_req: Request,res: Response): Promise<void> => {
  await getSingletonSettings(
    res,
    "Enquiry settings retrieved successfully.",
    "Failed to retrieve enquiry settings:",
    settingsService.getEnquirySettings
  );
};

export const updateEnquirySettings = async (req: Request,res: Response): Promise<void> => {
  await updateSingletonSettings(
    req,
    res,
    validateEnquirySettings,
    settingsService.updateEnquirySettings,
    "Enquiry settings updated successfully.",
    "Failed to update enquiry settings:"
  );
};
