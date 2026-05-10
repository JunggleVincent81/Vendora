"use client";

import { useState } from "react";
import { getToken } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function CreateStorePage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitStore = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/stores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            name,
            description
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      // redirect ke store status page
      router.push("/dashboard/seller/store");

    } catch (err) {

      console.log(err);
      alert("Failed to submit store");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen

      flex items-center justify-center

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100

      p-6
    ">

      {/* CARD */}
      <form
        onSubmit={submitStore}
        className="
          w-full
          max-w-2xl

          rounded-[40px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.12)]

          p-10
        "
      >

        {/* HEADER */}
        <h1 className="
          text-4xl
          font-black
          text-zinc-900
        ">
          Create Your Store 🏪
        </h1>

        <p className="
          mt-3
          text-zinc-600
        ">
          Submit your store for admin approval. Once approved, you can start selling products.
        </p>

        {/* STORE NAME */}
        <div className="mt-10">

          <label className="font-bold text-zinc-800">
            Store Name
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full

              mt-3
              px-5 py-4

              rounded-2xl

              bg-white/40
              backdrop-blur-xl

              border border-white/20

              outline-none
            "
            placeholder="e.g. Toko Nusantara"
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">

          <label className="font-bold text-zinc-800">
            Description
          </label>

          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full

              mt-3
              px-5 py-4

              rounded-2xl

              bg-white/40
              backdrop-blur-xl

              border border-white/20

              outline-none

              min-h-[140px]
            "
            placeholder="Describe your store..."
          />

        </div>

        {/* INFO BOX */}
        <div className="
          mt-8

          p-4

          rounded-2xl

          bg-orange-100/50

          text-sm
          text-orange-800
        ">
          ⚠️ Your store will be reviewed by admin before it becomes active.
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-8

            w-full

            py-5

            rounded-2xl

            bg-gradient-to-r
            from-orange-500
            to-amber-500

            text-white
            font-bold

            shadow-xl

            hover:scale-[1.01]

            transition-all
          "
        >
          {loading ? "Submitting..." : "Submit Store Request"}
        </button>

      </form>

    </div>
  );
}