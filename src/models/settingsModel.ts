import type { RowDataPacket } from "mysql2";

export type TextAlignment = "LEFT" | "CENTER" | "RIGHT";
export type HomeSectionType =
  | "CONTENT"
  | "CARDS"
  | "CATEGORIES"
  | "FEATURED_PRODUCTS"
  | "BRANDS"
  | "CTA";

export interface SiteSettingsRow extends RowDataPacket {
  id: number;
  company_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  website_title: string | null;
  website_description: string | null;
  footer_description: string | null;
  copyright_text: string | null;
  is_maintenance_mode: boolean;
  updated_at: Date;
}

export interface ThemeSettingsRow extends RowDataPacket {
  id: number;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  muted_text_color: string;
  button_background_color: string;
  button_text_color: string;
  header_background_color: string;
  footer_background_color: string;
  footer_text_color: string;
  updated_at: Date;
}

export interface HeroSettingsRow extends RowDataPacket {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  background_image_url: string | null;
  foreground_image_url: string | null;
  primary_button_text: string | null;
  primary_button_link: string | null;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  text_alignment: TextAlignment;
  overlay_opacity: string;
  is_visible: boolean;
  updated_at: Date;
}

export interface HomeSectionRow extends RowDataPacket {
  id: number;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  background_image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  section_type: HomeSectionType;
  display_order: number;
  is_visible: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface HomeSectionItemRow extends RowDataPacket {
  id: number;
  section_id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  icon_name: string | null;
  button_text: string | null;
  button_link: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ContactSettingsRow extends RowDataPacket {
  id: number;
  contact_heading: string;
  contact_description: string | null;
  company_name: string | null;
  address: string | null;
  phone_primary: string | null;
  phone_secondary: string | null;
  fax: string | null;
  general_email: string | null;
  working_hours: string | null;
  map_embed_url: string | null;
  contact_background_image_url: string | null;
  updated_at: Date;
}

export interface EnquirySettingsRow extends RowDataPacket {
  id: number;
  call_enabled: boolean;
  call_button_text: string;
  call_phone: string | null;
  whatsapp_enabled: boolean;
  whatsapp_button_text: string;
  whatsapp_number: string | null;
  whatsapp_default_message: string | null;
  email_enabled: boolean;
  email_button_text: string;
  enquiry_email: string | null;
  default_email_subject: string | null;
  updated_at: Date;
}

export interface SocialMediaLinkRow extends RowDataPacket {
  id: number;
  platform: string;
  display_name: string | null;
  profile_url: string;
  icon_name: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
