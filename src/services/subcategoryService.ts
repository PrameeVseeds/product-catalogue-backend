import type { SubcategoryInput } from "../interfaces/catalogueInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as categoryBrandRepository from "../repositories/categoryBrandRepository.js";
import * as subcategoryRepository from "../repositories/subcategoryRepository.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import { catalogueErrors } from "./catalogueErrors.js";

export const getActiveSubcategories = () => {
  return subcategoryRepository.findActiveSubcategories();
};

export const getAllSubcategories = () => {
  return subcategoryRepository.findAllSubcategories();
};

export const getSubcategoryBySlug = (slug: string) => {
  return subcategoryRepository.findActiveSubcategoryBySlug(normalizeSlug(slug));
};

const validateCategoryBrand = async (categoryBrandId: number): Promise<void> => {
  const categoryBrand = await categoryBrandRepository.findCategoryBrandById(
    categoryBrandId
  );

  if (!categoryBrand) {
    throw new Error(catalogueErrors.categoryBrandNotFound);
  }
};

export const createSubcategory = async (input: SubcategoryInput) => {
  await validateCategoryBrand(input.categoryBrandId);

  try {
    return await subcategoryRepository.createSubcategory(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.subcategorySlugExists);
    }

    throw error;
  }
};

export const updateSubcategory = async (subcategoryId: number,input: SubcategoryInput) => {
  await validateCategoryBrand(input.categoryBrandId);

  try {
    const updated = await subcategoryRepository.updateSubcategory(
      subcategoryId,
      input
    );

    if (!updated) return null;

    return subcategoryRepository.findSubcategoryById(subcategoryId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.subcategorySlugExists);
    }

    throw error;
  }
};

export const deleteSubcategory = async (subcategoryId: number): Promise<boolean> => {
  const productCount = await subcategoryRepository.countProductsBySubcategory(
    subcategoryId
  );

  if (productCount > 0) {
    throw new Error(catalogueErrors.subcategoryHasProducts);
  }

  return subcategoryRepository.deleteSubcategory(subcategoryId);
};
