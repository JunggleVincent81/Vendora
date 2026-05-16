"use client";

export default function Navbar() {

  return (
    <div
      className="
      flex items-center justify-between

      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-2xl

      p-6

      shadow-lg
    "
    >

      {/* LEFT */}
      <div>

        <h1
          className="
          text-3xl
          font-black
        "
        >
          Admin Dashboard
        </h1>

        <p
          className="
          mt-2
          text-zinc-500
        "
        >
          Monitor platform activity and manage marketplace operations.
        </p>

      </div>

      {/* RIGHT */}
      <div
        className="
        flex items-center gap-4
      "
      >

        <button
          className="
          w-14 h-14

          rounded-2xl

          bg-white/40

          text-2xl
        "
        >
          🔔
        </button>

        <div
          className="
          flex items-center gap-4

          rounded-2xl

          bg-white/40

          px-5 py-3
        "
        >

          <div
            className="
            w-12 h-12

            rounded-2xl

            bg-gradient-to-br
            from-red-500
            to-orange-500

            flex items-center justify-center

            text-white
            font-bold
          "
          >
            A
          </div>

          <div>

            <p className="font-bold">
              Admin
            </p>

            <p
              className="
              text-sm
              text-zinc-500
            "
            >
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}