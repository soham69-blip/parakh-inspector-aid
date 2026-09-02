import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { RULES, RULE_DISCLAIMER, type Severity } from "@/data/rules";
import { StatusBadge } from "@/components/parakh/StatusBadge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Compliance Rule Library — PARAKH AI" },
      {
        name: "description",
        content:
          "Versioned prototype rule library used for preliminary legal metrology label screening.",
      },
      { property: "og:title", content: "Compliance Rule Library — PARAKH AI" },
      {
        property: "og:description",
        content: "Versioned prototype rule set used for label screening.",
      },
    ],
  }),
  component: RulesPage,
});

const tone = { High: "danger", Medium: "warning", Low: "success" } as const;
const FILTERS: (Severity | "All")[] = ["All", "High", "Medium", "Low"];

function RulesPage() {
  const [severity, setSeverity] = useState<Severity | "All">("All");
  const rules = RULES.filter((r) => severity === "All" || r.severity === severity);

  return (
    <DashboardLayout
      title="Compliance Rule Library"
      subtitle="Deterministic checks applied during preliminary screening"
    >
      <div className="rounded-md border border-saffron/30 bg-saffron-soft px-4 py-3">
        <p className="text-[13px] leading-relaxed text-foreground">{RULE_DISCLAIMER}</p>
      </div>

      <div className="mt-5 flex gap-1 rounded-md border border-border bg-card p-1" role="group" aria-label="Severity filter">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setSeverity(f)}
            aria-pressed={severity === f}
            className={cn(
              "rounded px-3 py-1.5 text-[13px] font-medium transition-colors",
              severity === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card shadow-card">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <caption className="sr-only">Prototype compliance rule library</caption>
          <thead>
            <tr className="border-b border-border bg-surface">
              {["Rule ID", "Requirement", "Category", "Validation", "Severity", "Version", "Source"].map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 transition-colors hover:bg-surface">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-semibold text-info">{r.id}</td>
                <td className="px-4 py-3">
                  <p className="text-[14px] font-medium text-foreground">{r.requirement}</p>
                  <p className="max-w-[420px] text-[12.5px] text-muted-foreground">{r.description}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] text-muted-foreground">{r.category}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] text-muted-foreground">{r.validation}</td>
                <td className="px-4 py-3">
                  <StatusBadge tone={tone[r.severity]} icon={false}>{r.severity}</StatusBadge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] tabular-nums text-muted-foreground">{r.version}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[13px] text-muted-foreground">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
