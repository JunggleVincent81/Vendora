"use client";

type ProductCardProps = {
  product: any;
  onDelete: (id: number) => void;
};

export default function ProductCard({
  product,
  onDelete
}: ProductCardProps) {

  const imageUrl = product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : "/placeholder.png";

  const stockStatus =
    product.stock <= 0
      ? "Out of Stock"
      : product.stock < 10
      ? "Low Stock"
      : "In Stock";

  return (
    <div
      className="
      group

      rounded-[36px]

      overflow-hidden

      border border-white/20

      bg-white/30
      backdrop-blur-2xl

      shadow-[0_20px_80px_rgba(0,0,0,0.12)]

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
      "
      >

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
          from-black/40
          via-black/0
          to-black/0
        "
        />

        {/* CATEGORY */}
        <div
          className="
          absolute

          top-5 left-5

          px-4 py-2

          rounded-full

          bg-white/30
          backdrop-blur-xl

          border border-white/20

          text-white
          text-xs
          font-semibold
        "
        >
          {product.category_name || "Product"}
        </div>

        {/* STOCK STATUS */}
        <div
          className={`
            absolute

            top-5 right-5

            px-4 py-2

            rounded-full

            backdrop-blur-xl

            border border-white/20

            text-xs
            font-semibold

            ${
              product.stock <= 0
                ? `
                  bg-red-500/30
                  text-white
                `
                : product.stock < 10
                ? `
                  bg-yellow-500/30
                  text-white
                `
                : `
                  bg-green-500/30
                  text-white
                `
            }
          `}
        >
          {stockStatus}
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-7">

        {/* TITLE */}
        <h2
          className="
          text-3xl

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
          mt-4

          text-zinc-600

          leading-relaxed

          line-clamp-2

          min-h-[48px]
        "
        >
          {product.description}
        </p>

        {/* PRICE */}
        <div className="mt-6">

          <p
            className="
            text-sm

            text-zinc-500
          "
          >
            Price
          </p>

          <h3
            className="
            mt-2

            text-4xl

            font-black

            text-zinc-900
          "
          >
            Rp {Number(product.price).toLocaleString("id-ID")}
          </h3>

        </div>

        {/* STOCK */}
        <div className="mt-5">

          <p
            className="
            text-sm

            text-zinc-500
          "
          >
            Remaining Stock
          </p>

          <h3
            className="
            mt-2

            text-2xl

            font-bold

            text-zinc-800
          "
          >
            {product.stock} pcs
          </h3>

        </div>

        {/* STORE */}
        <div
          className="
          mt-7

          flex items-center gap-4
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
            font-bold
            text-xl

            shadow-xl
          "
          >
            {product.store_name?.charAt(0) || "S"}
          </div>

          {/* STORE INFO */}
          <div>

            <p
              className="
              text-sm

              text-zinc-500
            "
            >
              Store
            </p>

            <h3
              className="
              font-bold

              text-zinc-900
            "
            >
              {product.store_name || "Vendora Store"}
            </h3>

          </div>

        </div>

        {/* ACTIONS */}
        <div
          className="
          mt-8

          flex gap-4
        "
        >

          {/* EDIT */}
          <button
            className="
            flex-1

            py-4

            rounded-2xl

            bg-white/40
            backdrop-blur-xl

            border border-white/20

            text-zinc-800
            font-bold

            shadow-lg

            hover:bg-white/60

            transition-all
          "
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => onDelete(product.id)}
            className="
            flex-1

            py-4

            rounded-2xl

            bg-gradient-to-r
            from-red-500
            to-orange-500

            text-white
            font-bold

            shadow-xl

            hover:scale-105

            transition-all
          "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}