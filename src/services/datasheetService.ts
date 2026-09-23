import type { DatasheetData } from "../interfaces/datasheetInterface.js";
import * as productService from "./productService.js";
import * as settingsService from "./singletonSettingsService.js";
import { retryTransientDatabaseError } from "../utils/databaseRetry.js";

const getProductModels = (modelNumber: string | null): string[] =>
  (modelNumber ?? "")
    .split(/\r?\n|,/)
    .map((model) => model.trim())
    .filter(Boolean);

export const getProductDatasheetData = async (
  slug: string,
  selectedModel?: string,
): Promise<DatasheetData | null> => {
  return retryTransientDatabaseError(async () => {
    const product = await productService.getProductDetailBySlug(slug);

    if (!product) return null;

    if (selectedModel && !getProductModels(product.modelNumber).includes(selectedModel)) {
      throw new Error("PRODUCT_MODEL_NOT_FOUND");
    }

    const [siteSettings, contactSettings] = await Promise.all([
      settingsService.getSiteSettings(),
      settingsService.getContactSettings(),
    ]);

    return {
      product: selectedModel ? { ...product, modelNumber: selectedModel } : product,
      selectedModel: selectedModel ?? null,
      siteSettings,
      contactSettings,
      generatedAt: new Date(),
    };
  });
};
