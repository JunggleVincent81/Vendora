import Link from "next/link";

export default function PendingStores({
  stores
}: any) {

  return (
    <div
      className="
      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-xl

      p-8

      shadow-lg
    "
    >

      {/* HEADER */}
      <div
        className="
        flex
        items-center
        justify-between
      "
      >

        <div>

          <h2
            className="
            text-2xl
            font-black
          "
          >
            Pending Stores 🏪
          </h2>

          <p
            className="
            mt-2
            text-zinc-500
          "
          >
            Seller verification queue
          </p>

        </div>

        <Link
          href="/dashboard/admin/stores"

          className="
          text-orange-600
          font-bold
        "
        >
          View All
        </Link>

      </div>

      {/* LIST */}
      <div className="mt-8 space-y-5">

        {stores?.length === 0 ? (

          <div
            className="
            rounded-2xl

            bg-white/40

            p-6

            text-center
            text-zinc-500
          "
          >
            No pending stores.
          </div>

        ) : (

          stores?.map(
            (store: any) => (

              <div
                key={store.id}

                className="
                flex
                items-center
                justify-between

                border-b
                border-white/10

                pb-5
              "
              >

                <div>

                  <h3
                    className="
                    font-black
                    text-lg
                  "
                  >
                    {store.name}
                  </h3>

                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    {store.description}
                  </p>

                </div>

                <span
                  className="
                  px-4 py-2

                  rounded-full

                  bg-yellow-100

                  text-yellow-700
                  text-sm
                  font-bold
                "
                >
                  Pending
                </span>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}