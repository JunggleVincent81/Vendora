import Link from "next/link";

const actions = [
  {
    label: "Manage Users",
    href:
      "/dashboard/admin/users",
    icon: "👥"
  },

  {
    label: "Review Stores",
    href:
      "/dashboard/admin/stores",
    icon: "🏪"
  },

  {
    label: "Moderate Products",
    href:
      "/dashboard/admin/products",
    icon: "📦"
  },

  {
    label: "View Orders",
    href:
      "/dashboard/admin/orders",
    icon: "🛒"
  },

  {
    label: "Analytics",
    href:
      "/dashboard/admin/analytics",
    icon: "📊"
  }
];

export default function QuickActions() {

  return (
    <div
      className="
      grid

      md:grid-cols-2
      xl:grid-cols-5

      gap-6
    "
    >

      {actions.map((action) => (

        <Link
          key={action.href}

          href={action.href}

          className="
          rounded-[28px]

          border border-white/20

          bg-gradient-to-br
          from-orange-500
          to-amber-500

          p-7

          text-white

          shadow-xl

          hover:scale-[1.02]

          transition-all
        "
        >

          <div className="text-4xl">
            {action.icon}
          </div>

          <h2
            className="
            mt-5

            text-xl
            font-black
          "
          >
            {action.label}
          </h2>

        </Link>

      ))}

    </div>
  );
}