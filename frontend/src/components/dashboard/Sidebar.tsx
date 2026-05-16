"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard/seller",
    icon: "🏠"
  },
  {
    name: "Store",
    href: "/dashboard/seller/store",
    icon: "🏪"
  },
  {
    name: "Products",
    href: "/dashboard/seller/products",
    icon: "📦"
  },
  {
    name: "Orders",
    href: "/dashboard/seller/orders",
    icon: "🛒"
  },
  {
    name: "Analytics",
    href: "/dashboard/seller/analytics",
    icon: "📊"
  },
  {
    name: "Settings",
    href: "/dashboard/seller/settings",
    icon: "⚙️"
  }
];

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside
      className="
      hidden
      lg:flex

      flex-col

      w-[290px]

      min-h-screen

      sticky
      top-0

      p-6
    "
    >

      {/* SIDEBAR CONTAINER */}
      <div
        className="
        flex-1

        rounded-[36px]

        border border-white/20

        bg-white/30
        backdrop-blur-2xl

        shadow-[0_20px_80px_rgba(0,0,0,0.12)]

        p-6
      "
      >

        {/* LOGO */}
        <div>

          <div
            className="
            w-16 h-16

            rounded-3xl

            bg-gradient-to-br
            from-orange-500
            to-amber-500

            flex items-center justify-center

            text-white
            text-3xl

            shadow-xl
          "
          >
            🛍️
          </div>

          <h1
            className="
            mt-6

            text-3xl

            font-black

            text-zinc-900
          "
          >
            Vendora
          </h1>

          <p
            className="
            mt-2

            text-zinc-500
          "
          >
            Seller Commerce Panel
          </p>

        </div>

        {/* NAVIGATION */}
        <div className="mt-12 space-y-3">

          {menus.map((menu) => {

            const active =
              pathname === menu.href;

            return (

              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  group

                  flex items-center gap-4

                  px-5 py-4

                  rounded-2xl

                  transition-all duration-300

                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-orange-500
                        to-amber-500

                        text-white

                        shadow-lg
                      `
                      : `
                        text-zinc-700

                        hover:bg-white/40
                      `
                  }
                `}
              >

                {/* ICON */}
                <div
                  className={`
                    w-12 h-12

                    rounded-2xl

                    flex items-center justify-center

                    text-2xl

                    transition-all

                    ${
                      active
                        ? `
                          bg-white/20
                        `
                        : `
                          bg-white/40
                        `
                    }
                  `}
                >
                  {menu.icon}
                </div>

                {/* TEXT */}
                <div>

                  <p
                    className="
                    font-bold
                    text-base
                  "
                  >
                    {menu.name}
                  </p>

                  <p
                    className={`
                      text-sm

                      ${
                        active
                          ? `
                            text-white/80
                          `
                          : `
                            text-zinc-500
                          `
                      }
                    `}
                  >
                    Manage {menu.name.toLowerCase()}
                  </p>

                </div>

              </Link>

            );

          })}

        </div>

        {/* BOTTOM CARD */}
        <div
          className="
          mt-10

          rounded-[28px]

          bg-gradient-to-br
          from-orange-500
          to-amber-500

          p-6

          text-white

          shadow-2xl
        "
        >

          <div className="text-4xl">
            🚀
          </div>

          <h2
            className="
            mt-5

            text-2xl

            font-black
          "
          >
            Grow Your Store
          </h2>

          <p
            className="
            mt-3

            text-white/80
            text-sm

            leading-relaxed
          "
          >
            Manage products, orders, analytics, and scale your UMKM business digitally.
          </p>

          <button
            className="
            mt-6

            w-full

            py-3

            rounded-2xl

            bg-white/20

            backdrop-blur-xl

            font-semibold

            hover:bg-white/30

            transition-all
          "
          >
            Explore Features
          </button>

        </div>

      </div>

    </aside>
  );
}