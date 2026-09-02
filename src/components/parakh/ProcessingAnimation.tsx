import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { PROCESSING_STAGES } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProcessingAnimation({ stage }: { stage: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card" aria-live="polite">
      <div className="flex items-center gap-2.5">
        <Loader2 className="h-4 w-4 animate-spin text-info" aria-hidden />
        <p className="text-[13.5px] font-semibold text-foreground">Preliminary screening in progress</p>
      </div>

      <ol className="mt-5 space-y-3">
        {PROCESSING_STAGES.map((s, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <li key={s} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
                  done
                    ? "border-success bg-success text-success-foreground"
                    : active
                      ? "border-info text-info"
                      : "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-[13.5px]",
                  done ? "text-muted-foreground" : active ? "font-semibold text-foreground" : "text-muted-foreground/70",
                )}
              >
                {s}
              </span>
              {active && (
                <span className="ml-auto h-1 w-24 overflow-hidden rounded-full bg-muted">
                  <motion.span
                    className="block h-full bg-info"
                    initial={{ width: "5%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, ease: "linear" }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
