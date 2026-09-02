import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dimensional, matte icon tile — soft depth, no gloss, no neon.
 */
export function IconTile({
  icon: Icon,
  tone = "navy",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: "navy" | "saffron" | "blue" | "green";
  size?: "sm" | "md";
  className?: string;
}) {
  const tones = {
    navy: "bg-primary text-primary-foreground",
    saffron: "bg-saffron text-saffron-foreground",
    blue: "bg-info text-info-foreground",
    green: "bg-success text-success-foreground",
  }[tone];

  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-xl shadow-raised",
        "before:absolute before:inset-x-1 before:top-0.5 before:h-1/2 before:rounded-t-[10px] before:bg-card/15 before:content-['']",
        tones,
        size === "md" ? "h-12 w-12" : "h-9 w-9",
        className,
      )}
      aria-hidden
    >
      <Icon className={size === "md" ? "h-5.5 w-5.5" : "h-4 w-4"} strokeWidth={1.9} />
    </span>
  );
}
