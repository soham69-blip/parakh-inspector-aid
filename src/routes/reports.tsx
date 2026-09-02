import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { ReportPreview } from "@/components/parakh/ReportPreview";
import { DEMO_PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Inspection Reports — PARAKH AI" },
      {
        name: "description",
        content:
          "Generate a preliminary inspection report with detected information, findings, evidence and the inspector decision.",
      },
      { property: "og:title", content: "Inspection Reports — PARAKH AI" },
      {
        property: "og:description",
        content: "Generate a preliminary inspection report for a screened product.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [id, setId] = useState(DEMO_PRODUCTS[0]!.id);
  const product = DEMO_PRODUCTS.find((p) => p.id === id)!;

  return (
    <DashboardLayout title="Reports" subtitle="Preliminary inspection report generator">
      <div className="flex flex-wrap gap-2 print-hide">
        {DEMO_PRODUCTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setId(p.id)}
            aria-pressed={id === p.id}
            className={cn(
              "rounded-md border px-3 py-2 text-[13px] font-medium transition-colors",
              id === p.id ? "border-info bg-info-soft text-info" : "border-border bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ReportPreview key={id} product={product} />
      </div>
    </DashboardLayout>
  );
}
