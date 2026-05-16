"use client";

import {
  useEffect,
  useState
} from "react";

import { useParams }
from "next/navigation";

import Navbar
from "@/components/Navbar";

import FloatingBlobs
from "@/components/FloatingBlobs";

import { api }
from "@/services/api";

export default function ProductDetailPage() {

  const params = useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  // ==========================
  // FETCH PRODUCT
  // ==========================
  const fetchProduct =
    async () => {

      try {

        const res = await api(
          `/products/public/${params.id}`
        );

        setProduct(res);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ==========================
  // ADD TO CART
  // ==========================
  const addToCart = () => {

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing =
      cart.find(
        (item: any) =>
          item.product_id === product.id
      );

    if (existing) {

      existing.quantity += quantity;

    } else {

      cart.push({
        product_id: product.id,
        quantity
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added to cart");

  };

  if (loading) {

    return (
      <div className="p-20">
        Loading...
      </div>
    );

  }

  if (!product) {

    return (
      <div className="p-20">
        Product not found
      </div>
    );

  }

  return (
    <main
      className="
      relative

      min-h-screen

      overflow-hidden

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100
    "
    >

      <FloatingBlobs />

      <Navbar />

      <section
        className="
        relative z-10

        px-8
        py-20
      "
      >

        <div
          className="
          max-w-7xl
          mx-auto

          grid
          lg:grid-cols-2

          gap-16
        "
        >

          {/* IMAGE */}
          <div
            className="
            rounded-[40px]

            overflow-hidden

            border border-white/20

            bg-white/30
            backdrop-blur-xl

            shadow-2xl
          "
          >

            <div
              className="
              aspect-square

              bg-gradient-to-br
              from-orange-200
              via-amber-100
              to-yellow-100
            "
            />

          </div>

          {/* CONTENT */}
          <div>

            {/* STORE */}
            <div
              className="
              inline-flex

              px-5 py-2

              rounded-full

              bg-orange-100

              text-orange-700
              text-sm
              font-semibold
            "
            >
              {product.store_name}
            </div>

            {/* TITLE */}
            <h1
              className="
              mt-6

              text-5xl
              lg:text-6xl

              font-black

              leading-tight

              text-zinc-900
            "
            >
              {product.name}
            </h1>

            {/* PRICE */}
            <h2
              className="
              mt-8

              text-5xl

              font-black

              text-orange-500
            "
            >
              Rp{" "}
              {Number(
                product.price
              ).toLocaleString()}
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
              mt-8

              text-lg

              leading-relaxed

              text-zinc-600
            "
            >
              {product.description}
            </p>

            {/* STOCK */}
            <div
              className="
              mt-8

              flex items-center
              gap-4
            "
            >

              <div
                className="
                px-5 py-3

                rounded-2xl

                bg-white/40
                backdrop-blur-xl

                border border-white/20
              "
              >
                Stock:{" "}
                <span className="font-bold">
                  {product.stock}
                </span>
              </div>

              <div
                className="
                px-5 py-3

                rounded-2xl

                bg-green-100

                text-green-700
                font-semibold
              "
              >
                Available
              </div>

            </div>

            {/* QUANTITY */}
            <div className="mt-10">

              <p
                className="
                mb-4

                font-semibold
              "
              >
                Quantity
              </p>

              <div
                className="
                flex items-center gap-4
              "
              >

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }

                  className="
                  w-14 h-14

                  rounded-2xl

                  bg-white/40
                  backdrop-blur-xl

                  border border-white/20

                  text-2xl
                  font-bold
                "
                >
                  -
                </button>

                <div
                  className="
                  w-20 h-14

                  rounded-2xl

                  flex items-center
                  justify-center

                  bg-white/40
                  backdrop-blur-xl

                  border border-white/20

                  text-xl
                  font-bold
                "
                >
                  {quantity}
                </div>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }

                  className="
                  w-14 h-14

                  rounded-2xl

                  bg-white/40
                  backdrop-blur-xl

                  border border-white/20

                  text-2xl
                  font-bold
                "
                >
                  +
                </button>

              </div>

            </div>

            {/* ACTIONS */}
            <div
              className="
              mt-12

              flex flex-wrap gap-5
            "
            >

              <button
                onClick={addToCart}

                className="
                px-10 py-5

                rounded-3xl

                bg-gradient-to-r
                from-orange-500
                to-amber-500

                text-white
                text-lg
                font-bold

                shadow-2xl

                hover:scale-[1.02]

                transition-all
              "
              >
                Add To Cart
              </button>

              <button
                className="
                px-10 py-5

                rounded-3xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                text-zinc-700
                text-lg
                font-semibold
              "
              >
                Buy Now
              </button>

            </div>

            {/* STORE INFO */}
            <div
              className="
              mt-16

              rounded-[32px]

              border border-white/20

              bg-white/30
              backdrop-blur-xl

              p-8

              shadow-xl
            "
            >

              <h3
                className="
                text-2xl
                font-black
              "
              >
                About Store
              </h3>

              <p
                className="
                mt-4

                text-zinc-600

                leading-relaxed
              "
              >
                {
                  product.store_description
                }
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}