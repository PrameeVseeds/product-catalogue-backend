import fs from "fs";
import multer from "multer";
import type { Request } from "express";
import {createSafeFilename,getUploadDirectory,isAllowedImageFile,UploadValidationError,} from "../services/uploadService.js";

const maxImageSizeInBytes = 5 * 1024 * 1024;

const storage = multer.diskStorage({destination: (req, _file, callback) => {
    try {
      const uploadDirectory = getUploadDirectory(req.body.type);
      fs.mkdirSync(uploadDirectory, { recursive: true });
      callback(null, uploadDirectory);
    } catch (error) {
      callback(error as Error, "");
    }
  },
  filename: (_req, file, callback) => {
    try {
      callback(null, createSafeFilename(file.mimetype));
    } catch (error) {
      callback(error as Error, "");
    }
  },
});

const fileFilter = (_req: Request,file: Express.Multer.File,callback: multer.FileFilterCallback): void => {
  if (!isAllowedImageFile(file.mimetype, file.originalname)) {
    callback(new UploadValidationError("Unsupported file type."));
    return;
  }

  callback(null, true);
};

const imageUploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxImageSizeInBytes,
  },
});

export const uploadSingleImage = imageUploader.single("image");
export const uploadMultipleImages = imageUploader.array("image", 10);

export const getUploadErrorMessage = (error: unknown): string | null => {
  if (error instanceof UploadValidationError) {
    return error.message;
  }

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return "Image must not exceed 5 MB.";
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return "Invalid image upload field.";
    }
  }

  return null;
};
