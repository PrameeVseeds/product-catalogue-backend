import type { DatasheetData } from "../interfaces/datasheetInterface.js";
import * as productService from "./productService.js";
import * as settingsService from "./singletonSettingsService.js";
import { retryTransientDatabaseError } from "../utils/databaseRetry.js";

export const getProductDatasheetData = async (slug: string): Promise<DatasheetData | null> => {
  return retryTransientDatabaseError(async () => {
    const product = await productService.getProductDetailBySlug(slug);

    if (!product) return null;

    const [siteSettings, contactSettings] = await Promise.all([
      settingsService.getSiteSettings(),
      settingsService.getContactSettings(),
    ]);

    return {
      product,
      siteSettings,
      contactSettings,
      generatedAt: new Date(),
    };
  });
};
