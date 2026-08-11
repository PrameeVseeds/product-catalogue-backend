import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type {HomeSectionInput,HomeSectionItemInput,} from "../interfaces/settingsInterface.js";
import type {HomeSectionItemRow,HomeSectionRow,} from "../models/settingsModel.js";

export const findVisibleHomeSections = async (): Promise<HomeSectionRow[]> => {
  const [rows] = await pool.execute<HomeSectionRow[]>(
    `SELECT *
     FROM home_sections
     WHERE is_visible = TRUE
     ORDER BY display_order ASC, id ASC`
  );

  return rows;
};

export const findAllHomeSections = async (): Promise<HomeSectionRow[]> => {
  const [rows] = await pool.execute<HomeSectionRow[]>(
    `SELECT *
     FROM home_sections
     ORDER BY display_order ASC, id ASC`
  );

  return rows;
};

export const findHomeSectionById = async (sectionId: number): Promise<HomeSectionRow | null> => {
  const [rows] = await pool.execute<HomeSectionRow[]>(
    `SELECT *
     FROM home_sections
     WHERE id = ?
     LIMIT 1`,
    [sectionId]
  );

  return rows[0] ?? null;
};

export const createHomeSection = async (input: HomeSectionInput): Promise<HomeSectionRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO home_sections
       (section_key, title, subtitle, description, image_url,
        background_image_url, button_text, button_link, section_type,
        display_order, is_visible)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.sectionKey.trim(),
      input.title,
      input.subtitle,
      input.description,
      input.imageUrl,
      input.backgroundImageUrl,
      input.buttonText,
      input.buttonLink,
      input.sectionType,
      input.displayOrder,
      input.isVisible,
    ]
  );

  return findHomeSectionById(result.insertId);
};

export const updateHomeSection = async (sectionId: number,input: HomeSectionInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE home_sections
     SET section_key = ?,
         title = ?,
         subtitle = ?,
         description = ?,
         image_url = ?,
         background_image_url = ?,
         button_text = ?,
         button_link = ?,
         section_type = ?,
         display_order = ?,
         is_visible = ?
     WHERE id = ?`,
    [
      input.sectionKey.trim(),
      input.title,
      input.subtitle,
      input.description,
      input.imageUrl,
      input.backgroundImageUrl,
      input.buttonText,
      input.buttonLink,
      input.sectionType,
      input.displayOrder,
      input.isVisible,
      sectionId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteHomeSection = async (sectionId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM home_sections
     WHERE id = ?`,
    [sectionId]
  );

  return result.affectedRows > 0;
};

export const findSectionItems = async (sectionId: number,visibleOnly: boolean): Promise<HomeSectionItemRow[]> => {
  const [rows] = await pool.execute<HomeSectionItemRow[]>(
    `SELECT *
     FROM home_section_items
     WHERE section_id = ?
       AND (? = FALSE OR is_visible = TRUE)
     ORDER BY display_order ASC, id ASC`,
    [sectionId, visibleOnly]
  );

  return rows;
};

export const findSectionItemById = async (itemId: number): Promise<HomeSectionItemRow | null> => {
  const [rows] = await pool.execute<HomeSectionItemRow[]>(
    `SELECT *
     FROM home_section_items
     WHERE id = ?
     LIMIT 1`,
    [itemId]
  );

  return rows[0] ?? null;
};

export const createSectionItem = async (sectionId: number,input: HomeSectionItemInput): Promise<HomeSectionItemRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO home_section_items
       (section_id, title, subtitle, description, image_url, icon_name,
        button_text, button_link, display_order, is_visible)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      sectionId,
      input.title,
      input.subtitle,
      input.description,
      input.imageUrl,
      input.iconName,
      input.buttonText,
      input.buttonLink,
      input.displayOrder,
      input.isVisible,
    ]
  );

  return findSectionItemById(result.insertId);
};

export const updateSectionItem = async (itemId: number,input: HomeSectionItemInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE home_section_items
     SET title = ?,
         subtitle = ?,
         description = ?,
         image_url = ?,
         icon_name = ?,
         button_text = ?,
         button_link = ?,
         display_order = ?,
         is_visible = ?
     WHERE id = ?`,
    [
      input.title,
      input.subtitle,
      input.description,
      input.imageUrl,
      input.iconName,
      input.buttonText,
      input.buttonLink,
      input.displayOrder,
      input.isVisible,
      itemId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteSectionItem = async (itemId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM home_section_items
     WHERE id = ?`,
    [itemId]
  );

  return result.affectedRows > 0;
};
