import type { RowDataPacket } from "mysql2";

export interface ProductImageRow extends RowDataPacket {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: Date;
}
