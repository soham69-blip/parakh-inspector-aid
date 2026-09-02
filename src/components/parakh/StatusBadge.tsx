import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, CircleAlert, CircleDashed } from "lucide-react";
import type { ReactNode } from "react";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const toneMap: Record<Tone, string> = {
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning-foreground border-warning/40",
  danger: "bg-destructive-soft text-destructive border-destructive/25",
  info: "bg-info-soft text-info border-info/25",
  neutral: "bg-muted text-muted-foreground border-border",
};

const iconMap: Record<Tone, ReactNode> = {
  success: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />,
  warning: <AlertTriangle className="h-3.5 w-3.5" aria-hidden />,
  danger: <CircleAlert className="h-3.5 w-3.5" aria-hidden />,
  info: <CircleDashed className="h-3.5 w-3.5" aria-hidden />,
  neutral: <CircleDashed className="h-3.5 w-3.5" aria-hidden />,
};

export function StatusBadge({
  tone = "neutral",
  children,
  icon = true,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]",
        toneMap[tone],
        className,
      )}
    >
      {icon && iconMap[tone]}
      {children}
    </span>
  );
}

export function riskTone(risk: number): Tone {
  return risk >= 80 ? "danger" : risk >= 55 ? "warning" : "success";
}

export function riskLabel(risk: number) {
  return risk >= 80 ? "High Priority" : risk >= 55 ? "Needs Review" : "Low Risk";
}
