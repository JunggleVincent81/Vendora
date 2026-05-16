"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard/admin",
    icon: "🏠"
  },
  {
    name: "Store Requests",
    href: "/dashboard/admin/stores",
    icon: "🏪"
  },
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: "👥"
  },
  {
    name: "Products",
    href: "/dashboard/admin/products",
    icon: "📦"
  },
  {
    name: "Orders",
    href: "/dashboard/admin/orders",
    icon: "🛒"
  },
  {
    name: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: "📊"
  },
  {
    name: "Settings",
    href: "/dashboard/admin/settings",
    icon: "⚙️"
  }
];

export default function Sidebar() {

  const pathname =
    usePathname();

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
            from-red-500
            to-orange-500

            flex items-center justify-center

            text-white
            text-3xl
          "
          >
            🛡️
          </div>

          <h1
            className="
            mt-6

            text-3xl
            font-black
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
            Admin Control Center
          </p>

        </div>

        {/* MENUS */}
        <div
          className="
          mt-12

          space-y-3
        "
        >

          {menus.map((menu) => {

            const active =
              pathname ===
              menu.href;

            return (
              <Link
                key={menu.href}

                href={menu.href}

                className={`
                  flex items-center gap-4

                  px-5 py-4

                  rounded-2xl

                  transition-all

                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-red-500
                        to-orange-500

                        text-white
                      `
                      : `
                        hover:bg-white/40
                      `
                  }
                `}
              >

                <div
                  className="
                  text-2xl
                "
                >
                  {menu.icon}
                </div>

                <div>

                  <p className="font-bold">
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

      </div>

    </aside>
  );
}