import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { CategoryBrandInput } from "../interfaces/catalogueInterface.js";
import type { BrandRow } from "../models/brandModel.js";
import type { CategoryBrandRow } from "../models/categoryBrandModel.js";
import type { CountRow } from "../models/countModel.js";

export const findAllCategoryBrands = async (): Promise<CategoryBrandRow[]> => {
    const [rows] = await pool.execute<CategoryBrandRow[]>(
      `SELECT *
       FROM category_brands
       ORDER BY display_order ASC, id DESC`
    );

    return rows;
  };

export const findCategoryBrandById = async (categoryBrandId: number): Promise<CategoryBrandRow | null> => {
  const [rows] = await pool.execute<CategoryBrandRow[]>(
    `SELECT *
     FROM category_brands
     WHERE id = ?
     LIMIT 1`,
    [categoryBrandId]
  );

  return rows[0] ?? null;
};

export const createCategoryBrand = async (input: CategoryBrandInput): Promise<CategoryBrandRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO category_brands
       (category_id, brand_id, display_order, is_active)
     VALUES (?, ?, ?, ?)`,
    [input.categoryId, input.brandId, input.displayOrder, input.isActive]
  );

  return findCategoryBrandById(result.insertId);
};

export const updateCategoryBrand = async (categoryBrandId: number,input: CategoryBrandInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE category_brands
     SET category_id = ?,
         brand_id = ?,
         display_order = ?,
         is_active = ?
     WHERE id = ?`,
    [
      input.categoryId,
      input.brandId,
      input.displayOrder,
      input.isActive,
      categoryBrandId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteCategoryBrand = async (categoryBrandId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM category_brands
     WHERE id = ?`,
    [categoryBrandId]
  );

  return result.affectedRows > 0;
};

export const countSubcategoriesByCategoryBrand = async (categoryBrandId: number): Promise<number> => {
  const [rows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM subcategories
     WHERE category_brand_id = ?`,
    [categoryBrandId]
  );

  return rows[0]?.count ?? 0;
};

export const findActiveBrandsByCategorySlug = async (categorySlug: string): Promise<BrandRow[]> => {
  const [rows] = await pool.execute<BrandRow[]>(
    `SELECT b.*
     FROM brands b
     INNER JOIN category_brands cb ON cb.brand_id = b.id
     INNER JOIN categories c ON c.id = cb.category_id
     WHERE c.slug = ?
       AND c.is_active = TRUE
       AND b.is_active = TRUE
       AND cb.is_active = TRUE
     ORDER BY cb.display_order ASC, b.display_order ASC, b.id DESC`,
    [categorySlug]
  );

  return rows;
};
