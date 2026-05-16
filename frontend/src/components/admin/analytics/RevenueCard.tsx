"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function RevenueChart({
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
          Revenue Analytics 💰
        </h2>

        <p
          className="
          mt-2
          text-zinc-500
        "
        >
          Marketplace revenue growth
          over time.
        </p>

      </div>

      {/* CHART */}
      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#f97316"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#f97316"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"

              dataKey="revenue"

              stroke="#f97316"

              fillOpacity={1}

              fill="url(#colorRevenue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}