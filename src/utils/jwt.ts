import jwt, { type SignOptions } from "jsonwebtoken";
import type { JwtPayload } from "../interfaces/authInterface.js";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  return secret;
};

export const generateToken = (payload: JwtPayload): string => {
  const expiresIn =
    (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "8h";

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
