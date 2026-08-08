import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { ProductSpecificationInput } from "../interfaces/catalogueInterface.js";
import type { ProductSpecificationRow } from "../models/productSpecificationModel.js";

export const findProductSpecifications = async (productId: number): Promise<ProductSpecificationRow[]> => {
  const [rows] = await pool.execute<ProductSpecificationRow[]>(
    `SELECT *
     FROM product_specifications
     WHERE product_id = ?
     ORDER BY display_order ASC, id ASC`,
    [productId]
  );

  return rows;
};

export const findProductSpecificationById = async (specificationId: number): Promise<ProductSpecificationRow | null> => {
  const [rows] = await pool.execute<ProductSpecificationRow[]>(
    `SELECT *
     FROM product_specifications
     WHERE id = ?
     LIMIT 1`,
    [specificationId]
  );

  return rows[0] ?? null;
};

export const createProductSpecification = async (input: ProductSpecificationInput): Promise<ProductSpecificationRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO product_specifications
       (product_id, specification_name, specification_value, display_order)
     VALUES (?, ?, ?, ?)`,
    [
      input.productId,
      input.specificationName,
      input.specificationValue,
      input.displayOrder,
    ]
  );

  return findProductSpecificationById(result.insertId);
};

export const updateProductSpecification = async (specificationId: number,input: ProductSpecificationInput): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE product_specifications
     SET product_id = ?,
         specification_name = ?,
         specification_value = ?,
         display_order = ?
     WHERE id = ?`,
    [
      input.productId,
      input.specificationName,
      input.specificationValue,
      input.displayOrder,
      specificationId,
    ]
  );

  return result.affectedRows > 0;
};

export const deleteProductSpecification = async (specificationId: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM product_specifications
     WHERE id = ?`,
    [specificationId]
  );

  return result.affectedRows > 0;
};
