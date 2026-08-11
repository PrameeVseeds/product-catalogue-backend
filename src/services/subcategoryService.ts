import type { SubcategoryInput } from "../interfaces/catalogueInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as categoryBrandRepository from "../repositories/categoryBrandRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
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

const validatePlacement = async (categoryId: number,categoryBrandId: number | null,): Promise<void> => {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category) throw new Error(catalogueErrors.categoryNotFound);
  if (categoryBrandId === null) return;
  const categoryBrand =
    await categoryBrandRepository.findCategoryBrandById(categoryBrandId);

  if (!categoryBrand || categoryBrand.category_id !== categoryId) {
    throw new Error(catalogueErrors.categoryBrandNotFound);
  }
};

export const createSubcategory = async (input: SubcategoryInput) => {
  await validatePlacement(input.categoryId, input.categoryBrandId);

  try {
    return await subcategoryRepository.createSubcategory(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.subcategorySlugExists);
    }

    throw error;
  }
};

export const updateSubcategory = async (subcategoryId: number,input: SubcategoryInput,) => {
  await validatePlacement(input.categoryId, input.categoryBrandId);

  try {
    const updated = await subcategoryRepository.updateSubcategory(
      subcategoryId,
      input,
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

export const deleteSubcategory = async (subcategoryId: number,): Promise<boolean> => {
  const productCount =
    await subcategoryRepository.countProductsBySubcategory(subcategoryId);

  if (productCount > 0) {
    throw new Error(catalogueErrors.subcategoryHasProducts);
  }

  return subcategoryRepository.deleteSubcategory(subcategoryId);
};
