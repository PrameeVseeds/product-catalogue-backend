import { PDFParse } from "pdf-parse";

const MAX_PAGES_TO_EXTRACT = 100;
const MAX_EXTRACTED_TEXT_LENGTH = 150_000;

export class PdfTextExtractionError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "EMPTY"
      | "PASSWORD_PROTECTED"
      | "NO_TEXT"
      | "INVALID",
  ) {
    super(message);
  }
}

const normalizePdfText = (text: string): string =>
  text
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[\t\f\v ]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, MAX_EXTRACTED_TEXT_LENGTH);

export const extractPdfText = async (buffer: Buffer): Promise<string> => {
  if (buffer.length === 0) {
    throw new PdfTextExtractionError("The PDF file is empty.", "EMPTY");
  }

  let parser: PDFParse | undefined;
  try {
    parser = new PDFParse({ data: new Uint8Array(buffer) });
    const info = await parser.getInfo();
    const pages = Array.from(
      { length: Math.min(info.total, MAX_PAGES_TO_EXTRACT) },
      (_, index) => index + 1,
    );
    const result = await parser.getText({ partial: pages });
    const text = normalizePdfText(result.text);

    if (!text) {
      throw new PdfTextExtractionError(
        "Could not extract readable text from this PDF.",
        "NO_TEXT",
      );
    }

    return text;
  } catch (error) {
    if (error instanceof PdfTextExtractionError) throw error;
    const message =
      error instanceof Error ? error.message : "Unknown PDF parsing error.";
    if (/password|encrypted|permission/i.test(message)) {
      throw new PdfTextExtractionError(
        "This PDF is password protected and cannot be read.",
        "PASSWORD_PROTECTED",
      );
    }
    throw new PdfTextExtractionError("The PDF could not be read.", "INVALID");
  } finally {
    await parser?.destroy();
  }
};
