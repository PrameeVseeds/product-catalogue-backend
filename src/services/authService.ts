import bcrypt from "bcryptjs";
import type {
  LoginRequest,
  LoginResponse,
} from "../interfaces/authInterface.js";
import * as adminRepository from "../repositories/adminRepository.js";
import { generateToken } from "../utils/jwt.js";

const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const loginAdmin = async (input: LoginRequest): Promise<LoginResponse | null> => {
  const admin = await adminRepository.findAdminByEmail(
    normalizeEmail(input.email)
  );

  if (!admin) {
    return null;
  }

  if (!Boolean(admin.is_active)) {
    throw new Error("ADMIN_INACTIVE");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    admin.password_hash
  );

  if (!passwordMatches) {
    return null;
  }

  const token = generateToken({
    adminId: admin.id,
    email: admin.email,
  });

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    token,
  };
};
