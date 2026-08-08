import type {HomeSectionInput,HomeSectionItemInput,} from "../interfaces/settingsInterface.js";
import type { HomeSectionType } from "../models/settingsModel.js";
import type { ValidationResult } from "./validationUtils.js";
import {getBoolean,getInteger,getNullableString,getRequiredString,} from "./settingsValidationUtils.js";

const sectionTypes: HomeSectionType[] = [
  "CONTENT",
  "CARDS",
  "CATEGORIES",
  "FEATURED_PRODUCTS",
  "BRANDS",
  "CTA",
];

export const validateHomeSection = (body: Record<string, unknown>): ValidationResult<HomeSectionInput> => {
  const sectionKey = getRequiredString(body, "sectionKey", "Section key");

  if (!sectionKey.isValid) return sectionKey;

  const sectionType = getNullableString(body.sectionType) as HomeSectionType | null;

  if (!sectionType || !sectionTypes.includes(sectionType)) {
    return {
      isValid: false,
      message: "Section type is invalid.",
    };
  }

  return {
    isValid: true,
    data: {
      sectionKey: sectionKey.data,
      title: getNullableString(body.title),
      subtitle: getNullableString(body.subtitle),
      description: getNullableString(body.description),
      imageUrl: getNullableString(body.imageUrl),
      backgroundImageUrl: getNullableString(body.backgroundImageUrl),
      buttonText: getNullableString(body.buttonText),
      buttonLink: getNullableString(body.buttonLink),
      sectionType,
      displayOrder: getInteger(body.displayOrder),
      isVisible: getBoolean(body.isVisible, true),
    },
  };
};

export const validateHomeSectionItem = (
  body: Record<string, unknown>
): ValidationResult<HomeSectionItemInput> => {
  const title = getRequiredString(body, "title", "Title");

  if (!title.isValid) return title;

  return {
    isValid: true,
    data: {
      title: title.data,
      subtitle: getNullableString(body.subtitle),
      description: getNullableString(body.description),
      imageUrl: getNullableString(body.imageUrl),
      iconName: getNullableString(body.iconName),
      buttonText: getNullableString(body.buttonText),
      buttonLink: getNullableString(body.buttonLink),
      displayOrder: getInteger(body.displayOrder),
      isVisible: getBoolean(body.isVisible, true),
    },
  };
};
