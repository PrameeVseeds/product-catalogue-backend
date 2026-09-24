import type { ProductFeatureRow } from "../models/productFeatureModel.js";
import type { ProductImageRow } from "../models/productImageModel.js";
import type { ProductRow } from "../models/productModel.js";
import type { ProductSpecificationRow } from "../models/productSpecificationModel.js";

export const mapProduct = (product: ProductRow) => ({
  id: product.id,
  categoryId: product.category_id,
  brandId: product.brand_id,
  subcategoryId: product.subcategory_id,
  name: product.name,
  slug: product.slug,
  modelNumber: product.model_number,
  shortDescription: product.short_description,
  description: product.description,
  mainImageUrl: product.main_image_url,
  datasheetTitle: product.datasheet_title,
  datasheetDescription: product.datasheet_description,
  datasheetFileUrl: product.datasheet_file_url,
  specificationFileUrl: product.specification_file_url,
  metaTitle: product.meta_title,
  metaDescription: product.meta_description,
  isFeatured: Boolean(product.is_featured),
  isActive: Boolean(product.is_active),
  displayOrder: product.display_order,
  createdAt: product.created_at,
  updatedAt: product.updated_at,
});

export const mapProductImage = (image: ProductImageRow) => ({
  id: image.id,
  productId: image.product_id,
  imageUrl: image.image_url,
  altText: image.alt_text,
  displayOrder: image.display_order,
  isPrimary: Boolean(image.is_primary),
  createdAt: image.created_at,
});

export const mapProductFeature = (feature: ProductFeatureRow) => ({
  id: feature.id,
  productId: feature.product_id,
  featureText: feature.feature_text,
  displayOrder: feature.display_order,
  createdAt: feature.created_at,
});

export const mapProductSpecification = (
  specification: ProductSpecificationRow
) => ({
  id: specification.id,
  productId: specification.product_id,
  specificationName: specification.specification_name,
  specificationValue: specification.specification_value,
  displayOrder: specification.display_order,
  createdAt: specification.created_at,
});
