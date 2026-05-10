"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { getToken } from "@/services/auth";

export default function SellerDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = async () => {
    const res = await api(
      "/products",
      "POST",
      {
        name,
        price: Number(price),
        stock: 10,
        category_id: 1
      },
      getToken() || ""
    );

    alert(res.message);
  };

  return (
    <div className="p-10">
      <h1>Seller Dashboard</h1>

      <input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create Product
      </button>
    </div>
  );
}