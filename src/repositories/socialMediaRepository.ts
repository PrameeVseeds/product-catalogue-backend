import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { SocialMediaLinkInput } from "../interfaces/settingsInterface.js";
import type { SocialMediaLinkRow } from "../models/settingsModel.js";

export const findActiveSocialLinks = async (): Promise<SocialMediaLinkRow[]> => {
  const [rows] = await pool.execute<SocialMediaLinkRow[]>(
    `SELECT *
     FROM social_media_links
     WHERE is_active = TRUE
     ORDER BY display_order ASC, id ASC`
  );

  return rows;
};

export const findAllSocialLinks = async (): Promise<SocialMediaLinkRow[]> => {
  const [rows] = await pool.execute<SocialMediaLinkRow[]>(
    `SELECT *
     FROM social_media_links
     ORDER BY display_order ASC, id ASC`
  );

  return rows;
};

export const findSocialLinkById = async (linkId: number): Promise<SocialMediaLinkRow | null> => {
  const [rows] = await pool.execute<SocialMediaLinkRow[]>(
    `SELECT *
     FROM social_media_links
     WHERE id = ?
     LIMIT 1`,
    [linkId]
  );

  return rows[0] ?? null;
};

export const createSocialLink = async (input: SocialMediaLinkInput): Promise<SocialMediaLinkRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO social_media_links
       (platform, display_name, profile_url, icon_name, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      input.platform.trim().toLowerCase(),
      input.displayName,
      input.profileUrl,
      input.iconName,
      input.displayOrder,
      input.isActive,
    ]
  );

  return findSocialLinkById(result.insertId);
};

export const updateSocialLink = async (linkId: number,input: SocialMediaLinkInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE social_media_links
     SET platform = ?,
         display_name = ?,
         profile_url = ?,
         icon_name = ?,
         display_order = ?,
         is_active = ?
     WHERE id = ?`,
    [
      input.platform.trim().toLowerCase(),
      input.displayName,
      input.profileUrl,
      input.iconName,
      input.displayOrder,
      input.isActive,
      linkId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteSocialLink = async (linkId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM social_media_links
     WHERE id = ?`,
    [linkId]
  );

  return result.affectedRows > 0;
};
