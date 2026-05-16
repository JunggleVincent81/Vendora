"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getToken
} from "@/services/auth";

import AnalyticsOverview
from "@/components/admin/analytics/AnalyticsOverview";

import RevenueChart
from "@/components/admin/analytics/RevenueCard";

import TopProducts
from "@/components/admin/analytics/TopProducts";

import TopSellers
from "@/components/admin/analytics/TopSellers";

import OrderStatusChart
from "@/components/admin/analytics/OrderStatusChart";

import UserGrowthChart
from "@/components/admin/analytics/UserGrowthChart";

import AnalyticsSkeleton
from "@/components/admin/analytics/AnalyticsSkeleton";

export default function AdminAnalyticsPage() {

  const [overview, setOverview] =
    useState<any>(null);

  const [revenue, setRevenue] =
    useState<any[]>([]);

  const [topProducts, setTopProducts] =
    useState<any[]>([]);

  const [topSellers, setTopSellers] =
    useState<any[]>([]);

  const [orderStatus, setOrderStatus] =
    useState<any[]>([]);

  const [userGrowth, setUserGrowth] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // FETCH ALL
  // ==========================
  const fetchAnalytics =
    async () => {

      try {

        const headers = {
          Authorization:
            `Bearer ${getToken()}`
        };

        const [
          overviewRes,
          revenueRes,
          productsRes,
          sellersRes,
          statusRes,
          growthRes
        ] = await Promise.all([

          fetch(
            "http://localhost:5000/api/v1/admin/analytics",
            { headers }
          ),

          fetch(
            "http://localhost:5000/api/v1/admin/analytics/revenue",
            { headers }
          ),

          fetch(
            "http://localhost:5000/api/v1/admin/analytics/top-products",
            { headers }
          ),

          fetch(
            "http://localhost:5000/api/v1/admin/analytics/top-sellers",
            { headers }
          ),

          fetch(
            "http://localhost:5000/api/v1/admin/analytics/order-status",
            { headers }
          ),

          fetch(
            "http://localhost:5000/api/v1/admin/analytics/user-growth",
            { headers }
          )

        ]);

        const overviewData =
          await overviewRes.json();

        const revenueData =
          await revenueRes.json();

        const productsData =
          await productsRes.json();

        const sellersData =
          await sellersRes.json();

        const statusData =
          await statusRes.json();

        const growthData =
          await growthRes.json();

        setOverview(overviewData);

        setRevenue(
          Array.isArray(revenueData)
            ? revenueData
            : []
        );

        setTopProducts(
          Array.isArray(productsData)
            ? productsData
            : []
        );

        setTopSellers(
          Array.isArray(sellersData)
            ? sellersData
            : []
        );

        setOrderStatus(
          Array.isArray(statusData)
            ? statusData
            : []
        );

        setUserGrowth(
          Array.isArray(growthData)
            ? growthData
            : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (
    loading ||
    !overview
  ) {

    return (
      <AnalyticsSkeleton />
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
          Platform Analytics 📊
        </h1>

        <p
          className="
          mt-3
          text-zinc-500
        "
        >
          Marketplace intelligence
          and business monitoring.
        </p>

      </div>

      {/* OVERVIEW */}
      <AnalyticsOverview
        overview={overview}
      />

      {/* CHARTS */}
      <div
        className="
        grid
        lg:grid-cols-2

        gap-8
      "
      >

        <RevenueChart
          data={revenue}
        />

        <UserGrowthChart
          data={userGrowth}
        />

      </div>

      {/* SECOND ROW */}
      <div
        className="
        grid
        lg:grid-cols-2

        gap-8
      "
      >

        <TopProducts
          products={topProducts}
        />

        <TopSellers
          sellers={topSellers}
        />

      </div>

      {/* ORDER STATUS */}
      <OrderStatusChart
        data={orderStatus}
      />

    </div>
  );
}