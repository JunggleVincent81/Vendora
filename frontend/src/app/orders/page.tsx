"use client";

import {
  useEffect,
  useState
} from "react";

import Navbar
from "@/components/Navbar";

import FloatingBlobs
from "@/components/FloatingBlobs";

import { getToken }
from "@/services/auth";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // FETCH ORDERS
  // ==========================
  const fetchOrders =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/orders/me",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

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
  // STATUS UI
  // ==========================
  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "pending":
        return `
          bg-yellow-100
          text-yellow-700
        `;

      case "packed":
        return `
          bg-blue-100
          text-blue-700
        `;

      case "shipped":
        return `
          bg-purple-100
          text-purple-700
        `;

      case "completed":
        return `
          bg-green-100
          text-green-700
        `;

      default:
        return `
          bg-gray-100
          text-gray-700
        `;

    }

  };

  if (loading) {

    return (
      <div className="p-20">
        Loading orders...
      </div>
    );

  }

  return (
    <main
      className="
      relative

      min-h-screen

      overflow-hidden

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100
    "
    >

      <FloatingBlobs />

      <Navbar />

      <section
        className="
        relative z-10

        px-8
        py-20
      "
      >

        <div
          className="
          max-w-7xl
          mx-auto
        "
        >

          {/* HEADER */}
          <div className="mb-14">

            <h1
              className="
              text-5xl

              font-black
            "
            >
              My Orders 📦
            </h1>

            <p
              className="
              mt-4

              text-lg

              text-zinc-600
            "
            >
              Track your marketplace purchases and delivery progress.
            </p>

          </div>

          {/* EMPTY */}
          {
            orders.length === 0 && (

              <div
                className="
                rounded-[40px]

                border border-white/20

                bg-white/30
                backdrop-blur-2xl

                p-20

                text-center
              "
              >

                <div className="text-7xl">
                  📦
                </div>

                <h2
                  className="
                  mt-6

                  text-4xl

                  font-black
                "
                >
                  No Orders Yet
                </h2>

                <p
                  className="
                  mt-4

                  text-zinc-600
                "
                >
                  Your order history will appear here.
                </p>

              </div>

            )
          }

          {/* ORDER LIST */}
          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order.id}

                className="
                rounded-[36px]

                border border-white/20

                bg-white/30
                backdrop-blur-2xl

                p-8

                shadow-[0_20px_80px_rgba(0,0,0,0.1)]
              "
              >

                {/* TOP */}
                <div
                  className="
                  flex flex-col
                  lg:flex-row

                  lg:items-center
                  lg:justify-between

                  gap-6
                "
                >

                  <div>

                    <div
                      className="
                      inline-flex

                      px-5 py-2

                      rounded-full

                      bg-white/40

                      text-sm
                      font-semibold
                    "
                    >
                      Order #{order.id}
                    </div>

                    <p
                      className="
                      mt-4

                      text-zinc-500
                    "
                    >
                      {
                        new Date(
                          order.created_at
                        ).toLocaleString()
                      }
                    </p>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`
                      px-6 py-3

                      rounded-2xl

                      text-sm
                      font-bold

                      ${getStatusColor(
                        order.status
                      )}
                    `}
                  >
                    {order.status}
                  </div>

                </div>

                {/* PRICE */}
                <div className="mt-10">

                  <p className="text-zinc-500">
                    Total Payment
                  </p>

                  <h2
                    className="
                    mt-3

                    text-5xl

                    font-black

                    text-orange-500
                  "
                  >
                    Rp{" "}
                    {Number(
                      order.total_price
                    ).toLocaleString()}
                  </h2>

                </div>

                {/* TIMELINE */}
                <div
                  className="
                  mt-12

                  grid
                  grid-cols-2
                  md:grid-cols-4

                  gap-5
                "
                >

                  <Step
                    title="Pending"
                    active={
                      [
                        "pending",
                        "packed",
                        "shipped",
                        "completed"
                      ].includes(order.status)
                    }
                  />

                  <Step
                    title="Packed"
                    active={
                      [
                        "packed",
                        "shipped",
                        "completed"
                      ].includes(order.status)
                    }
                  />

                  <Step
                    title="Shipped"
                    active={
                      [
                        "shipped",
                        "completed"
                      ].includes(order.status)
                    }
                  />

                  <Step
                    title="Completed"
                    active={
                      order.status ===
                      "completed"
                    }
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

// ==========================
// STEP COMPONENT
// ==========================
function Step({
  title,
  active
}: any) {

  return (
    <div
      className={`
        rounded-3xl

        p-5

        border

        ${
          active
            ? `
              bg-gradient-to-r
              from-orange-500
              to-amber-500

              text-white

              border-orange-300
            `
            : `
              bg-white/30

              border-white/20

              text-zinc-500
            `
        }
      `}
    >

      <div className="text-3xl">
        {active ? "✅" : "⏳"}
      </div>

      <h3
        className="
        mt-4

        font-black
      "
      >
        {title}
      </h3>

    </div>
  );
}