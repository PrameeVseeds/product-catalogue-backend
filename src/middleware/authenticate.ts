import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedAdmin } from "../interfaces/authInterface.js";
import * as adminRepository from "../repositories/adminRepository.js";
import { verifyToken } from "../utils/jwt.js";

const ADMIN_LOOKUP_TIMEOUT_MS = 5_000;

class AuthenticationDatabaseTimeoutError extends Error {}

const findAdminWithTimeout = async (adminId: number) => {
  let timeout: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(
      () => reject(new AuthenticationDatabaseTimeoutError()),
      ADMIN_LOOKUP_TIMEOUT_MS,
    );
  });

  try {
    return await Promise.race([
      adminRepository.findAdminById(adminId),
      timeoutPromise,
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
};

export interface AuthenticationRequest extends Request {
  admin?: AuthenticatedAdmin;
}

export const authenticate = async (req: AuthenticationRequest,res: Response,next: NextFunction): Promise<void> => {
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
    const admin = await findAdminWithTimeout(decoded.adminId);

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
    if (error instanceof AuthenticationDatabaseTimeoutError) {
      console.error("Authentication database lookup timed out.");
      res.status(503).json({
        success: false,
        message: "Authentication service is temporarily unavailable.",
      });
      return;
    }

    console.error("Authentication failed:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
