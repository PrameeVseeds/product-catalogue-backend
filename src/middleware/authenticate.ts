import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedAdmin } from "../interfaces/authInterface.js";
import * as adminRepository from "../repositories/adminRepository.js";
import { verifyToken } from "../utils/jwt.js";

export interface AuthenticationRequest extends Request {
  admin?: AuthenticatedAdmin;
}

export const authenticate = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication token is required.",
    });
    return;
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication token is required.",
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const admin = await adminRepository.findAdminById(decoded.adminId);

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Admin account was not found.",
      });
      return;
    }

    if (!Boolean(admin.is_active)) {
      res.status(403).json({
        success: false,
        message: "Admin account is inactive.",
      });
      return;
    }

    req.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };

    next();
  } catch (error) {
    console.error("Authentication failed:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
