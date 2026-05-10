"use client";

import { api } from "@/services/api";
import { getToken } from "@/services/auth";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const handleCheckout = async () => {
    const res = await api("/orders", "POST", { items: cart }, getToken() || "");

    if (res.message) {
      alert("Order success");
      localStorage.removeItem("cart");
      window.location.reload();
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Checkout</h1>

      {cart.map((item, i) => (
        <div key={i}>
          Product ID: {item.product_id} | Qty: {item.quantity}
        </div>
      ))}

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
}