import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import * as adminRepository from "../repositories/adminRepository.js";

interface FirstAdminInput {
  name: string;
  email: string;
  password: string;
}

const getFirstAdminInput = (): FirstAdminInput => {
  const name = process.env.FIRST_ADMIN_NAME?.trim();
  const email = process.env.FIRST_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.FIRST_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "FIRST_ADMIN_NAME, FIRST_ADMIN_EMAIL and FIRST_ADMIN_PASSWORD are required."
    );
  }

  if (password.length < 8) {
    throw new Error("FIRST_ADMIN_PASSWORD must contain at least 8 characters.");
  }

  return {
    name,
    email,
    password,
  };
};

const createFirstAdmin = async (): Promise<void> => {
  const firstAdmin = getFirstAdminInput();

  const existingAdmin = await adminRepository.findAdminByEmail(
    firstAdmin.email
  );

  if (existingAdmin) {
    console.log("First admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(firstAdmin.password, 12);
  const adminId = await adminRepository.createAdmin(
    firstAdmin.name,
    firstAdmin.email,
    passwordHash
  );

  console.log(`First admin created with id ${adminId}.`);
};

createFirstAdmin()
  .catch((error: unknown) => {
    console.error("Failed to create first admin.");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
