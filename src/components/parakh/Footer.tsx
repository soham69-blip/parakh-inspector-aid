import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer id="about" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Wordmark sub={false} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            AI-Assisted Legal Metrology Inspection Intelligence. Prototype developed for Smart India
            Hackathon.
          </p>
          <p className="mt-4 text-[13px] font-medium text-primary">Scan. Verify. Prioritize.</p>
        </div>

        <div>
          <h2 className="label-caps">Platform</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="/#platform">Platform</a></li>
            <li><a className="hover:text-foreground" href="/#how-it-works">How It Works</a></li>
            <li><a className="hover:text-foreground" href="/#demo">Demo</a></li>
            <li><Link className="hover:text-foreground" to="/analytics">Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="label-caps">Workspace</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" to="/dashboard">Inspector Dashboard</Link></li>
            <li><Link className="hover:text-foreground" to="/priority">Priority Queue</Link></li>
            <li><Link className="hover:text-foreground" to="/rules">Rule Library</Link></li>
            <li><Link className="hover:text-foreground" to="/reports">Reports</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-5 py-5 lg:px-8">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Prototype demonstration. Not an official legal determination or government service. All
            figures shown are prototype / demonstration data.
          </p>
        </div>
      </div>
    </footer>
  );
}
