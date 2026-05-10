"use client";

import Link from "next/link";

export default function ProductToolbar() {

  return (
    <div
      className="
      flex
      flex-col
      xl:flex-row

      xl:items-center
      xl:justify-between

      gap-6
    "
    >

      {/* LEFT */}
      <div>

        <h1
          className="
          text-5xl

          font-black

          text-zinc-900
        "
        >
          Products 📦
        </h1>

        <p
          className="
          mt-4

          text-lg

          text-zinc-600
        "
        >
          Manage your marketplace products and inventory.
        </p>

      </div>

      {/* RIGHT */}
      <div
        className="
        flex
        flex-col
        md:flex-row

        gap-4
      "
      >

        {/* SEARCH */}
        <div
          className="
          relative

          w-full
          md:w-[340px]
        "
        >

          <input
            type="text"
            placeholder="Search products..."
            className="
            w-full

            py-4
            pl-14
            pr-5

            rounded-2xl

            border border-white/20

            bg-white/30
            backdrop-blur-xl

            outline-none

            text-zinc-800

            placeholder:text-zinc-400

            shadow-lg
          "
          />

          <div
            className="
            absolute

            left-5
            top-1/2
            -translate-y-1/2

            text-xl

            text-zinc-400
          "
          >
            🔍
          </div>

        </div>

        {/* FILTER */}
        <button
          className="
          px-6 py-4

          rounded-2xl

          bg-white/30
          backdrop-blur-xl

          border border-white/20

          text-zinc-700
          font-semibold

          shadow-lg

          hover:bg-white/40

          transition-all
        "
        >
          Filter
        </button>

        {/* CREATE BUTTON */}
        <Link
          href="/dashboard/seller/products/create"
          className="
          inline-flex
          items-center
          justify-center

          px-8 py-4

          rounded-2xl

          bg-gradient-to-r
          from-orange-500
          to-amber-500

          text-white
          font-bold

          shadow-xl

          hover:scale-105

          transition-all
        "
        >
          + Add Product
        </Link>

      </div>

    </div>
  );
}