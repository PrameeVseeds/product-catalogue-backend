import type { RowDataPacket } from "mysql2";

export interface ProductSpecificationRow extends RowDataPacket {
  id: number;
  product_id: number;
  specification_name: string;
  specification_value: string;
  display_order: number;
  created_at: Date;
}
