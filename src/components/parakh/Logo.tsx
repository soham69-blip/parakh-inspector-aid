import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="PARAKH AI mark"
      fill="none"
    >
      <rect x="3" y="2" width="18" height="24" rx="2.5" className="fill-primary" />
      <path d="M7.5 8h9M7.5 12h9M7.5 16h5" stroke="currentColor" className="text-background" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20.5" cy="19.5" r="7" className="fill-background stroke-saffron" strokeWidth="2" />
      <path d="M17.4 19.6l2.3 2.3 4.3-4.6" className="stroke-saffron" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.6 24.8l3.6 3.6" className="stroke-saffron" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className, sub = true }: { className?: string; sub?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="block text-[17px] font-bold tracking-[-0.01em] text-primary">
          PARAKH<span className="ml-1 text-saffron">AI</span>
        </span>
        {sub && (
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Inspection Intelligence
          </span>
        )}
      </span>
    </span>
  );
}
