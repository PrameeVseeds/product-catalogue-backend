import type { ValidationResult } from "./validationUtils.js";

export const validateDatasheetExtractionRequest = (
  body: Record<string, unknown>,
): ValidationResult<{ specificationFileUrl: string }> => {
  const specificationFileUrl = typeof body.specificationFileUrl === "string" ? body.specificationFileUrl.trim() : "";
  if (!/^\/uploads\/specification-pdfs\/[a-zA-Z0-9-]+\.pdf$/.test(specificationFileUrl)) {
    return { isValid: false, message: "A valid uploaded specification PDF is required." };
  }
  return { isValid: true, data: { specificationFileUrl } };
};
