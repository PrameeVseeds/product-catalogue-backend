import crypto from "crypto";
import fs from "fs";
import path from "path";
import type { UploadedImageResponse, UploadType } from "../interfaces/uploadInterface.js";

const uploadFolderByType: Record<UploadType, string> = {
  general: "general",
  hero: "hero",
  section: "sections",
  category: "categories",
  brand: "brands",
  subcategory: "subcategories",
  product: "products",
  contact: "contact",
};

const allowedExtensionsByMimeType: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export const uploadsRoot = path.resolve(process.env.UPLOAD_ROOT || "uploads");
export const datasheetsUploadDirectory = path.join(uploadsRoot, "datasheets");
export const specificationPdfsUploadDirectory = path.join(uploadsRoot, "specification-pdfs");

export class UploadValidationError extends Error {}

export const isUploadType = (value: unknown): value is UploadType => {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(uploadFolderByType, value)
  );
};

export const getUploadDirectory = (type: unknown): string => {
  if (!isUploadType(type)) {
    throw new UploadValidationError("Invalid upload type.");
  }

  return path.join(uploadsRoot, uploadFolderByType[type]);
};

export const getAllowedExtension = (mimeType: string): string | null => {
  return allowedExtensionsByMimeType[mimeType]?.[0] ?? null;
};

export const isAllowedImageFile = (mimeType: string,originalName: string): boolean => {
  const allowedExtensions = allowedExtensionsByMimeType[mimeType];

  if (!allowedExtensions) return false;

  return allowedExtensions.includes(path.extname(originalName).toLowerCase());
};

export const createSafeFilename = (mimeType: string): string => {
  const extension = getAllowedExtension(mimeType);

  if (!extension) {
    throw new UploadValidationError("Unsupported file type.");
  }

  return `${Date.now()}-${crypto.randomBytes(12).toString("hex")}${extension}`;
};

export const isAllowedDatasheetFile = (mimeType: string, originalName: string): boolean =>
  mimeType === "application/pdf" && path.extname(originalName).toLowerCase() === ".pdf";

export const createSafeDatasheetFilename = (): string =>
  `${Date.now()}-${crypto.randomBytes(12).toString("hex")}.pdf`;

export const hasPdfSignature = async (filePath: string): Promise<boolean> => {
  const file = await fs.promises.open(filePath, "r");
  const signature = Buffer.alloc(5);

  try {
    const { bytesRead } = await file.read(signature, 0, signature.length, 0);
    return bytesRead === signature.length && signature.toString("ascii") === "%PDF-";
  } finally {
    await file.close();
  }
};

export const toPublicUploadPath = (file: Express.Multer.File): UploadedImageResponse => {
  const relativePath = path.relative(uploadsRoot, file.path).replace(/\\/g, "/");

  return {
    path: `/uploads/${relativePath}`,
  };
};

const resolvePublicUploadPath = (publicPath: string): string | null => {
  if (!publicPath.startsWith("/uploads/")) {
    return null;
  }

  const relativePath = publicPath.replace(/^\/uploads\//, "");
  const resolvedPath = path.resolve(uploadsRoot, relativePath);

  const isInsideUploads =
    resolvedPath === uploadsRoot || resolvedPath.startsWith(`${uploadsRoot}${path.sep}`);

  return isInsideUploads ? resolvedPath : null;
};

export const resolveDatasheetUploadPath = (publicPath: string): string | null => {
  if (!publicPath.startsWith("/uploads/datasheets/")) return null;

  const filename = publicPath.slice("/uploads/datasheets/".length);
  if (
    !filename ||
    filename !== path.basename(filename) ||
    path.extname(filename).toLowerCase() !== ".pdf"
  ) {
    return null;
  }

  const resolvedPath = path.resolve(datasheetsUploadDirectory, filename);
  return resolvedPath.startsWith(`${datasheetsUploadDirectory}${path.sep}`)
    ? resolvedPath
    : null;
};

export const resolveSpecificationPdfUploadPath = (publicPath: string): string | null => {
  if (!publicPath.startsWith("/uploads/specification-pdfs/")) 
    return null;
  const filename = publicPath.slice("/uploads/specification-pdfs/".length);
  if (!filename || filename !== path.basename(filename) || path.extname(filename).toLowerCase() !== ".pdf") 
    return null;
  const resolvedPath = path.resolve(specificationPdfsUploadDirectory, filename);
  return resolvedPath.startsWith(`${specificationPdfsUploadDirectory}${path.sep}`) ? resolvedPath : null;
};

export const deleteUploadedImage = async (publicPath: string): Promise<boolean> => {
  const resolvedPath = resolvePublicUploadPath(publicPath);

  if (!resolvedPath) {
    throw new UploadValidationError("Invalid upload path.");
  }

  try {
    await fs.promises.unlink(resolvedPath);
    return true;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return false;
    }

    throw error;
  }
};
