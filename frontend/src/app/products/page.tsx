"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api("/products");

      console.log(res);

      // kalau backend return langsung array
      if (Array.isArray(res)) {
        setProducts(res);
      }

      // kalau backend return object
      else if (res.data) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Products</h1>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="border p-4 rounded"
          >
            <h2 className="font-bold">{p.name}</h2>

            <p>{p.description}</p>

            <p className="mt-2">
              Rp {p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}