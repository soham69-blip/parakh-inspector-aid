import { AlertTriangle, Check, X } from "lucide-react";
import type { DetectedField } from "@/data/products";
import { cn } from "@/lib/utils";

const map = {
  detected: { icon: Check, cls: "text-success bg-success-soft", text: "Detected" },
  review: { icon: AlertTriangle, cls: "text-warning-foreground bg-warning-soft", text: "Review" },
  missing: { icon: X, cls: "text-destructive bg-destructive-soft", text: "Not detected" },
} as const;

export function ComplianceChecklist({ fields }: { fields: DetectedField[] }) {
  return (
    <ul className="divide-y divide-border">
      {fields.map((f) => {
        const m = map[f.status];
        const Icon = m.icon;
        return (
          <li key={f.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-foreground">{f.label}</p>
              <p className="truncate text-[12.5px] text-muted-foreground">{f.value}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden text-[11px] font-medium tabular-nums text-muted-foreground sm:inline">
                {f.confidence}%
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.05em]",
                  m.cls,
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {m.text}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
