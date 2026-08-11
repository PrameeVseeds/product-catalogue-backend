import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { ProductFeatureInput } from "../interfaces/catalogueInterface.js";
import type { ProductFeatureRow } from "../models/productFeatureModel.js";

export const findProductFeatures = async (productId: number): Promise<ProductFeatureRow[]> => {
  const [rows] = await pool.execute<ProductFeatureRow[]>(
    `SELECT *
     FROM product_features
     WHERE product_id = ?
     ORDER BY display_order ASC, id ASC`,
    [productId]
  );

  return rows;
};

export const findProductFeatureById = async (featureId: number): Promise<ProductFeatureRow | null> => {
  const [rows] = await pool.execute<ProductFeatureRow[]>(
    `SELECT *
     FROM product_features
     WHERE id = ?
     LIMIT 1`,
    [featureId]
  );

  return rows[0] ?? null;
};

export const createProductFeature = async (input: ProductFeatureInput): Promise<ProductFeatureRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO product_features
       (product_id, feature_text, display_order)
     VALUES (?, ?, ?)`,
    [input.productId, input.featureText, input.displayOrder]
  );

  return findProductFeatureById(result.insertId);
};

export const updateProductFeature = async (featureId: number,input: ProductFeatureInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE product_features
     SET product_id = ?,
         feature_text = ?,
         display_order = ?
     WHERE id = ?`,
    [input.productId, input.featureText, input.displayOrder, featureId]
  );

  return result.affectedRows > 0;
};

export const deleteProductFeature = async (featureId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM product_features
     WHERE id = ?`,
    [featureId]
  );

  return result.affectedRows > 0;
};
