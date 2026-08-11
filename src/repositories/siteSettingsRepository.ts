import { pool } from "../config/db.js";
import type { SiteSettingsInput } from "../interfaces/settingsInterface.js";
import type { SiteSettingsRow } from "../models/settingsModel.js";

export const findSiteSettings = async (): Promise<SiteSettingsRow | null> => {
  const [rows] = await pool.execute<SiteSettingsRow[]>(
    `SELECT *
     FROM site_settings
     ORDER BY id ASC
     LIMIT 1`
  );

  return rows[0] ?? null;
};

export const ensureSiteSettings = async (): Promise<SiteSettingsRow> => {
  const existing = await findSiteSettings();

  if (existing) return existing;

  await pool.execute(
    `INSERT INTO site_settings (company_name)
     VALUES (?)`,
    ["Product Catalogue"]
  );

  const created = await findSiteSettings();

  if (!created) throw new Error("SITE_SETTINGS_INIT_FAILED");

  return created;
};

export const updateSiteSettings = async (input: SiteSettingsInput): Promise<SiteSettingsRow> => {
  const current = await ensureSiteSettings();

  await pool.execute(
    `UPDATE site_settings
     SET company_name = ?,
         logo_url = ?,
         favicon_url = ?,
         website_title = ?,
         website_description = ?,
         footer_description = ?,
         copyright_text = ?,
         is_maintenance_mode = ?
     WHERE id = ?`,
    [
      input.companyName,
      input.logoUrl,
      input.faviconUrl,
      input.websiteTitle,
      input.websiteDescription,
      input.footerDescription,
      input.copyrightText,
      input.isMaintenanceMode,
      current.id,
    ]
  );

  return ensureSiteSettings();
};
