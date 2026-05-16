const cards = [
    {
      key: "users",
      title: "Users",
      icon: "👥"
    },
  
    {
      key: "stores",
      title: "Stores",
      icon: "🏪"
    },
  
    {
      key: "products",
      title: "Products",
      icon: "📦"
    },
  
    {
      key: "orders",
      title: "Orders",
      icon: "🛒"
    },
  
    {
      key: "revenue",
      title: "Revenue",
      icon: "💰"
    }
  ];
  
  export default function DashboardOverview({
    stats
  }: any) {
  
    return (
      <div
        className="
        grid
  
        md:grid-cols-2
        xl:grid-cols-5
  
        gap-6
      "
      >
  
        {cards.map((card) => (
  
          <div
            key={card.key}
  
            className="
            rounded-[32px]
  
            border border-white/20
  
            bg-white/30
            backdrop-blur-xl
  
            p-8
  
            shadow-lg
          "
          >
  
            <div className="text-4xl">
              {card.icon}
            </div>
  
            <p
              className="
              mt-5
              text-zinc-500
            "
            >
              {card.title}
            </p>
  
            <h2
              className="
              mt-2
  
              text-4xl
              font-black
            "
            >
              {
                card.key === "revenue"
                  ? `Rp ${Number(
                      stats[
                        card.key
                      ]
                    ).toLocaleString()}`
                  : stats[
                      card.key
                    ]
              }
            </h2>
  
          </div>
  
        ))}
  
      </div>
    );
  }