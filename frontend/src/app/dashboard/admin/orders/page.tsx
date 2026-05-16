"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import { getToken }
from "@/services/auth";

import OrdersStats
from "@/components/admin/orders/OrdersStats";

import OrdersFilter
from "@/components/admin/orders/OrdersFilter";

import OrdersTable
from "@/components/admin/orders/OrdersTable";

import EmptyOrders
from "@/components/admin/orders/EmptyOrders";

import OrdersSkeleton
from "@/components/admin/orders/OrdersSkeleton";

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  // ==========================
  // FETCH
  // ==========================
  const fetchOrders =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/admin/orders",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

        setOrders([]);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================
  // FILTER
  // ==========================
  const filteredOrders =
    useMemo(() => {

      return orders.filter(
        (order) => {

          const matchesSearch =
            order.customer_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            String(order.id)
              .includes(search);

          const matchesStatus =
            status === "all"
              ? true
              : order.status ===
                status;

          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      orders,
      search,
      status
    ]);

  if (loading) {

    return (
      <OrdersSkeleton />
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
          Orders Monitoring 📦
        </h1>

        <p
          className="
          mt-3
          text-zinc-500
        "
        >
          Monitor all marketplace
          transactions globally.
        </p>

      </div>

      {/* STATS */}
      <OrdersStats
        orders={orders}
      />

      {/* FILTER */}
      <OrdersFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* EMPTY */}
      {
        filteredOrders.length === 0
          ? (
            <EmptyOrders />
          )
          : (
            <OrdersTable
              orders={
                filteredOrders
              }
            />
          )
      }

    </div>
  );
}