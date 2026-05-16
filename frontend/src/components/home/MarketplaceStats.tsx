export default function MarketplaceStats() {

    const stats = [
      {
        label: "Active Sellers",
        value: "2.5K+"
      },
      {
        label: "Products",
        value: "18K+"
      },
      {
        label: "Orders",
        value: "120K+"
      },
      {
        label: "Revenue",
        value: "Rp 8.2B"
      }
    ];
  
    return (
      <section
        className="
        relative z-10
  
        px-8
        pb-28
      "
      >
  
        <div
          className="
          max-w-7xl
          mx-auto
  
          rounded-[40px]
  
          border border-white/20
  
          bg-white/30
          backdrop-blur-2xl
  
          p-10
  
          shadow-2xl
        "
        >
  
          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
  
            gap-8
          "
          >
  
            {stats.map((stat) => (
  
              <div key={stat.label}>
  
                <h2
                  className="
                  text-5xl
  
                  font-black
  
                  text-orange-500
                "
                >
                  {stat.value}
                </h2>
  
                <p
                  className="
                  mt-4
  
                  text-zinc-600
                  text-lg
                "
                >
                  {stat.label}
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  }