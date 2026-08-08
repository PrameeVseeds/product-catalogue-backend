import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { SubcategoryInput } from "../interfaces/catalogueInterface.js";
import type { CountRow } from "../models/countModel.js";
import type { SubcategoryRow } from "../models/subcategoryModel.js";

export const findActiveSubcategories = async (): Promise<SubcategoryRow[]> => {
  const [rows] = await pool.execute<SubcategoryRow[]>(
    `SELECT *
     FROM subcategories
     WHERE is_active = TRUE
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findAllSubcategories = async (): Promise<SubcategoryRow[]> => {
  const [rows] = await pool.execute<SubcategoryRow[]>(
    `SELECT *
     FROM subcategories
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findSubcategoryById = async (subcategoryId: number): Promise<SubcategoryRow | null> => {
  const [rows] = await pool.execute<SubcategoryRow[]>(
    `SELECT *
     FROM subcategories
     WHERE id = ?
     LIMIT 1`,
    [subcategoryId]
  );

  return rows[0] ?? null;
};

export const findActiveSubcategoryBySlug = async (slug: string): Promise<SubcategoryRow | null> => {
  const [rows] = await pool.execute<SubcategoryRow[]>(
    `SELECT *
     FROM subcategories
     WHERE slug = ?
       AND is_active = TRUE
     LIMIT 1`,
    [slug]
  );

  return rows[0] ?? null;
};

export const createSubcategory = async (input: SubcategoryInput): Promise<SubcategoryRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO subcategories
       (category_brand_id, name, slug, description, image_url,
        display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.categoryBrandId,
      input.name,
      input.slug,
      input.description,
      input.imageUrl,
      input.displayOrder,
      input.isActive,
    ]
  );

  return findSubcategoryById(result.insertId);
};

export const updateSubcategory = async (subcategoryId: number,input: SubcategoryInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE subcategories
     SET category_brand_id = ?,
         name = ?,
         slug = ?,
         description = ?,
         image_url = ?,
         display_order = ?,
         is_active = ?
     WHERE id = ?`,
    [
      input.categoryBrandId,
      input.name,
      input.slug,
      input.description,
      input.imageUrl,
      input.displayOrder,
      input.isActive,
      subcategoryId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteSubcategory = async (subcategoryId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM subcategories
     WHERE id = ?`,
    [subcategoryId]
  );

  return result.affectedRows > 0;
};

export const countProductsBySubcategory = async (subcategoryId: number): Promise<number> => {
  const [rows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM products
     WHERE subcategory_id = ?`,
    [subcategoryId]
  );

  return rows[0]?.count ?? 0;
};
