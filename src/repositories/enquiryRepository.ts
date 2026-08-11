import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type {EnquiryCreateRecordInput,EnquiryListFilters,} from "../interfaces/enquiryInterface.js";
import type { CountRow } from "../models/countModel.js";
import type {EnquiryDetailRow,EnquiryRow,EnquiryStatus,} from "../models/enquiryModel.js";

const buildFilterSql = (filters: EnquiryListFilters): { whereSql: string; values: Array<string | number> } => {
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (filters.status) {
    conditions.push("status = ?");
    values.push(filters.status);
  }

  if (filters.enquiryType) {
    conditions.push("enquiry_type = ?");
    values.push(filters.enquiryType);
  }

  if (filters.productId) {
    conditions.push("product_id = ?");
    values.push(filters.productId);
  }

  return {
    whereSql: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    values,
  };
};

export const createEnquiry = async (input: EnquiryCreateRecordInput): Promise<EnquiryRow | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO enquiries
       (product_id, enquiry_type, name, email, phone, subject, message, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.productId,
      input.enquiryType,
      input.name,
      input.email,
      input.phone,
      input.subject,
      input.message,
      input.status,
    ]
  );

  return findEnquiryById(result.insertId);
};

export const findEnquiries = async (filters: EnquiryListFilters): Promise<EnquiryRow[]> => {
  const { whereSql, values } = buildFilterSql(filters);
  const offset = (filters.page - 1) * filters.limit;
  const sql = `SELECT *
     FROM enquiries
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT ?
     OFFSET ?`;

  const [rows] = await pool.query({ sql }, [
    ...values,
    filters.limit,
    offset,
  ]);

  return rows as EnquiryRow[];
};

export const countEnquiries = async (filters: EnquiryListFilters): Promise<number> => {
  const { whereSql, values } = buildFilterSql(filters);
  const sql = `SELECT COUNT(*) AS count
     FROM enquiries
     ${whereSql}`;

  const [rows] = await pool.execute({ sql }, values);
  const countRows = rows as CountRow[];

  return countRows[0]?.count ?? 0;
};

export const findEnquiryById = async (enquiryId: number): Promise<EnquiryRow | null> => {
  const [rows] = await pool.execute<EnquiryRow[]>(
    `SELECT *
     FROM enquiries
     WHERE id = ?
     LIMIT 1`,
    [enquiryId]
  );

  return rows[0] ?? null;
};

export const findEnquiryDetailById = async (enquiryId: number): Promise<EnquiryDetailRow | null> => {
  const [rows] = await pool.execute<EnquiryDetailRow[]>(
    `SELECT
       e.*,
       p.name AS product_name,
       p.slug AS product_slug,
       p.model_number
     FROM enquiries e
     LEFT JOIN products p ON p.id = e.product_id
     WHERE e.id = ?
     LIMIT 1`,
    [enquiryId]
  );

  return rows[0] ?? null;
};

export const updateEnquiryStatus = async (enquiryId: number,status: EnquiryStatus): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE enquiries
     SET status = ?
     WHERE id = ?`,
    [status, enquiryId]
  );

  return result.affectedRows > 0;
};
