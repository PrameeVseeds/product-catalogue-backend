import type {ContactSettingsRow,SiteSettingsRow,} from "../models/settingsModel.js";
import type { ProductFeatureRow } from "../models/productFeatureModel.js";
import type { ProductImageRow } from "../models/productImageModel.js";
import type { ProductRow } from "../models/productModel.js";
import type { ProductSpecificationRow } from "../models/productSpecificationModel.js";

export interface DatasheetSummary {
  id: number;
  name: string;
  slug: string;
}

export interface DatasheetProduct extends ProductRow {
  category: DatasheetSummary | null;
  brand: DatasheetSummary | null;
  subcategory: DatasheetSummary | null;
  galleryImages: ProductImageRow[];
  features: ProductFeatureRow[];
  specifications: ProductSpecificationRow[];
}

export interface DatasheetData {
  product: DatasheetProduct;
  siteSettings: SiteSettingsRow;
  contactSettings: ContactSettingsRow;
  generatedAt: Date;
}
