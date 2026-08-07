import type { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import type { AdminRow } from "../models/adminModel.js";

const adminSelectFields = `
  id,
  name,
  email,
  password_hash,
  is_active,
  created_at,
  updated_at
`;

export const findAdminByEmail = async (
  email: string
): Promise<AdminRow | null> => {
  const [rows] = await pool.execute<AdminRow[]>(
    `
      SELECT ${adminSelectFields}
      FROM admins
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  return rows[0] ?? null;
};

export const findAdminById = async (
  adminId: number
): Promise<AdminRow | null> => {
  const [rows] = await pool.execute<AdminRow[]>(
    `
      SELECT ${adminSelectFields}
      FROM admins
      WHERE id = ?
      LIMIT 1
    `,
    [adminId]
  );

  return rows[0] ?? null;
};

export const createAdmin = async (
  name: string,
  email: string,
  passwordHash: string
): Promise<number> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO admins (
        name,
        email,
        password_hash,
        is_active
      )
      VALUES (?, ?, ?, TRUE)
    `,
    [name.trim(), email.trim().toLowerCase(), passwordHash]
  );

  return result.insertId;
};
