"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getToken
} from "@/services/auth";

import DashboardOverview
from "@/components/admin/dashboard/DashboardOverview";

import QuickActions
from "@/components/admin/dashboard/QuickActions";

import RecentOrders
from "@/components/admin/dashboard/RecentOrders";

import PendingStores
from "@/components/admin/dashboard/PendingStores";

import PendingProducts
from "@/components/admin/dashboard/PendingProducts";

import LatestUsers
from "@/components/admin/dashboard/LatestUsers";

import PlatformHealth
from "@/components/admin/dashboard/PlatformHealth";

import DashboardSkeleton
from "@/components/admin/dashboard/DashboardSkeleton";

export default function AdminDashboardPage() {

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // FETCH DASHBOARD
  // ==========================
  const fetchDashboard =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/admin/dashboard",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

        setDashboard(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (
    loading ||
    !dashboard
  ) {

    return (
      <DashboardSkeleton />
    );

  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>

        <h1
          className="
          text-5xl
          font-black
        "
        >
          Admin Control Center 🛡️
        </h1>

        <p
          className="
          mt-3
          text-zinc-500
        "
        >
          Monitor marketplace
          operations in real-time.
        </p>

      </div>

      {/* OVERVIEW */}
      <DashboardOverview
        stats={dashboard.stats}
      />

      {/* QUICK ACTIONS */}
      <QuickActions />

      {/* MAIN GRID */}
      <div
        className="
        grid
        xl:grid-cols-2

        gap-8
      "
      >

        <PendingStores
          stores={
            dashboard.pendingStores
          }
        />

        <PendingProducts
          products={
            dashboard.pendingProducts
          }
        />

      </div>

      {/* SECOND GRID */}
      <div
        className="
        grid
        xl:grid-cols-2

        gap-8
      "
      >

        <RecentOrders
          orders={
            dashboard.recentOrders
          }
        />

        <LatestUsers
          users={
            dashboard.latestUsers
          }
        />

      </div>

      {/* PLATFORM HEALTH */}
      <PlatformHealth />

    </div>
  );
}