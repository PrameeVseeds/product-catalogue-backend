import type { ProductImageInput } from "../interfaces/catalogueInterface.js";
import * as productImageRepository from "../repositories/productImageRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import { catalogueErrors } from "./catalogueErrors.js";

const ensureProductExists = async (productId: number): Promise<void> => {
  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new Error(catalogueErrors.productNotFound);
  }
};

export const createProductImage = async (input: ProductImageInput) => {
  await ensureProductExists(input.productId);

  if (input.isPrimary) {
    await productImageRepository.clearPrimaryImages(input.productId);
  }

  return productImageRepository.createProductImage(input);
};

export const updateProductImage = async (imageId: number,input: ProductImageInput) => {
  await ensureProductExists(input.productId);

  if (input.isPrimary) {
    await productImageRepository.clearPrimaryImages(input.productId);
  }

  const updated = await productImageRepository.updateProductImage(
    imageId,
    input
  );

  if (!updated) return null;

  return productImageRepository.findProductImageById(imageId);
};

export const deleteProductImage = (imageId: number): Promise<boolean> => {
  return productImageRepository.deleteProductImage(imageId);
};
