"use client";

export default function Navbar() {

  return (
    <header
      className="
      sticky
      top-0
      z-40

      mb-8
    "
    >

      <div
        className="
        flex
        flex-col
        md:flex-row

        md:items-center
        md:justify-between

        gap-5

        rounded-[32px]

        border border-white/20

        bg-white/30
        backdrop-blur-2xl

        shadow-[0_12px_40px_rgba(0,0,0,0.08)]

        px-6 py-5
      "
      >

        {/* LEFT */}
        <div
          className="
          flex items-center gap-4
        "
        >

          {/* MOBILE MENU BUTTON */}
          <button
            className="
            lg:hidden

            w-12 h-12

            rounded-2xl

            bg-white/40

            flex items-center justify-center

            text-2xl

            border border-white/20
          "
          >
            ☰
          </button>

          {/* SEARCH */}
          <div
            className="
            relative

            w-full
            md:w-[420px]
          "
          >

            <input
              type="text"
              placeholder="Search products, orders, analytics..."
              className="
              w-full

              py-4
              pl-14
              pr-5

              rounded-2xl

              border border-white/20

              bg-white/40
              backdrop-blur-xl

              outline-none

              text-zinc-800

              placeholder:text-zinc-400
            "
            />

            {/* ICON */}
            <div
              className="
              absolute

              left-5
              top-1/2
              -translate-y-1/2

              text-xl

              text-zinc-400
            "
            >
              🔍
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div
          className="
          flex items-center gap-4
        "
        >

          {/* NOTIFICATION */}
          <button
            className="
            relative

            w-14 h-14

            rounded-2xl

            bg-white/40
            backdrop-blur-xl

            border border-white/20

            flex items-center justify-center

            text-2xl

            shadow-lg

            hover:scale-105

            transition-all
          "
          >

            🔔

            {/* DOT */}
            <div
              className="
              absolute

              top-3 right-3

              w-3 h-3

              rounded-full

              bg-red-500
            "
            />

          </button>

          {/* PROFILE */}
          <div
            className="
            flex items-center gap-4

            rounded-2xl

            border border-white/20

            bg-white/40
            backdrop-blur-xl

            px-4 py-3

            shadow-lg
          "
          >

            {/* AVATAR */}
            <div
              className="
              w-14 h-14

              rounded-2xl

              bg-gradient-to-br
              from-orange-500
              to-amber-500

              flex items-center justify-center

              text-white
              text-2xl
              font-bold

              shadow-xl
            "
            >
              V
            </div>

            {/* INFO */}
            <div>

              <p
                className="
                text-sm

                text-zinc-500
              "
              >
                Seller Account
              </p>

              <h3
                className="
                font-black

                text-zinc-900
              "
              >
                Vendora Store
              </h3>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}