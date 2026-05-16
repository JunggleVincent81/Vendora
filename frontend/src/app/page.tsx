"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import FloatingBlobs from "@/components/FloatingBlobs";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

import { api } from "@/services/api";

export default function HomePage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("latest");

  // ==========================
  // FETCH PRODUCTS
  // ==========================
  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res =
        await api("/products/public");

      if (Array.isArray(res)) {

        setProducts(res);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================
  // CATEGORIES
  // ==========================
  const categories = useMemo(() => {

    const unique =
      Array.from(
        new Set(
          products.map(
            (p) =>
              p.category ||
              "Uncategorized"
          )
        )
      );

    return ["all", ...unique];

  }, [products]);

  // ==========================
  // FILTER + SEARCH + SORT
  // ==========================
  const filteredProducts =
    useMemo(() => {

      let filtered = [...products];

      // SEARCH
      if (search.trim()) {

        filtered =
          filtered.filter((product) =>
            [
              product.name,
              product.description,
              product.store_name
            ]
              .join(" ")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );

      }

      // CATEGORY
      if (
        selectedCategory !== "all"
      ) {

        filtered =
          filtered.filter(
            (product) =>
              (product.category ||
                "Uncategorized") ===
              selectedCategory
          );

      }

      // SORT
      if (sortBy === "price_low") {

        filtered.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );

      }

      if (sortBy === "price_high") {

        filtered.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );

      }

      if (sortBy === "latest") {

        filtered.sort(
          (a, b) =>
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
        );

      }

      return filtered;

    }, [
      products,
      search,
      selectedCategory,
      sortBy
    ]);

  // ==========================
  // ADD TO CART
  // ==========================
  const addToCart = (
    product: any
  ) => {

    const cart = JSON.parse(
      localStorage.getItem("cart") ||
        "[]"
    );

    const existing =
      cart.find(
        (item: any) =>
          item.product_id === product.id
      );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({
        product_id: product.id,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(
      `${product.name} added to cart`
    );

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

      {/* MARKETPLACE */}
      <section
        className="
        relative z-10

        px-6 lg:px-8
        pb-28
      "
      >

        <div
          className="
          max-w-7xl
          mx-auto
        "
        >

          {/* TOP HEADER */}
          <div
            className="
            flex flex-col
            xl:flex-row

            xl:items-end
            xl:justify-between

            gap-10

            mb-14
          "
          >

            {/* LEFT */}
            <div>

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
                ✨ Curated Marketplace
              </div>

              <h1
                className="
                mt-6

                text-4xl
                lg:text-6xl

                leading-tight

                font-black

                text-zinc-900
              "
              >
                Discover Products
                <br />
                From Local UMKM
              </h1>

              <p
                className="
                mt-5

                max-w-2xl

                text-lg

                leading-relaxed

                text-zinc-600
              "
              >
                Explore modern local commerce —
                handcrafted products,
                village businesses,
                independent creators,
                and premium UMKM brands.
              </p>

            </div>

            {/* RIGHT */}
            <div
              className="
              flex flex-col

              gap-4

              w-full
              xl:w-auto
            "
            >

              {/* SEARCH */}
              <div
                className="
                flex items-center gap-3

                rounded-3xl

                border border-white/20

                bg-white/40
                backdrop-blur-2xl

                px-5 py-4

                shadow-xl
              "
              >

                <span className="text-xl">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search products, stores..."
                  className="
                  bg-transparent

                  w-full
                  md:w-[320px]

                  outline-none

                  placeholder:text-zinc-400
                "
                />

              </div>

              {/* FILTERS */}
              <div
                className="
                flex flex-wrap

                gap-3
              "
              >

                {/* CATEGORY */}
                <select
                  value={
                    selectedCategory
                  }
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }
                  className="
                  px-5 py-4

                  rounded-2xl

                  border border-white/20

                  bg-white/40
                  backdrop-blur-xl

                  shadow-lg

                  outline-none
                "
                >

                  {categories.map(
                    (category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>

                    )
                  )}

                </select>

                {/* SORT */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="
                  px-5 py-4

                  rounded-2xl

                  border border-white/20

                  bg-white/40
                  backdrop-blur-xl

                  shadow-lg

                  outline-none
                "
                >

                  <option value="latest">
                    Latest
                  </option>

                  <option value="price_low">
                    Price: Low → High
                  </option>

                  <option value="price_high">
                    Price: High → Low
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* MARKETPLACE STATS */}
          <div
            className="
            grid

            grid-cols-2
            lg:grid-cols-4

            gap-5

            mb-14
          "
          >

            <StatCard
              label="Products"
              value={products.length}
            />

            <StatCard
              label="Sellers"
              value="120+"
            />

            <StatCard
              label="Transactions"
              value="12K+"
            />

            <StatCard
              label="Growth"
              value="+320%"
            />

          </div>

          {/* FILTER BAR */}
          <div
            className="
            flex flex-col
            md:flex-row

            md:items-center
            md:justify-between

            gap-5

            mb-8
          "
          >

            <div
              className="
              flex items-center gap-3
            "
            >

              <div
                className="
                w-3 h-3

                rounded-full

                bg-green-500
              "
              />

              <p
                className="
                text-zinc-700
                font-medium
              "
              >
                Showing{" "}
                <span className="font-black">
                  {
                    filteredProducts.length
                  }
                </span>{" "}
                products
              </p>

            </div>

            <button
              onClick={fetchProducts}
              className="
              px-6 py-3

              rounded-2xl

              bg-gradient-to-r
              from-orange-500
              to-amber-500

              text-white
              font-bold

              shadow-xl

              hover:scale-[1.02]

              transition-all
            "
            >
              Refresh Marketplace
            </button>

          </div>

          {/* PRODUCTS */}
          {
            loading ? (

              <div
                className="
                grid

                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4

                gap-8
              "
              >

                {
                  [...Array(8)].map(
                    (_, i) => (

                      <div
                        key={i}
                        className="
                        h-[430px]

                        rounded-[36px]

                        bg-white/30

                        animate-pulse
                      "
                      />

                    )
                  )
                }

              </div>

            ) : filteredProducts.length === 0 ? (

              <div
                className="
                flex flex-col
                items-center
                justify-center

                py-32
              "
              >

                <div className="text-8xl">
                  📦
                </div>

                <h2
                  className="
                  mt-8

                  text-4xl

                  font-black
                "
                >
                  No Products Found
                </h2>

                <p
                  className="
                  mt-4

                  text-zinc-500
                  text-lg
                "
                >
                  Try changing search or filters.
                </p>

              </div>

            ) : (

              <div
                className="
                grid

                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4

                gap-8
              "
              >

                {
                  filteredProducts.map(
                    (product) => (

                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addToCart}
                      />

                    )
                  )
                }

              </div>

            )
          }

        </div>

      </section>

      {/* CTA */}
      <section
        className="
        relative z-10

        px-6 lg:px-8
        pb-32
      "
      >

        <div
          className="
          max-w-7xl
          mx-auto

          rounded-[48px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.12)]

          overflow-hidden

          p-10 lg:p-16
        "
        >

          <div
            className="
            grid
            lg:grid-cols-2

            gap-14

            items-center
          "
          >

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

                text-4xl
                lg:text-6xl

                leading-tight

                font-black

                text-zinc-900
              "
              >
                Build Your Digital
                Marketplace Store
              </h2>

              <p
                className="
                mt-6

                text-lg

                leading-relaxed

                text-zinc-600
              "
              >
                Create modern digital stores,
                scale local commerce,
                and connect directly with
                customers across Indonesia.
              </p>

              <div
                className="
                flex flex-wrap

                gap-5

                mt-10
              "
              >

                <Link
                  href="/register"
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
                </Link>

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
                  Explore Marketplace
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="relative">

              <div
                className="
                aspect-square

                rounded-[48px]

                bg-gradient-to-br
                from-orange-200
                via-amber-100
                to-yellow-100

                shadow-2xl
              "
              />

              {/* FLOAT CARD */}
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

                px-7 py-6
              "
              >

                <p
                  className="
                  text-sm
                  text-zinc-500
                "
                >
                  Marketplace Revenue Growth
                </p>

                <h3
                  className="
                  mt-2

                  text-5xl

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

/* ==========================
   STAT CARD
========================== */
function StatCard({
  label,
  value
}: any) {

  return (
    <div
      className="
      rounded-[30px]

      border border-white/20

      bg-white/30
      backdrop-blur-2xl

      p-6

      shadow-xl
    "
    >

      <p
        className="
        text-zinc-500
        font-medium
      "
      >
        {label}
      </p>

      <h3
        className="
        mt-3

        text-4xl

        font-black

        text-zinc-900
      "
      >
        {value}
      </h3>

    </div>
  );
}