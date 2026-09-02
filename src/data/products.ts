import biscuit from "@/assets/product-biscuit.jpg";
import oil from "@/assets/product-oil.jpg";
import shampoo from "@/assets/product-shampoo.jpg";
import snack from "@/assets/product-snack.jpg";
import household from "@/assets/product-household.jpg";

export type FieldStatus = "detected" | "review" | "missing";

export interface DetectedField {
  key: string;
  label: string;
  value: string;
  status: FieldStatus;
  confidence: number;
  /** Percentage-based overlay box on the product image */
  box: { x: number; y: number; w: number; h: number };
  rule: string;
}

export interface RiskFactor {
  label: string;
  points: number;
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  image: string;
  riskScore: number;
  complianceScore: number;
  status: "High Priority" | "Needs Review" | "Low Risk";
  fields: DetectedField[];
  findings: { title: string; detail: string; rule: string; confidence: number }[];
  riskFactors: RiskFactor[];
  evidenceBox: { x: number; y: number; w: number; h: number };
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "PX-2026-00142",
    name: "FreshPack Glucose Biscuits",
    category: "Packaged Food",
    manufacturer: "ABC Foods Pvt. Ltd., Pune",
    image: biscuit,
    riskScore: 92,
    complianceScore: 78,
    status: "High Priority",
    fields: [
      { key: "mrp", label: "MRP", value: "₹50 (incl. of all taxes)", status: "detected", confidence: 97, box: { x: 39, y: 43, w: 20, h: 9 }, rule: "LM-DEMO-001" },
      { key: "qty", label: "Net Quantity", value: "200 g", status: "detected", confidence: 95, box: { x: 60, y: 43, w: 15, h: 9 }, rule: "LM-DEMO-002" },
      { key: "mfr", label: "Manufacturer", value: "ABC Foods Pvt. Ltd., Pune", status: "detected", confidence: 91, box: { x: 39, y: 53, w: 30, h: 8 }, rule: "LM-DEMO-004" },
      { key: "date", label: "Date of Packing", value: "02/2026", status: "detected", confidence: 89, box: { x: 55, y: 34, w: 14, h: 7 }, rule: "LM-DEMO-005" },
      { key: "decl", label: "Required Declaration", value: "Not reliably identified", status: "review", confidence: 41, box: { x: 38, y: 33, w: 16, h: 9 }, rule: "LM-DEMO-003" },
      { key: "care", label: "Consumer Information", value: "care@abcfoods.example", status: "detected", confidence: 88, box: { x: 60, y: 53, w: 16, h: 8 }, rule: "LM-DEMO-006" },
    ],
    findings: [
      {
        title: "Required declaration could not be reliably identified",
        detail:
          "The mandatory consumer declaration block was not detected with sufficient confidence on the principal display panel.",
        rule: "LM-DEMO-003",
        confidence: 93,
      },
      {
        title: "Net quantity requires physical verification",
        detail:
          "Declared net quantity is legible, but package category is flagged for weight verification during field inspection.",
        rule: "LM-DEMO-002",
        confidence: 81,
      },
    ],
    riskFactors: [
      { label: "Potential missing declaration", points: 30 },
      { label: "Quantity verification", points: 25 },
      { label: "Multiple findings", points: 20 },
      { label: "OCR uncertainty", points: 10 },
      { label: "Historical signal", points: 7 },
    ],
    evidenceBox: { x: 38, y: 33, w: 16, h: 9 },
  },
  {
    id: "PX-2026-00143",
    name: "Sunfield Refined Cooking Oil",
    category: "Edible Oil",
    manufacturer: "Sunfield Agro Ltd., Rajkot",
    image: oil,
    riskScore: 94,
    complianceScore: 71,
    status: "High Priority",
    fields: [
      { key: "mrp", label: "MRP", value: "₹165 (incl. of all taxes)", status: "detected", confidence: 96, box: { x: 45, y: 50, w: 14, h: 6 }, rule: "LM-DEMO-001" },
      { key: "qty", label: "Net Quantity", value: "1 L — unclear print", status: "review", confidence: 52, box: { x: 45, y: 57, w: 14, h: 6 }, rule: "LM-DEMO-002" },
      { key: "mfr", label: "Manufacturer", value: "Sunfield Agro Ltd., Rajkot", status: "detected", confidence: 90, box: { x: 44, y: 44, w: 20, h: 6 }, rule: "LM-DEMO-004" },
      { key: "date", label: "Date of Packing", value: "01/2026", status: "detected", confidence: 87, box: { x: 58, y: 50, w: 10, h: 6 }, rule: "LM-DEMO-005" },
      { key: "decl", label: "Required Declaration", value: "Partially legible", status: "review", confidence: 46, box: { x: 44, y: 37, w: 18, h: 6 }, rule: "LM-DEMO-003" },
      { key: "care", label: "Consumer Information", value: "1800-XXX-XXXX", status: "detected", confidence: 84, box: { x: 46, y: 63, w: 16, h: 5 }, rule: "LM-DEMO-006" },
    ],
    findings: [
      {
        title: "Net quantity declaration is not clearly legible",
        detail:
          "Character contrast on the declared net quantity falls below the legibility threshold used for automated reading.",
        rule: "LM-DEMO-002",
        confidence: 88,
      },
      {
        title: "Required declaration partially legible",
        detail: "Declaration block detected but text could not be fully resolved.",
        rule: "LM-DEMO-003",
        confidence: 79,
      },
    ],
    riskFactors: [
      { label: "Quantity legibility", points: 32 },
      { label: "Declaration uncertainty", points: 26 },
      { label: "Multiple findings", points: 20 },
      { label: "OCR uncertainty", points: 9 },
      { label: "Historical signal", points: 7 },
    ],
    evidenceBox: { x: 45, y: 57, w: 14, h: 6 },
  },
  {
    id: "PX-2026-00144",
    name: "DailyCare Herbal Shampoo",
    category: "Personal Care",
    manufacturer: "DailyCare Consumer Products, Baddi",
    image: shampoo,
    riskScore: 88,
    complianceScore: 82,
    status: "High Priority",
    fields: [
      { key: "mrp", label: "MRP", value: "₹210 (incl. of all taxes)", status: "detected", confidence: 94, box: { x: 45, y: 48, w: 12, h: 5 }, rule: "LM-DEMO-001" },
      { key: "qty", label: "Net Quantity", value: "340 ml", status: "detected", confidence: 92, box: { x: 45, y: 54, w: 12, h: 5 }, rule: "LM-DEMO-002" },
      { key: "mfr", label: "Manufacturer", value: "DailyCare Consumer Products, Baddi", status: "detected", confidence: 88, box: { x: 45, y: 60, w: 16, h: 6 }, rule: "LM-DEMO-004" },
      { key: "date", label: "Date of Manufacture", value: "Not reliably identified", status: "review", confidence: 44, box: { x: 45, y: 66, w: 12, h: 5 }, rule: "LM-DEMO-005" },
      { key: "decl", label: "Required Declaration", value: "Present", status: "detected", confidence: 86, box: { x: 45, y: 42, w: 14, h: 5 }, rule: "LM-DEMO-003" },
      { key: "care", label: "Consumer Information", value: "care@dailycare.example", status: "detected", confidence: 83, box: { x: 45, y: 71, w: 15, h: 5 }, rule: "LM-DEMO-006" },
    ],
    findings: [
      {
        title: "Month and year of manufacture not reliably identified",
        detail:
          "Date block was not resolved with sufficient confidence; verification of printed date required at inspection.",
        rule: "LM-DEMO-005",
        confidence: 84,
      },
    ],
    riskFactors: [
      { label: "Missing date detection", points: 30 },
      { label: "Category risk profile", points: 22 },
      { label: "OCR uncertainty", points: 18 },
      { label: "Historical signal", points: 18 },
    ],
    evidenceBox: { x: 45, y: 66, w: 12, h: 5 },
  },
  {
    id: "PX-2026-00145",
    name: "XYZ Masala Snack Pack",
    category: "Packaged Food",
    manufacturer: "XYZ Snacks India, Indore",
    image: snack,
    riskScore: 97,
    complianceScore: 64,
    status: "High Priority",
    fields: [
      { key: "mrp", label: "MRP", value: "Not detected", status: "missing", confidence: 22, box: { x: 40, y: 32, w: 18, h: 7 }, rule: "LM-DEMO-001" },
      { key: "qty", label: "Net Quantity", value: "80 g", status: "detected", confidence: 93, box: { x: 40, y: 40, w: 14, h: 6 }, rule: "LM-DEMO-002" },
      { key: "mfr", label: "Manufacturer", value: "XYZ Snacks India, Indore", status: "detected", confidence: 90, box: { x: 40, y: 47, w: 22, h: 7 }, rule: "LM-DEMO-004" },
      { key: "date", label: "Date of Packing", value: "12/2025", status: "detected", confidence: 85, box: { x: 56, y: 33, w: 12, h: 6 }, rule: "LM-DEMO-005" },
      { key: "decl", label: "Required Declaration", value: "Not reliably identified", status: "review", confidence: 38, box: { x: 40, y: 55, w: 20, h: 7 }, rule: "LM-DEMO-003" },
      { key: "care", label: "Consumer Information", value: "1800-XXX-XXXX", status: "detected", confidence: 80, box: { x: 40, y: 63, w: 16, h: 6 }, rule: "LM-DEMO-006" },
    ],
    findings: [
      {
        title: "Retail sale price could not be located on the display panel",
        detail:
          "No candidate retail sale price region was detected above the confidence threshold on the submitted image.",
        rule: "LM-DEMO-001",
        confidence: 95,
      },
      {
        title: "Required declaration could not be reliably identified",
        detail: "Declaration block absent or obscured in the captured region.",
        rule: "LM-DEMO-003",
        confidence: 90,
      },
    ],
    riskFactors: [
      { label: "Retail price not detected", points: 38 },
      { label: "Potential missing declaration", points: 27 },
      { label: "Multiple findings", points: 18 },
      { label: "OCR uncertainty", points: 8 },
      { label: "Historical signal", points: 6 },
    ],
    evidenceBox: { x: 40, y: 32, w: 18, h: 7 },
  },
  {
    id: "PX-2026-00146",
    name: "HomeClean Surface Cleaner",
    category: "Household Product",
    manufacturer: "HomeClean Industries, Vapi",
    image: household,
    riskScore: 84,
    complianceScore: 85,
    status: "Needs Review",
    fields: [
      { key: "mrp", label: "MRP", value: "₹99 (incl. of all taxes)", status: "detected", confidence: 95, box: { x: 45, y: 55, w: 12, h: 5 }, rule: "LM-DEMO-001" },
      { key: "qty", label: "Net Quantity", value: "500 ml", status: "detected", confidence: 94, box: { x: 45, y: 60, w: 12, h: 5 }, rule: "LM-DEMO-002" },
      { key: "mfr", label: "Manufacturer", value: "HomeClean Industries, Vapi", status: "detected", confidence: 89, box: { x: 45, y: 65, w: 16, h: 5 }, rule: "LM-DEMO-004" },
      { key: "date", label: "Date of Packing", value: "11/2025", status: "detected", confidence: 86, box: { x: 45, y: 70, w: 11, h: 5 }, rule: "LM-DEMO-005" },
      { key: "decl", label: "Required Declaration", value: "Present", status: "detected", confidence: 82, box: { x: 45, y: 50, w: 14, h: 5 }, rule: "LM-DEMO-003" },
      { key: "care", label: "Consumer Information", value: "Low print contrast", status: "review", confidence: 49, box: { x: 45, y: 75, w: 14, h: 5 }, rule: "LM-DEMO-006" },
    ],
    findings: [
      {
        title: "Consumer care contact has low print contrast",
        detail:
          "Consumer care details were detected but legibility is below the automated reading threshold.",
        rule: "LM-DEMO-006",
        confidence: 76,
      },
    ],
    riskFactors: [
      { label: "Consumer contact legibility", points: 28 },
      { label: "Category risk profile", points: 24 },
      { label: "OCR uncertainty", points: 18 },
      { label: "Historical signal", points: 14 },
    ],
    evidenceBox: { x: 45, y: 75, w: 14, h: 5 },
  },
];

export const PROCESSING_STAGES = [
  "Scanning",
  "Reading label",
  "Extracting fields",
  "Checking rules",
  "Calculating risk",
] as const;

export function getProduct(id: string) {
  return DEMO_PRODUCTS.find((p) => p.id === id);
}
