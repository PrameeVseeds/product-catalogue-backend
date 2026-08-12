export type UploadType =
  | "general"
  | "hero"
  | "section"
  | "category"
  | "brand"
  | "subcategory"
  | "product"
  | "contact";

export interface UploadedImageResponse {
  path: string;
}

export interface UploadedImagesResponse {
  paths: string[];
}

export type UploadedDatasheetResponse = UploadedImageResponse;
