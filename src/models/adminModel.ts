import type { RowDataPacket } from "mysql2";

export interface AdminRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
