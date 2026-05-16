"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function UserGrowthChart({
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
          User Growth 👥
        </h2>

        <p
          className="
          mt-2
          text-zinc-500
        "
        >
          New user acquisition
          tracking.
        </p>

      </div>

      {/* CHART */}
      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"

              dataKey="users"

              stroke="#3b82f6"

              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}