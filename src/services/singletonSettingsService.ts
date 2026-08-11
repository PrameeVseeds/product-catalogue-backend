import type {ContactSettingsInput,EnquirySettingsInput,HeroSettingsInput,
  SiteSettingsInput,ThemeSettingsInput,} from "../interfaces/settingsInterface.js";
import * as settingsRepository from "../repositories/singletonSettingsRepository.js";

export const getSiteSettings = () => {
  return settingsRepository.ensureSiteSettings();
};

export const updateSiteSettings = (input: SiteSettingsInput) => {
  return settingsRepository.updateSiteSettings(input);
};

export const getThemeSettings = () => {
  return settingsRepository.ensureThemeSettings();
};

export const updateThemeSettings = (input: ThemeSettingsInput) => {
  return settingsRepository.updateThemeSettings(input);
};

export const getHeroSettings = () => {
  return settingsRepository.ensureHeroSettings();
};

export const updateHeroSettings = (input: HeroSettingsInput) => {
  return settingsRepository.updateHeroSettings(input);
};

export const getContactSettings = () => {
  return settingsRepository.ensureContactSettings();
};

export const updateContactSettings = (input: ContactSettingsInput) => {
  return settingsRepository.updateContactSettings(input);
};

export const getEnquirySettings = () => {
  return settingsRepository.ensureEnquirySettings();
};

export const updateEnquirySettings = (input: EnquirySettingsInput) => {
  return settingsRepository.updateEnquirySettings(input);
};
