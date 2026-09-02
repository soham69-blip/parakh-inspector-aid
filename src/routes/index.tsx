import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  ScanLine,
  Scale,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/parakh/Navbar";
import { Footer } from "@/components/parakh/Footer";
import { Button } from "@/components/ui/button";
import { Counter, Reveal, EASE } from "@/components/parakh/motion";
import { IconTile } from "@/components/parakh/IconTile";
import { ProductScanner } from "@/components/parakh/ProductScanner";
import { BatchScreening } from "@/components/parakh/BatchScreening";
import { PriorityTable } from "@/components/parakh/PriorityTable";
import { GuidedDemo } from "@/components/parakh/GuidedDemo";
import { PRIORITY_QUEUE, HITL_STEPS, HOW_IT_WORKS } from "@/data/inspections";
import { ANALYTICS_TOTALS } from "@/data/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARAKH AI — AI-Assisted Legal Metrology Inspection" },
      {
        name: "description",
        content:
          "PARAKH AI screens packaged products, explains potential compliance findings with evidence and prioritizes high-risk products for inspector review.",
      },
      { property: "og:title", content: "PARAKH AI — Scan. Verify. Prioritize." },
      {
        property: "og:description",
        content:
          "AI-assisted screening, explainable evidence and risk-based prioritization for legal metrology inspection.",
      },
    ],
  }),
  component: Landing,
});

const TRUST = [
  { icon: ScanLine, title: "AI-Assisted Screening", detail: "First-level review of every submitted package image.", tone: "navy" as const },
  { icon: Scale, title: "Rule-Based Validation", detail: "Deterministic checks against a versioned rule library.", tone: "blue" as const },
  { icon: Search, title: "Explainable Evidence", detail: "Every finding carries a cropped region and rule reference.", tone: "saffron" as const },
  { icon: UserCheck, title: "Human-in-the-Loop", detail: "Inspectors confirm, reject or escalate every case.", tone: "green" as const },
];

const CAPABILITIES = [
  { icon: ClipboardCheck, title: "Field extraction", detail: "Retail price, net quantity, manufacturer identity, packing date and consumer information are read from the principal display panel." },
  { icon: Gauge, title: "Preliminary risk scoring", detail: "Findings, field confidence and historical signals combine into a transparent, itemised risk score." },
  { icon: ShieldCheck, title: "Responsible language", detail: "The platform records potential non-compliance only. Legal determination stays with the inspector." },
  { icon: Database, title: "Versioned rule library", detail: "Every check maps to a rule ID, severity and version so screening remains auditable over time." },
  { icon: FileText, title: "Report generation", detail: "Preliminary inspection reports compile evidence, rules checked and the inspector decision." },
  { icon: Search, title: "Batch triage", detail: "Consignments are screened together and ranked so field time goes to the highest-risk products." },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Platform />
        <HowItWorks />
        <DemoSection />
        <Intelligence />
        <HumanLoop />
        <Impact />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const lines = ["From Product Scanning", "to Smarter Inspection."];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] hairline-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-caps"
          >
            Legal Metrology × AI
          </motion.p>

          <h1 className="mt-5 text-[40px] font-semibold leading-[1.06] text-foreground sm:text-[52px] lg:text-[60px]">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.14, ease: EASE }}
              >
                {i === 1 ? (
                  <>
                    to <span className="text-saffron">Smarter Inspection.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground"
          >
            PARAKH AI assists inspectors in screening packaged products, identifying potential
            compliance issues, explaining the evidence, and prioritizing high-risk products for
            review.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild>
              <a href="#demo">
                Launch Inspection Demo <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
            <GuidedDemo />
          </motion.div>

          <p className="mt-6 text-[12.5px] text-muted-foreground">
            Prototype demonstration environment · Scan. Verify. Prioritize.
          </p>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-xl border border-border bg-card p-6 shadow-float"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4">
          <div className="min-w-0">
            <p className="label-caps">AI Inspection</p>
            <p className="mt-1 truncate text-[15px] font-semibold text-foreground">Packaged Food</p>
          </div>
          <span className="shrink-0 rounded-md border border-destructive/25 bg-destructive-soft px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-destructive">
            High priority
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5">
          <div>
            <p className="label-caps">Risk score</p>
            <p className="mt-1 text-[46px] font-semibold leading-none text-foreground">
              <Counter to={92} duration={1100} />
              <span className="ml-1 text-[16px] font-medium text-muted-foreground">/ 100</span>
            </p>
          </div>
          <div className="min-w-0">
            <p className="label-caps">Evidence detected</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-info"
                initial={{ width: 0 }}
                animate={{ width: "93%" }}
                transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
              />
            </div>
            <p className="mt-1.5 text-[12.5px] font-medium text-muted-foreground">93% confidence</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="label-caps">Potential findings</p>
          <ul className="mt-3 space-y-2">
            {["Declaration requires review", "Quantity requires verification"].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.18, ease: EASE }}
                className="flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2.5 text-[13.5px] text-foreground"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" aria-hidden />
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        <Button className="mt-6 w-full" asChild>
          <Link to="/inspection/$id" params={{ id: "PX-2026-00142" }}>
            Review inspection
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        className="absolute -bottom-6 -left-4 hidden rounded-lg border border-border bg-card px-4 py-3 shadow-raised sm:block"
      >
        <p className="label-caps">Rule reference</p>
        <p className="mt-1 font-mono text-[13px] font-semibold text-info">LM-DEMO-003</p>
      </motion.div>
    </motion.div>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border bg-card" id="platform">
      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
        <Reveal>
          <p className="label-caps">Built for intelligent first-level inspection</p>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.07}>
              <div className="flex gap-4">
                <IconTile icon={t.icon} tone={t.tone} />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-foreground">{t.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <Reveal>
          <p className="label-caps">Platform</p>
          <h2 className="mt-4 max-w-2xl text-[30px] font-semibold leading-tight text-foreground sm:text-[36px]">
            One workflow from package image to inspector decision.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="border-t border-border pt-5">
                <IconTile icon={c.icon} size="sm" tone={i % 3 === 1 ? "blue" : i % 3 === 2 ? "saffron" : "navy"} />
                <h3 className="mt-4 text-[16px] font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <Reveal>
          <p className="label-caps">How it works</p>
          <h2 className="mt-4 max-w-2xl text-[30px] font-semibold leading-tight text-foreground sm:text-[36px]">
            Six steps, one accountable chain of evidence.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <li key={s.n} className="bg-card p-7">
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-[13px] font-semibold text-saffron">{s.n}</p>
                <h3 className="mt-3 text-[18px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <Reveal>
          <p className="label-caps">Interactive demonstration</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-tight text-foreground sm:text-[36px]">
            Inspect a product
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Upload a package image and see how PARAKH AI performs preliminary screening. All results
            shown are prototype demonstration data.
          </p>
        </Reveal>

        <div className="mt-10">
          <ProductScanner />
        </div>
      </div>
    </section>
  );
}

function Intelligence() {
  return (
    <section id="intelligence" className="scroll-mt-20 border-b border-border bg-card">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-[30px] font-semibold leading-tight text-foreground sm:text-[40px]">
            AI doesn&rsquo;t replace inspectors.
            <span className="block text-muted-foreground">It helps them look in the right place.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Reveal className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-[52px] font-semibold leading-none text-foreground">
              <Counter to={10000} duration={1200} />
            </p>
            <p className="mt-3 label-caps">Products screened</p>
          </Reveal>

          <Reveal delay={0.1} className="text-center">
            <p className="rounded-md border border-info/25 bg-info-soft px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-info">
              AI prioritization
            </p>
          </Reveal>

          <Reveal delay={0.2} className="rounded-lg border border-saffron/30 bg-saffron-soft p-8 text-center">
            <p className="text-[52px] font-semibold leading-none text-saffron">
              <Counter to={400} duration={1200} />
            </p>
            <p className="mt-3 label-caps">Priority inspections</p>
          </Reveal>

          <Reveal delay={0.3} className="text-center">
            <p className="rounded-md border border-border bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Inspector review
            </p>
          </Reveal>

          <Reveal delay={0.4} className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-[52px] font-semibold leading-none text-foreground">
              <Counter to={ANALYTICS_TOTALS.coverage} duration={1200} />%
            </p>
            <p className="mt-3 label-caps">Screening coverage</p>
          </Reveal>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="label-caps">AI priority queue</p>
              <h3 className="mt-2 text-[22px] font-semibold text-foreground">Top-ranked products for review</h3>
            </div>
            <Link
              to="/priority"
              className="shrink-0 text-[13.5px] font-semibold text-info underline-offset-4 hover:underline"
            >
              View all priority products →
            </Link>
          </div>
          <div className="mt-4">
            <PriorityTable items={PRIORITY_QUEUE.slice(0, 5)} compact />
          </div>
        </div>

        <div className="mt-14">
          <BatchScreening />
        </div>
      </div>
    </section>
  );
}

function HumanLoop() {
  return (
    <section id="human-loop" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="label-caps">AI + Inspector</p>
            <h2 className="mt-4 text-[32px] font-semibold leading-tight text-foreground sm:text-[40px]">
              AI assists.
              <span className="block text-saffron">Inspectors decide.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">
              No screening output is a legal determination. Every potential finding is routed to a
              qualified inspector with its evidence, confidence and rule reference intact.
            </p>
          </Reveal>

          <ol className="relative">
            <span className="absolute left-[15px] top-2 bottom-2 w-px bg-border" aria-hidden />
            {HITL_STEPS.map((s, i) => (
              <li key={s.title} className="relative pl-11 pb-7 last:pb-0">
                <Reveal delay={i * 0.06}>
                  <span className="absolute left-0 top-0.5 grid h-8 w-8 place-items-center rounded-full border border-border bg-card font-mono text-[12px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-[16px] font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{s.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <Reveal>
          <p className="label-caps">Impact</p>
          <h2 className="mt-4 max-w-2xl text-[30px] font-semibold leading-tight text-foreground sm:text-[36px]">
            From screening data to inspection intelligence.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {[
            { v: ANALYTICS_TOTALS.screened, l: "Products screened", s: "" },
            { v: ANALYTICS_TOTALS.highRisk, l: "Priority products", s: "" },
            { v: ANALYTICS_TOTALS.coverage, l: "Screening coverage", s: "%" },
          ].map((m, i) => (
            <div key={m.l} className="bg-card p-8">
              <Reveal delay={i * 0.07}>
                <p className="text-[44px] font-semibold leading-none text-foreground">
                  <Counter to={m.v} />
                  {m.s}
                </p>
                <p className="mt-3 label-caps">{m.l}</p>
              </Reveal>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Prototype / Demonstration Data. Figures are illustrative and do not represent any official
          inspection record.
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-5 py-24 text-center lg:px-8">
        <Reveal>
          <h2 className="text-[30px] font-semibold leading-tight text-foreground sm:text-[38px]">
            AI doesn&rsquo;t replace the inspector.
          </h2>
          <p className="mt-2 text-[34px] font-semibold leading-tight text-saffron sm:text-[46px]">
            It makes every inspection smarter.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            PARAKH AI brings AI-assisted screening, explainable evidence and risk-based
            prioritization into one inspection workflow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Launch Interactive Demo <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#demo">Inspect a product</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
