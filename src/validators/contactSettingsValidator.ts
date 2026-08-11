import type { ContactSettingsInput } from "../interfaces/settingsInterface.js";
import type { ValidationResult } from "./validationUtils.js";
import {getNullableString,getRequiredString,validateNullableEmail,} from "./settingsValidationUtils.js";

export const validateContactSettings = (body: Record<string, unknown>): ValidationResult<ContactSettingsInput> => {
  const contactHeading = getRequiredString(
    body,
    "contactHeading",
    "Contact heading"
  );

  if (!contactHeading.isValid) return contactHeading;

  const generalEmail = validateNullableEmail(
    getNullableString(body.generalEmail),
    "General email"
  );

  if (!generalEmail.isValid) return generalEmail;

  return {
    isValid: true,
    data: {
      contactHeading: contactHeading.data,
      contactDescription: getNullableString(body.contactDescription),
      companyName: getNullableString(body.companyName),
      address: getNullableString(body.address),
      phonePrimary: getNullableString(body.phonePrimary),
      phoneSecondary: getNullableString(body.phoneSecondary),
      fax: getNullableString(body.fax),
      generalEmail: generalEmail.data,
      workingHours: getNullableString(body.workingHours),
      mapEmbedUrl: getNullableString(body.mapEmbedUrl),
      contactBackgroundImageUrl: getNullableString(
        body.contactBackgroundImageUrl
      ),
    },
  };
};
