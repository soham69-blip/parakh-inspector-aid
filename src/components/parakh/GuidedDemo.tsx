import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { title: "Select a product", detail: "Pick a seeded package from the inspection workspace.", anchor: "demo" },
  { title: "Scanning animation", detail: "The image is scanned and the label region is located.", anchor: "demo" },
  { title: "OCR detection", detail: "Declared fields are extracted and drawn on the package.", anchor: "demo" },
  { title: "Compliance analysis", detail: "Each field is checked against the active rule set.", anchor: "demo" },
  { title: "Risk score", detail: "A preliminary PARAKH risk score is generated with contributions.", anchor: "demo" },
  { title: "Priority ranking", detail: "The product enters the AI priority queue.", anchor: "intelligence" },
  { title: "Inspector review", detail: "The inspector confirms, rejects or escalates the finding.", anchor: "human-loop" },
];

export function GuidedDemo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(STEPS[step]!.anchor);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open, step]);

  return (
    <>
      <Button variant="outline" onClick={() => { setStep(0); setOpen(true); }}>
        <Play className="h-4 w-4" aria-hidden />
        Start 60-second demo
      </Button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-5 left-5 z-50 w-[320px] rounded-lg border border-border bg-card p-5 shadow-float"
            aria-label="Guided demo"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="label-caps">Guided demo · Step {step + 1} of {STEPS.length}</p>
                <p className="mt-1.5 text-[15px] font-semibold text-foreground">{STEPS[step]!.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close guided demo"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{STEPS[step]!.detail}</p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-saffron"
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                  Next <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <Button size="sm" onClick={() => setOpen(false)}>
                  Finish
                </Button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
