import type { RowDataPacket } from "mysql2";

export interface SubcategoryRow extends RowDataPacket {
  id: number;
  category_id: number;
  category_brand_id: number | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
