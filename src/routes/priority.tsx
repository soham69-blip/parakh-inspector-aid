import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { PriorityTable } from "@/components/parakh/PriorityTable";
import { PRIORITY_QUEUE, type RiskBand } from "@/data/inspections";
import { useSession } from "@/lib/session-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/priority")({
  head: () => ({
    meta: [
      { title: "AI Priority Inspection Queue — PARAKH AI" },
      {
        name: "description",
        content: "Packaged products ranked by preliminary inspection risk for inspector review.",
      },
      { property: "og:title", content: "AI Priority Inspection Queue — PARAKH AI" },
      {
        property: "og:description",
        content: "Products ranked by preliminary inspection risk.",
      },
    ],
  }),
  component: PriorityPage,
});

const FILTERS: (RiskBand | "All")[] = ["All", "High", "Medium", "Low"];

function PriorityPage() {
  const [filter, setFilter] = useState<RiskBand | "All">("All");
  const [query, setQuery] = useState("");
  const { pinnedTop } = useSession();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = [...PRIORITY_QUEUE].sort((a, b) => {
      if (pinnedTop === a.id) return -1;
      if (pinnedTop === b.id) return 1;
      return b.risk - a.risk;
    });
    return base
      .map((item, i) => ({ ...item, priority: i + 1 }))
      .filter((i) => (filter === "All" ? true : i.band === filter))
      .filter((i) => !q || i.product.toLowerCase().includes(q) || i.manufacturer.toLowerCase().includes(q));
  }, [filter, query, pinnedTop]);

  return (
    <DashboardLayout
      title="AI Priority Inspection Queue"
      subtitle="Products ranked by preliminary inspection risk"
    >
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div className="flex gap-1 rounded-md border border-border bg-card p-1" role="group" aria-label="Risk filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded px-3 py-1.5 text-[13px] font-medium transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product / manufacturer"
            aria-label="Search product or manufacturer"
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <p className="mt-4 text-[13px] text-muted-foreground">
        {items.length} of {PRIORITY_QUEUE.length} screened products shown · prototype demonstration data
      </p>

      <div className="mt-3">
        <PriorityTable items={items} />
      </div>
    </DashboardLayout>
  );
}
