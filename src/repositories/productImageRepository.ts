import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { ProductImageInput } from "../interfaces/catalogueInterface.js";
import type { ProductImageRow } from "../models/productImageModel.js";

export const findProductImages = async (productId: number): Promise<ProductImageRow[]> => {
  const [rows] = await pool.execute<ProductImageRow[]>(
    `SELECT *
     FROM product_images
     WHERE product_id = ?
     ORDER BY display_order ASC, id ASC`,
    [productId]
  );

  return rows;
};

export const findProductImageById = async (imageId: number): Promise<ProductImageRow | null> => {
  const [rows] = await pool.execute<ProductImageRow[]>(
    `SELECT *
     FROM product_images
     WHERE id = ?
     LIMIT 1`,
    [imageId]
  );

  return rows[0] ?? null;
};

export const clearPrimaryImages = async (productId: number): Promise<void> => {
  await pool.execute(
    `UPDATE product_images
     SET is_primary = FALSE
     WHERE product_id = ?`,
    [productId]
  );
};

export const createProductImage = async (input: ProductImageInput): Promise<ProductImageRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO product_images
       (product_id, image_url, alt_text, display_order, is_primary)
     VALUES (?, ?, ?, ?, ?)`,
    [
      input.productId,
      input.imageUrl,
      input.altText,
      input.displayOrder,
      input.isPrimary,
    ]
  );

  return findProductImageById(result.insertId);
};

export const updateProductImage = async (imageId: number,input: ProductImageInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE product_images
     SET product_id = ?,
         image_url = ?,
         alt_text = ?,
         display_order = ?,
         is_primary = ?
     WHERE id = ?`,
    [
      input.productId,
      input.imageUrl,
      input.altText,
      input.displayOrder,
      input.isPrimary,
      imageId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteProductImage = async (imageId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM product_images
     WHERE id = ?`,
    [imageId]
  );

  return result.affectedRows > 0;
};
