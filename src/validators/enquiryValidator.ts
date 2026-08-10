import type {CreateEnquiryInput,EnquiryListFilters,UpdateEnquiryStatusInput,} from "../interfaces/enquiryInterface.js";
import type { EnquiryStatus, EnquiryType } from "../models/enquiryModel.js";
import {getInteger,getNullableString,validateId,} from "./settingsValidationUtils.js";
import type { ValidationResult } from "./validationUtils.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const enquiryStatuses: EnquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "CLOSED",
];
const enquiryTypes: EnquiryType[] = ["GENERAL", "PRODUCT"];

const maxLengths = {
  name: 150,
  email: 150,
  phone: 50,
  subject: 255,
  message: 5000,
};

const validateLength = (value: string | null,label: string,maxLength: number): ValidationResult<string | null> => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      message: `${label} must not exceed ${maxLength} characters.`,
    };
  }

  return {
    isValid: true,
    data: value,
  };
};

const getRequiredTrimmedString = (value: unknown,label: string): ValidationResult<string> => {
  const text = getNullableString(value);

  if (!text) {
    return {
      isValid: false,
      message: `${label} is required.`,
    };
  }

  return {
    isValid: true,
    data: text,
  };
};

export const validateCreateEnquiry = (body: Record<string, unknown>): ValidationResult<CreateEnquiryInput> => {
  const name = getRequiredTrimmedString(body.name, "Name");
  const email = getRequiredTrimmedString(body.email, "Email");
  const message = getRequiredTrimmedString(body.message, "Message");
  const productId =
    body.productId === undefined || body.productId === null
      ? null
      : validateId(body.productId.toString(), "Product ID");

  if (!name.isValid) return name;
  if (!email.isValid) return email;
  if (!message.isValid) return message;
  if (productId && !productId.isValid) return productId;

  if (!emailPattern.test(email.data)) {
    return {
      isValid: false,
      message: "Email must be a valid email address.",
    };
  }

  const phone = validateLength(
    getNullableString(body.phone),
    "Phone",
    maxLengths.phone
  );
  const subject = validateLength(
    getNullableString(body.subject),
    "Subject",
    maxLengths.subject
  );

  if (!phone.isValid) return phone;
  if (!subject.isValid) return subject;

  const lengths = [
    validateLength(name.data, "Name", maxLengths.name),
    validateLength(email.data, "Email", maxLengths.email),
    validateLength(message.data, "Message", maxLengths.message),
  ];

  const failedLength = lengths.find((result) => !result.isValid);

  if (failedLength && !failedLength.isValid) return failedLength;

  return {
    isValid: true,
    data: {
      productId: productId ? productId.data : null,
      name: name.data,
      email: email.data.toLowerCase(),
      phone: phone.data,
      subject: subject.data,
      message: message.data,
    },
  };
};

export const validateEnquiryListFilters = (query: Record<string, unknown>): ValidationResult<EnquiryListFilters> => {
  const status = getNullableString(query.status) as EnquiryStatus | null;
  const enquiryType = getNullableString(query.enquiryType) as EnquiryType | null;
  const productId =
    query.productId === undefined || query.productId === null
      ? null
      : validateId(query.productId.toString(), "Product ID");

  if (status && !enquiryStatuses.includes(status)) {
    return {
      isValid: false,
      message: "Status is invalid.",
    };
  }

  if (enquiryType && !enquiryTypes.includes(enquiryType)) {
    return {
      isValid: false,
      message: "Enquiry type is invalid.",
    };
  }

  if (productId && !productId.isValid) return productId;

  const page = Math.max(getInteger(query.page, 1), 1);
  const limit = Math.min(Math.max(getInteger(query.limit, 20), 1), 100);

  return {
    isValid: true,
    data: {
      status,
      enquiryType,
      productId: productId ? productId.data : null,
      page,
      limit,
    },
  };
};

export const validateUpdateEnquiryStatus = (body: Record<string, unknown>): ValidationResult<UpdateEnquiryStatusInput> => {
  const status = getNullableString(body.status) as EnquiryStatus | null;

  if (!status || !enquiryStatuses.includes(status)) {
    return {
      isValid: false,
      message: "Status must be NEW, IN_PROGRESS, CONTACTED or CLOSED.",
    };
  }

  return {
    isValid: true,
    data: {
      status,
    },
  };
};
