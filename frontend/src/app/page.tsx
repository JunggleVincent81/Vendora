"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import FloatingBlobs from "@/components/FloatingBlobs";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

import { api } from "@/services/api";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api("/products");

      if (Array.isArray(res)) {
        setProducts(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (product: any) => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    cart.push({
      product_id: product.id,
      quantity: 1
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart");
  };

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

      {/* BACKGROUND */}
      <FloatingBlobs />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* FEATURED PRODUCTS */}
      <section className="relative z-10 px-8 pb-28">

        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div
            className="
            flex flex-col lg:flex-row
            lg:items-end
            lg:justify-between

            gap-6

            mb-14
          "
          >

            <div>

              <div
                className="
                inline-flex items-center gap-2

                px-5 py-2

                rounded-full

                border border-white/20

                bg-white/30
                backdrop-blur-xl

                text-sm text-zinc-700

                shadow-lg
              "
              >
                Featured Marketplace Products
              </div>

              <h2
                className="
                mt-6

                text-4xl lg:text-5xl

                font-black

                text-zinc-900
              "
              >
                Discover Local Marketplace
              </h2>

              <p
                className="
                mt-4

                text-zinc-600
                text-lg

                max-w-2xl
              "
              >
                Explore curated products from local UMKM,
                village businesses, and independent sellers.
              </p>

            </div>

            {/* VIEW ALL */}
            <button
              className="
              self-start

              px-6 py-3

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
              View All Products
            </button>

          </div>

          {/* PRODUCT GRID */}
          <div
            className="
            grid

            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-8
          "
          >

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-8 pb-32">

        <div
          className="
          max-w-7xl
          mx-auto

          rounded-[40px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.12)]

          overflow-hidden

          p-10 lg:p-16
        "
        >

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <div
                className="
                inline-flex

                px-5 py-2

                rounded-full

                bg-orange-100/70

                text-orange-700
                text-sm
                font-semibold
              "
              >
                Join Digital Commerce Revolution
              </div>

              <h2
                className="
                mt-6

                text-4xl lg:text-6xl

                font-black

                leading-tight

                text-zinc-900
              "
              >
                Grow Your UMKM With Modern Marketplace
              </h2>

              <p
                className="
                mt-6

                text-lg

                leading-relaxed

                text-zinc-600
              "
              >
                Bangun toko digital modern untuk bisnis lokal,
                UMKM desa, dan produk kreatif melalui platform
                marketplace multi-vendor modern.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">

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
                  Start Selling
                </button>

                <button
                  className="
                  px-8 py-4

                  rounded-2xl

                  border border-white/20

                  bg-white/30
                  backdrop-blur-xl

                  text-zinc-700
                  font-semibold
                "
                >
                  Learn More
                </button>

              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">

              <div
                className="
                aspect-square

                rounded-[40px]

                bg-gradient-to-br
                from-orange-200
                via-amber-100
                to-yellow-100

                shadow-2xl
              "
              />

              {/* FLOATING CARD */}
              <div
                className="
                absolute

                bottom-8
                left-8

                rounded-3xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                shadow-2xl

                px-6 py-5
              "
              >

                <p className="text-sm text-zinc-500">
                  Marketplace Revenue Growth
                </p>

                <h3
                  className="
                  mt-2

                  text-4xl

                  font-black

                  text-zinc-900
                "
                >
                  +320%
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}