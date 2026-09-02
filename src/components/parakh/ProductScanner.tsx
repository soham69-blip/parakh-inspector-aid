import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, HelpCircle, ListPlus, Upload } from "lucide-react";
import { DEMO_PRODUCTS, PROCESSING_STAGES, type DemoProduct } from "@/data/products";
import { Button } from "@/components/ui/button";
import { AnnotatedImage, EvidencePanel } from "./EvidenceViewer";
import { ComplianceChecklist } from "./ComplianceChecklist";
import { ProcessingAnimation } from "./ProcessingAnimation";
import { RiskScorePanel, ScoreDial } from "./RiskScore";
import { StatusBadge, riskLabel, riskTone } from "./StatusBadge";
import { pinToTop } from "@/lib/session-store";
import { cn } from "@/lib/utils";

type Phase = "idle" | "processing" | "complete";

export function ProductScanner({ dense = false }: { dense?: boolean }) {
  const [selected, setSelected] = useState<DemoProduct | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [highlight, setHighlight] = useState<string | undefined>();
  const [showEvidence, setShowEvidence] = useState(false);
  const [queued, setQueued] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const analyze = useCallback((product: DemoProduct) => {
    clearTimers();
    setSelected(product);
    setPhase("processing");
    setStage(0);
    setRevealed(0);
    setHighlight(undefined);
    setShowEvidence(false);
    setQueued(false);

    PROCESSING_STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStage(i), i * 750));
    });
    timers.current.push(
      setTimeout(() => {
        setPhase("complete");
        product.fields.forEach((_, i) => {
          timers.current.push(setTimeout(() => setRevealed(i + 1), 260 * (i + 1)));
        });
      }, PROCESSING_STAGES.length * 750),
    );
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    toast("Prototype upload", {
      description: "This prototype screens the seeded demo products. Select one to continue.",
    });
  };

  return (
    <div className={cn("grid gap-6", dense ? "xl:grid-cols-[380px_minmax(0,1fr)]" : "xl:grid-cols-[400px_minmax(0,1fr)]")}>
      {/* LEFT — input */}
      <div className="space-y-5">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="rounded-lg border border-dashed border-border-strong bg-card p-7 text-center"
        >
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-info-soft text-info">
            <Upload className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-3.5 text-[14.5px] font-semibold text-foreground">Drag &amp; drop product image</p>
          <p className="mt-1 text-[12.5px] text-muted-foreground">JPG or PNG of the principal display panel</p>
          <p className="mt-4 label-caps">or</p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => analyze(DEMO_PRODUCTS[0])}
          >
            Use demo product
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="label-caps px-1">Seeded demo products</p>
          <ul className="mt-3 space-y-1.5">
            {DEMO_PRODUCTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => analyze(p)}
                  aria-pressed={selected?.id === p.id}
                  className={cn(
                    "grid w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-md border p-2 text-left transition-all duration-200 hover:-translate-y-[2px] hover:shadow-card",
                    selected?.id === p.id ? "border-info bg-info-soft" : "border-border bg-card",
                  )}
                >
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-10 w-10 rounded object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium text-foreground">{p.name}</span>
                    <span className="block truncate text-[12px] text-muted-foreground">{p.category}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selected && phase !== "processing" && (
          <Button className="w-full" onClick={() => analyze(selected)}>
            Analyze product again
          </Button>
        )}
      </div>

      {/* RIGHT — workspace */}
      <div ref={resultRef} className="min-w-0">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg border border-border bg-card p-10 text-center shadow-card"
            >
              <p className="label-caps">Inspection workspace</p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Select a seeded demo product to run a preliminary screening. PARAKH AI will read the
                label, check the applicable rules and produce an explainable risk assessment.
              </p>
            </motion.div>
          )}

          {phase === "processing" && selected && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-5 md:grid-cols-2"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
                <img src={selected.image} alt={selected.name} width={1024} height={768} loading="lazy" className="w-full" />
                <motion.div
                  className="absolute inset-x-0 h-[2px] bg-info"
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <ProcessingAnimation stage={stage} />
            </motion.div>
          )}

          {phase === "complete" && selected && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-success/30 bg-success-soft px-4 py-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-success">
                  Inspection complete
                </p>
                <p className="text-[12.5px] text-muted-foreground">
                  {selected.id} · {selected.name}
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <AnnotatedImage product={selected} revealed={revealed} highlightKey={highlight} />
                  <p className="mt-2 text-[12px] text-muted-foreground">
                    Detected label regions. Green indicates a detected field, amber indicates a field
                    requiring review, red indicates a field that could not be located.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="label-caps">Compliance screening</p>
                    <StatusBadge tone={riskTone(selected.riskScore)}>{riskLabel(selected.riskScore)}</StatusBadge>
                  </div>
                  <div className="mt-4">
                    <ScoreDial value={selected.complianceScore} />
                  </div>
                  <div className="mt-5 border-t border-border pt-2">
                    <ComplianceChecklist fields={selected.fields.slice(0, revealed)} />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <RiskScorePanel score={selected.riskScore} factors={selected.riskFactors} />

                <div className="space-y-4">
                  {!showEvidence ? (
                    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
                      <h3 className="text-lg font-semibold text-foreground">Potential findings</h3>
                      <ul className="mt-4 space-y-3">
                        {selected.findings.map((f) => (
                          <li key={f.rule} className="rounded-md border border-border bg-surface p-3.5">
                            <p className="text-[14px] font-medium text-foreground">{f.title}</p>
                            <p className="mt-1 text-[12.5px] text-muted-foreground">
                              Rule {f.rule} · Confidence {f.confidence}% · Inspector decision pending
                            </p>
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-5" variant="outline" onClick={() => setShowEvidence(true)}>
                        <HelpCircle className="h-4 w-4" aria-hidden />
                        Why?
                      </Button>
                    </div>
                  ) : (
                    <EvidencePanel product={selected} onFocusField={(k) => setHighlight(k)} />
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={queued ? "secondary" : "default"}
                      onClick={() => {
                        pinToTop(selected.id);
                        setQueued(true);
                        toast.success("Added to priority queue", {
                          description: `${selected.name} is ranked #1 for this prototype session.`,
                        });
                      }}
                    >
                      <ListPlus className="h-4 w-4" aria-hidden />
                      {queued ? "#1 Priority inspection" : "Add to priority queue"}
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/inspection/$id" params={{ id: selected.id }}>
                        Open inspection detail
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
