import { pool } from "../config/db.js";
import type { ThemeSettingsInput } from "../interfaces/settingsInterface.js";
import type { ThemeSettingsRow } from "../models/settingsModel.js";

export const findThemeSettings = async (): Promise<ThemeSettingsRow | null> => {
  const [rows] = await pool.execute<ThemeSettingsRow[]>(
    `SELECT *
     FROM theme_settings
     ORDER BY id ASC
     LIMIT 1`
  );

  return rows[0] ?? null;
};

export const ensureThemeSettings = async (): Promise<ThemeSettingsRow> => {
  const existing = await findThemeSettings();

  if (existing) return existing;

  await pool.execute(`INSERT INTO theme_settings () VALUES ()`);
  const created = await findThemeSettings();

  if (!created) throw new Error("THEME_SETTINGS_INIT_FAILED");

  return created;
};

export const updateThemeSettings = async (input: ThemeSettingsInput): Promise<ThemeSettingsRow> => {
  const current = await ensureThemeSettings();

  await pool.execute(
    `UPDATE theme_settings
     SET primary_color = ?,
         secondary_color = ?,
         background_color = ?,
         surface_color = ?,
         text_color = ?,
         muted_text_color = ?,
         button_background_color = ?,
         button_text_color = ?,
         header_background_color = ?,
         footer_background_color = ?,
         footer_text_color = ?
     WHERE id = ?`,
    [
      input.primaryColor,
      input.secondaryColor,
      input.backgroundColor,
      input.surfaceColor,
      input.textColor,
      input.mutedTextColor,
      input.buttonBackgroundColor,
      input.buttonTextColor,
      input.headerBackgroundColor,
      input.footerBackgroundColor,
      input.footerTextColor,
      current.id,
    ]
  );

  return ensureThemeSettings();
};
