export type RiskBand = "High" | "Medium" | "Low";
export type InspectionStatus = "Needs Review" | "Inspector Assigned" | "Pending Triage" | "Closed";

export interface QueueItem {
  priority: number;
  id: string;
  product: string;
  category: string;
  manufacturer: string;
  risk: number;
  band: RiskBand;
  finding: string;
  confidence: number;
  status: InspectionStatus;
  screenedOn: string;
}

const band = (risk: number): RiskBand => (risk >= 80 ? "High" : risk >= 55 ? "Medium" : "Low");

const raw: Omit<QueueItem, "priority" | "band">[] = [
  { id: "PX-2026-00145", product: "XYZ Masala Snack Pack", category: "Packaged Food", manufacturer: "XYZ Snacks India, Indore", risk: 97, finding: "Retail price not detected", confidence: 95, status: "Needs Review", screenedOn: "02 Sep 2026" },
  { id: "PX-2026-00143", product: "Sunfield Refined Cooking Oil", category: "Edible Oil", manufacturer: "Sunfield Agro Ltd., Rajkot", risk: 94, finding: "Net quantity legibility", confidence: 88, status: "Needs Review", screenedOn: "02 Sep 2026" },
  { id: "PX-2026-00142", product: "FreshPack Glucose Biscuits", category: "Packaged Food", manufacturer: "ABC Foods Pvt. Ltd., Pune", risk: 92, finding: "Declaration requires review", confidence: 93, status: "Needs Review", screenedOn: "02 Sep 2026" },
  { id: "PX-2026-00144", product: "DailyCare Herbal Shampoo", category: "Personal Care", manufacturer: "DailyCare Consumer Products, Baddi", risk: 88, finding: "Date of manufacture unclear", confidence: 84, status: "Inspector Assigned", screenedOn: "02 Sep 2026" },
  { id: "PX-2026-00146", product: "HomeClean Surface Cleaner", category: "Household Product", manufacturer: "HomeClean Industries, Vapi", risk: 84, finding: "Consumer contact legibility", confidence: 76, status: "Needs Review", screenedOn: "01 Sep 2026" },
  { id: "PX-2026-00147", product: "Grainwell Atta 5 kg", category: "Staples", manufacturer: "Grainwell Mills, Ludhiana", risk: 79, finding: "Quantity verification advised", confidence: 74, status: "Pending Triage", screenedOn: "01 Sep 2026" },
  { id: "PX-2026-00148", product: "Nutriva Protein Mix", category: "Health Supplement", manufacturer: "Nutriva Labs, Hyderabad", risk: 73, finding: "Unit price inconsistency", confidence: 71, status: "Pending Triage", screenedOn: "01 Sep 2026" },
  { id: "PX-2026-00149", product: "Everfresh Toilet Soap", category: "Personal Care", manufacturer: "Everfresh Consumer, Kanpur", risk: 68, finding: "Character height below threshold", confidence: 69, status: "Pending Triage", screenedOn: "01 Sep 2026" },
  { id: "PX-2026-00150", product: "Amrit Tea Leaves 250 g", category: "Beverages", manufacturer: "Amrit Tea Estates, Siliguri", risk: 61, finding: "Address block partially read", confidence: 66, status: "Pending Triage", screenedOn: "31 Aug 2026" },
  { id: "PX-2026-00151", product: "Kisan Mustard Oil 1 L", category: "Edible Oil", manufacturer: "Kisan Oils, Alwar", risk: 57, finding: "Date format ambiguous", confidence: 63, status: "Pending Triage", screenedOn: "31 Aug 2026" },
  { id: "PX-2026-00152", product: "Sparkle Dishwash Gel", category: "Household Product", manufacturer: "Sparkle Care, Vapi", risk: 48, finding: "No potential finding", confidence: 92, status: "Closed", screenedOn: "31 Aug 2026" },
  { id: "PX-2026-00153", product: "Morning Oats 1 kg", category: "Packaged Food", manufacturer: "Morning Foods, Nashik", risk: 42, finding: "No potential finding", confidence: 94, status: "Closed", screenedOn: "30 Aug 2026" },
  { id: "PX-2026-00154", product: "Bright Detergent Powder", category: "Household Product", manufacturer: "Bright Home, Surat", risk: 36, finding: "No potential finding", confidence: 95, status: "Closed", screenedOn: "30 Aug 2026" },
  { id: "PX-2026-00155", product: "Pure Honey 500 g", category: "Packaged Food", manufacturer: "Pure Apiaries, Dehradun", risk: 29, finding: "No potential finding", confidence: 96, status: "Closed", screenedOn: "30 Aug 2026" },
];

export const PRIORITY_QUEUE: QueueItem[] = raw
  .sort((a, b) => b.risk - a.risk)
  .map((item, index) => ({ ...item, priority: index + 1, band: band(item.risk) }));

export const RECENT_INSPECTIONS = PRIORITY_QUEUE.slice(0, 8);

export const BATCH_PRODUCT_NAMES = [
  "FreshPack Glucose Biscuits", "Sunfield Refined Cooking Oil", "DailyCare Herbal Shampoo",
  "XYZ Masala Snack Pack", "HomeClean Surface Cleaner", "Grainwell Atta 5 kg",
  "Nutriva Protein Mix", "Everfresh Toilet Soap", "Amrit Tea Leaves 250 g",
  "Kisan Mustard Oil 1 L", "Sparkle Dishwash Gel", "Morning Oats 1 kg",
];

export const HITL_STEPS = [
  { title: "AI Screening", detail: "Every submitted package image is screened against the active rule set." },
  { title: "Potential Finding", detail: "Uncertain or non-conforming fields are raised as potential findings with evidence." },
  { title: "Inspector Review", detail: "A qualified inspector opens the case with cropped evidence and rule references." },
  { title: "Confirm / Reject", detail: "The inspector records the determination. The platform never decides." },
  { title: "Feedback", detail: "Decisions are captured as labelled outcomes for the screening model." },
  { title: "Model Improvement", detail: "Future screening thresholds are re-tuned from inspector feedback." },
];

export const HOW_IT_WORKS = [
  { n: "01", title: "Scan", detail: "Product image captured in the field or uploaded from a batch." },
  { n: "02", title: "Read", detail: "OCR and computer vision extract declared label information." },
  { n: "03", title: "Verify", detail: "Applicable compliance rules are checked field by field." },
  { n: "04", title: "Explain", detail: "Potential findings are supported with cropped visual evidence." },
  { n: "05", title: "Prioritize", detail: "Products receive a preliminary risk score and queue position." },
  { n: "06", title: "Review", detail: "The inspector makes the final determination on every case." },
];
