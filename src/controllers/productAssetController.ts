import type { Request, Response } from "express";
import * as productFeatureService from "../services/productFeatureService.js";
import * as productImageService from "../services/productImageService.js";
import * as productSpecificationService from "../services/productSpecificationService.js";
import { handleCatalogueServiceError } from "../utils/catalogueControllerUtils.js";
import {sendNotFound,sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import {validateProductFeature,validateProductImage,validateProductSpecification,} from "../validators/catalogueValidator.js";
import { validateId } from "../validators/settingsValidationUtils.js";

const parseAssetId = (req: Request,res: Response,label: string) => {
  const validation = validateId(req.params.id, label);

  if (!validation.isValid) {
    sendBadRequest(res, validation.message);
    return null;
  }

  return validation.data;
};

export const createProductImage = async (req: Request,res: Response): Promise<void> => {
  const validation = validateProductImage(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,"Product image created successfully.",
      await productImageService.createProductImage(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create product image:", error);
    }
  }
};

export const updateProductImage = async (req: Request,res: Response): Promise<void> => {
  const imageId = parseAssetId(req, res, "Product image ID");
  const validation = validateProductImage(req.body as Record<string, unknown>);

  if (!imageId) return;
  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const image = await productImageService.updateProductImage(
      imageId,
      validation.data
    );

    if (!image) return sendNotFound(res, "Product image not found.");

    sendSuccess(res, 200, "Product image updated successfully.", image);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update product image:", error);
    }
  }
};

export const deleteProductImage = async (req: Request,res: Response): Promise<void> => {
  const imageId = parseAssetId(req, res, "Product image ID");

  if (!imageId) return;

  try {
    const deleted = await productImageService.deleteProductImage(imageId);

    if (!deleted) return sendNotFound(res, "Product image not found.");

    sendSuccess(res, 200, "Product image deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete product image:", error);
  }
};

export const createProductFeature = async (req: Request,res: Response): Promise<void> => {
  const validation = validateProductFeature(req.body as Record<string, unknown>);

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,"Product feature created successfully.",
      await productFeatureService.createProductFeature(validation.data)
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create product feature:", error);
    }
  }
};

export const updateProductFeature = async (req: Request,res: Response): Promise<void> => {
  const featureId = parseAssetId(req, res, "Product feature ID");
  const validation = validateProductFeature(req.body as Record<string, unknown>);

  if (!featureId) return;
  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const feature = await productFeatureService.updateProductFeature(
      featureId,
      validation.data
    );

    if (!feature) return sendNotFound(res, "Product feature not found.");

    sendSuccess(res, 200, "Product feature updated successfully.", feature);
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update product feature:", error);
    }
  }
};

export const deleteProductFeature = async (req: Request,res: Response): Promise<void> => {
  const featureId = parseAssetId(req, res, "Product feature ID");

  if (!featureId) return;

  try {
    const deleted = await productFeatureService.deleteProductFeature(featureId);

    if (!deleted) return sendNotFound(res, "Product feature not found.");

    sendSuccess(res, 200, "Product feature deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete product feature:", error);
  }
};

export const createProductSpecification = async (req: Request,res: Response): Promise<void> => {
  const validation = validateProductSpecification(
    req.body as Record<string, unknown>
  );

  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    sendSuccess(res,201,"Product specification created successfully.",
      await productSpecificationService.createProductSpecification(
        validation.data
      )
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to create product specification:", error);
    }
  }
};

export const updateProductSpecification = async (req: Request,res: Response): Promise<void> => {
  const specificationId = parseAssetId(req, res, "Product specification ID");
  const validation = validateProductSpecification(
    req.body as Record<string, unknown>
  );

  if (!specificationId) return;
  if (!validation.isValid) return sendBadRequest(res, validation.message);

  try {
    const specification = await productSpecificationService.updateProductSpecification(
        specificationId,
        validation.data
      );

    if (!specification) {
      return sendNotFound(res, "Product specification not found.");
    }

    sendSuccess(res,200,"Product specification updated successfully.",
      specification
    );
  } catch (error) {
    if (!handleCatalogueServiceError(res, error)) {
      sendUnexpectedError(res, "Failed to update product specification:", error);
    }
  }
};

export const deleteProductSpecification = async (req: Request,res: Response): Promise<void> => {
  const specificationId = parseAssetId(req, res, "Product specification ID");

  if (!specificationId) return;

  try {
    const deleted = await productSpecificationService.deleteProductSpecification(
        specificationId
      );

    if (!deleted) {
      return sendNotFound(res, "Product specification not found.");
    }

    sendSuccess(res, 200, "Product specification deleted successfully.");
  } catch (error) {
    sendUnexpectedError(res, "Failed to delete product specification:", error);
  }
};
