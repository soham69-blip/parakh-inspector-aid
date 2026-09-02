import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ThumbsDown, UserCog } from "lucide-react";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { AnnotatedImage, EvidencePanel } from "@/components/parakh/EvidenceViewer";
import { ComplianceChecklist } from "@/components/parakh/ComplianceChecklist";
import { RiskScorePanel, ScoreDial } from "@/components/parakh/RiskScore";
import { StatusBadge, riskLabel, riskTone } from "@/components/parakh/StatusBadge";
import { ReportPreview } from "@/components/parakh/ReportPreview";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";
import { PRIORITY_QUEUE } from "@/data/inspections";
import { RULES } from "@/data/rules";
import { DECISION_LABEL, recordDecision, useSession, type Decision } from "@/lib/session-store";

export const Route = createFileRoute("/inspection/$id")({
  head: () => ({
    meta: [
      { title: "Inspection Detail — PARAKH AI" },
      {
        name: "description",
        content:
          "Preliminary screening detail: detected fields, potential findings, evidence, rules checked and inspector decision.",
      },
      { property: "og:title", content: "Inspection Detail — PARAKH AI" },
      {
        property: "og:description",
        content: "Detected fields, evidence and the inspector decision for a screened product.",
      },
    ],
  }),
  component: InspectionDetail,
});

function InspectionDetail() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const queueItem = PRIORITY_QUEUE.find((q) => q.id === id);
  const { decisions } = useSession();
  const decision = decisions[id];
  const [highlight, setHighlight] = useState<string | undefined>();

  if (!product) {
    return (
      <DashboardLayout title="Inspection Detail" subtitle={id}>
        <div className="rounded-lg border border-border bg-card p-10 text-center shadow-card">
          <h2 className="text-[19px] font-semibold text-foreground">
            {queueItem ? "Evidence not seeded for this record" : "Inspection not found"}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
            {queueItem
              ? `${queueItem.product} was screened with risk ${queueItem.risk} (${queueItem.finding}). Full label evidence is seeded only for the five demonstration products in this prototype.`
              : `No screening record exists for ${id} in this prototype session.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/scan">Screen a demo product</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/priority">Back to priority queue</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const rulesChecked = RULES.filter((r) => product.fields.some((f) => f.rule === r.id));

  const decide = (d: Decision) => {
    recordDecision(product.id, d);
    toast.success("Inspector decision recorded for this prototype session.", {
      description: `${DECISION_LABEL[d]} · ${product.id}`,
    });
  };

  return (
    <DashboardLayout
      title={product.name}
      subtitle={`Inspection ID ${product.id} · ${product.category}`}
      actions={<StatusBadge tone={riskTone(product.riskScore)}>{riskLabel(product.riskScore)}</StatusBadge>}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <AnnotatedImage product={product} revealed={product.fields.length} highlightKey={highlight} />
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              Manufacturer: {product.manufacturer}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-card">
            <h2 className="text-[17px] font-semibold text-foreground">Detected fields</h2>
            <div className="mt-2">
              <ComplianceChecklist fields={product.fields} />
            </div>
            <div className="mt-5 border-t border-border pt-5">
              <ScoreDial value={product.complianceScore} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <RiskScorePanel score={product.riskScore} factors={product.riskFactors} />
          <EvidencePanel product={product} onFocusField={(k) => setHighlight(k)} />

          <div className="rounded-lg border border-border bg-card p-6 shadow-card">
            <h2 className="text-[17px] font-semibold text-foreground">Rules checked</h2>
            <ul className="mt-3 divide-y divide-border">
              {rulesChecked.map((r) => (
                <li key={r.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-foreground">{r.requirement}</p>
                    <p className="font-mono text-[12px] text-muted-foreground">{r.id} · {r.version}</p>
                  </div>
                  <span className="shrink-0 text-[12px] font-medium text-muted-foreground">{r.severity} severity</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-6 rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-foreground">Inspector decision</h2>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              The platform records a potential finding only. The determination is yours.
            </p>
          </div>
          {decision && <StatusBadge tone="info">{DECISION_LABEL[decision]}</StatusBadge>}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={() => decide("confirmed")}>
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Confirm finding
          </Button>
          <Button variant="outline" onClick={() => decide("false-positive")}>
            <ThumbsDown className="h-4 w-4" aria-hidden /> Mark false positive
          </Button>
          <Button variant="outline" onClick={() => decide("manual-review")}>
            <UserCog className="h-4 w-4" aria-hidden /> Send for manual review
          </Button>
        </div>
      </section>

      <section className="mt-6">
        <ReportPreview product={product} />
      </section>
    </DashboardLayout>
  );
}
