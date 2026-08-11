import type { RowDataPacket } from "mysql2";

export interface CountRow extends RowDataPacket {
  count: number;
}
