"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/services/auth";

export function useSellerAnalytics() {

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/seller/analytics",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      setStats({
        totalProducts: data.totalProducts,
        totalViews: data.totalViews || 0,
        totalSales: data.totalSales || 0,
        revenue: data.revenue,
        topProduct: data.topProduct
      });

    } catch (err) {

      console.log(err);

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { stats, loading };

}