import { Counter } from "./motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  hint,
  icon,
  accent = "default",
  suffix,
}: {
  label: string;
  value: number;
  hint?: string;
  icon?: ReactNode;
  accent?: "default" | "danger" | "warning" | "success";
  suffix?: string;
}) {
  const accentRing = {
    default: "text-info bg-info-soft",
    danger: "text-destructive bg-destructive-soft",
    warning: "text-warning-foreground bg-warning-soft",
    success: "text-success bg-success-soft",
  }[accent];

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <p className="label-caps">{label}</p>
        {icon && (
          <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md", accentRing)}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-4 text-[34px] font-semibold leading-none text-foreground">
        <Counter to={value} />
        {suffix}
      </p>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
