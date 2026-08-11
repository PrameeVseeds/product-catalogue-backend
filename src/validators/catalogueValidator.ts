import type {
  BrandInput,
  CategoryBrandInput,
  CategoryInput,
  ProductFeatureInput,
  ProductImageInput,
  ProductInput,
  ProductListFilters,
  ProductSpecificationInput,
  SubcategoryInput,
} from "../interfaces/catalogueInterface.js";
import { normalizeSlug } from "../utils/slugUtils.js";
import {
  getBoolean,
  getInteger,
  getNullableString,
  getRequiredString,
  validateId,
  validateNullableUrl,
} from "./settingsValidationUtils.js";
import type { ValidationResult } from "./validationUtils.js";

const toBody = (body: Record<string, unknown>): Record<string, unknown> => body;

const validateSlug = (
  body: Record<string, unknown>,
): ValidationResult<string> => {
  const slug = getRequiredString(body, "slug", "Slug");

  if (!slug.isValid) return slug;

  const normalizedSlug = normalizeSlug(slug.data);

  if (!normalizedSlug) {
    return {
      isValid: false,
      message: "Slug is invalid.",
    };
  }

  return {
    isValid: true,
    data: normalizedSlug,
  };
};

const validateOptionalUrl = (
  value: unknown,
  label: string,
): ValidationResult<string | null> => {
  return validateNullableUrl(getNullableString(value), label);
};

const validateRequiredUrl = (
  value: unknown,
  label: string,
): ValidationResult<string> => {
  const url = getRequiredString({ value }, "value", label);

  if (!url.isValid) return url;

  const validUrl = validateNullableUrl(url.data, label);

  if (!validUrl.isValid || !validUrl.data) {
    return {
      isValid: false,
      message: validUrl.isValid ? `${label} is required.` : validUrl.message,
    };
  }

  return {
    isValid: true,
    data: validUrl.data,
  };
};

export const validateCategory = (
  rawBody: Record<string, unknown>,
): ValidationResult<CategoryInput> => {
  const body = toBody(rawBody);
  const name = getRequiredString(body, "name", "Name");
  const slug = validateSlug(body);

  if (!name.isValid) return name;
  if (!slug.isValid) return slug;

  return {
    isValid: true,
    data: {
      name: name.data,
      slug: slug.data,
      description: getNullableString(body.description),
      imageUrl: getNullableString(body.imageUrl),
      displayOrder: getInteger(body.displayOrder),
      isActive: getBoolean(body.isActive, true),
    },
  };
};

export const validateBrand = (
  rawBody: Record<string, unknown>,
): ValidationResult<BrandInput> => {
  const body = toBody(rawBody);
  const name = getRequiredString(body, "name", "Name");
  const slug = validateSlug(body);
  const websiteUrl = validateOptionalUrl(body.websiteUrl, "Website URL");

  if (!name.isValid) return name;
  if (!slug.isValid) return slug;
  if (!websiteUrl.isValid) return websiteUrl;

  return {
    isValid: true,
    data: {
      name: name.data,
      slug: slug.data,
      countryName: getNullableString(body.countryName),
      countryCode: getNullableString(body.countryCode),
      logoUrl: getNullableString(body.logoUrl),
      flagImageUrl: getNullableString(body.flagImageUrl),
      websiteUrl: websiteUrl.data,
      description: getNullableString(body.description),
      displayOrder: getInteger(body.displayOrder),
      isActive: getBoolean(body.isActive, true),
    },
  };
};

export const validateCategoryBrand = (
  body: Record<string, unknown>,
): ValidationResult<CategoryBrandInput> => {
  const categoryId = validateId(body.categoryId?.toString(), "Category ID");
  const brandId = validateId(body.brandId?.toString(), "Brand ID");

  if (!categoryId.isValid) return categoryId;
  if (!brandId.isValid) return brandId;

  return {
    isValid: true,
    data: {
      categoryId: categoryId.data,
      brandId: brandId.data,
      displayOrder: getInteger(body.displayOrder),
      isActive: getBoolean(body.isActive, true),
    },
  };
};

export const validateSubcategory = (
  body: Record<string, unknown>,
): ValidationResult<SubcategoryInput> => {
  const categoryId = validateId(body.categoryId?.toString(), "Category ID");
  const categoryBrandValue = body.categoryBrandId;
  const categoryBrandId =
    categoryBrandValue === undefined ||
    categoryBrandValue === null ||
    categoryBrandValue === "" ||
    categoryBrandValue === 0
      ? null
      : validateId(categoryBrandValue.toString(), "Category brand ID");
  const name = getRequiredString(body, "name", "Name");
  const slug = validateSlug(body);

  if (!categoryId.isValid) return categoryId;
  if (categoryBrandId && !categoryBrandId.isValid) return categoryBrandId;
  if (!name.isValid) return name;
  if (!slug.isValid) return slug;

  return {
    isValid: true,
    data: {
      categoryId: categoryId.data,
      categoryBrandId: categoryBrandId ? categoryBrandId.data : null,
      name: name.data,
      slug: slug.data,
      description: getNullableString(body.description),
      imageUrl: getNullableString(body.imageUrl),
      displayOrder: getInteger(body.displayOrder),
      isActive: getBoolean(body.isActive, true),
    },
  };
};

export const validateProduct = (
  body: Record<string, unknown>,
): ValidationResult<ProductInput> => {
  const subcategoryId = validateId(
    body.subcategoryId?.toString(),
    "Subcategory ID",
  );
  const name = getRequiredString(body, "name", "Name");
  const slug = validateSlug(body);

  if (!subcategoryId.isValid) return subcategoryId;
  if (!name.isValid) return name;
  if (!slug.isValid) return slug;

  return {
    isValid: true,
    data: {
      subcategoryId: subcategoryId.data,
      name: name.data,
      slug: slug.data,
      modelNumber: getNullableString(body.modelNumber),
      shortDescription: getNullableString(body.shortDescription),
      description: getNullableString(body.description),
      mainImageUrl: getNullableString(body.mainImageUrl),
      datasheetTitle: getNullableString(body.datasheetTitle),
      datasheetDescription: getNullableString(body.datasheetDescription),
      metaTitle: getNullableString(body.metaTitle),
      metaDescription: getNullableString(body.metaDescription),
      isFeatured: getBoolean(body.isFeatured, false),
      isActive: getBoolean(body.isActive, true),
      displayOrder: getInteger(body.displayOrder),
    },
  };
};

export const validateProductFilters = (
  query: Record<string, unknown>,
): ProductListFilters => {
  const featured = getNullableString(query.featured);

  return {
    search: getNullableString(query.search),
    category: getNullableString(query.category),
    brand: getNullableString(query.brand),
    subcategory: getNullableString(query.subcategory),
    featured:
      featured === null
        ? null
        : ["true", "1", "yes"].includes(featured.toLowerCase()),
  };
};

export const validateProductImage = (
  body: Record<string, unknown>,
): ValidationResult<ProductImageInput> => {
  const productId = validateId(body.productId?.toString(), "Product ID");
  const imageUrl = validateRequiredUrl(body.imageUrl, "Image URL");

  if (!productId.isValid) return productId;
  if (!imageUrl.isValid) return imageUrl;

  return {
    isValid: true,
    data: {
      productId: productId.data,
      imageUrl: imageUrl.data,
      altText: getNullableString(body.altText),
      displayOrder: getInteger(body.displayOrder),
      isPrimary: getBoolean(body.isPrimary, false),
    },
  };
};

export const validateProductFeature = (
  body: Record<string, unknown>,
): ValidationResult<ProductFeatureInput> => {
  const productId = validateId(body.productId?.toString(), "Product ID");
  const featureText = getRequiredString(body, "featureText", "Feature text");

  if (!productId.isValid) return productId;
  if (!featureText.isValid) return featureText;

  return {
    isValid: true,
    data: {
      productId: productId.data,
      featureText: featureText.data,
      displayOrder: getInteger(body.displayOrder),
    },
  };
};

export const validateProductSpecification = (
  body: Record<string, unknown>,
): ValidationResult<ProductSpecificationInput> => {
  const productId = validateId(body.productId?.toString(), "Product ID");
  const specificationName = getRequiredString(
    body,
    "specificationName",
    "Specification name",
  );
  const specificationValue = getRequiredString(
    body,
    "specificationValue",
    "Specification value",
  );

  if (!productId.isValid) return productId;
  if (!specificationName.isValid) return specificationName;
  if (!specificationValue.isValid) return specificationValue;

  return {
    isValid: true,
    data: {
      productId: productId.data,
      specificationName: specificationName.data,
      specificationValue: specificationValue.data,
      displayOrder: getInteger(body.displayOrder),
    },
  };
};
