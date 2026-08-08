import { pool } from "../config/db.js";
import type { ContactSettingsInput } from "../interfaces/settingsInterface.js";
import type { ContactSettingsRow } from "../models/settingsModel.js";

export const findContactSettings =
  async (): Promise<ContactSettingsRow | null> => {
    const [rows] = await pool.execute<ContactSettingsRow[]>(
      `SELECT *
       FROM contact_settings
       ORDER BY id ASC
       LIMIT 1`
    );

    return rows[0] ?? null;
  };

export const ensureContactSettings = async (): Promise<ContactSettingsRow> => {
  const existing = await findContactSettings();

  if (existing) return existing;

  await pool.execute(`INSERT INTO contact_settings () VALUES ()`);
  const created = await findContactSettings();

  if (!created) throw new Error("CONTACT_SETTINGS_INIT_FAILED");

  return created;
};

export const updateContactSettings = async (
  input: ContactSettingsInput
): Promise<ContactSettingsRow> => {
  const current = await ensureContactSettings();

  await pool.execute(
    `UPDATE contact_settings
     SET contact_heading = ?,
         contact_description = ?,
         company_name = ?,
         address = ?,
         phone_primary = ?,
         phone_secondary = ?,
         fax = ?,
         general_email = ?,
         working_hours = ?,
         map_embed_url = ?,
         contact_background_image_url = ?
     WHERE id = ?`,
    [
      input.contactHeading,
      input.contactDescription,
      input.companyName,
      input.address,
      input.phonePrimary,
      input.phoneSecondary,
      input.fax,
      input.generalEmail,
      input.workingHours,
      input.mapEmbedUrl,
      input.contactBackgroundImageUrl,
      current.id,
    ]
  );

  return ensureContactSettings();
};
