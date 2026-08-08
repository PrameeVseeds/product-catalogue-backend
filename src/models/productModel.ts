import type { RowDataPacket } from "mysql2";

export interface ProductRow extends RowDataPacket {
  id: number;
  subcategory_id: number;
  name: string;
  slug: string;
  model_number: string | null;
  short_description: string | null;
  description: string | null;
  main_image_url: string | null;
  datasheet_title: string | null;
  datasheet_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductRelationSummaryRow extends RowDataPacket {
  category_id: number;
  category_name: string;
  category_slug: string;
  brand_id: number;
  brand_name: string;
  brand_slug: string;
  subcategory_id: number;
  subcategory_name: string;
  subcategory_slug: string;
}
