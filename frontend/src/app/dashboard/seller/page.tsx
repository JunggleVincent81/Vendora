"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  getToken
} from "@/services/auth";

export default function SellerGatePage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const checkStore =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/stores/my-store",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        // no store
        if (
          res.status === 404
        ) {

          router.push(
            "/dashboard/seller/store/create"
          );

          return;

        }

        const data =
          await res.json();

        // pending
        if (
          data.status ===
          "pending"
        ) {

          router.push(
            "/dashboard/seller/pending"
          );

          return;

        }

        // rejected
        if (
          data.status ===
          "rejected"
        ) {

          router.push(
            "/dashboard/seller/rejected"
          );

          return;

        }

        // approved
        router.push(
          "/dashboard/seller/analytics"
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    checkStore();
  }, []);

  return (
    <div
      className="
      min-h-screen

      flex items-center justify-center
    "
    >

      <div
        className="
        text-center
      "
      >

        <div className="text-6xl">
          🏪
        </div>

        <h1
          className="
          mt-6

          text-3xl
          font-black
        "
        >
          Checking Store Status...
        </h1>

      </div>

    </div>
  );
}