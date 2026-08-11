import type { Response } from "express";
import { catalogueErrors } from "../services/catalogueErrors.js";
import {isServiceError,sendConflict,sendNotFound,} from "./controllerUtils.js";

const conflictMessages: Record<string, string> = {
  [catalogueErrors.categorySlugExists]: "Category slug already exists.",
  [catalogueErrors.brandSlugExists]: "Brand slug already exists.",
  [catalogueErrors.categoryBrandExists]:
    "This category-brand relation already exists.",
  [catalogueErrors.subcategorySlugExists]: "Subcategory slug already exists.",
  [catalogueErrors.productSlugExists]: "Product slug already exists.",
  [catalogueErrors.categoryHasRelations]:
    "Category cannot be deleted while category-brand relations exist.",
  [catalogueErrors.brandHasRelations]:
    "Brand cannot be deleted while category-brand relations exist.",
  [catalogueErrors.categoryBrandHasSubcategories]:
    "Category-brand relation cannot be deleted while subcategories exist.",
  [catalogueErrors.subcategoryHasProducts]:
    "Subcategory cannot be deleted while products exist.",
};

const notFoundMessages: Record<string, string> = {
  [catalogueErrors.categoryNotFound]: "Category not found.",
  [catalogueErrors.brandNotFound]: "Brand not found.",
  [catalogueErrors.categoryBrandNotFound]: "Category-brand relation not found.",
  [catalogueErrors.subcategoryNotFound]: "Subcategory not found.",
  [catalogueErrors.productNotFound]: "Product not found.",
};

export const handleCatalogueServiceError = (res: Response,error: unknown): boolean => {
  for (const [code, message] of Object.entries(conflictMessages)) {
    if (isServiceError(error, code)) {
      sendConflict(res, message);
      return true;
    }
  }

  for (const [code, message] of Object.entries(notFoundMessages)) {
    if (isServiceError(error, code)) {
      sendNotFound(res, message);
      return true;
    }
  }

  return false;
};
