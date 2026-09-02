import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Counter } from "./motion";
import { PRIORITY_QUEUE } from "@/data/inspections";
import { PriorityTable } from "./PriorityTable";
import { Loader2 } from "lucide-react";

type Phase = "idle" | "running" | "done";

export function BatchScreening() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => () => timers.current.forEach(clearInterval), []);

  const run = () => {
    setPhase("running");
    setProgress(0);
    let p = 0;
    const int = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 50) {
        clearInterval(int);
        setPhase("done");
      }
    }, 60);
    timers.current.push(int);
  };

  const stats = [
    { label: "Low risk", value: 31, tone: "text-success", ring: "bg-success-soft" },
    { label: "Needs review", value: 14, tone: "text-warning-foreground", ring: "bg-warning-soft" },
    { label: "High priority", value: 5, tone: "text-destructive", ring: "bg-destructive-soft" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card lg:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h3 className="text-[24px] font-semibold text-foreground">Screen an entire batch</h3>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            Run preliminary screening across a seeded consignment of 50 packaged products.
          </p>
        </div>
        <Button onClick={run} disabled={phase === "running"}>
          {phase === "running" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Screening…
            </>
          ) : (
            "Run batch screening"
          )}
        </Button>
      </div>

      {phase !== "idle" && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-[12.5px] font-medium text-muted-foreground">
            <span>{phase === "done" ? "50 products screened" : `${progress} of 50 products screened`}</span>
            <span className="tabular-nums">{Math.round((progress / 50) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-info"
              animate={{ width: `${(progress / 50) * 100}%` }}
              transition={{ ease: "linear", duration: 0.06 }}
            />
          </div>
        </div>
      )}

      {phase === "done" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className={`rounded-lg border border-border p-5 ${s.ring}`}>
                <p className={`text-[40px] font-semibold leading-none ${s.tone}`}>
                  <Counter to={s.value} />
                </p>
                <p className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="label-caps">AI priority queue</p>
            <div className="mt-3">
              <PriorityTable items={PRIORITY_QUEUE.slice(0, 5)} compact />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
