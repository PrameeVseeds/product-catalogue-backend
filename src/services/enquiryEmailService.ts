import type { EnquiryRow } from "../models/enquiryModel.js";
import type { ProductRow } from "../models/productModel.js";
import type { EnquirySettingsRow } from "../models/settingsModel.js";
import { sendEmail } from "./emailService.js";

const line = (label: string, value: string | number | null): string | null => {
  return value ? `${label}: ${value}` : null;
};

const buildHtml = (text: string): string => {
  return `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</pre>`;
};

export const sendEnquiryNotificationEmail = async (
  enquiry: EnquiryRow,
  enquirySettings: EnquirySettingsRow,
  product: ProductRow | null
): Promise<void> => {
  if (!enquirySettings.enquiry_email) {
    console.warn("Enquiry notification email skipped: enquiry_email is not configured.");
    return;
  }

  const lines = [
    `New ${enquiry.enquiry_type.toLowerCase()} enquiry received.`,
    "",
    line("Enquiry ID", enquiry.id),
    product ? line("Product", product.name) : null,
    product ? line("Model number", product.model_number) : null,
    line("Customer name", enquiry.name),
    line("Customer email", enquiry.email),
    line("Customer phone", enquiry.phone),
    line("Subject", enquiry.subject),
    "",
    "Message:",
    enquiry.message,
  ].filter((value): value is string => Boolean(value));

  const text = lines.join("\n");

  await sendEmail({
    to: enquirySettings.enquiry_email,
    subject:
      enquiry.subject ||
      enquirySettings.default_email_subject ||
      `New ${enquiry.enquiry_type.toLowerCase()} enquiry`,
    text,
    html: buildHtml(text),
  });
};
