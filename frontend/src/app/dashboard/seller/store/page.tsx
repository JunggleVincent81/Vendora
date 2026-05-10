"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/services/auth";

export default function StorePage() {

  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStore = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/stores/me",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      setStore(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading store...
      </div>
    );
  }

  // =========================
  // NO STORE STATE
  // =========================
  if (!store) {
    return (
      <div className="p-10">

        <h1 className="text-2xl font-bold">
          No Store Found
        </h1>

        <p className="mt-2 text-gray-500">
          You haven't created a store yet.
        </p>

        <a
          href="/dashboard/seller/store/create"
          className="
            inline-block mt-6
            px-6 py-3
            bg-orange-500
            text-white
            rounded-xl
          "
        >
          Create Store
        </a>

      </div>
    );
  }

  // =========================
  // PENDING STATE
  // =========================
  if (store.status === "pending") {
    return (
      <div className="p-10">

        <h1 className="text-2xl font-bold">
          Store Pending Approval ⏳
        </h1>

        <p className="mt-2 text-gray-500">
          Your store is waiting for admin approval.
        </p>

        <div className="mt-6 p-4 bg-yellow-100 rounded-xl">
          <p><b>Name:</b> {store.name}</p>
          <p><b>Status:</b> Pending</p>
        </div>

      </div>
    );
  }

  // =========================
  // REJECTED STATE
  // =========================
  if (store.status === "rejected") {
    return (
      <div className="p-10">

        <h1 className="text-2xl font-bold text-red-500">
          Store Rejected ❌
        </h1>

        <p className="mt-2 text-gray-500">
          Please resubmit your store request.
        </p>

        <a
          href="/dashboard/seller/store/create"
          className="
            inline-block mt-6
            px-6 py-3
            bg-red-500
            text-white
            rounded-xl
          "
        >
          Resubmit Store
        </a>

      </div>
    );
  }

  // =========================
  // APPROVED STATE
  // =========================
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        🏪 My Store
      </h1>

      <div className="mt-6 p-6 bg-green-100 rounded-xl">

        <p><b>Name:</b> {store.name}</p>
        <p><b>Description:</b> {store.description}</p>
        <p><b>Status:</b> Approved</p>

      </div>

      <div className="mt-6 flex gap-4">

        <a
          href="/dashboard/seller/products"
          className="px-6 py-3 bg-orange-500 text-white rounded-xl"
        >
          Manage Products
        </a>

      </div>

    </div>
  );
}