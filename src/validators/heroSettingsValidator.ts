import type { HeroSettingsInput } from "../interfaces/settingsInterface.js";
import type { TextAlignment } from "../models/settingsModel.js";
import type { ValidationResult } from "./validationUtils.js";
import {getBoolean,getNullableString,getRequiredString,} from "./settingsValidationUtils.js";

const textAlignments: TextAlignment[] = ["LEFT", "CENTER", "RIGHT"];

export const validateHeroSettings = (body: Record<string, unknown>): ValidationResult<HeroSettingsInput> => {
  const title = getRequiredString(body, "title", "Title");

  if (!title.isValid) return title;

  const textAlignment = getNullableString(body.textAlignment) as TextAlignment | null;

  if (!textAlignment || !textAlignments.includes(textAlignment)) {
    return {
      isValid: false,
      message: "Text alignment must be LEFT, CENTER or RIGHT.",
    };
  }

  const overlayOpacity = Number(body.overlayOpacity);

  if (
    !Number.isFinite(overlayOpacity) ||
    overlayOpacity < 0 ||
    overlayOpacity > 1
  ) {
    return {
      isValid: false,
      message: "Overlay opacity must be between 0 and 1.",
    };
  }

  return {
    isValid: true,
    data: {
      title: title.data,
      subtitle: getNullableString(body.subtitle),
      description: getNullableString(body.description),
      backgroundImageUrl: getNullableString(body.backgroundImageUrl),
      foregroundImageUrl: getNullableString(body.foregroundImageUrl),
      primaryButtonText: getNullableString(body.primaryButtonText),
      primaryButtonLink: getNullableString(body.primaryButtonLink),
      secondaryButtonText: getNullableString(body.secondaryButtonText),
      secondaryButtonLink: getNullableString(body.secondaryButtonLink),
      textAlignment,
      overlayOpacity,
      isVisible: getBoolean(body.isVisible, true),
    },
  };
};
