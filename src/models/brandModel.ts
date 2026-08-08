import type { RowDataPacket } from "mysql2";

export interface BrandRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  country_name: string | null;
  country_code: string | null;
  logo_url: string | null;
  flag_image_url: string | null;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
