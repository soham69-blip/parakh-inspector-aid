import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { QueueItem } from "@/data/inspections";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const bandTone = { High: "danger", Medium: "warning", Low: "success" } as const;

export function PriorityTable({
  items,
  compact = false,
}: {
  items: QueueItem[];
  compact?: boolean;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card px-6 py-14 text-center">
        <p className="text-sm font-medium text-foreground">No products match these filters</p>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Adjust the risk filter or clear the search to see the full screening queue.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
      <table className="w-full min-w-[840px] border-collapse text-left">
        <caption className="sr-only">AI priority inspection queue</caption>
        <thead>
          <tr className="border-b border-border bg-surface">
            {["Priority", "Product", "Category", "Risk", "Potential finding", "Confidence", "Status", ""].map(
              (h, i) => (
                <th
                  key={h + i}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0 transition-colors hover:bg-surface">
              <td className="px-4 py-3 font-mono text-[13px] font-semibold text-muted-foreground">
                #{String(item.priority).padStart(2, "0")}
              </td>
              <td className="px-4 py-3">
                <p className="text-[14px] font-medium text-foreground">{item.product}</p>
                {!compact && <p className="text-[12px] text-muted-foreground">{item.manufacturer}</p>}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-[13px] text-muted-foreground">{item.category}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-[14px] font-semibold tabular-nums text-foreground">{item.risk}</span>
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted" aria-hidden>
                    <span
                      className={cn(
                        "block h-full rounded-full",
                        item.band === "High" ? "bg-destructive" : item.band === "Medium" ? "bg-warning" : "bg-success",
                      )}
                      style={{ width: `${item.risk}%` }}
                    />
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-[13px] text-muted-foreground">{item.finding}</td>
              <td className="px-4 py-3 text-[13px] tabular-nums text-muted-foreground">{item.confidence}%</td>
              <td className="px-4 py-3">
                <StatusBadge tone={bandTone[item.band]} icon={false}>
                  {item.status}
                </StatusBadge>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to="/inspection/$id"
                  params={{ id: item.id }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[12.5px] font-semibold text-primary transition-colors hover:bg-muted"
                >
                  Review <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
