import type { CategoryBrandInput } from "../interfaces/catalogueInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as categoryBrandRepository from "../repositories/categoryBrandRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import * as brandRepository from "../repositories/brandRepository.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import { catalogueErrors } from "./catalogueErrors.js";

export const getAllCategoryBrands = () => {
  return categoryBrandRepository.findAllCategoryBrands();
};

export const getBrandsByCategorySlug = (categorySlug: string) => {
  return categoryBrandRepository.findActiveBrandsByCategorySlug(
    normalizeSlug(categorySlug)
  );
};

const validateCategoryBrandParents = async (input: CategoryBrandInput): Promise<void> => {
  const [category, brand] = await Promise.all([
    categoryRepository.findCategoryById(input.categoryId),
    brandRepository.findBrandById(input.brandId),
  ]);

  if (!category) throw new Error(catalogueErrors.categoryNotFound);
  if (!brand) throw new Error(catalogueErrors.brandNotFound);
};

export const createCategoryBrand = async (input: CategoryBrandInput) => {
  await validateCategoryBrandParents(input);

  try {
    return await categoryBrandRepository.createCategoryBrand(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.categoryBrandExists);
    }

    throw error;
  }
};

export const updateCategoryBrand = async (categoryBrandId: number,input: CategoryBrandInput) => {
  await validateCategoryBrandParents(input);

  try {
    const updated = await categoryBrandRepository.updateCategoryBrand(
      categoryBrandId,
      input
    );

    if (!updated) return null;

    return categoryBrandRepository.findCategoryBrandById(categoryBrandId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error(catalogueErrors.categoryBrandExists);
    }

    throw error;
  }
};

export const deleteCategoryBrand = async (categoryBrandId: number): Promise<boolean> => {
  const subcategoryCount =
    await categoryBrandRepository.countSubcategoriesByCategoryBrand(
      categoryBrandId
    );

  if (subcategoryCount > 0) {
    throw new Error(catalogueErrors.categoryBrandHasSubcategories);
  }

  return categoryBrandRepository.deleteCategoryBrand(categoryBrandId);
};
