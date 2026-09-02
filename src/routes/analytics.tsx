import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { MetricCard } from "@/components/parakh/MetricCard";
import {
  ANALYTICS_TOTALS,
  FINDINGS_BY_CATEGORY,
  OUTCOMES,
  PROTOTYPE_NOTE,
  RISK_DISTRIBUTION,
  SCREENING_VOLUME,
} from "@/data/analytics";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Screening Analytics — PARAKH AI" },
      {
        name: "description",
        content:
          "Risk distribution, potential findings by category, screening volume and inspection outcomes across the prototype dataset.",
      },
      { property: "og:title", content: "Screening Analytics — PARAKH AI" },
      {
        property: "og:description",
        content: "Risk distribution, findings, volume and outcomes across the prototype dataset.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const axis = { fontSize: 12, fill: "var(--muted-foreground)" };
const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 13,
};
const PIE_COLORS = ["var(--destructive)", "var(--success)", "var(--warning)", "var(--info)"];

function Panel({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h2 className="text-[17px] font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p>
      <div className="mt-5 h-[280px]">{children}</div>
    </section>
  );
}

function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle={`Screening performance · ${PROTOTYPE_NOTE}`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Products Screened" value={ANALYTICS_TOTALS.screened} hint="Cumulative prototype dataset" />
        <MetricCard label="High Risk" value={ANALYTICS_TOTALS.highRisk} accent="danger" hint="Risk band 81–100" />
        <MetricCard label="Needs Review" value={ANALYTICS_TOTALS.needsReview} accent="warning" hint="Risk band 41–80" />
        <MetricCard label="Low Risk" value={ANALYTICS_TOTALS.lowRisk} accent="success" hint="Risk band 0–40" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Panel title="Risk distribution" hint="Screened products by preliminary risk band">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RISK_DISTRIBUTION} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="band" tickLine={false} axisLine={false} tick={axis} />
              <YAxis tickLine={false} axisLine={false} tick={axis} />
              <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Products">
                {RISK_DISTRIBUTION.map((d) => (
                  <Cell
                    key={d.band}
                    fill={d.band === "81–100" ? "var(--destructive)" : d.band === "61–80" ? "var(--warning)" : "var(--info)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Potential findings by category" hint="Declaration type raised during screening">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FINDINGS_BY_CATEGORY} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 32 }}>
              <CartesianGrid stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={axis} />
              <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} tick={axis} width={96} />
              <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="var(--info)" radius={[0, 4, 4, 0]} name="Findings" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Screening volume" hint="Products screened and products flagged per month">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SCREENING_VOLUME} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--info)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--info)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axis} />
              <YAxis tickLine={false} axisLine={false} tick={axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="screened" stroke="var(--info)" fill="url(#vol)" strokeWidth={2} name="Screened" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Inspection outcome" hint="Inspector determinations across reviewed findings">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={OUTCOMES} dataKey="value" nameKey="name" innerRadius={62} outerRadius={98} paddingAngle={2}>
                {OUTCOMES.map((o, i) => (
                  <Cell key={o.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12.5 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <section className="mt-5 rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="text-[17px] font-semibold text-foreground">Flagged rate trend</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">Products flagged for review per month</p>
        <div className="mt-5 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SCREENING_VOLUME} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axis} />
              <YAxis tickLine={false} axisLine={false} tick={axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="flagged" stroke="var(--saffron)" strokeWidth={2.2} dot={false} name="Flagged" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <p className="mt-5 text-[12.5px] text-muted-foreground">
        {PROTOTYPE_NOTE}. Figures are illustrative and do not represent any official inspection record.
      </p>
    </DashboardLayout>
  );
}
