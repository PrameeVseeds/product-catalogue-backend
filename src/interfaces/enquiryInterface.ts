import type { EnquiryStatus, EnquiryType } from "../models/enquiryModel.js";

export interface CreateEnquiryInput {
  productId: number | null;
  modelNumber: string | null;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
}

export interface EnquiryCreateRecordInput extends CreateEnquiryInput {
  enquiryType: EnquiryType;
  status: EnquiryStatus;
}

export interface EnquiryListFilters {
  status: EnquiryStatus | null;
  enquiryType: EnquiryType | null;
  productId: number | null;
  page: number;
  limit: number;
}

export interface UpdateEnquiryStatusInput {
  status: EnquiryStatus;
}
