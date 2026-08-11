import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { BrandInput } from "../interfaces/catalogueInterface.js";
import type { BrandRow } from "../models/brandModel.js";
import type { CountRow } from "../models/countModel.js";

export const findActiveBrands = async (): Promise<BrandRow[]> => {
  const [rows] = await pool.execute<BrandRow[]>(
    `SELECT *
     FROM brands
     WHERE is_active = TRUE
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findAllBrands = async (): Promise<BrandRow[]> => {
  const [rows] = await pool.execute<BrandRow[]>(
    `SELECT *
     FROM brands
     ORDER BY display_order ASC, id DESC`
  );

  return rows;
};

export const findBrandById = async (brandId: number): Promise<BrandRow | null> => {
  const [rows] = await pool.execute<BrandRow[]>(
    `SELECT *
     FROM brands
     WHERE id = ?
     LIMIT 1`,
    [brandId]
  );

  return rows[0] ?? null;
};

export const findActiveBrandBySlug = async (slug: string): Promise<BrandRow | null> => {
  const [rows] = await pool.execute<BrandRow[]>(
    `SELECT *
     FROM brands
     WHERE slug = ?
       AND is_active = TRUE
     LIMIT 1`,
    [slug]
  );

  return rows[0] ?? null;
};

export const createBrand = async (input: BrandInput): Promise<BrandRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO brands
       (name, slug, country_name, country_code, logo_url, flag_image_url,
        website_url, description, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.name,
      input.slug,
      input.countryName,
      input.countryCode,
      input.logoUrl,
      input.flagImageUrl,
      input.websiteUrl,
      input.description,
      input.displayOrder,
      input.isActive,
    ]
  );

  return findBrandById(result.insertId);
};

export const updateBrand = async (brandId: number,input: BrandInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE brands
     SET name = ?,
         slug = ?,
         country_name = ?,
         country_code = ?,
         logo_url = ?,
         flag_image_url = ?,
         website_url = ?,
         description = ?,
         display_order = ?,
         is_active = ?
     WHERE id = ?`,
    [
      input.name,
      input.slug,
      input.countryName,
      input.countryCode,
      input.logoUrl,
      input.flagImageUrl,
      input.websiteUrl,
      input.description,
      input.displayOrder,
      input.isActive,
      brandId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteBrand = async (brandId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM brands
     WHERE id = ?`,
    [brandId]
  );

  return result.affectedRows > 0;
};

export const countCategoryBrandsByBrand = async (brandId: number): Promise<number> => {
  const [rows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM category_brands
     WHERE brand_id = ?`,
    [brandId]
  );

  return rows[0]?.count ?? 0;
};
