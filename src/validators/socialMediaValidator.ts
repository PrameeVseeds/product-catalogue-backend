import type { SocialMediaLinkInput } from "../interfaces/settingsInterface.js";
import type { ValidationResult } from "./validationUtils.js";
import {getBoolean,getInteger,getNullableString,getRequiredString,validateNullableUrl,} from "./settingsValidationUtils.js";

export const validateSocialMediaLink = (body: Record<string, unknown>): ValidationResult<SocialMediaLinkInput> => {
  const platform = getRequiredString(body, "platform", "Platform");
  const profileUrl = getRequiredString(body, "profileUrl", "Profile URL");

  if (!platform.isValid) return platform;
  if (!profileUrl.isValid) return profileUrl;

  const validUrl = validateNullableUrl(profileUrl.data, "Profile URL");

  if (!validUrl.isValid || !validUrl.data) {
    return {
      isValid: false,
      message: validUrl.isValid ? "Profile URL is required." : validUrl.message,
    };
  }

  return {
    isValid: true,
    data: {
      platform: platform.data,
      displayName: getNullableString(body.displayName),
      profileUrl: validUrl.data,
      iconName: getNullableString(body.iconName),
      displayOrder: getInteger(body.displayOrder),
      isActive: getBoolean(body.isActive, true),
    },
  };
};
