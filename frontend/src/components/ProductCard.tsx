"use client";

type ProductCardProps = {
  product: any;
  onAdd: (product: any) => void;
};

export default function ProductCard({
  product,
  onAdd
}: ProductCardProps) {

  const imageUrl = product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : "/placeholder.png";

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

      {/* IMAGE SECTION */}
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

        {/* PRODUCT IMAGE */}
        <img
          src={imageUrl}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover

            group-hover:scale-110

            transition-transform duration-500
          "
        />

        {/* OVERLAY */}
        <div
          className="
          absolute inset-0

          bg-gradient-to-t
          from-black/10
          to-transparent
        "
        />

        {/* CATEGORY BADGE */}
        <div
          className="
          absolute

          top-5 left-5

          px-4 py-1.5

          rounded-full

          border border-white/20

          bg-white/40
          backdrop-blur-xl

          text-xs
          font-semibold

          text-zinc-800

          shadow-lg
        "
        >
          {product.category_name || "Local Product"}
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

        {/* TITLE */}
        <h2
          className="
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

          min-h-[44px]
        "
        >
          {product.description ||
            "Produk UMKM berkualitas dengan cita rasa lokal modern."}
        </p>

        {/* STORE */}
        <div
          className="
          mt-6

          flex items-center gap-3
        "
        >

          {/* STORE ICON */}
          <div
            className="
            w-11 h-11

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

          {/* STORE INFO */}
          <div>

            <p className="text-sm text-zinc-500">
              Store
            </p>

            <p
              className="
              font-semibold

              text-zinc-800

              line-clamp-1
            "
            >
              {product.store_name || "Vendora Store"}
            </p>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
          mt-8

          flex items-end justify-between
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
              Rp {Number(product.price).toLocaleString("id-ID")}
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

            active:scale-95

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