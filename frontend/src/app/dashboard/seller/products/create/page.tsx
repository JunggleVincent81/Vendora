"use client";

import Link from "next/link";

import CreateProductForm from "@/components/dashboard/products/CreateProductForm";

export default function CreateProductPage() {

  return (
    <div>

      {/* TOPBAR */}
      <div
        className="
        flex
        flex-col
        lg:flex-row

        lg:items-center
        lg:justify-between

        gap-6
      "
      >

        {/* LEFT */}
        <div>

          <div
            className="
            flex items-center gap-3

            text-sm

            text-zinc-500
          "
          >

            <Link
              href="/dashboard/seller"
              className="hover:text-orange-500"
            >
              Dashboard
            </Link>

            <span>/</span>

            <Link
              href="/dashboard/seller/products"
              className="hover:text-orange-500"
            >
              Products
            </Link>

            <span>/</span>

            <span className="text-zinc-800 font-semibold">
              Create Product
            </span>

          </div>

          <h1
            className="
            mt-5

            text-5xl

            font-black

            text-zinc-900
          "
          >
            Create Product 🚀
          </h1>

          <p
            className="
            mt-4

            text-lg

            text-zinc-600
          "
          >
            Upload new products and grow your digital marketplace business.
          </p>

        </div>

        {/* RIGHT */}
        <Link
          href="/dashboard/seller/products"
          className="
          inline-flex
          items-center
          justify-center

          px-7 py-4

          rounded-2xl

          bg-white/40
          backdrop-blur-xl

          border border-white/20

          text-zinc-800
          font-bold

          shadow-lg

          hover:bg-white/60

          transition-all
        "
        >
          ← Back to Products
        </Link>

      </div>

      {/* FORM */}
      <CreateProductForm />

    </div>
  );
}