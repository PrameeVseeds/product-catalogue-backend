import type { ProductFeatureInput } from "../interfaces/catalogueInterface.js";
import * as productFeatureRepository from "../repositories/productFeatureRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import { catalogueErrors } from "./catalogueErrors.js";

const ensureProductExists = async (productId: number): Promise<void> => {
  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new Error(catalogueErrors.productNotFound);
  }
};

export const createProductFeature = async (input: ProductFeatureInput) => {
  await ensureProductExists(input.productId);
  return productFeatureRepository.createProductFeature(input);
};

export const updateProductFeature = async (featureId: number,input: ProductFeatureInput) => {
  await ensureProductExists(input.productId);
  const updated = await productFeatureRepository.updateProductFeature(
    featureId,
    input
  );

  if (!updated) return null;

  return productFeatureRepository.findProductFeatureById(featureId);
};

export const deleteProductFeature = (featureId: number): Promise<boolean> => {
  return productFeatureRepository.deleteProductFeature(featureId);
};
