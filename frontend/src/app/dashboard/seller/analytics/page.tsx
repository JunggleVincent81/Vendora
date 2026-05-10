"use client";

import StatCard from "@/components/seller/analytics/StatCard";
import TopProduct from "@/components/seller/analytics/TopProduct";
import { useSellerAnalytics } from "@/hooks/useSellerAnalytics";

export default function SellerAnalyticsPage() {

  const { stats, loading } = useSellerAnalytics();

  // 🧠 SAFE GUARD (IMPORTANT)
  if (loading || !stats) {
    return (
      <div className="
        p-10

        min-h-[60vh]

        flex items-center justify-center

        text-gray-500
      ">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black">
          Analytics 📊
        </h1>

        <p className="text-gray-500 mt-2">
          Real-time store performance overview
        </p>
      </div>

      {/* STATS GRID */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        <StatCard
          label="Products"
          value={stats.totalProducts ?? 0}
          icon="📦"
        />

        <StatCard
          label="Views"
          value={stats.totalViews ?? 0}
          icon="👁️"
          hint="(tracking coming soon)"
        />

        <StatCard
          label="Sales"
          value={stats.totalSales ?? 0}
          icon="💰"
          hint="(order system needed)"
        />

        <StatCard
          label="Revenue"
          value={`Rp ${(stats.revenue ?? 0).toLocaleString()}`}
          icon="📈"
        />

      </div>

      {/* TOP PRODUCT */}
      <TopProduct name={stats.topProduct || "No sales yet"} />

    </div>
  );
}