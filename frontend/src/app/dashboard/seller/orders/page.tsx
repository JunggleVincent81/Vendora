"use client";

import { useEffect, useMemo, useState } from "react";

import OrderCard from "@/components/seller/orders/OrderCard"
import OrderFilter from "@/components/seller/orders/OrderFilter";
import OrderEmpty from "@/components/seller/orders/OrderEmpty";

import { getToken } from "@/services/auth";

export default function SellerOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] =
    useState("all");

  // ==========================
  // FETCH ORDERS
  // ==========================
  const fetchOrders = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/orders/seller/orders",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      setOrders(data);

    } catch (err) {

      console.log(err);

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

      if (status === "all") {
        return orders;
      }

      return orders.filter(
        (o) => o.status === status
      );

    }, [orders, status]);

  // ==========================
  // UPDATE STATUS
  // ==========================
  const updateStatus = async (
    orderId: number,
    newStatus: string
  ) => {

    try {

      await fetch(
        `http://localhost:5000/api/v1/orders/seller/orders/${orderId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${getToken()}`
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: newStatus
              }
            : o
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {
    return (
      <div className="p-10">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-10">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1
            className="
            text-5xl
            font-black
            text-zinc-900
          "
          >
            Orders 📦
          </h1>

          <p
            className="
            mt-3
            text-zinc-500
          "
          >
            Manage incoming customer orders.
          </p>

        </div>

      </div>

      {/* FILTER */}
      <div className="mt-10">
        <OrderFilter
          value={status}
          onChange={setStatus}
        />
      </div>

      {/* CONTENT */}
      <div
        className="
        mt-8

        grid
        grid-cols-1
        xl:grid-cols-2

        gap-6
      "
      >

        {
          filteredOrders.length > 0
            ? (
                filteredOrders.map(
                  (order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={
                        updateStatus
                      }
                    />
                  )
                )
              )
            : (
                <OrderEmpty />
              )
        }

      </div>

    </div>
  );
}