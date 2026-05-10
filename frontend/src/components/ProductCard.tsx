"use client";

type ProductCardProps = {
  product: any;
  onAdd: (product: any) => void;
};

export default function ProductCard({
  product,
  onAdd
}: ProductCardProps) {
  return (
    <div
      className="
      group

      relative

      overflow-hidden

      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-xl

      shadow-[0_12px_40px_rgba(0,0,0,0.12)]

      hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]

      hover:-translate-y-2

      transition-all duration-300
    "
    >

      {/* IMAGE */}
      <div
        className="
        relative

        h-72

        overflow-hidden

        bg-gradient-to-br
        from-orange-100
        via-amber-50
        to-yellow-100
      "
      >

        {/* FAKE IMAGE PLACEHOLDER */}
        <div
          className="
          absolute inset-0

          flex items-center justify-center
        "
        >
          <div
            className="
            w-24 h-24

            rounded-3xl

            bg-white/40
            backdrop-blur-xl

            border border-white/20

            flex items-center justify-center

            shadow-xl
          "
          >
            <span className="text-4xl">
              🛍️
            </span>
          </div>
        </div>

        {/* GLOW */}
        <div
          className="
          absolute

          top-6 right-6

          w-20 h-20

          rounded-full

          bg-orange-300/30

          blur-2xl
        "
        />

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* CATEGORY */}
        <div
          className="
          inline-flex

          px-4 py-1.5

          rounded-full

          bg-orange-100/70

          text-orange-700
          text-xs
          font-semibold
        "
        >
          {product.category_name || "Local Product"}
        </div>

        {/* TITLE */}
        <h2
          className="
          mt-4

          text-2xl
          font-black

          text-zinc-900

          line-clamp-1
        "
        >
          {product.name}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
          mt-3

          text-zinc-600
          text-sm

          leading-relaxed

          line-clamp-2
        "
        >
          {product.description ||
            "Produk UMKM berkualitas dengan cita rasa lokal modern."}
        </p>

        {/* STORE */}
        <div
          className="
          mt-5

          flex items-center gap-3
        "
        >

          <div
            className="
            w-10 h-10

            rounded-2xl

            bg-gradient-to-br
            from-orange-500
            to-amber-500

            flex items-center justify-center

            text-white
            font-bold

            shadow-lg
          "
          >
            {product.store_name?.charAt(0) || "S"}
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Store
            </p>

            <p className="font-semibold text-zinc-800">
              {product.store_name || "Vendora Store"}
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
          mt-7

          flex items-center justify-between
        "
        >

          {/* PRICE */}
          <div>

            <p className="text-sm text-zinc-500">
              Price
            </p>

            <h3
              className="
              text-3xl

              font-black

              text-zinc-900
            "
            >
              Rp {product.price}
            </h3>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => onAdd(product)}
            className="
            px-6 py-3

            rounded-2xl

            bg-gradient-to-r
            from-orange-500
            to-amber-500

            text-white
            font-semibold

            shadow-lg

            hover:scale-105

            transition-all
          "
          >
            Add Cart
          </button>

        </div>

      </div>

    </div>
  );
}