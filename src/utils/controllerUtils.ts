import type { Response } from "express";

export const sendSuccess = (res: Response,statusCode: number,message: string,data?: unknown): void => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data === undefined ? {} : { data }),
  });
};

export const sendNotFound = (res: Response, message: string): void => {
  res.status(404).json({
    success: false,
    message,
  });
};

export const sendConflict = (res: Response, message: string): void => {
  res.status(409).json({
    success: false,
    message,
  });
};

export const sendUnexpectedError = (res: Response,logMessage: string,error: unknown): void => {
  console.error(logMessage, error);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};

export const isServiceError = (error: unknown, code: string): boolean => {
  return error instanceof Error && error.message === code;
};
