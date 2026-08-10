import type { Request, Response } from "express";
import {deleteUploadedImage,toPublicUploadPath,UploadValidationError,} from "../services/uploadService.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    sendBadRequest(res, "Image file is required.");
    return;
  }

  sendSuccess(res, 201, "Image uploaded successfully.", toPublicUploadPath(req.file));
};

export const uploadImages = (req: Request, res: Response): void => {
  const files = req.files;

  if (!Array.isArray(files) || files.length === 0) {
    sendBadRequest(res, "At least one image file is required.");
    return;
  }

  sendSuccess(res, 201, "Images uploaded successfully.", {
    paths: files.map((file) => toPublicUploadPath(file).path),
  });
};

export const deleteImage = async (req: Request,res: Response): Promise<void> => {
  const publicPath = typeof req.body.path === "string" ? req.body.path.trim() : "";

  if (!publicPath) {
    sendBadRequest(res, "Image path is required.");
    return;
  }

  try {
    const deleted = await deleteUploadedImage(publicPath);

    if (!deleted) {
      sendNotFound(res, "Image file not found.");
      return;
    }

    sendSuccess(res, 200, "Image deleted successfully.");
  } catch (error) {
    if (error instanceof UploadValidationError) {
      sendBadRequest(res, error.message);
      return;
    }

    sendUnexpectedError(res, "Failed to delete image:", error);
  }
};
