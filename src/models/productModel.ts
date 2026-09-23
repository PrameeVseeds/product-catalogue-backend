import type { RowDataPacket } from "mysql2";

export interface ProductRow extends RowDataPacket {
  id: number;
  subcategory_id: number | null;
  name: string;
  slug: string;
  model_number: string | null;
  short_description: string | null;
  description: string | null;
  main_image_url: string | null;
  datasheet_title: string | null;
  datasheet_description: string | null;
  datasheet_file_url: string | null;
  specification_file_url: string | null;
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
  subcategory_id: number | null;
  subcategory_name: string | null;
  subcategory_slug: string | null;
}
