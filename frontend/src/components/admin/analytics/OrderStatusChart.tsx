"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

const COLORS = [
  "#facc15",
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#a855f7"
];

export default function OrderStatusChart({
  data
}: any) {

  return (
    <div
      className="
      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-xl

      p-8

      shadow-lg
    "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2
          className="
          text-2xl
          font-black
        "
        >
          Order Status Distribution 📦
        </h2>

        <p
          className="
          mt-2
          text-zinc-500
        "
        >
          Marketplace operational
          status overview.
        </p>

      </div>

      {/* CHART */}
      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}

              dataKey="total"

              nameKey="status"

              outerRadius={140}

              label
            >

              {data.map(
                (
                  _: any,
                  index: number
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}