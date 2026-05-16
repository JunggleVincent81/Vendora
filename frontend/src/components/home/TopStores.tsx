const stores = [
    {
      name: "Kopi Desa",
      description:
        "Premium local coffee marketplace.",
      emoji: "☕"
    },
    {
      name: "Toko Nusantara",
      description:
        "UMKM products from villages.",
      emoji: "🏪"
    },
    {
      name: "Batik Heritage",
      description:
        "Traditional Indonesian fashion.",
      emoji: "🧵"
    }
  ];
  
  export default function TopStores() {
  
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
        "
        >
  
          {/* HEADER */}
          <div className="mb-14">
  
            <h2
              className="
              text-5xl
  
              font-black
            "
            >
              Top Sellers
            </h2>
  
            <p
              className="
              mt-4
  
              text-zinc-600
              text-lg
            "
            >
              Trusted marketplace sellers with growing communities.
            </p>
  
          </div>
  
          {/* GRID */}
          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
  
            gap-8
          "
          >
  
            {stores.map((store) => (
  
              <div
                key={store.name}
  
                className="
                rounded-[36px]
  
                border border-white/20
  
                bg-white/30
                backdrop-blur-2xl
  
                p-8
  
                shadow-2xl
              "
              >
  
                <div className="text-6xl">
                  {store.emoji}
                </div>
  
                <h3
                  className="
                  mt-6
  
                  text-3xl
  
                  font-black
                "
                >
                  {store.name}
                </h3>
  
                <p
                  className="
                  mt-4
  
                  text-zinc-600
  
                  leading-relaxed
                "
                >
                  {store.description}
                </p>
  
                <button
                  className="
                  mt-8
  
                  px-6 py-4
  
                  rounded-2xl
  
                  bg-gradient-to-r
                  from-orange-500
                  to-amber-500
  
                  text-white
                  font-semibold
                "
                >
                  Visit Store
                </button>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  }