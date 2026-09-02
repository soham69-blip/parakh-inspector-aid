import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/parakh/DashboardLayout";
import { ProductScanner } from "@/components/parakh/ProductScanner";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan Product — PARAKH AI" },
      {
        name: "description",
        content: "Run AI-assisted preliminary screening on a packaged product image.",
      },
      { property: "og:title", content: "Scan Product — PARAKH AI" },
      {
        property: "og:description",
        content: "Run AI-assisted preliminary screening on a packaged product image.",
      },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  return (
    <DashboardLayout
      title="Scan Product"
      subtitle="Preliminary screening workspace · prototype demonstration data"
    >
      <ProductScanner dense />
    </DashboardLayout>
  );
}
