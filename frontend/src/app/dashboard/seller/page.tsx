"use client";

import Link from "next/link";

export default function SellerDashboard() {

  return (
    <main
      className="
      min-h-screen

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100

      px-6 py-10
    "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          md:flex-row

          md:items-center
          md:justify-between

          gap-6
        "
        >

          <div>

            <div
              className="
              inline-flex

              px-5 py-2

              rounded-full

              bg-white/30
              backdrop-blur-xl

              border border-white/20

              text-sm
              text-zinc-700

              shadow-lg
            "
            >
              Seller Dashboard
            </div>

            <h1
              className="
              mt-5

              text-5xl

              font-black

              text-zinc-900
            "
            >
              Welcome Back 👋
            </h1>

            <p
              className="
              mt-4

              text-lg

              text-zinc-600
            "
            >
              Manage your marketplace store and monitor sales performance.
            </p>

          </div>

          {/* ACTION BUTTON */}
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
            font-semibold

            shadow-xl

            hover:scale-105

            transition-all
          "
          >
            + Add New Product
          </Link>

        </div>

        {/* STATS */}
        <div
          className="
          mt-12

          grid
          md:grid-cols-3

          gap-6
        "
        >

          {/* CARD */}
          <div
            className="
            rounded-[32px]

            border border-white/20

            bg-white/30
            backdrop-blur-2xl

            shadow-xl

            p-8
          "
          >

            <p className="text-zinc-500 text-sm">
              Total Products
            </p>

            <h2
              className="
              mt-4

              text-5xl

              font-black

              text-zinc-900
            "
            >
              12
            </h2>

            <div
              className="
              mt-5

              w-14 h-14

              rounded-2xl

              bg-orange-100

              flex items-center justify-center

              text-3xl
            "
            >
              📦
            </div>

          </div>

          {/* CARD */}
          <div
            className="
            rounded-[32px]

            border border-white/20

            bg-white/30
            backdrop-blur-2xl

            shadow-xl

            p-8
          "
          >

            <p className="text-zinc-500 text-sm">
              Orders
            </p>

            <h2
              className="
              mt-4

              text-5xl

              font-black

              text-zinc-900
            "
            >
              86
            </h2>

            <div
              className="
              mt-5

              w-14 h-14

              rounded-2xl

              bg-amber-100

              flex items-center justify-center

              text-3xl
            "
            >
              🛒
            </div>

          </div>

          {/* CARD */}
          <div
            className="
            rounded-[32px]

            border border-white/20

            bg-white/30
            backdrop-blur-2xl

            shadow-xl

            p-8
          "
          >

            <p className="text-zinc-500 text-sm">
              Revenue
            </p>

            <h2
              className="
              mt-4

              text-5xl

              font-black

              text-zinc-900
            "
            >
              Rp 12JT
            </h2>

            <div
              className="
              mt-5

              w-14 h-14

              rounded-2xl

              bg-yellow-100

              flex items-center justify-center

              text-3xl
            "
            >
              💰
            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-12">

          <h2
            className="
            text-3xl

            font-black

            text-zinc-900
          "
          >
            Quick Actions
          </h2>

          <div
            className="
            mt-6

            grid
            md:grid-cols-3

            gap-6
          "
          >

            {/* ACTION CARD */}
            <Link
              href="/dashboard/seller/products/create"
              className="
              group

              rounded-[32px]

              border border-white/20

              bg-white/30
              backdrop-blur-2xl

              shadow-xl

              p-8

              hover:-translate-y-2

              transition-all
            "
            >

              <div
                className="
                w-16 h-16

                rounded-3xl

                bg-gradient-to-br
                from-orange-500
                to-amber-500

                flex items-center justify-center

                text-3xl

                shadow-lg
              "
              >
                ➕
              </div>

              <h3
                className="
                mt-6

                text-2xl

                font-black

                text-zinc-900
              "
              >
                Create Product
              </h3>

              <p
                className="
                mt-3

                text-zinc-600
              "
              >
                Upload new products into your marketplace store.
              </p>

            </Link>

            {/* ACTION CARD */}
            <div
              className="
              rounded-[32px]

              border border-white/20

              bg-white/30
              backdrop-blur-2xl

              shadow-xl

              p-8
            "
            >

              <div
                className="
                w-16 h-16

                rounded-3xl

                bg-gradient-to-br
                from-orange-400
                to-yellow-400

                flex items-center justify-center

                text-3xl

                shadow-lg
              "
              >
                📦
              </div>

              <h3
                className="
                mt-6

                text-2xl

                font-black

                text-zinc-900
              "
              >
                Manage Products
              </h3>

              <p
                className="
                mt-3

                text-zinc-600
              "
              >
                Edit and manage all your marketplace products.
              </p>

            </div>

            {/* ACTION CARD */}
            <div
              className="
              rounded-[32px]

              border border-white/20

              bg-white/30
              backdrop-blur-2xl

              shadow-xl

              p-8
            "
            >

              <div
                className="
                w-16 h-16

                rounded-3xl

                bg-gradient-to-br
                from-amber-400
                to-orange-500

                flex items-center justify-center

                text-3xl

                shadow-lg
              "
              >
                📊
              </div>

              <h3
                className="
                mt-6

                text-2xl

                font-black

                text-zinc-900
              "
              >
                Analytics
              </h3>

              <p
                className="
                mt-3

                text-zinc-600
              "
              >
                Monitor store performance and customer activity.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}