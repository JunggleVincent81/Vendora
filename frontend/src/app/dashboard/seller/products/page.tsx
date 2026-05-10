"use client";

import { useEffect, useState } from "react";

import ProductToolbar from "@/components/dashboard/products/ProductToolbar";
import ProductCard from "@/components/dashboard/products/ProductCard";

export default function SellerProductsPage() {

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await res.json();

      setProducts(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      alert(data.message);

      fetchProducts();

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

  return (
    <div>

      {/* TOOLBAR */}
      <ProductToolbar />

      {/* ANALYTICS MINI */}
      <div
        className="
        mt-10

        grid
        md:grid-cols-3

        gap-6
      "
      >

        {/* CARD */}
        <div
          className="
          rounded-[32px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          p-7

          shadow-xl
        "
        >

          <div
            className="
            w-14 h-14

            rounded-2xl

            bg-orange-100

            flex items-center justify-center

            text-3xl
          "
          >
            📦
          </div>

          <p
            className="
            mt-5

            text-zinc-500
            text-sm
          "
          >
            Total Products
          </p>

          <h2
            className="
            mt-2

            text-4xl

            font-black

            text-zinc-900
          "
          >
            {products.length}
          </h2>

        </div>

        {/* CARD */}
        <div
          className="
          rounded-[32px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          p-7

          shadow-xl
        "
        >

          <div
            className="
            w-14 h-14

            rounded-2xl

            bg-yellow-100

            flex items-center justify-center

            text-3xl
          "
          >
            ⚠️
          </div>

          <p
            className="
            mt-5

            text-zinc-500
            text-sm
          "
          >
            Low Stock
          </p>

          <h2
            className="
            mt-2

            text-4xl

            font-black

            text-zinc-900
          "
          >
            {
              products.filter(
                (p) => p.stock < 10
              ).length
            }
          </h2>

        </div>

        {/* CARD */}
        <div
          className="
          rounded-[32px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          p-7

          shadow-xl
        "
        >

          <div
            className="
            w-14 h-14

            rounded-2xl

            bg-green-100

            flex items-center justify-center

            text-3xl
          "
          >
            ✅
          </div>

          <p
            className="
            mt-5

            text-zinc-500
            text-sm
          "
          >
            Active Products
          </p>

          <h2
            className="
            mt-2

            text-4xl

            font-black

            text-zinc-900
          "
          >
            {
              products.filter(
                (p) => p.stock > 0
              ).length
            }
          </h2>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="mt-12">

        {loading ? (

          <div
            className="
            rounded-[36px]

            border border-white/20

            bg-white/30
            backdrop-blur-2xl

            p-20

            text-center

            shadow-xl
          "
          >

            <div className="text-6xl">
              ⏳
            </div>

            <h2
              className="
              mt-6

              text-3xl

              font-black

              text-zinc-900
            "
            >
              Loading Products...
            </h2>

          </div>

        ) : products.length === 0 ? (

          <div
            className="
            rounded-[36px]

            border border-white/20

            bg-white/30
            backdrop-blur-2xl

            p-20

            text-center

            shadow-xl
          "
          >

            <div className="text-7xl">
              📦
            </div>

            <h2
              className="
              mt-6

              text-4xl

              font-black

              text-zinc-900
            "
            >
              No Products Yet
            </h2>

            <p
              className="
              mt-4

              text-zinc-600
              text-lg
            "
            >
              Start building your digital marketplace by uploading products.
            </p>

          </div>

        ) : (

          <div
            className="
            grid
            md:grid-cols-2
            2xl:grid-cols-3

            gap-8
          "
          >

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}