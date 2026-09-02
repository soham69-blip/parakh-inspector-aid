import { motion } from "motion/react";
import type { DemoProduct, DetectedField } from "@/data/products";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const statusStyles: Record<DetectedField["status"], string> = {
  detected: "border-success text-success",
  review: "border-warning text-warning-foreground",
  missing: "border-destructive text-destructive",
};

const statusSymbol: Record<DetectedField["status"], string> = {
  detected: "✓",
  review: "⚠",
  missing: "✕",
};

export function AnnotatedImage({
  product,
  revealed,
  highlightKey,
  className,
}: {
  product: DemoProduct;
  revealed: number;
  highlightKey?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-border bg-muted", className)}>
      <img
        src={product.image}
        alt={`${product.name} package label used for screening`}
        width={1024}
        height={768}
        loading="lazy"
        className="block w-full"
      />
      {product.fields.slice(0, revealed).map((f, i) => (
        <motion.div
          key={f.key}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className={cn(
            "absolute rounded-[3px] border-2 bg-card/10",
            statusStyles[f.status],
            highlightKey === f.key && "ring-2 ring-saffron ring-offset-1 ring-offset-card",
          )}
          style={{ left: `${f.box.x}%`, top: `${f.box.y}%`, width: `${f.box.w}%`, height: `${f.box.h}%` }}
        >
          <span
            className={cn(
              "absolute -top-[22px] left-0 whitespace-nowrap rounded-[3px] border bg-card px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] shadow-card",
              statusStyles[f.status],
            )}
          >
            {f.label} {statusSymbol[f.status]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function EvidencePanel({
  product,
  onFocusField,
}: {
  product: DemoProduct;
  onFocusField?: (key: string) => void;
}) {
  const finding = product.findings[0];
  const box = product.evidenceBox;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground">Why was this flagged?</h3>
      <p className="mt-1 text-[13px] text-muted-foreground">
        AI-assisted finding with supporting evidence. Inspector decision pending.
      </p>

      <div className="mt-5 rounded-md border border-warning/40 bg-warning-soft p-4">
        <p className="label-caps text-warning-foreground">Potential finding</p>
        <p className="mt-1.5 text-[14.5px] font-semibold text-foreground">{finding.title}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{finding.detail}</p>
      </div>

      <div className="mt-5">
        <p className="label-caps">Evidence region</p>
        <div className="mt-2 overflow-hidden rounded-md border border-border bg-muted">
          <div
            className="relative w-full"
            style={{ paddingBottom: `${(box.h / box.w) * 42}%` }}
            aria-label="Cropped evidence region from product label"
            role="img"
          >
            <img
              src={product.image}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute left-0 top-0 max-w-none origin-top-left"
              style={{
                width: `${100 / (box.w / 100)}%`,
                transform: `translate(-${(box.x / box.w) * 100}%, -${(box.y / box.h) * 100 * (box.h / box.w) * 0.42}%)`,
              }}
            />
          </div>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
        <div>
          <dt className="label-caps">Confidence</dt>
          <dd className="mt-1.5 font-semibold text-foreground">{finding.confidence}%</dd>
        </div>
        <div>
          <dt className="label-caps">Rule reference</dt>
          <dd className="mt-1.5 font-mono text-[13px] font-semibold text-info">{finding.rule}</dd>
        </div>
        <div className="col-span-2">
          <dt className="label-caps">Status</dt>
          <dd className="mt-1.5">
            <StatusBadge tone="warning">Needs inspector review</StatusBadge>
          </dd>
        </div>
      </dl>

      {onFocusField && (
        <button
          type="button"
          onClick={() => onFocusField(product.fields.find((f) => f.status !== "detected")?.key ?? "")}
          className="mt-5 text-[13px] font-semibold text-info underline-offset-4 hover:underline"
        >
          Highlight evidence on product image
        </button>
      )}
    </div>
  );
}
