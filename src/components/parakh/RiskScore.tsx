import { motion } from "motion/react";
import { Counter } from "./motion";
import { cn } from "@/lib/utils";
import { StatusBadge, riskLabel, riskTone } from "./StatusBadge";

export function ScoreDial({
  value,
  size = 148,
  label = "Compliance screening",
  animate = true,
}: {
  value: number;
  size?: number;
  label?: string;
  animate?: boolean;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = value >= 80 ? "text-success" : value >= 60 ? "text-warning" : "text-destructive";

  return (
    <div className="flex items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-muted" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className={cn("stroke-current", tone)}
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * value) / 100 }}
            transition={{ duration: animate ? 0.9 : 0, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[30px] font-semibold leading-none text-foreground">
            <Counter to={value} />
          </span>
          <span className="mt-1 text-[11px] font-medium text-muted-foreground">out of 100</span>
        </div>
      </div>
      <div>
        <p className="label-caps">{label}</p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {value >= 80 ? "Broadly conforming" : value >= 60 ? "Needs review" : "Multiple gaps"}
        </p>
        <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
          Preliminary screening result. Inspector decision pending.
        </p>
      </div>
    </div>
  );
}

export function RiskScorePanel({
  score,
  factors,
}: {
  score: number;
  factors: { label: string; points: number }[];
}) {
  const max = Math.max(...factors.map((f) => f.points));
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps">PARAKH Risk Score</p>
          <p className="mt-2 text-[52px] font-semibold leading-none text-foreground">
            <Counter to={score} />
          </p>
        </div>
        <StatusBadge tone={riskTone(score)}>{riskLabel(score)}</StatusBadge>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        Risk score is generated from detected potential issues, field confidence and inspection
        signals. Final determination remains with the inspector.
      </p>

      <div className="mt-6 space-y-3.5">
        <p className="label-caps">Contributing factors</p>
        {factors.map((f, i) => (
          <div key={f.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-foreground">{f.label}</p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-info"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(f.points / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.22, 0.61, 0.36, 1] }}
                />
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-semibold tabular-nums text-muted-foreground">
              +{f.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
