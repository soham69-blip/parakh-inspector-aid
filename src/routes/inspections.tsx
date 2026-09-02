import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { PriorityTable } from "@/components/parakh/PriorityTable";
import { PRIORITY_QUEUE } from "@/data/inspections";
import { DECISION_LABEL, useSession } from "@/lib/session-store";
import { StatusBadge } from "@/components/parakh/StatusBadge";

export const Route = createFileRoute("/inspections")({
  head: () => ({
    meta: [
      { title: "Inspections — PARAKH AI" },
      {
        name: "description",
        content: "All screened inspections and the decisions recorded in this prototype session.",
      },
      { property: "og:title", content: "Inspections — PARAKH AI" },
      {
        property: "og:description",
        content: "All screened inspections and recorded inspector decisions.",
      },
    ],
  }),
  component: InspectionsPage,
});

function InspectionsPage() {
  const { decisions } = useSession();
  const recorded = Object.entries(decisions);

  return (
    <DashboardLayout title="Inspections" subtitle="All screened products · prototype demonstration data">
      <section className="rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="text-[17px] font-semibold text-foreground">Decisions recorded this session</h2>
        {recorded.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            No inspector decision has been recorded yet. Open any inspection and record a decision to
            see it listed here.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {recorded.map(([id, d]) => (
              <li
                key={id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-surface px-4 py-3"
              >
                <span className="truncate font-mono text-[13px] font-semibold text-foreground">{id}</span>
                <StatusBadge tone={d === "confirmed" ? "danger" : d === "false-positive" ? "success" : "warning"}>
                  {DECISION_LABEL[d]}
                </StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-6">
        <PriorityTable items={PRIORITY_QUEUE} />
      </div>
    </DashboardLayout>
  );
}
