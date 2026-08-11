import type { Request, Response } from "express";
import * as productService from "../services/productService.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import {validateProduct,validateProductFilters,} from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

export const getActiveProducts = async (req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Products retrieved successfully.",
      await productService.getActiveProducts(validateProductFilters(req.query))
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve products:", error);
  }
};

export const getAllProducts = async (req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Products retrieved successfully.",
      await productService.getAllProducts(validateProductFilters(req.query))
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve products:", error);
  }
};

export const getProductBySlug = async (req: Request,res: Response): Promise<void> => {
  try {
    const product = await productService.getProductDetailBySlug(
      String(req.params.slug)
    );

    if (!product) return sendNotFound(res, "Product not found.");

    sendSuccess(res, 200, "Product retrieved successfully.", product);
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve product:", error);
  }
};

export const createProduct = async (req: Request,res: Response): Promise<void> => {
  const validation = validateProduct(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,"Product created successfully.",
      await productService.createProduct(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create product:", error);
    }
  }
};

export const updateProduct = async (req: Request,res: Response): Promise<void> => {
  const idValidation = validateId(req.params.id, "Product ID");
  const bodyValidation = validateProduct(req.body as Record<string, unknown>);

  if (!idValidation.isValid) return sendBadRequest(res, idValidation.message);
  if (!bodyValidation.isValid) return sendBadRequest(res, bodyValidation.message);

  try {
    const product = await productService.updateProduct(idValidation.data,bodyValidation.data);

    if (!product) return sendNotFound(res, "Product not found.");

    sendSuccess(res, 200, "Product updated successfully.", product);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update product:", error);
    }
  }
};

export const deleteProduct = async (req: Request,res: Response): Promise<void> => {
  const validation = validateId(req.params.id, "Product ID");

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const deleted = await productService.deleteProduct(validation.data);

    if (!deleted) return sendNotFound(res, "Product not found.");

    sendSuccess(res, 200, "Product deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete product:", error);
  }
};
