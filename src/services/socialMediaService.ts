import type { SocialMediaLinkInput } from "../interfaces/settingsInterface.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as socialMediaRepository from "../repositories/socialMediaRepository.js";

export const getActiveSocialLinks = () => {
  return socialMediaRepository.findActiveSocialLinks();
};

export const getAllSocialLinks = () => {
  return socialMediaRepository.findAllSocialLinks();
};

export const createSocialLink = async (input: SocialMediaLinkInput) => {
  try {
    return await socialMediaRepository.createSocialLink(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error("SOCIAL_PLATFORM_EXISTS");
    }

    throw error;
  }
};

export const updateSocialLink = async (linkId: number,input: SocialMediaLinkInput) => {
  try {
    const updated = await socialMediaRepository.updateSocialLink(linkId, input);

    if (!updated) return null;

    return socialMediaRepository.findSocialLinkById(linkId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error("SOCIAL_PLATFORM_EXISTS");
    }

    throw error;
  }
};

export const deleteSocialLink = (linkId: number): Promise<boolean> => {
  return socialMediaRepository.deleteSocialLink(linkId);
};
