import type { EnquirySettingsInput } from "../interfaces/settingsInterface.js";
import type { ValidationResult } from "./validationUtils.js";
import {getBoolean,getNullableString,getRequiredString,validateNullableEmail,} from "./settingsValidationUtils.js";

export const validateEnquirySettings = (body: Record<string, unknown>): ValidationResult<EnquirySettingsInput> => {
  const callButtonText = getRequiredString(body,"callButtonText","Call button text");
  const whatsappButtonText = getRequiredString(body,"whatsappButtonText","WhatsApp button text");
  const emailButtonText = getRequiredString(body,"emailButtonText","Email button text");

  if (!callButtonText.isValid) return callButtonText;
  if (!whatsappButtonText.isValid) return whatsappButtonText;
  if (!emailButtonText.isValid) return emailButtonText;

  const enquiryEmail = validateNullableEmail(getNullableString(body.enquiryEmail),"Enquiry email");

  if (!enquiryEmail.isValid) return enquiryEmail;

  return {
    isValid: true,
    data: {
      callEnabled: getBoolean(body.callEnabled, true),
      callButtonText: callButtonText.data,
      callPhone: getNullableString(body.callPhone),
      whatsappEnabled: getBoolean(body.whatsappEnabled, true),
      whatsappButtonText: whatsappButtonText.data,
      whatsappNumber: getNullableString(body.whatsappNumber),
      whatsappDefaultMessage: getNullableString(body.whatsappDefaultMessage),
      emailEnabled: getBoolean(body.emailEnabled, true),
      emailButtonText: emailButtonText.data,
      enquiryEmail: enquiryEmail.data,
      defaultEmailSubject: getNullableString(body.defaultEmailSubject),
    },
  };
};
