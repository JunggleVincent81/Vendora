export default function Hero() {
    return (
      <section className="relative pt-44 pb-28 px-8">
  
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
  
          {/* LEFT CONTENT */}
          <div>
  
            {/* BADGE */}
            <div
              className="
              inline-flex items-center gap-2
  
              px-5 py-2
  
              rounded-full
  
              border border-white/20
              bg-white/30
              backdrop-blur-xl
  
              text-sm
              text-zinc-700
  
              shadow-lg
            "
            >
              <span className="w-2 h-2 rounded-full bg-orange-500" />
  
              Marketplace UMKM Modern
            </div>
  
            {/* TITLE */}
            <h1
              className="
              mt-8
  
              text-5xl
              lg:text-7xl
  
              leading-tight
  
              font-black
  
              text-zinc-900
            "
            >
              Discover Local Products With Modern Marketplace Experience
            </h1>
  
            {/* DESCRIPTION */}
            <p
              className="
              mt-8
  
              text-lg
              leading-relaxed
  
              text-zinc-600
  
              max-w-2xl
            "
            >
              Vendora membantu UMKM dan bisnis desa membangun
              toko digital modern dengan sistem marketplace multi-vendor
              yang scalable, modern, dan mudah digunakan.
            </p>
  
            {/* CTA */}
            <div className="flex flex-wrap gap-5 mt-10">
  
              {/* PRIMARY */}
              <button
                className="
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
                Explore Marketplace
              </button>
  
              {/* SECONDARY */}
              <button
                className="
                px-8 py-4
  
                rounded-2xl
  
                border border-white/20
  
                bg-white/30
                backdrop-blur-xl
  
                text-zinc-700
                font-semibold
  
                hover:bg-white/40
                transition-all
              "
              >
                Become Seller
              </button>
  
            </div>
  
            {/* STATS */}
            <div className="flex gap-10 mt-14">
  
              <div>
                <h3 className="text-3xl font-black text-zinc-900">
                  120+
                </h3>
  
                <p className="text-zinc-600 mt-1">
                  Local Products
                </p>
              </div>
  
              <div>
                <h3 className="text-3xl font-black text-zinc-900">
                  40+
                </h3>
  
                <p className="text-zinc-600 mt-1">
                  UMKM Stores
                </p>
              </div>
  
              <div>
                <h3 className="text-3xl font-black text-zinc-900">
                  15+
                </h3>
  
                <p className="text-zinc-600 mt-1">
                  Village Partners
                </p>
              </div>
  
            </div>
  
          </div>
  
          {/* RIGHT VISUAL */}
          <div className="relative">
  
            {/* MAIN GLASS CARD */}
            <div
              className="
              relative
  
              rounded-[40px]
  
              border border-white/20
  
              bg-white/30
              backdrop-blur-2xl
  
              shadow-[0_20px_80px_rgba(0,0,0,0.15)]
  
              p-8
            "
            >
  
              {/* GRID */}
              <div className="grid grid-cols-2 gap-5">
  
                {/* CARD 1 */}
                <div
                  className="
                  h-52
  
                  rounded-3xl
  
                  bg-gradient-to-br
                  from-orange-200
                  to-orange-100
  
                  shadow-lg
                "
                />
  
                {/* CARD 2 */}
                <div
                  className="
                  h-72
  
                  rounded-3xl
  
                  bg-gradient-to-br
                  from-amber-200
                  to-yellow-100
  
                  shadow-lg
                "
                />
  
                {/* CARD 3 */}
                <div
                  className="
                  h-64
  
                  rounded-3xl
  
                  bg-gradient-to-br
                  from-yellow-100
                  to-orange-50
  
                  shadow-lg
                "
                />
  
                {/* CARD 4 */}
                <div
                  className="
                  h-44
  
                  rounded-3xl
  
                  bg-gradient-to-br
                  from-orange-100
                  to-amber-50
  
                  shadow-lg
                "
                />
  
              </div>
  
            </div>
  
            {/* FLOATING SMALL CARD */}
            <div
              className="
              absolute
  
              -bottom-10
              -left-10
  
              rounded-3xl
  
              border border-white/20
  
              bg-white/30
              backdrop-blur-xl
  
              shadow-2xl
  
              px-6 py-5
            "
            >
  
              <p className="text-sm text-zinc-500">
                Active Marketplace Growth
              </p>
  
              <h3 className="text-3xl font-black text-zinc-900 mt-2">
                +240%
              </h3>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }