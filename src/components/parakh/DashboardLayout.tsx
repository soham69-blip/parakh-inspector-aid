import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  ListOrdered,
  ScanLine,
  Scale,
} from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Scan Product", to: "/scan", icon: ScanLine },
  { label: "Priority Queue", to: "/priority", icon: ListOrdered },
  { label: "Inspections", to: "/inspections", icon: ClipboardList },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Rules", to: "/rules", icon: Scale },
  { label: "Reports", to: "/reports", icon: FileText },
] as const;

export function DashboardLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-5 lg:flex print-hide">
          <Link to="/" className="px-2" aria-label="PARAKH AI home">
            <Wordmark />
          </Link>
          <nav className="mt-7 flex flex-col gap-0.5" aria-label="Workspace">
            {NAV.map(({ label, to, icon: Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-md border border-border bg-surface p-3">
            <p className="label-caps">Demo mode</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              All records are prototype demonstration data. No live government systems are connected.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md lg:px-8 print-hide">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 lg:hidden">
                  <Link to="/" aria-label="PARAKH AI home">
                    <Wordmark sub={false} />
                  </Link>
                </div>
                <h1 className="truncate text-[22px] font-semibold text-foreground lg:text-[26px]">{title}</h1>
                {subtitle && <p className="mt-0.5 truncate text-[13.5px] text-muted-foreground">{subtitle}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {actions}
                <span className="hidden items-center gap-2 rounded-md border border-saffron/30 bg-saffron-soft px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-saffron md:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden />
                  Demo mode
                </span>
              </div>
            </div>
          </header>

          <nav
            className="flex gap-1 overflow-x-auto border-b border-border bg-card px-4 py-2 lg:hidden print-hide"
            aria-label="Workspace mobile"
          >
            {NAV.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium",
                  pathname === to ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <main className="px-5 py-7 lg:px-8 lg:py-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
