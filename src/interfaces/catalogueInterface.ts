export interface CategoryInput {
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface BrandInput {
  name: string;
  slug: string;
  countryName: string | null;
  countryCode: string | null;
  logoUrl: string | null;
  flagImageUrl: string | null;
  websiteUrl: string | null;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface CategoryBrandInput {
  categoryId: number;
  brandId: number;
  displayOrder: number;
  isActive: boolean;
}

export interface SubcategoryInput {
  categoryId: number;
  categoryBrandId: number | null;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductInput {
  subcategoryId: number;
  name: string;
  slug: string;
  modelNumber: string | null;
  shortDescription: string | null;
  description: string | null;
  mainImageUrl: string | null;
  datasheetTitle: string | null;
  datasheetDescription: string | null;
  datasheetFileUrl: string | null;
  specificationFileUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface ProductListFilters {
  search: string | null;
  category: string | null;
  brand: string | null;
  subcategory: string | null;
  featured: boolean | null;
}

export interface ProductImageInput {
  productId: number;
  imageUrl: string;
  altText: string | null;
  displayOrder: number;
  isPrimary: boolean;
}

export interface ProductFeatureInput {
  productId: number;
  featureText: string;
  displayOrder: number;
}

export interface ProductSpecificationInput {
  productId: number;
  specificationName: string;
  specificationValue: string;
  displayOrder: number;
}
