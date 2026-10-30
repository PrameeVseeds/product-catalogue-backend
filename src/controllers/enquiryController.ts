import type { Request, Response } from "express";
import * as enquiryService from "../services/enquiryService.js";
import {isServiceError,sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import {validateCreateEnquiry,validateEnquiryListFilters,validateUpdateEnquiryStatus,} from "../validators/enquiryValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const createEnquiry = async (req: Request,res: Response): Promise<void> => {
  const validation = validateCreateEnquiry(req.body as Record<string, unknown>);
  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res,201,"Enquiry received successfully.",
      await enquiryService.createEnquiry(validation.data)
    );
  } 
  catch (error) {
    if (isServiceError(error, enquiryService.enquiryErrors.productNotFound)) {
      sendBadRequest(res, "Product ID is invalid.");
      return;
    }
    if (isServiceError(error, enquiryService.enquiryErrors.productModelNotFound)) {
      sendBadRequest(res, "Model is invalid for this product.");
      return;
    }

    sendUnexpectedError(res, "Failed to create enquiry:", error);
  }
};

export const getEnquiries = async (req: Request,res: Response): Promise<void> => {
  const validation = validateEnquiryListFilters(req.query);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return;
  }

  try {
    sendSuccess(res,200,"Enquiries retrieved successfully.",
      await enquiryService.getEnquiries(validation.data)
    );
  } 
  catch (error) {
    sendUnexpectedError(res, "Failed to retrieve enquiries:", error);
  }
};

export const getEnquiryById = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Enquiry ID");

  if (!idValidation.isValid) {
    sendBadRequest(res, idValidation.message);
    return;
  }

  try {
    const enquiry = await enquiryService.getEnquiryById(idValidation.data);

    if (!enquiry) {
      sendNotFound(res, "Enquiry not found.");
      return;
    }

    sendSuccess(res, 200, "Enquiry retrieved successfully.", enquiry);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve enquiry:", error);
  }
};

export const updateEnquiryStatus = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Enquiry ID");
  const bodyValidation = validateUpdateEnquiryStatus(
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
    const enquiry = await enquiryService.updateEnquiryStatus(
      idValidation.data,
      bodyValidation.data
    );

    if (!enquiry) {
      sendNotFound(res, "Enquiry not found.");
      return;
    }

    sendSuccess(res, 200, "Enquiry status updated successfully.", enquiry);
  } catch (error) {
    sendUnexpectedError(res, "Failed to update enquiry status:", error);
  }
};
