import type { RowDataPacket } from "mysql2";

export interface ProductFeatureRow extends RowDataPacket {
  id: number;
  product_id: number;
  feature_text: string;
  display_order: number;
  created_at: Date;
}
