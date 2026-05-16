"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  getToken
} from "@/services/auth";

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("all");

  // ==========================
  // FETCH PRODUCTS
  // ==========================
  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:5000/api/v1/admin/products",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

        // FIX:
        // products.map is not a function
        setProducts(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

        setProducts([]);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================
  // UPDATE STATUS
  // ==========================
  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/v1/admin/products/${id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${getToken()}`
            },

            body: JSON.stringify({
              status
            })
          }
        );

        const data =
          await res.json();

        alert(data.message);

        fetchProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Failed updating product"
        );

      }

    };

  // ==========================
  // FILTERED PRODUCTS
  // ==========================
  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) => {

          const matchSearch =
            product.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            product.store_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchStatus =
            filterStatus === "all"
              ? true
              : product.status ===
                filterStatus;

          return (
            matchSearch &&
            matchStatus
          );

        }
      );

    }, [
      products,
      search,
      filterStatus
    ]);

  // ==========================
  // STATS
  // ==========================
  const stats = {

    total:
      products.length,

    approved:
      products.filter(
        (p) =>
          p.status ===
          "approved"
      ).length,

    hidden:
      products.filter(
        (p) =>
          p.status ===
          "hidden"
      ).length,

    rejected:
      products.filter(
        (p) =>
          p.status ===
          "rejected"
      ).length

  };

  if (loading) {

    return (
      <div className="p-10">

        <div className="grid md:grid-cols-4 gap-6">

          {[...Array(4)].map(
            (_, i) => (

              <div
                key={i}
                className="
                h-36

                rounded-[32px]

                bg-white/40

                animate-pulse
              "
              />

            )
          )}

        </div>

      </div>
    );

  }

  return (
    <div className="space-y-10">

      {/* =======================
          HEADER
      ======================== */}
      <div>

        <div
          className="
          inline-flex
          items-center
          gap-2

          px-5 py-2

          rounded-full

          bg-orange-100

          text-orange-700
          text-sm
          font-bold
        "
        >
          📦 Marketplace Moderation
        </div>

        <h1
          className="
          mt-5

          text-5xl

          font-black

          text-zinc-900
        "
        >
          Product Moderation
        </h1>

        <p
          className="
          mt-3

          text-zinc-500
          text-lg
        "
        >
          Review and control
          marketplace products.
        </p>

      </div>

      {/* =======================
          STATS
      ======================== */}
      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-4

        gap-6
      "
      >

        <StatCard
          title="Total Products"
          value={stats.total}
          icon="📦"
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          icon="✅"
        />

        <StatCard
          title="Hidden"
          value={stats.hidden}
          icon="👁️"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon="❌"
        />

      </div>

      {/* =======================
          FILTER BAR
      ======================== */}
      <div
        className="
        flex
        flex-col
        lg:flex-row

        lg:items-center
        lg:justify-between

        gap-5
      "
      >

        {/* SEARCH */}
        <input
          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Search product or store..."

          className="
          w-full
          lg:w-[400px]

          px-6 py-4

          rounded-2xl

          border border-white/20

          bg-white/40
          backdrop-blur-xl

          outline-none

          shadow-lg
        "
        />

        {/* FILTER */}
        <div className="flex gap-3 flex-wrap">

          {[
            "all",
            "approved",
            "hidden",
            "rejected"
          ].map((status) => (

            <button
              key={status}

              onClick={() =>
                setFilterStatus(status)
              }

              className={`
                px-5 py-3

                rounded-2xl

                font-bold

                transition-all

                ${
                  filterStatus ===
                  status
                    ? `
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500

                      text-white

                      shadow-xl
                    `
                    : `
                      bg-white/40
                      backdrop-blur-xl

                      text-zinc-700
                    `
                }
              `}
            >
              {status}
            </button>

          ))}

        </div>

      </div>

      {/* =======================
          PRODUCTS
      ======================== */}
      <div className="grid gap-6">

        {filteredProducts.length === 0 ? (

          <div
            className="
            rounded-[32px]

            border border-white/20

            bg-white/30
            backdrop-blur-xl

            p-20

            text-center

            text-zinc-500
          "
          >
            No products found
          </div>

        ) : (

          filteredProducts.map(
            (product) => (

              <div
                key={product.id}

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
                  flex-col
                  lg:flex-row

                  lg:items-start
                  lg:justify-between

                  gap-6
                "
                >

                  <div>

                    <h2
                      className="
                      text-3xl
                      font-black
                    "
                    >
                      {product.name}
                    </h2>

                    <p
                      className="
                      mt-3

                      text-zinc-500

                      leading-relaxed
                    "
                    >
                      {
                        product.description
                      }
                    </p>

                  </div>

                  <span
                    className={`
                      px-5 py-3

                      rounded-full

                      text-sm
                      font-bold

                      h-fit

                      ${
                        product.status ===
                        "approved"
                          ? `
                            bg-green-100
                            text-green-700
                          `
                          : product.status ===
                            "hidden"
                          ? `
                            bg-yellow-100
                            text-yellow-700
                          `
                          : `
                            bg-red-100
                            text-red-700
                          `
                      }
                    `}
                  >
                    {product.status}
                  </span>

                </div>

                {/* INFO */}
                <div
                  className="
                  mt-8

                  grid
                  md:grid-cols-3

                  gap-6
                "
                >

                  <InfoCard
                    label="Store"
                    value={
                      product.store_name
                    }
                  />

                  <InfoCard
                    label="Price"
                    value={`Rp ${Number(
                      product.price
                    ).toLocaleString()}`}
                  />

                  <InfoCard
                    label="Stock"
                    value={
                      product.stock || 0
                    }
                  />

                </div>

                {/* ACTIONS */}
                <div
                  className="
                  mt-8

                  flex
                  flex-wrap

                  gap-4
                "
                >

                  <button
                    onClick={() =>
                      updateStatus(
                        product.id,
                        "approved"
                      )
                    }

                    className="
                    px-6 py-3

                    rounded-2xl

                    bg-green-500

                    text-white
                    font-bold

                    shadow-lg
                  "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        product.id,
                        "hidden"
                      )
                    }

                    className="
                    px-6 py-3

                    rounded-2xl

                    bg-yellow-500

                    text-white
                    font-bold

                    shadow-lg
                  "
                  >
                    Hide
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        product.id,
                        "rejected"
                      )
                    }

                    className="
                    px-6 py-3

                    rounded-2xl

                    bg-red-500

                    text-white
                    font-bold

                    shadow-lg
                  "
                  >
                    Reject
                  </button>

                </div>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

// ==========================
// STAT CARD
// ==========================
function StatCard({
  title,
  value,
  icon
}: any) {

  return (
    <div
      className="
      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-xl

      p-7

      shadow-lg
    "
    >

      <div className="text-4xl">
        {icon}
      </div>

      <p
        className="
        mt-5

        text-zinc-500
      "
      >
        {title}
      </p>

      <h2
        className="
        mt-2

        text-4xl

        font-black
      "
      >
        {value}
      </h2>

    </div>
  );
}

// ==========================
// INFO CARD
// ==========================
function InfoCard({
  label,
  value
}: any) {

  return (
    <div
      className="
      rounded-2xl

      bg-white/40

      p-5
    "
    >

      <p
        className="
        text-sm
        text-zinc-500
      "
      >
        {label}
      </p>

      <h3
        className="
        mt-2

        text-lg

        font-bold
      "
      >
        {value}
      </h3>

    </div>
  );
}