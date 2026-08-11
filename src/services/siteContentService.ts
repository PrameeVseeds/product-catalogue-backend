import * as homeSectionService from "./homeSectionService.js";
import * as settingsService from "./singletonSettingsService.js";
import * as socialMediaService from "./socialMediaService.js";

export const getSiteContent = async () => {
  const [
    siteSettings,
    themeSettings,
    hero,
    homeSections,
    contactSettings,
    enquirySettings,
    socialMedia,
  ] = await Promise.all([
    settingsService.getSiteSettings(),
    settingsService.getThemeSettings(),
    settingsService.getHeroSettings(),
    homeSectionService.getVisibleHomeSections(),
    settingsService.getContactSettings(),
    settingsService.getEnquirySettings(),
    socialMediaService.getActiveSocialLinks(),
  ]);

  return {
    siteSettings,
    themeSettings,
    hero,
    homeSections,
    contactSettings,
    enquirySettings,
    socialMedia,
  };
};
