import { pool } from "../config/db.js";
import type { EnquirySettingsInput } from "../interfaces/settingsInterface.js";
import type { EnquirySettingsRow } from "../models/settingsModel.js";

export const findEnquirySettings =
  async (): Promise<EnquirySettingsRow | null> => {
    const [rows] = await pool.execute<EnquirySettingsRow[]>(
      `SELECT *
       FROM enquiry_settings
       ORDER BY id ASC
       LIMIT 1`
    );

    return rows[0] ?? null;
  };

export const ensureEnquirySettings = async (): Promise<EnquirySettingsRow> => {
  const existing = await findEnquirySettings();

  if (existing) return existing;

  await pool.execute(`INSERT INTO enquiry_settings () VALUES ()`);
  const created = await findEnquirySettings();

  if (!created) throw new Error("ENQUIRY_SETTINGS_INIT_FAILED");

  return created;
};

export const updateEnquirySettings = async (input: EnquirySettingsInput): Promise<EnquirySettingsRow> => {
  const current = await ensureEnquirySettings();

  await pool.execute(
    `UPDATE enquiry_settings
     SET call_enabled = ?,
         call_button_text = ?,
         call_phone = ?,
         whatsapp_enabled = ?,
         whatsapp_button_text = ?,
         whatsapp_number = ?,
         whatsapp_default_message = ?,
         email_enabled = ?,
         email_button_text = ?,
         enquiry_email = ?,
         default_email_subject = ?
     WHERE id = ?`,
    [
      input.callEnabled,
      input.callButtonText,
      input.callPhone,
      input.whatsappEnabled,
      input.whatsappButtonText,
      input.whatsappNumber,
      input.whatsappDefaultMessage,
      input.emailEnabled,
      input.emailButtonText,
      input.enquiryEmail,
      input.defaultEmailSubject,
      current.id,
    ]
  );

  return ensureEnquirySettings();
};
