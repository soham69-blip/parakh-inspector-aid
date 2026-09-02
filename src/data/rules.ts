export type Severity = "High" | "Medium" | "Low";

export interface ComplianceRule {
  id: string;
  requirement: string;
  category: string;
  validation: string;
  severity: Severity;
  version: string;
  source: string;
  description: string;
}

export const RULES: ComplianceRule[] = [
  {
    id: "LM-DEMO-001",
    requirement: "Retail Sale Price (MRP) Declaration",
    category: "Packaged Goods",
    validation: "Required Field",
    severity: "High",
    version: "v1.4",
    source: "Prototype rule set",
    description:
      "Retail sale price must be printed on the principal display panel, inclusive of all taxes, prefixed with an unambiguous currency indication.",
  },
  {
    id: "LM-DEMO-002",
    requirement: "Net Quantity Declaration",
    category: "Packaged Goods",
    validation: "Required Field",
    severity: "High",
    version: "v1.4",
    source: "Prototype rule set",
    description:
      "Net quantity must be declared in standard units of weight, measure or number and must be legible against the background.",
  },
  {
    id: "LM-DEMO-003",
    requirement: "Required Consumer Declaration",
    category: "Packaged Goods",
    validation: "Detection",
    severity: "Medium",
    version: "v1.2",
    source: "Prototype rule set",
    description:
      "Mandatory consumer declaration block must be present and reliably readable. Low detection confidence is escalated for inspector review.",
  },
  {
    id: "LM-DEMO-004",
    requirement: "Manufacturer / Packer Identity & Address",
    category: "Packaged Goods",
    validation: "Required Field",
    severity: "High",
    version: "v1.3",
    source: "Prototype rule set",
    description:
      "Name and complete address of the manufacturer, packer or importer must appear on the label.",
  },
  {
    id: "LM-DEMO-005",
    requirement: "Month & Year of Manufacture / Packing",
    category: "Packaged Goods",
    validation: "Required Field",
    severity: "Medium",
    version: "v1.1",
    source: "Prototype rule set",
    description:
      "Date of manufacture, packing or import must be declared in a readable, unambiguous format.",
  },
  {
    id: "LM-DEMO-006",
    requirement: "Consumer Care Contact",
    category: "Packaged Goods",
    validation: "Required Field",
    severity: "Medium",
    version: "v1.1",
    source: "Prototype rule set",
    description:
      "A consumer care contact — telephone, email or postal address — must be provided for complaint redressal.",
  },
  {
    id: "LM-DEMO-007",
    requirement: "Minimum Character Height",
    category: "Label Legibility",
    validation: "Measurement",
    severity: "Medium",
    version: "v1.0",
    source: "Prototype rule set",
    description:
      "Declared information must meet minimum printed character height relative to the principal display panel area.",
  },
  {
    id: "LM-DEMO-008",
    requirement: "Unit Sale Price Consistency",
    category: "Pricing",
    validation: "Cross-check",
    severity: "Low",
    version: "v1.0",
    source: "Prototype rule set",
    description:
      "Declared unit sale price must be arithmetically consistent with retail sale price and declared net quantity.",
  },
  {
    id: "LM-DEMO-009",
    requirement: "Standard Package Size",
    category: "Packaged Goods",
    validation: "Cross-check",
    severity: "Low",
    version: "v1.0",
    source: "Prototype rule set",
    description:
      "Certain commodity categories may only be packed in prescribed standard quantities.",
  },
  {
    id: "LM-DEMO-010",
    requirement: "Country of Origin (Imported Packages)",
    category: "Imported Goods",
    validation: "Conditional Field",
    severity: "Medium",
    version: "v1.0",
    source: "Prototype rule set",
    description:
      "Imported pre-packaged commodities must declare the country of origin on the label.",
  },
];

export const RULE_DISCLAIMER =
  "Prototype rule set for demonstration. Production deployment requires validation and approval against current authoritative regulations.";
