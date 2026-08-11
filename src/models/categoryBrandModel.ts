import type { RowDataPacket } from "mysql2";

export interface CategoryBrandRow extends RowDataPacket {
  id: number;
  category_id: number;
  brand_id: number;
  display_order: number;
  is_active: boolean;
  created_at: Date;
}
