import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import PDFDocument from "pdfkit";
import type { DatasheetData } from "../interfaces/datasheetInterface.js";
import { uploadsRoot } from "../services/uploadService.js";

const layout = {
  left: 44,
  right: 44,
  top: 40,
  bottom: 48,
  footerHeight: 18,
  sectionGap: 14,
} as const;
const colors = {
  text: "#111827",
  body: "#374151",
  muted: "#6b7280",
  line: "#d1d5db",
  surface: "#f3f4f6",
  alternate: "#f9fafb",
} as const;

const resolveLocalImagePath = (imageUrl: string | null): string | null => {
  if (!imageUrl) return null;
  let publicPath = imageUrl;
  if (/^https?:\/\//i.test(imageUrl)) {
    try {
      publicPath = new URL(imageUrl).pathname;
    } catch {
      console.warn(`Datasheet image URL is invalid: ${imageUrl}`);
      return null;
    }
  }
  const normalized = publicPath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized.startsWith("uploads/")) {
    console.warn(`Datasheet image path is outside uploads: ${imageUrl}`);
    return null;
  }
  const imagePath = path.resolve(
    uploadsRoot,
    normalized.slice("uploads/".length),
  );
  const insideUploads = imagePath.startsWith(`${uploadsRoot}${path.sep}`);
  if (!insideUploads || !fs.existsSync(imagePath)) {
    console.warn(`Datasheet image file was not found for: ${imageUrl}`);
    return null;
  }
  return imagePath;
};

// The main product image is the canonical image shown in the catalogue. A
// gallery primary is only a fallback, as it may refer to an image that was
// subsequently removed while the main image is still valid.
const getPrimaryImageUrl = (data: DatasheetData): string | null =>
  data.product.mainImageUrl ??
  data.product.galleryImages.find((image) => image.isPrimary)?.imageUrl ??
  data.product.galleryImages[0]?.imageUrl ??
  null;

/** PDFKit supports PNG and JPEG but not WebP, which is used by new uploads. */
const getPdfCompatibleImage = async (
  imagePath: string,
): Promise<string | Buffer | null> => {
  if (path.extname(imagePath).toLowerCase() !== ".webp") return imagePath;

  try {
    const source = await loadImage(fs.readFileSync(imagePath));
    if (!source.width || !source.height) return null;

    const canvas = createCanvas(source.width, source.height);
    canvas.getContext("2d").drawImage(source, 0, 0);
    return canvas.toBuffer("image/png");
  } catch (error) {
    console.warn("Datasheet WebP image could not be converted.", error);
    return null;
  }
};

const getProductModels = (modelNumber: string | null): string[] =>
  (modelNumber ?? "")
    .split(/\r?\n|,/)
    .map((model) => model.trim())
    .filter(Boolean);

export const createProductDatasheetPdf = async (
  data: DatasheetData,
): Promise<PDFKit.PDFDocument> => {
  const doc = new PDFDocument({
    size: "A4",
    margins: {
      top: layout.top,
      right: layout.right,
      bottom: layout.bottom,
      left: layout.left,
    },
    bufferPages: true,
  });
  const pageWidth = doc.page.width,
    pageHeight = doc.page.height;
  const contentWidth = pageWidth - layout.left - layout.right;
  const bodyBottom = pageHeight - layout.bottom - layout.footerHeight;
  let currentY: number = layout.top;

  const addPage = () => {
    doc.addPage();
    currentY = layout.top;
  };
  const ensureSpace = (height: number) => {
    if (currentY + height > bodyBottom) addPage();
  };
  const textHeight = (
    text: string,
    width: number,
    size: number,
    bold = false,
    lineGap = 2,
  ) => {
    doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(size);
    return doc.heightOfString(text, { width, lineGap });
  };
  const drawText = (
    text: string,
    x: number,
    width: number,
    size = 10,
    bold = false,
    color: string = colors.body,
    lineGap = 2,
  ) => {
    doc
      .font(bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(size)
      .fillColor(color)
      .text(text, x, currentY, { width, lineGap });
    currentY = doc.y;
  };
  const drawSectionTitle = (title: string) => {
    ensureSpace(36);
    if (currentY > layout.top) currentY += layout.sectionGap;
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(colors.text)
      .text(title.toUpperCase(), layout.left, currentY, {
        width: contentWidth,
        lineBreak: false,
      });
    currentY = doc.y + 5;
    doc
      .moveTo(layout.left, currentY)
      .lineTo(pageWidth - layout.right, currentY)
      .strokeColor(colors.line)
      .lineWidth(0.7)
      .stroke();
    currentY += 9;
  };

  const generatedDate = data.generatedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const logoPath = resolveLocalImagePath(data.siteSettings.logo_url);
  if (logoPath) {
    try {
      doc.image(logoPath, layout.left, currentY, {
        fit: [115, 42],
        valign: "center",
      });
    } catch (error) {
      console.warn("Datasheet company logo could not be rendered.", error);
    }
  }
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(colors.text)
    .text("PRODUCT DATASHEET", pageWidth - layout.right - 180, currentY, {
      width: 180,
      align: "right",
    });
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(colors.muted)
    .text(
      `Generated ${generatedDate}`,
      pageWidth - layout.right - 180,
      currentY + 20,
      { width: 180, align: "right" },
    );
  currentY += 54;
  doc
    .moveTo(layout.left, currentY)
    .lineTo(pageWidth - layout.right, currentY)
    .strokeColor(colors.line)
    .lineWidth(0.8)
    .stroke();
  currentY += 18;

  const product = data.product;
  const models = getProductModels(product.modelNumber);
  const hasSelectedModel = Boolean(data.selectedModel);
  const productImagePath = resolveLocalImagePath(getPrimaryImageUrl(data));
  const productImage = productImagePath
    ? await getPdfCompatibleImage(productImagePath)
    : null;
  const heroGap = 20;
  const imageWidth = productImage ? contentWidth * 0.36 : 0;
  const infoX = layout.left + (productImage ? imageWidth + heroGap : 0);
  const infoWidth =
    contentWidth - (productImage ? imageWidth + heroGap : 0);
  const titleBase = product.datasheetTitle || product.name;
  const title = hasSelectedModel
    ? `${titleBase} - ${models[0]}`
    : titleBase;
  const metaLines = [
    hasSelectedModel ? `Model: ${models[0]}` : null,
    product.category?.name ? `Category: ${product.category.name}` : null,
    product.brand?.name ? `Brand: ${product.brand.name}` : null,
    product.subcategory?.name
      ? `Subcategory: ${product.subcategory.name}`
      : null,
  ].filter((line): line is string => Boolean(line));
  const titleHeight = textHeight(title, infoWidth, 23, true, 1.5);
  const metaHeight = metaLines.reduce(
    (total, line) => total + textHeight(line, infoWidth, 9.5, false, 1),
    0,
  );
  const heroHeight = Math.max(
    productImage ? 145 : 0,
    titleHeight + (metaLines.length ? 10 + metaHeight : 0),
  );
  ensureSpace(heroHeight);
  const heroY = currentY;
  if (productImage) {
    try {
      doc.image(productImage, layout.left, heroY, {
        fit: [imageWidth, 145],
        align: "center",
        valign: "center",
      });
    } catch (error) {
      console.warn("Datasheet product image could not be rendered.", error);
    }
  }
  currentY = heroY;
  drawText(title, infoX, infoWidth, 23, true, colors.text, 1.5);
  if (metaLines.length) {
    currentY += 9;
    for (const line of metaLines) {
      drawText(line, infoX, infoWidth, 9.5, false, colors.muted, 1);
      currentY += 2;
    }
  }
  currentY = heroY + heroHeight;

  const overview =
    product.datasheetDescription ||
    product.shortDescription ||
    product.description;
  if (overview) {
    drawSectionTitle("Overview");
    ensureSpace(Math.min(textHeight(overview, contentWidth, 10, false, 3), 80));
    drawText(overview, layout.left, contentWidth, 10, false, colors.body, 3);
  }

  if (!hasSelectedModel && models.length) {
    drawSectionTitle("Models");
    const modelColumnCount = 4;
    const modelColumnWidth = contentWidth / modelColumnCount;
    const headerHeight = 25;
    const drawModelsTableHeader = (continued = false) => {
      if (continued) drawSectionTitle("Models (continued)");
      ensureSpace(headerHeight);
      doc.rect(layout.left, currentY, contentWidth, headerHeight).fill(colors.surface);
      doc
        .font("Helvetica-Bold");
      //   .fontSize(9)
      //   .fillColor(colors.text)
      //   .text("Models", layout.left + 8, currentY + 7, {
      //     width: modelColumnWidth - 16,
      //     lineBreak: false,
      //   });
      // currentY += headerHeight;
    };
    drawModelsTableHeader();
    for (let start = 0; start < models.length; start += modelColumnCount) {
      const rowModels = models.slice(start, start + modelColumnCount);
      const rowHeight = Math.max(
        25,
        ...rowModels.map(
          (model) =>
            textHeight(model, modelColumnWidth - 16, 9, false, 2) + 14,
        ),
      );
      if (currentY + rowHeight > bodyBottom) {
        addPage();
        drawModelsTableHeader(true);
      }
      for (let column = 0; column < modelColumnCount; column += 1) {
        const x = layout.left + column * modelColumnWidth;
        const model = rowModels[column];
        doc
          .rect(x, currentY, modelColumnWidth, rowHeight)
          .fill(Math.floor(start / modelColumnCount) % 2 === 0 ? colors.alternate : "#ffffff");
        doc
          .rect(x, currentY, modelColumnWidth, rowHeight)
          .strokeColor(colors.line)
          .lineWidth(0.5)
          .stroke();
        if (model) {
          doc
            .font("Helvetica")
            .fontSize(9)
            .fillColor(colors.body)
            .text(model, x + 8, currentY + 7, {
              width: modelColumnWidth - 16,
              lineGap: 2,
            });
        }
      }
      currentY += rowHeight;
    }
  }

  if (product.features.length) {
    drawSectionTitle(!hasSelectedModel && models.length ? "Features" : "Key Features");
    for (const feature of product.features) {
      const bulletWidth = 12,
        featureWidth = contentWidth - bulletWidth;
      const height =
        textHeight(feature.featureText, featureWidth, 9.5, false, 2) + 5;
      ensureSpace(height);
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(colors.text)
        .text("•", layout.left, currentY, {
          width: bulletWidth,
          lineBreak: false,
        });
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor(colors.body)
        .text(feature.featureText, layout.left + bulletWidth, currentY, {
          width: featureWidth,
          lineGap: 2,
        });
      currentY = doc.y + 5;
    }
  }

  if (product.specifications.length) {
    const nameWidth = contentWidth * 0.35,
      valueWidth = contentWidth - nameWidth;
    const headerHeight = 25;
    const drawTableHeader = (continued = false) => {
      drawSectionTitle(
        continued ? "Specifications (continued)" : "Specifications",
      );
      ensureSpace(headerHeight);
      doc
        .rect(layout.left, currentY, contentWidth, headerHeight)
        .fill(colors.surface);
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(colors.text)
        .text("Specification", layout.left + 8, currentY + 7, {
          width: nameWidth - 16,
          lineBreak: false,
        });
      doc.text("Value", layout.left + nameWidth + 8, currentY + 7, {
        width: valueWidth - 16,
        lineBreak: false,
      });
      currentY += headerHeight;
    };
    drawTableHeader();
    product.specifications.forEach((specification, index) => {
      const nameHeight = textHeight(
        specification.specificationName,
        nameWidth - 16,
        9,
        true,
        2,
      );
      const valueHeight = textHeight(
        specification.specificationValue,
        valueWidth - 16,
        9,
        false,
        2,
      );
      const rowHeight = Math.max(nameHeight, valueHeight) + 14;
      if (currentY + rowHeight > bodyBottom) {
        addPage();
        drawTableHeader(true);
      }
      doc
        .rect(layout.left, currentY, contentWidth, rowHeight)
        .fill(index % 2 === 0 ? colors.alternate : "#ffffff");
      doc
        .moveTo(layout.left + nameWidth, currentY)
        .lineTo(layout.left + nameWidth, currentY + rowHeight)
        .strokeColor(colors.line)
        .lineWidth(0.5)
        .stroke();
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(colors.text)
        .text(specification.specificationName, layout.left + 8, currentY + 7, {
          width: nameWidth - 16,
          lineGap: 2,
        });
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(colors.body)
        .text(
          specification.specificationValue,
          layout.left + nameWidth + 8,
          currentY + 7,
          { width: valueWidth - 16, lineGap: 2 },
        );
      currentY += rowHeight;
    });
  }

  const contactLines = [
    data.contactSettings.company_name || data.siteSettings.company_name,
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
  ].filter((line): line is string => Boolean(line));
  if (contactLines.length) {
    drawSectionTitle("Contact");
    for (const [index, line] of contactLines.entries()) {
      const height =
        textHeight(
          line,
          contentWidth,
          index === 0 ? 10 : 8.5,
          index === 0,
          1.5,
        ) + 3;
      ensureSpace(height);
      drawText(
        line,
        layout.left,
        contentWidth,
        index === 0 ? 10 : 8.5,
        index === 0,
        index === 0 ? colors.text : colors.muted,
        1.5,
      );
      currentY += 2;
    }
  }

  const range = doc.bufferedPageRange();
  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    const originalBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 12;
    const footerY = doc.page.height - 28;
    doc
      .moveTo(layout.left, footerY - 5)
      .lineTo(doc.page.width - layout.right, footerY - 5)
      .strokeColor(colors.line)
      .lineWidth(0.5)
      .stroke();
    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(colors.muted)
      .text(
        `${data.siteSettings.company_name} • Product Datasheet`,
        layout.left,
        footerY,
        { width: contentWidth * 0.72, lineBreak: false },
      );
    doc.text(`Page ${index + 1}`, layout.left + contentWidth * 0.72, footerY, {
      width: contentWidth * 0.28,
      align: "right",
      lineBreak: false,
    });
    doc.page.margins.bottom = originalBottom;
  }
  return doc;
};
