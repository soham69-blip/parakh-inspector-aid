export const ANALYTICS_TOTALS = {
  screened: 10000,
  highRisk: 400,
  needsReview: 3400,
  lowRisk: 6200,
  coverage: 86,
};

export const TODAY_METRICS = [
  { label: "Products Screened", value: 1248, delta: "+12.4% vs yesterday" },
  { label: "High Priority", value: 86, delta: "+6 since 09:00" },
  { label: "Needs Review", value: 214, delta: "38 awaiting triage" },
  { label: "Potential Findings", value: 132, delta: "Across 9 categories" },
];

export const RISK_DISTRIBUTION = [
  { band: "0–20", count: 2120 },
  { band: "21–40", count: 2480 },
  { band: "41–60", count: 2600 },
  { band: "61–80", count: 2400 },
  { band: "81–100", count: 400 },
];

export const FINDINGS_BY_CATEGORY = [
  { category: "Net Quantity", count: 1180 },
  { category: "Declaration", count: 940 },
  { category: "Retail Price", count: 610 },
  { category: "Manufacturer", count: 430 },
  { category: "Date of Packing", count: 290 },
  { category: "Consumer Care", count: 190 },
];

export const SCREENING_VOLUME = [
  { month: "Mar", screened: 620, flagged: 41 },
  { month: "Apr", screened: 880, flagged: 58 },
  { month: "May", screened: 1140, flagged: 66 },
  { month: "Jun", screened: 1480, flagged: 74 },
  { month: "Jul", screened: 1860, flagged: 88 },
  { month: "Aug", screened: 2170, flagged: 96 },
  { month: "Sep", screened: 1850, flagged: 77 },
];

export const OUTCOMES = [
  { name: "Finding confirmed", value: 236 },
  { name: "False positive", value: 74 },
  { name: "Manual re-inspection", value: 58 },
  { name: "Pending decision", value: 32 },
];

export const PROTOTYPE_NOTE = "Prototype / Demonstration Data";
