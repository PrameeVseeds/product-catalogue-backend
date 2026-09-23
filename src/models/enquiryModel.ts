import type { RowDataPacket } from "mysql2";

export type EnquiryType = "GENERAL" | "PRODUCT";
export type EnquiryStatus = "NEW" | "IN_PROGRESS" | "CONTACTED" | "CLOSED";

export interface EnquiryRow extends RowDataPacket {
  id: number;
  product_id: number | null;
  model_number: string | null;
  enquiry_type: EnquiryType;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: EnquiryStatus;
  created_at: Date;
  updated_at: Date;
}

export interface EnquiryDetailRow extends EnquiryRow {
  product_name: string | null;
  product_slug: string | null;
}
