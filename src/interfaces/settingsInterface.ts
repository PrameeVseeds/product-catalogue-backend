import type { HomeSectionType, TextAlignment } from "../models/settingsModel.js";

export interface SiteSettingsInput {
  companyName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  websiteTitle: string | null;
  websiteDescription: string | null;
  footerDescription: string | null;
  copyrightText: string | null;
  isMaintenanceMode: boolean;
}

export interface ThemeSettingsInput {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  headerBackgroundColor: string;
  footerBackgroundColor: string;
  footerTextColor: string;
}

export interface HeroSettingsInput {
  title: string;
  subtitle: string | null;
  description: string | null;
  backgroundImageUrl: string | null;
  foregroundImageUrl: string | null;
  primaryButtonText: string | null;
  primaryButtonLink: string | null;
  secondaryButtonText: string | null;
  secondaryButtonLink: string | null;
  textAlignment: TextAlignment;
  overlayOpacity: number;
  isVisible: boolean;
}

export interface HomeSectionInput {
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  backgroundImageUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  sectionType: HomeSectionType;
  displayOrder: number;
  isVisible: boolean;
}

export interface HomeSectionItemInput {
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  iconName: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  displayOrder: number;
  isVisible: boolean;
}

export interface ContactSettingsInput {
  contactHeading: string;
  contactDescription: string | null;
  companyName: string | null;
  address: string | null;
  phonePrimary: string | null;
  phoneSecondary: string | null;
  fax: string | null;
  generalEmail: string | null;
  workingHours: string | null;
  mapEmbedUrl: string | null;
  contactBackgroundImageUrl: string | null;
}

export interface EnquirySettingsInput {
  callEnabled: boolean;
  callButtonText: string;
  callPhone: string | null;
  whatsappEnabled: boolean;
  whatsappButtonText: string;
  whatsappNumber: string | null;
  whatsappDefaultMessage: string | null;
  emailEnabled: boolean;
  emailButtonText: string;
  enquiryEmail: string | null;
  defaultEmailSubject: string | null;
}

export interface SocialMediaLinkInput {
  platform: string;
  displayName: string | null;
  profileUrl: string;
  iconName: string | null;
  displayOrder: number;
  isActive: boolean;
}
