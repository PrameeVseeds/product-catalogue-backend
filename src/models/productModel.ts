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
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  brand_id: number | null;
  brand_name: string | null;
  brand_slug: string | null;
  subcategory_id: number;
  subcategory_name: string;
  subcategory_slug: string;
}
