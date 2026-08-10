import type {CreateEnquiryInput,EnquiryListFilters,UpdateEnquiryStatusInput,} from "../interfaces/enquiryInterface.js";
import type { ProductRow } from "../models/productModel.js";
import * as enquiryRepository from "../repositories/enquiryRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import { sendEnquiryNotificationEmail } from "./enquiryEmailService.js";
import * as settingsService from "./singletonSettingsService.js";

const enquiryNotFoundError = "ENQUIRY_NOT_FOUND";
const productNotFoundError = "PRODUCT_NOT_FOUND";

export const enquiryErrors = {
  enquiryNotFound: enquiryNotFoundError,
  productNotFound: productNotFoundError,
} as const;

export const createEnquiry = async (input: CreateEnquiryInput) => {
  let product: ProductRow | null = null;

  if (input.productId) {
    product = await productRepository.findProductById(input.productId);

    if (!product) {
      throw new Error(productNotFoundError);
    }
  }

  const enquiry = await enquiryRepository.createEnquiry({
    ...input,
    enquiryType: input.productId ? "PRODUCT" : "GENERAL",
    status: "NEW",
  });

  if (!enquiry) {
    throw new Error(enquiryNotFoundError);
  }

  try {
    const enquirySettings = await settingsService.getEnquirySettings();
    await sendEnquiryNotificationEmail(enquiry, enquirySettings, product);
  } catch (error) {
    console.error("Enquiry notification email failed:", error);
  }

  return enquiry;
};

export const getEnquiries = async (filters: EnquiryListFilters) => {
  const [items, total] = await Promise.all([
    enquiryRepository.findEnquiries(filters),
    enquiryRepository.countEnquiries(filters),
  ]);

  return {
    items,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.ceil(total / filters.limit),
    },
  };
};

export const getEnquiryById = (enquiryId: number) => {
  return enquiryRepository.findEnquiryDetailById(enquiryId);
};

export const updateEnquiryStatus = async (enquiryId: number,input: UpdateEnquiryStatusInput) => {
  const updated = await enquiryRepository.updateEnquiryStatus(
    enquiryId,
    input.status
  );

  if (!updated) return null;

  return enquiryRepository.findEnquiryDetailById(enquiryId);
};
