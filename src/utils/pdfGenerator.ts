import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import type { DatasheetData } from "../interfaces/datasheetInterface.js";

const pageMargin = 48;
const contentWidth = 499;

const resolveLocalImagePath = (imageUrl: string | null): string | null => {
  if (!imageUrl || /^https?:\/\//i.test(imageUrl)) {
    return null;
  }

  const normalizedUrl = imageUrl.replace(/\\/g, "/").replace(/^\/+/, "");

  if (!normalizedUrl.startsWith("uploads/")) {
    return null;
  }

  const uploadsRoot = path.resolve("uploads");
  const imagePath = path.resolve(normalizedUrl);

  if (!imagePath.startsWith(uploadsRoot) || !fs.existsSync(imagePath)) {
    return null;
  }

  return imagePath;
};

const addImageIfAvailable = (doc: PDFKit.PDFDocument,imageUrl: string | null,x: number,
  y: number,options: PDFKit.Mixins.ImageOption): void => {
  const imagePath = resolveLocalImagePath(imageUrl);

  if (!imagePath) return;

  try {
    doc.image(imagePath, x, y, options);
  } catch {
    return;
  }
};

const addFooter = (doc: PDFKit.PDFDocument, pageNumber: number): void => {
  doc
    .fontSize(8)
    .fillColor("#6b7280")
    .text(`Page ${pageNumber}`, pageMargin, 805, {
      width: contentWidth,
      align: "center",
    });
};

const addSectionTitle = (doc: PDFKit.PDFDocument, title: string): void => {
  doc.moveDown(1.2);
  doc.fontSize(15).fillColor("#111827").text(title);
  doc.moveTo(pageMargin, doc.y + 5).lineTo(547, doc.y + 5).strokeColor("#d1d5db").stroke();
  doc.moveDown(0.8);
};

const addWrappedText = (doc: PDFKit.PDFDocument,text: string | null,fallback = "Not specified."): void => {
  doc
    .fontSize(10)
    .fillColor("#374151")
    .text(text || fallback, { width: contentWidth, lineGap: 3 });
};

const getPrimaryImageUrl = (data: DatasheetData): string | null => {
  const primaryImage = data.product.galleryImages.find((image) =>
    Boolean(image.is_primary)
  );

  return primaryImage?.image_url ?? data.product.main_image_url;
};

export const createProductDatasheetPdf = (data: DatasheetData): PDFKit.PDFDocument => {
  const doc = new PDFDocument({
    size: "A4",
    margin: pageMargin,
    autoFirstPage: true,
    bufferPages: true,
  });

  const product = data.product;
  const generatedDate = data.generatedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  addImageIfAvailable(doc, data.siteSettings.logo_url, pageMargin, 38, {
    fit: [120, 48],
  });

  doc
    .fontSize(9)
    .fillColor("#6b7280")
    .text(`Generated ${generatedDate}`, 380, 42, {
      width: 167,
      align: "right",
    });

  doc.moveDown(3);
  doc.fontSize(24).fillColor("#111827").text(product.datasheet_title || product.name, {
    width: contentWidth,
  });

  if (product.model_number) {
    doc.moveDown(0.3).fontSize(11).fillColor("#4b5563").text(`Model: ${product.model_number}`);
  }

  const metaItems = [
    product.brand?.name ? `Brand: ${product.brand.name}` : null,
    product.category?.name ? `Category: ${product.category.name}` : null,
    product.subcategory?.name ? `Subcategory: ${product.subcategory.name}` : null,
  ].filter(Boolean);

  if (metaItems.length > 0) {
    doc.moveDown(0.4).fontSize(10).fillColor("#4b5563").text(metaItems.join("  |  "));
  }

  const imageY = doc.y + 18;
  addImageIfAvailable(doc, getPrimaryImageUrl(data), pageMargin, imageY, {
    fit: [contentWidth, 210],
    align: "center",
    valign: "center",
  });
  doc.y = imageY + 225;

  addSectionTitle(doc, "Overview");
  addWrappedText(
    doc,
    product.datasheet_description ||
      product.short_description ||
      product.description
  );

  if (product.features.length > 0) {
    addSectionTitle(doc, "Key Features");
    product.features.forEach((feature) => {
      doc
        .fontSize(10)
        .fillColor("#374151")
        .text(`- ${feature.feature_text}`, { width: contentWidth, lineGap: 4 });
    });
  }

  if (product.specifications.length > 0) {
    addSectionTitle(doc, "Specifications");
    product.specifications.forEach((specification, index) => {
      const y = doc.y;
      const fillColor = index % 2 === 0 ? "#f9fafb" : "#ffffff";

      doc.rect(pageMargin, y - 3, contentWidth, 24).fill(fillColor);
      doc
        .fontSize(9)
        .fillColor("#111827")
        .text(specification.specification_name, pageMargin + 8, y + 4, {
          width: 170,
        })
        .fillColor("#374151")
        .text(specification.specification_value, pageMargin + 190, y + 4, {
          width: 285,
        });
      doc.y = y + 26;
    });
  }

  addSectionTitle(doc, "Contact");
  addWrappedText(doc, data.contactSettings.company_name || data.siteSettings.company_name);

  const contactLines = [
    data.contactSettings.address,
    data.contactSettings.phone_primary
      ? `Phone: ${data.contactSettings.phone_primary}`
      : null,
    data.contactSettings.phone_secondary
      ? `Secondary phone: ${data.contactSettings.phone_secondary}`
      : null,
    data.contactSettings.general_email
      ? `Email: ${data.contactSettings.general_email}`
      : null,
    data.contactSettings.working_hours,
  ].filter(Boolean);

  contactLines.forEach((line) => {
    doc.fontSize(9).fillColor("#4b5563").text(String(line), {
      width: contentWidth,
      lineGap: 2,
    });
  });

  const range = doc.bufferedPageRange();

  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    addFooter(doc, index + 1);
  }

  return doc;
};
