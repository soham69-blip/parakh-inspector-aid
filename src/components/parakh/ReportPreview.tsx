import { useState } from "react";
import { motion } from "motion/react";
import { Download, Loader2, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./Logo";
import type { DemoProduct } from "@/data/products";
import { DECISION_LABEL, useSession } from "@/lib/session-store";
import { RULES } from "@/data/rules";

export function ReportPreview({ product }: { product: DemoProduct }) {
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const { decisions } = useSession();
  const decision = decisions[product.id];

  const generate = () => {
    setState("loading");
    setTimeout(() => setState("ready"), 1400);
  };

  const download = () => {
    const lines = [
      "PARAKH AI — PRELIMINARY INSPECTION REPORT",
      "Prototype Environment — not an official legal determination",
      "",
      `Inspection ID: ${product.id}`,
      `Product: ${product.name}`,
      `Category: ${product.category}`,
      `Manufacturer: ${product.manufacturer}`,
      `Risk score: ${product.riskScore}/100`,
      `Compliance screening: ${product.complianceScore}/100`,
      "",
      "Detected information:",
      ...product.fields.map((f) => `  - ${f.label}: ${f.value} (${f.status}, ${f.confidence}%)`),
      "",
      "Potential findings:",
      ...product.findings.map((f) => `  - [${f.rule}] ${f.title} (confidence ${f.confidence}%)`),
      "",
      `Inspector decision: ${decision ? DECISION_LABEL[decision] : "Pending"}`,
    ].join("\n");

    const url = URL.createObjectURL(new Blob([lines], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.id}-preliminary-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded", { description: "Prototype document generated client-side." });
  };

  if (state !== "ready") {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-card">
        <h3 className="text-[20px] font-semibold text-foreground">Generate inspection report</h3>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
          Compile detected information, potential findings, evidence references and the inspector
          decision into a preliminary inspection report.
        </p>
        <Button className="mt-5" onClick={generate} disabled={state === "loading"}>
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Compiling report…
            </>
          ) : (
            "Generate report"
          )}
        </Button>
      </div>
    );
  }

  const ruleRows = RULES.filter((r) => product.fields.some((f) => f.rule === r.id));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-4 flex flex-wrap gap-3 print-hide">
        <Button onClick={download}>
          <Download className="h-4 w-4" aria-hidden /> Download report
        </Button>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4" aria-hidden /> Print
        </Button>
      </div>

      <article className="rounded-lg border border-border bg-card p-8 shadow-raised">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <LogoMark className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-primary">
                PARAKH<span className="ml-1 text-saffron">AI</span>
              </p>
              <p className="text-[12px] text-muted-foreground">Preliminary Inspection Report</p>
            </div>
          </div>
          <span className="shrink-0 rounded-md border border-saffron/30 bg-saffron-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-saffron">
            Prototype Environment
          </span>
        </header>

        <dl className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            ["Inspection ID", product.id],
            ["Product", product.name],
            ["Category", product.category],
            ["Manufacturer", product.manufacturer],
            ["Risk score", `${product.riskScore} / 100`],
            ["Compliance screening", `${product.complianceScore} / 100`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-caps">{k}</dt>
              <dd className="mt-1 text-[14px] font-medium text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8">
          <h4 className="label-caps">Detected information</h4>
          <table className="mt-3 w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-y border-border bg-surface">
                <th className="px-3 py-2 font-semibold">Field</th>
                <th className="px-3 py-2 font-semibold">Value</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {product.fields.map((f) => (
                <tr key={f.key} className="border-b border-border">
                  <td className="px-3 py-2 font-medium text-foreground">{f.label}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.value}</td>
                  <td className="px-3 py-2 capitalize text-muted-foreground">{f.status}</td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">{f.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <h4 className="label-caps">Potential findings</h4>
            <ul className="mt-3 space-y-2.5">
              {product.findings.map((f) => (
                <li key={f.rule} className="rounded-md border border-border bg-surface p-3">
                  <p className="text-[13.5px] font-medium text-foreground">{f.title}</p>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">
                    Rule {f.rule} · Confidence {f.confidence}%
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="label-caps">Evidence</h4>
            <img
              src={product.image}
              alt={`Label evidence for ${product.name}`}
              loading="lazy"
              className="mt-3 w-full rounded-md border border-border"
            />
          </div>
        </section>

        <section className="mt-8">
          <h4 className="label-caps">Rules checked</h4>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {ruleRows.map((r) => `${r.id} ${r.requirement}`).join(" · ")}
          </p>
        </section>

        <section className="mt-8 border-t border-border pt-5">
          <h4 className="label-caps">Inspector decision</h4>
          <p className="mt-2 text-[15px] font-semibold text-foreground">
            {decision ? DECISION_LABEL[decision] : "Inspector decision pending"}
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            This preliminary report is generated by an AI-assisted screening prototype. It is not an
            official legal determination or government service. All determinations remain with the
            authorised inspector.
          </p>
        </section>
      </article>
    </motion.div>
  );
}
