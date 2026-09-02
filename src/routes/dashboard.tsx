import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, FileSearch, ListChecks, ScanLine } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { MetricCard } from "@/components/parakh/MetricCard";
import { PriorityTable } from "@/components/parakh/PriorityTable";
import { Button } from "@/components/ui/button";
import { RECENT_INSPECTIONS } from "@/data/inspections";
import { FINDINGS_BY_CATEGORY, RISK_DISTRIBUTION } from "@/data/analytics";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Inspector Dashboard — PARAKH AI" },
      {
        name: "description",
        content:
          "Daily screening overview: products screened, high priority products, potential findings and recent inspections.",
      },
      { property: "og:title", content: "Inspector Dashboard — PARAKH AI" },
      {
        property: "og:description",
        content: "Daily legal metrology screening overview and priority workload.",
      },
    ],
  }),
  component: DashboardPage,
});

const chartAxis = { fontSize: 12, fill: "var(--muted-foreground)" };

function DashboardPage() {
  return (
    <DashboardLayout
      title="Overview"
      subtitle="Today · 02 September 2026 · Prototype demonstration data"
      actions={
        <Button asChild size="sm">
          <Link to="/scan">
            <ScanLine className="h-4 w-4" aria-hidden /> Scan product
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Products Screened" value={1248} hint="+12.4% vs yesterday" icon={<ScanLine className="h-4 w-4" />} />
        <MetricCard label="High Priority" value={86} hint="+6 since 09:00" accent="danger" icon={<AlertTriangle className="h-4 w-4" />} />
        <MetricCard label="Needs Review" value={214} hint="38 awaiting triage" accent="warning" icon={<ListChecks className="h-4 w-4" />} />
        <MetricCard label="Potential Findings" value={132} hint="Across 9 categories" accent="success" icon={<FileSearch className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-[17px] font-semibold text-foreground">Risk distribution</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Screened products by preliminary risk band</p>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_DISTRIBUTION} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="band" tickLine={false} axisLine={false} tick={chartAxis} />
                <YAxis tickLine={false} axisLine={false} tick={chartAxis} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Products">
                  {RISK_DISTRIBUTION.map((d) => (
                    <Cell
                      key={d.band}
                      fill={
                        d.band === "81–100"
                          ? "var(--destructive)"
                          : d.band === "61–80"
                            ? "var(--warning)"
                            : "var(--info)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-[17px] font-semibold text-foreground">Potential findings by category</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Declaration type raised during screening</p>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={FINDINGS_BY_CATEGORY}
                layout="vertical"
                margin={{ top: 4, right: 16, bottom: 0, left: 32 }}
              >
                <CartesianGrid stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={chartAxis} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} tick={chartAxis} width={96} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" fill="var(--info)" radius={[0, 4, 4, 0]} name="Findings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="mt-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-foreground">Recent inspections</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Most recent screening results awaiting decision</p>
          </div>
          <Link to="/priority" className="shrink-0 text-[13.5px] font-semibold text-info underline-offset-4 hover:underline">
            Open priority queue →
          </Link>
        </div>
        <div className="mt-4">
          <PriorityTable items={RECENT_INSPECTIONS} />
        </div>
      </section>
    </DashboardLayout>
  );
}
