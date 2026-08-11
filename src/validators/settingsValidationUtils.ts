import { getString, type ValidationResult } from "./validationUtils.js";

export const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const urlPattern = /^https?:\/\/\S+$/;

export const getNullableString = (value: unknown): string | null => {
  if (value === undefined || value === null) {
    return null;
  }

  return getString(value);
};

export const getRequiredString = (body: Record<string, unknown>,key: string,label: string): ValidationResult<string> => {
  const value = getString(body[key]);

  if (!value) {
    return {
      isValid: false,
      message: `${label} is required.`,
    };
  }

  return {
    isValid: true,
    data: value,
  };
};

export const getBoolean = (value: unknown,defaultValue: boolean): boolean => {
  return typeof value === "boolean" ? value : defaultValue;
};

export const getInteger = (value: unknown, defaultValue = 0): number => {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);
    return Number.isInteger(parsedValue) ? parsedValue : defaultValue;
  }

  return defaultValue;
};

export const validateNullableUrl = (value: string | null,label: string): ValidationResult<string | null> => {
  if (value && !urlPattern.test(value)) {
    return {
      isValid: false,
      message: `${label} must be a valid URL.`,
    };
  }

  return {
    isValid: true,
    data: value,
  };
};

export const validateNullableEmail = (value: string | null,label: string): ValidationResult<string | null> => {
  if (value && !emailPattern.test(value)) {
    return {
      isValid: false,
      message: `${label} must be a valid email address.`,
    };
  }

  return {
    isValid: true,
    data: value,
  };
};

export const validateHexColor = (value: unknown,label: string): ValidationResult<string> => {
  const color = getString(value);

  if (!color || !hexColorPattern.test(color)) {
    return {
      isValid: false,
      message: `${label} must be a valid hex color.`,
    };
  }

  return {
    isValid: true,
    data: color,
  };
};

export const validateId = (id: string | string[] | undefined,label = "ID"): ValidationResult<number> => {
  if (Array.isArray(id)) {
    return {
      isValid: false,
      message: `${label} is invalid.`,
    };
  }

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return {
      isValid: false,
      message: `${label} is invalid.`,
    };
  }

  return {
    isValid: true,
    data: parsedId,
  };
};
