import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { CategoryInput } from "../interfaces/catalogueInterface.js";
import type { CategoryRow } from "../models/categoryModel.js";
import type { CountRow } from "../models/countModel.js";

export const findActiveCategories = async (): Promise<CategoryRow[]> => {
  const [rows] = await pool.execute<CategoryRow[]>(
    `SELECT *
     FROM categories
     WHERE is_active = TRUE
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findAllCategories = async (): Promise<CategoryRow[]> => {
  const [rows] = await pool.execute<CategoryRow[]>(
    `SELECT *
     FROM categories
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findCategoryById = async (categoryId: number): Promise<CategoryRow | null> => {
  const [rows] = await pool.execute<CategoryRow[]>(
    `SELECT *
     FROM categories
     WHERE id = ?
     LIMIT 1`,
    [categoryId]
  );

  return rows[0] ?? null;
};

export const findActiveCategoryBySlug = async (slug: string): Promise<CategoryRow | null> => {
  const [rows] = await pool.execute<CategoryRow[]>(
    `SELECT *
     FROM categories
     WHERE slug = ?
       AND is_active = TRUE
     LIMIT 1`,
    [slug]
  );

  return rows[0] ?? null;
};

export const createCategory = async (input: CategoryInput): Promise<CategoryRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO categories
       (name, slug, description, image_url, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      input.name,
      input.slug,
      input.description,
      input.imageUrl,
      input.displayOrder,
      input.isActive,
    ]
  );

  return findCategoryById(result.insertId);
};

export const updateCategory = async (categoryId: number,input: CategoryInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE categories
     SET name = ?,
         slug = ?,
         description = ?,
         image_url = ?,
         display_order = ?,
         is_active = ?
     WHERE id = ?`,
    [
      input.name,
      input.slug,
      input.description,
      input.imageUrl,
      input.displayOrder,
      input.isActive,
      categoryId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM categories
     WHERE id = ?`,
    [categoryId]
  );

  return result.affectedRows > 0;
};

export const countCategoryBrandsByCategory = async (categoryId: number): Promise<number> => {
  const [rows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM category_brands
     WHERE category_id = ?`,
    [categoryId]
  );

  return rows[0]?.count ?? 0;
};
