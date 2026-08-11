import type { SiteSettingsInput } from "../interfaces/settingsInterface.js";
import type { ValidationResult } from "./validationUtils.js";
import {getBoolean,getNullableString,getRequiredString,} from "./settingsValidationUtils.js";

export const validateSiteSettings = (body: Record<string, unknown>): ValidationResult<SiteSettingsInput> => {
  const companyName = getRequiredString(body, "companyName", "Company name");

  if (!companyName.isValid) return companyName;

  return {
    isValid: true,
    data: {
      companyName: companyName.data,
      logoUrl: getNullableString(body.logoUrl),
      faviconUrl: getNullableString(body.faviconUrl),
      websiteTitle: getNullableString(body.websiteTitle),
      websiteDescription: getNullableString(body.websiteDescription),
      footerDescription: getNullableString(body.footerDescription),
      copyrightText: getNullableString(body.copyrightText),
      isMaintenanceMode: getBoolean(body.isMaintenanceMode, false),
    },
  };
};
