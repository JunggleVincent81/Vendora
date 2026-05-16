import Link from "next/link";

export default function ProductCard({
  product
}: any) {

  return (
    <Link
      href={`/products/${product.id}`}

      className="
      group

      rounded-[32px]

      border border-white/20

      bg-white/40
      backdrop-blur-xl

      overflow-hidden

      shadow-lg

      hover:scale-[1.02]

      transition-all
    "
    >

      {/* IMAGE */}
      <div
        className="
        aspect-square

        bg-gradient-to-br
        from-orange-100
        to-amber-100
      "
      />

      {/* CONTENT */}
      <div className="p-6">

        <p
          className="
          text-sm
          text-orange-500
          font-bold
        "
        >
          {product.store_name}
        </p>

        <h2
          className="
          mt-3

          text-2xl
          font-black
        "
        >
          {product.name}
        </h2>

        <p
          className="
          mt-3

          text-zinc-500
          line-clamp-2
        "
        >
          {product.description}
        </p>

        <div
          className="
          mt-6

          flex
          items-center
          justify-between
        "
        >

          <p
            className="
            text-2xl
            font-black

            text-orange-500
          "
          >
            Rp{" "}
            {Number(
              product.price
            ).toLocaleString()}
          </p>

          <button
            className="
            px-5 py-3

            rounded-2xl

            bg-orange-500

            text-white
            font-bold
          "
          >
            View
          </button>

        </div>

      </div>

    </Link>
  );
}