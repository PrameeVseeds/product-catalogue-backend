import type { ThemeSettingsInput } from "../interfaces/settingsInterface.js";
import type { ValidationResult } from "./validationUtils.js";
import { validateHexColor } from "./settingsValidationUtils.js";

const themeColorFields = [
  ["primaryColor", "Primary color"],
  ["secondaryColor", "Secondary color"],
  ["backgroundColor", "Background color"],
  ["surfaceColor", "Surface color"],
  ["textColor", "Text color"],
  ["mutedTextColor", "Muted text color"],
  ["buttonBackgroundColor", "Button background color"],
  ["buttonTextColor", "Button text color"],
  ["headerBackgroundColor", "Header background color"],
  ["footerBackgroundColor", "Footer background color"],
  ["footerTextColor", "Footer text color"],
] as const;

export const validateThemeSettings = (body: Record<string, unknown>): ValidationResult<ThemeSettingsInput> => {
  const values: Record<string, string> = {};

  for (const [key, label] of themeColorFields) {
    const result = validateHexColor(body[key], label);

    if (!result.isValid) return result;

    values[key] = result.data;
  }

  return {
    isValid: true,
    data: {
      primaryColor: values.primaryColor,
      secondaryColor: values.secondaryColor,
      backgroundColor: values.backgroundColor,
      surfaceColor: values.surfaceColor,
      textColor: values.textColor,
      mutedTextColor: values.mutedTextColor,
      buttonBackgroundColor: values.buttonBackgroundColor,
      buttonTextColor: values.buttonTextColor,
      headerBackgroundColor: values.headerBackgroundColor,
      footerBackgroundColor: values.footerBackgroundColor,
      footerTextColor: values.footerTextColor,
    },
  };
};
