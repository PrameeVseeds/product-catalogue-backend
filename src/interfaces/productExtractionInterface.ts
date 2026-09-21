export interface ExtractedProductSpecification {
  name: string;
  value: string;
  unit: string | null;
}

export interface ProductExtractionResult {
  productName: string | null;
  modelNumber: string | null;
  brand: string | null;
  description: string | null;
  features: string[];
  specifications: ExtractedProductSpecification[];
  warnings: string[];
}
