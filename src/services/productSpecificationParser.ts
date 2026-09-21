import type { ExtractedProductSpecification, ProductExtractionResult } from "../interfaces/productExtractionInterface.js";

const specificationLabels = [
  "Voltage Range", "Voltage", "Current", "Power", "Frequency", "Accuracy",
  "Capacity", "Weight", "Dimensions", "Length", "Width", "Height",
  "Operating Temperature", "Storage Temperature", "Temperature Range",
  "Measuring Range", "Measurement Range", "Display", "Battery Type", "Battery",
  "Warranty", "Protection Rating", "IP Rating", "Communication", "Interface",
  "Input", "Output", "Resolution", "Response Time", "Operating Humidity", "Material",
] as const;

const specificationLabelMap = new Map(
  specificationLabels.map((label) => [label.toLowerCase(), label]),
);
const unitPattern = /^([±]?(?:\d+(?:\.\d+)?|\.\d+))\s*(mAh|mV|kV|kW|kHz|kg|mg|mm|cm|ms|dB|°C|°F|Ah|mA|Hz|%|V|A|W|g|m|s)$/i;
const sectionHeadings = /^(?:features?|key features?|main features?|highlights?|benefits?|description|product description|overview|introduction|about the product|specifications?|technical specifications?|notes?|warranty|contact|ordering information)$/i;

const normalize = (value: string): string => value.replace(/\s+/g, " ").trim();

const getLabeledValue = (lines: string[], labels: string[]): string | null => {
  const expression = new RegExp(
    `^(?:${labels.map((label) => label.replace(/ /g, "\\s+")).join("|")})\\s*(?::|=|–|—|-)\\s*(.+)$`,
    "i",
  );
  const line = lines.find((candidate) => expression.test(candidate));
  return line ? normalize(line.match(expression)?.[1] ?? "") || null : null;
};

const getSpecification = (line: string): ExtractedProductSpecification | null => {
  const separated = line.match(/^(.+?)\s*(?::|=|–|—|-)\s*(.+)$/);
  const whitespace = line.match(/^(.+?)\s{2,}(.+)$/);
  const namedValue = separated ?? whitespace;
  if (!namedValue) {
    const label = specificationLabels.find((item) => line.toLowerCase().startsWith(`${item.toLowerCase()} `));
    if (!label) return null;
    const value = normalize(line.slice(label.length));
    return value ? toSpecification(label, value) : null;
  }

  const name = normalize(namedValue[1]).toLowerCase();
  const label = specificationLabelMap.get(name);
  return label ? toSpecification(label, normalize(namedValue[2])) : null;
};

const toSpecification = (name: string, rawValue: string): ExtractedProductSpecification => {
  const match = rawValue.match(unitPattern);
  if (!match || !match[1].trim()) return { name, value: rawValue, unit: null };
  return { name, value: match[1].trim(), unit: match[2] };
};

const extractFeatures = (lines: string[]): string[] => {
  const features: string[] = [];
  let active = false;
  for (const line of lines) {
    if (/^(?:features?|key features?|main features?|highlights?|benefits?)$/i.test(line)) {
      active = true;
      continue;
    }
    if (active && sectionHeadings.test(line)) 
      break;
    if (!active) 
      continue;
    const bullet = line.match(/^[•*✓-]\s*(.+)$/);
    if (bullet?.[1]) features.push(normalize(bullet[1]));
  }
  return [...new Set(features)].slice(0, 50);
};

const extractDescription = (lines: string[]): string | null => {
  const start = lines.findIndex((line) => /^(?:description|product description|overview|introduction|about the product)$/i.test(line));
  if (start < 0) return null;
  const paragraph: string[] = [];
  for (const line of lines.slice(start + 1, start + 6)) {
    if (sectionHeadings.test(line) || /^[•*✓-]\s/.test(line)) 
      break;
    paragraph.push(line);
  }
  const description = normalize(paragraph.join(" "));
  return description || null;
};

export const parseProductSpecifications = (text: string): ProductExtractionResult => {
  const lines = text.split("\n").map(normalize).filter(Boolean);
  const specifications = lines
    .map(getSpecification)
    .filter((item): item is ExtractedProductSpecification => item !== null)
    .filter((item, index, all) => all.findIndex((other) => other.name === item.name && other.value === item.value && other.unit === item.unit) === index);

  return {
    productName: getLabeledValue(lines, ["Product Name", "Product"]),
    modelNumber: getLabeledValue(lines, ["Model Number", "Model", "Part Number", "Part No", "Product Code"]),
    brand: getLabeledValue(lines, ["Brand", "Manufacturer"]),
    description: extractDescription(lines),
    features: extractFeatures(lines),
    specifications,
    warnings: specifications.length
      ? []
      : ["No product specifications could be identified in this PDF."],
  };
};
