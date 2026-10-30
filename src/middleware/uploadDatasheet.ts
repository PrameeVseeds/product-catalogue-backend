import fs from "fs";
import type { Request } from "express";
import multer from "multer";
import {createSafeDatasheetFilename,datasheetsUploadDirectory,isAllowedDatasheetFile,UploadValidationError,} from "../services/uploadService.js";
import { specificationPdfsUploadDirectory } from "../services/uploadService.js";

export const MAX_DATASHEET_SIZE_IN_BYTES = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    fs.mkdir(datasheetsUploadDirectory, { recursive: true }, (error) => {
      callback(error, datasheetsUploadDirectory);
    });
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
  console.log("Datasheet validation completed.");
  callback(null, true);
};

const datasheetUploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_DATASHEET_SIZE_IN_BYTES },
});

export const uploadSingleDatasheet = datasheetUploader.single("datasheet");

const specificationPdfUploader = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => fs.mkdir(specificationPdfsUploadDirectory, 
      { recursive: true }, (error) => callback(error, specificationPdfsUploadDirectory)),
    filename: (_req, _file, callback) => callback(null, createSafeDatasheetFilename()),
  }),
  fileFilter,
  limits: { fileSize: MAX_DATASHEET_SIZE_IN_BYTES },
});

export const uploadSingleSpecificationPdf = specificationPdfUploader.single("specificationPdf");

export const getDatasheetUploadErrorMessage = (error: unknown): string | null => {
  if (error instanceof UploadValidationError) return error.message;
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") return "Datasheet PDF must be 10 MB or smaller.";
    if (error.code === "LIMIT_UNEXPECTED_FILE") return "Invalid datasheet upload field.";
  }
  return null;
};
