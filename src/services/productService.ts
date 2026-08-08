import type {ProductInput,ProductListFilters,} from "../interfaces/catalogueInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as productRepository from "../repositories/productRepository.js";
import * as productFeatureRepository from "../repositories/productFeatureRepository.js";
import * as productImageRepository from "../repositories/productImageRepository.js";
import * as productSpecificationRepository from "../repositories/productSpecificationRepository.js";
import * as subcategoryRepository from "../repositories/subcategoryRepository.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import { catalogueErrors } from "./catalogueErrors.js";

export const getActiveProducts = (filters: ProductListFilters) => {
  return productRepository.findProducts(filters, true);
};

export const getAllProducts = (filters: ProductListFilters) => {
  return productRepository.findProducts(filters, false);
};

export const getProductById = (productId: number) => {
  return productRepository.findProductById(productId);
};

export const getProductDetailBySlug = async (slug: string) => {
  const product = await productRepository.findProductBySlug(
    normalizeSlug(slug),
    true
  );

  if (!product) return null;

  const [relations, galleryImages, features, specifications] =
    await Promise.all([
      productRepository.findProductRelations(product.id),
      productImageRepository.findProductImages(product.id),
      productFeatureRepository.findProductFeatures(product.id),
      productSpecificationRepository.findProductSpecifications(product.id),
    ]);

  return {
    ...product,
    category: relations
      ? {
          id: relations.category_id,
          name: relations.category_name,
          slug: relations.category_slug,
        }
      : null,
    brand: relations
      ? {
          id: relations.brand_id,
          name: relations.brand_name,
          slug: relations.brand_slug,
        }
      : null,
    subcategory: relations
      ? {
          id: relations.subcategory_id,
          name: relations.subcategory_name,
          slug: relations.subcategory_slug,
        }
      : null,
    galleryImages,
    features,
    specifications,
  };
};

const validateSubcategory = async (subcategoryId: number): Promise<void> => {
  const subcategory = await subcategoryRepository.findSubcategoryById(
    subcategoryId
  );

  if (!subcategory) {
    throw new Error(catalogueErrors.subcategoryNotFound);
  }
};

export const createProduct = async (input: ProductInput) => {
  await validateSubcategory(input.subcategoryId);

  try {
    return await productRepository.createProduct(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.productSlugExists);
    }

    throw error;
  }
};

export const updateProduct = async (productId: number,input: ProductInput) => {
  await validateSubcategory(input.subcategoryId);

  try {
    const updated = await productRepository.updateProduct(productId, input);

    if (!updated) return null;

    return productRepository.findProductById(productId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.productSlugExists);
    }

    throw error;
  }
};

export const deleteProduct = (productId: number): Promise<boolean> => {
  return productRepository.deleteProduct(productId);
};
