"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%]">
      
      <nav
        className="
        flex items-center justify-between
        px-8 py-4

        rounded-3xl

        border border-white/20
        bg-white/20
        backdrop-blur-xl

        shadow-[0_8px_32px_rgba(0,0,0,0.12)]

        transition-all
      "
      >

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <div
            className="
            w-10 h-10
            rounded-2xl

            bg-gradient-to-br
            from-orange-500
            to-amber-400

            flex items-center justify-center

            shadow-lg
          "
          >
            <span className="text-white font-black">
              V
            </span>
          </div>

          <div>
            <h1 className="text-xl font-black text-zinc-800">
              Vendora
            </h1>

            <p className="text-xs text-zinc-500">
              Modern Local Marketplace
            </p>
          </div>

        </div>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className="
            text-zinc-700
            hover:text-orange-600
            transition-colors
            font-medium
          "
          >
            Home
          </Link>

          <Link
            href="/products"
            className="
            text-zinc-700
            hover:text-orange-600
            transition-colors
            font-medium
          "
          >
            Products
          </Link>

          <Link
            href="/stores"
            className="
            text-zinc-700
            hover:text-orange-600
            transition-colors
            font-medium
          "
          >
            Stores
          </Link>

          <Link
            href="/checkout"
            className="
            text-zinc-700
            hover:text-orange-600
            transition-colors
            font-medium
          "
          >
            Cart
          </Link>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="
            hidden md:flex

            px-5 py-2.5

            rounded-2xl

            border border-white/20
            bg-white/30
            backdrop-blur-xl

            text-zinc-700
            font-medium

            hover:bg-white/40
            transition-all
          "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
            px-5 py-2.5

            rounded-2xl

            bg-gradient-to-r
            from-orange-500
            to-amber-500

            text-white
            font-semibold

            shadow-lg

            hover:scale-105
            transition-all
          "
          >
            Become Seller
          </Link>

        </div>

      </nav>

    </div>
  );
}