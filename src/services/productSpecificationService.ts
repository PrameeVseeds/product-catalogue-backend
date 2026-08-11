import type { ProductSpecificationInput } from "../interfaces/catalogueInterface.js";
import * as productRepository from "../repositories/productRepository.js";
import * as productSpecificationRepository from "../repositories/productSpecificationRepository.js";
import { catalogueErrors } from "./catalogueErrors.js";

const ensureProductExists = async (productId: number): Promise<void> => {
  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new Error(catalogueErrors.productNotFound);
  }
};

export const createProductSpecification = async (input: ProductSpecificationInput) => {
  await ensureProductExists(input.productId);
  return productSpecificationRepository.createProductSpecification(input);
};

export const updateProductSpecification = async (specificationId: number,input: ProductSpecificationInput) => {
  await ensureProductExists(input.productId);
  const updated =
    await productSpecificationRepository.updateProductSpecification(
      specificationId,
      input
    );

  if (!updated) return null;

  return productSpecificationRepository.findProductSpecificationById(
    specificationId
  );
};

export const deleteProductSpecification = (specificationId: number): Promise<boolean> => {
  return productSpecificationRepository.deleteProductSpecification(
    specificationId
  );
};
