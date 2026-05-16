"use client";

import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({
  order,
  onStatusChange
}: any) {

  return (
    <div
      className="
      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-2xl

      p-7

      shadow-[0_20px_80px_rgba(0,0,0,0.08)]
    "
    >

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            ORDER ID
          </p>

          <h2
            className="
            text-3xl
            font-black
            mt-2
          "
          >
            #{order.id}
          </h2>

        </div>

        <OrderStatusBadge
          status={order.status}
        />

      </div>

      {/* CUSTOMER */}
      <div className="mt-8">

        <p className="text-sm text-zinc-500">
          Customer
        </p>

        <h3
          className="
          text-xl
          font-bold
          mt-2
        "
        >
          {order.customer_name}
        </h3>

      </div>

      {/* TOTAL */}
      <div className="mt-6">

        <p className="text-sm text-zinc-500">
          Total
        </p>

        <h3
          className="
          text-4xl
          font-black
          mt-2

          text-orange-600
        "
        >
          Rp {Number(order.total_price).toLocaleString()}
        </h3>

      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex gap-3 flex-wrap">

        <button
          onClick={() =>
            onStatusChange(
              order.id,
              "packed"
            )
          }
          className="
          px-5 py-3

          rounded-2xl

          bg-orange-500

          text-white
          font-semibold
        "
        >
          Pack
        </button>

        <button
          onClick={() =>
            onStatusChange(
              order.id,
              "shipped"
            )
          }
          className="
          px-5 py-3

          rounded-2xl

          bg-blue-500

          text-white
          font-semibold
        "
        >
          Ship
        </button>

        <button
          onClick={() =>
            onStatusChange(
              order.id,
              "completed"
            )
          }
          className="
          px-5 py-3

          rounded-2xl

          bg-green-500

          text-white
          font-semibold
        "
        >
          Complete
        </button>

      </div>

    </div>
  );
}