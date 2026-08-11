import fs from "fs";
import type { Request } from "express";
import multer from "multer";
import {createSafeDatasheetFilename,datasheetsUploadDirectory,isAllowedDatasheetFile,UploadValidationError,} from "../services/uploadService.js";

const maxDatasheetSizeInBytes = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    fs.mkdirSync(datasheetsUploadDirectory, { recursive: true });
    callback(null, datasheetsUploadDirectory);
  },
  filename: (_req, _file, callback) => {
    callback(null, createSafeDatasheetFilename());
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
): void => {
  if (!isAllowedDatasheetFile(file.mimetype, file.originalname)) {
    callback(new UploadValidationError("Only PDF datasheets are supported."));
    return;
  }
  callback(null, true);
};

const datasheetUploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxDatasheetSizeInBytes },
});

export const uploadSingleDatasheet = datasheetUploader.single("datasheet");

export const getDatasheetUploadErrorMessage = (error: unknown): string | null => {
  if (error instanceof UploadValidationError) return error.message;
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") return "Datasheet PDF must not exceed 10 MB.";
    if (error.code === "LIMIT_UNEXPECTED_FILE") return "Invalid datasheet upload field.";
  }
  return null;
};
