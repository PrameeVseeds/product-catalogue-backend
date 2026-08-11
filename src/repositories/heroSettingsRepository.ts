import { pool } from "../config/db.js";
import type { HeroSettingsInput } from "../interfaces/settingsInterface.js";
import type { HeroSettingsRow } from "../models/settingsModel.js";

export const findHeroSettings = async (): Promise<HeroSettingsRow | null> => {
  const [rows] = await pool.execute<HeroSettingsRow[]>(
    `SELECT *
     FROM hero_settings
     ORDER BY id ASC
     LIMIT 1`
  );

  return rows[0] ?? null;
};

export const ensureHeroSettings = async (): Promise<HeroSettingsRow> => {
  const existing = await findHeroSettings();

  if (existing) return existing;

  await pool.execute(
    `INSERT INTO hero_settings (title)
     VALUES (?)`,
    ["Welcome"]
  );

  const created = await findHeroSettings();

  if (!created) throw new Error("HERO_SETTINGS_INIT_FAILED");

  return created;
};

export const updateHeroSettings = async (input: HeroSettingsInput): Promise<HeroSettingsRow> => {
  const current = await ensureHeroSettings();

  await pool.execute(
    `UPDATE hero_settings
     SET title = ?,
         subtitle = ?,
         description = ?,
         background_image_url = ?,
         foreground_image_url = ?,
         primary_button_text = ?,
         primary_button_link = ?,
         secondary_button_text = ?,
         secondary_button_link = ?,
         text_alignment = ?,
         overlay_opacity = ?,
         is_visible = ?
     WHERE id = ?`,
    [
      input.title,
      input.subtitle,
      input.description,
      input.backgroundImageUrl,
      input.foregroundImageUrl,
      input.primaryButtonText,
      input.primaryButtonLink,
      input.secondaryButtonText,
      input.secondaryButtonLink,
      input.textAlignment,
      input.overlayOpacity,
      input.isVisible,
      current.id,
    ]
  );

  return ensureHeroSettings();
};
