import type { CategoryInput } from "../interfaces/catalogueInterface.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import { catalogueErrors } from "./catalogueErrors.js";

export const getActiveCategories = () => {
  return categoryRepository.findActiveCategories();
};

export const getAllCategories = () => {
  return categoryRepository.findAllCategories();
};

export const getCategoryBySlug = (slug: string) => {
  return categoryRepository.findActiveCategoryBySlug(normalizeSlug(slug));
};

export const getCategoryById = (categoryId: number) => {
  return categoryRepository.findCategoryById(categoryId);
};

export const createCategory = async (input: CategoryInput) => {
  try {
    return await categoryRepository.createCategory(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.categorySlugExists);
    }

    throw error;
  }
};

export const updateCategory = async (categoryId: number,input: CategoryInput) => {
  try {
    const updated = await categoryRepository.updateCategory(categoryId, input);

    if (!updated) return null;

    return categoryRepository.findCategoryById(categoryId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.categorySlugExists);
    }

    throw error;
  }
};

export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  const [relationCount, productCount] = await Promise.all([
    categoryRepository.countCategoryBrandsByCategory(categoryId),
    categoryRepository.countProductsByCategory(categoryId),
  ]);

  if (relationCount > 0 || productCount > 0) {
    throw new Error(catalogueErrors.categoryHasRelations);
  }

  return categoryRepository.deleteCategory(categoryId);
};
