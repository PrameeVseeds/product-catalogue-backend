import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type {ProductInput,ProductListFilters,} from "../interfaces/catalogueInterface.js";
import type {ProductRelationSummaryRow,ProductRow,} from "../models/productModel.js";

const buildProductFilterSql = (filters: ProductListFilters,activeOnly: boolean): 
{ whereSql: string; values: Array<string | boolean> } => {
  const conditions: string[] = [];
  const values: Array<string | boolean> = [];

  if (activeOnly) {
    conditions.push("p.is_active = TRUE");
  }

  if (filters.search) {
    conditions.push("(p.name LIKE ? OR p.model_number LIKE ?)");
    values.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  if (filters.category) {
    conditions.push("c.slug = ?");
    values.push(filters.category);
  }

  if (filters.brand) {
    conditions.push("b.slug = ?");
    values.push(filters.brand);
  }

  if (filters.subcategory) {
    conditions.push("s.slug = ?");
    values.push(filters.subcategory);
  }

  if (filters.featured !== null) {
    conditions.push("p.is_featured = ?");
    values.push(filters.featured);
  }

  return {
    whereSql: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    values,
  };
};

export const findProducts = async (filters: ProductListFilters,activeOnly: boolean): Promise<ProductRow[]> => {
  const { whereSql, values } = buildProductFilterSql(filters, activeOnly);
  const sql = `SELECT p.*
     FROM products p
     INNER JOIN subcategories s ON s.id = p.subcategory_id
     LEFT JOIN category_brands cb ON cb.id = s.category_brand_id
     INNER JOIN categories c ON c.id = s.category_id
     LEFT JOIN brands b ON b.id = cb.brand_id
     ${whereSql}
     ORDER BY p.display_order ASC, p.created_at DESC`;
  const [rows] = await pool.execute({ sql }, values);

  return rows as ProductRow[];
};

export const findProductById = async (productId: number): Promise<ProductRow | null> => {
  const [rows] = await pool.execute<ProductRow[]>(
    `SELECT *
     FROM products
     WHERE id = ?
     LIMIT 1`,
    [productId]
  );

  return rows[0] ?? null;
};

export const findProductBySlug = async (slug: string,activeOnly: boolean): Promise<ProductRow | null> => {
  const [rows] = await pool.execute<ProductRow[]>(
    `SELECT *
     FROM products
     WHERE slug = ?
       AND (? = FALSE OR is_active = TRUE)
     LIMIT 1`,
    [slug, activeOnly]
  );

  return rows[0] ?? null;
};

export const findProductRelations = async (productId: number): Promise<ProductRelationSummaryRow | null> => {
  const [rows] = await pool.execute<ProductRelationSummaryRow[]>(
    `SELECT
       c.id AS category_id,
       c.name AS category_name,
       c.slug AS category_slug,
       b.id AS brand_id,
       b.name AS brand_name,
       b.slug AS brand_slug,
       s.id AS subcategory_id,
       s.name AS subcategory_name,
       s.slug AS subcategory_slug
     FROM products p
     INNER JOIN subcategories s ON s.id = p.subcategory_id
     LEFT JOIN category_brands cb ON cb.id = s.category_brand_id
     INNER JOIN categories c ON c.id = s.category_id
     LEFT JOIN brands b ON b.id = cb.brand_id
     WHERE p.id = ?
     LIMIT 1`,
    [productId]
  );

  return rows[0] ?? null;
};

export const createProduct = async (input: ProductInput): Promise<ProductRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO products
       (subcategory_id, name, slug, model_number, short_description,
        description, main_image_url, datasheet_title, datasheet_description,
        datasheet_file_url, specification_file_url, meta_title, meta_description, is_featured, is_active, display_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.subcategoryId,
      input.name,
      input.slug,
      input.modelNumber,
      input.shortDescription,
      input.description,
      input.mainImageUrl,
      input.datasheetTitle,
      input.datasheetDescription,
      input.datasheetFileUrl,
      input.specificationFileUrl,
      input.metaTitle,
      input.metaDescription,
      input.isFeatured,
      input.isActive,
      input.displayOrder,
    ]
  );

  return findProductById(result.insertId);
};

export const updateProduct = async (productId: number,input: ProductInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE products
     SET subcategory_id = ?,
         name = ?,
         slug = ?,
         model_number = ?,
         short_description = ?,
         description = ?,
         main_image_url = ?,
         datasheet_title = ?,
         datasheet_description = ?,
         datasheet_file_url = ?,
         specification_file_url = ?,
         meta_title = ?,
         meta_description = ?,
         is_featured = ?,
         is_active = ?,
         display_order = ?
     WHERE id = ?`,
    [
      input.subcategoryId,
      input.name,
      input.slug,
      input.modelNumber,
      input.shortDescription,
      input.description,
      input.mainImageUrl,
      input.datasheetTitle,
      input.datasheetDescription,
      input.datasheetFileUrl,
      input.specificationFileUrl,
      input.metaTitle,
      input.metaDescription,
      input.isFeatured,
      input.isActive,
      input.displayOrder,
      productId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteProduct = async (productId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM products
     WHERE id = ?`,
    [productId]
  );

  return result.affectedRows > 0;
};
