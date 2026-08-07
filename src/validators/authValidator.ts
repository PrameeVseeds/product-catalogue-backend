import type { LoginRequest } from "../interfaces/authInterface.js";
import { getString, type ValidationResult } from "./validationUtils.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (body: Record<string, unknown>): ValidationResult<LoginRequest> => {
  const email = getString(body.email);
  const password = getString(body.password);

  if (!email || !password) {
    return {
      isValid: false,
      message: "Email and password are required.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      message: "Please provide a valid email address.",
    };
  }

  return {
    isValid: true,
    data: {
      email,
      password,
    },
  };
};
