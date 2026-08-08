import type { BrandInput } from "../interfaces/catalogueInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as brandRepository from "../repositories/brandRepository.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import { catalogueErrors } from "./catalogueErrors.js";

export const getActiveBrands = () => {
  return brandRepository.findActiveBrands();
};

export const getAllBrands = () => {
  return brandRepository.findAllBrands();
};

export const getBrandBySlug = (slug: string) => {
  return brandRepository.findActiveBrandBySlug(normalizeSlug(slug));
};

export const getBrandById = (brandId: number) => {
  return brandRepository.findBrandById(brandId);
};

export const createBrand = async (input: BrandInput) => {
  try {
    return await brandRepository.createBrand(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.brandSlugExists);
    }

    throw error;
  }
};

export const updateBrand = async (brandId: number, input: BrandInput) => {
  try {
    const updated = await brandRepository.updateBrand(brandId, input);

    if (!updated) return null;

    return brandRepository.findBrandById(brandId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.brandSlugExists);
    }

    throw error;
  }
};

export const deleteBrand = async (brandId: number): Promise<boolean> => {
  const relationCount = await brandRepository.countCategoryBrandsByBrand(
    brandId
  );

  if (relationCount > 0) {
    throw new Error(catalogueErrors.brandHasRelations);
  }

  return brandRepository.deleteBrand(brandId);
};
