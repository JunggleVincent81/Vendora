const categories = [
    {
      name: "Fashion",
      icon: "👕"
    },
    {
      name: "Food",
      icon: "🍜"
    },
    {
      name: "Electronics",
      icon: "💻"
    },
    {
      name: "Handcraft",
      icon: "🧶"
    },
    {
      name: "Coffee",
      icon: "☕"
    },
    {
      name: "Beauty",
      icon: "💄"
    }
  ];
  
  export default function Categories() {
  
    return (
      <section
        className="
        relative z-10
  
        px-8
        pb-24
      "
      >
  
        <div
          className="
          max-w-7xl
          mx-auto
        "
        >
  
          {/* HEADER */}
          <div className="mb-12">
  
            <h2
              className="
              text-4xl
  
              font-black
            "
            >
              Browse Categories
            </h2>
  
            <p
              className="
              mt-4
  
              text-zinc-600
              text-lg
            "
            >
              Explore products across marketplace categories.
            </p>
  
          </div>
  
          {/* GRID */}
          <div
            className="
            grid
  
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-6
  
            gap-6
          "
          >
  
            {categories.map((cat) => (
  
              <div
                key={cat.name}
  
                className="
                group
  
                rounded-[30px]
  
                border border-white/20
  
                bg-white/30
                backdrop-blur-2xl
  
                p-8
  
                shadow-xl
  
                hover:scale-[1.03]
  
                transition-all
  
                cursor-pointer
              "
              >
  
                <div className="text-5xl">
                  {cat.icon}
                </div>
  
                <h3
                  className="
                  mt-6
  
                  text-xl
  
                  font-black
                "
                >
                  {cat.name}
                </h3>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  }