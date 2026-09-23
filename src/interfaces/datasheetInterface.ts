import type {
  ContactSettingsRow,
  SiteSettingsRow,
} from "../models/settingsModel.js";

export interface DatasheetSummary {
  id: number;
  name: string;
  slug: string;
}

export interface DatasheetProduct {
  id: number;
  subcategoryId: number | null;
  name: string;
  slug: string;
  modelNumber: string | null;
  shortDescription: string | null;
  description: string | null;
  mainImageUrl: string | null;
  datasheetTitle: string | null;
  datasheetDescription: string | null;
  datasheetFileUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  category: DatasheetSummary | null;
  brand: DatasheetSummary | null;
  subcategory: DatasheetSummary | null;
  galleryImages: Array<{
    id: number;
    productId: number;
    imageUrl: string;
    altText: string | null;
    displayOrder: number;
    isPrimary: boolean;
    createdAt: Date;
  }>;
  features: Array<{
    id: number;
    productId: number;
    featureText: string;
    displayOrder: number;
    createdAt: Date;
  }>;
  specifications: Array<{
    id: number;
    productId: number;
    specificationName: string;
    specificationValue: string;
    displayOrder: number;
    createdAt: Date;
  }>;
}

export interface DatasheetData {
  product: DatasheetProduct;
  /** The requested model, if the visitor explicitly chose one. */
  selectedModel: string | null;
  siteSettings: SiteSettingsRow;
  contactSettings: ContactSettingsRow;
  generatedAt: Date;
}
