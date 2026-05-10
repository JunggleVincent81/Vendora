"use client";

import { useState } from "react";

export default function CreateProductForm() {

  const [preview, setPreview] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData(
        e.currentTarget
      );

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/v1/products",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: formData
        }
      );

      const data = await res.json();

      alert(data.message);

      e.currentTarget.reset();

      setPreview(null);

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      mt-10

      grid
      xl:grid-cols-5

      gap-8
    "
    >

      {/* LEFT */}
      <div
        className="
        xl:col-span-2
      "
      >

        {/* IMAGE UPLOAD */}
        <div
          className="
          rounded-[36px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          p-8

          shadow-xl
        "
        >

          <h2
            className="
            text-3xl

            font-black

            text-zinc-900
          "
          >
            Product Image
          </h2>

          <p
            className="
            mt-3

            text-zinc-500
          "
          >
            Upload attractive product visuals.
          </p>

          {/* PREVIEW */}
          <div
            className="
            mt-8

            h-[420px]

            rounded-[32px]

            overflow-hidden

            border-2
            border-dashed
            border-orange-200

            bg-orange-50/40

            flex items-center justify-center
          "
          >

            {preview ? (

              <img
                src={preview}
                alt="preview"
                className="
                w-full
                h-full

                object-cover
              "
              />

            ) : (

              <div className="text-center">

                <div className="text-7xl">
                  🖼️
                </div>

                <p
                  className="
                  mt-4

                  text-zinc-500
                "
                >
                  Upload product image
                </p>

              </div>

            )}

          </div>

          {/* INPUT */}
          <input
            type="file"
            name="image"
            accept="image/*"

            onChange={(e) => {

              const file =
                e.target.files?.[0];

              if (file) {

                setPreview(
                  URL.createObjectURL(file)
                );

              }

            }}

            className="
            mt-6

            block
            w-full

            text-sm

            file:mr-4
            file:px-5
            file:py-3

            file:border-0

            file:rounded-2xl

            file:bg-gradient-to-r
            file:from-orange-500
            file:to-amber-500

            file:text-white
            file:font-semibold

            cursor-pointer
          "
          />

        </div>

      </div>

      {/* RIGHT */}
      <div
        className="
        xl:col-span-3
      "
      >

        <div
          className="
          rounded-[36px]

          border border-white/20

          bg-white/30
          backdrop-blur-2xl

          p-8

          shadow-xl
        "
        >

          <h2
            className="
            text-4xl

            font-black

            text-zinc-900
          "
          >
            Product Information
          </h2>

          <p
            className="
            mt-3

            text-zinc-500
          "
          >
            Fill complete product details carefully.
          </p>

          {/* FORM GRID */}
          <div
            className="
            mt-10

            grid
            md:grid-cols-2

            gap-6
          "
          >

            {/* NAME */}
            <div className="md:col-span-2">

              <label
                className="
                block

                mb-3

                font-bold

                text-zinc-800
              "
              >
                Product Name
              </label>

              <input
                type="text"
                name="name"

                required

                placeholder="Premium Coffee Beans"

                className="
                w-full

                px-5 py-4

                rounded-2xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                outline-none

                text-zinc-800

                placeholder:text-zinc-400
              "
              />

            </div>

            {/* PRICE */}
            <div>

              <label
                className="
                block

                mb-3

                font-bold

                text-zinc-800
              "
              >
                Price
              </label>

              <input
                type="number"
                name="price"

                required

                placeholder="50000"

                className="
                w-full

                px-5 py-4

                rounded-2xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                outline-none
              "
              />

            </div>

            {/* STOCK */}
            <div>

              <label
                className="
                block

                mb-3

                font-bold

                text-zinc-800
              "
              >
                Stock
              </label>

              <input
                type="number"
                name="stock"

                required

                placeholder="100"

                className="
                w-full

                px-5 py-4

                rounded-2xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                outline-none
              "
              />

            </div>

            {/* CATEGORY */}
            <div className="md:col-span-2">

              <label
                className="
                block

                mb-3

                font-bold

                text-zinc-800
              "
              >
                Category
              </label>

              <select
                name="category_id"

                required

                className="
                w-full

                px-5 py-4

                rounded-2xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                outline-none
              "
              >
                <option value="">
                  Select Category
                </option>

                <option value="1">
                  Food
                </option>

                <option value="2">
                  Fashion
                </option>

                <option value="3">
                  Electronics
                </option>

              </select>

            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">

              <label
                className="
                block

                mb-3

                font-bold

                text-zinc-800
              "
              >
                Description
              </label>

              <textarea
                name="description"

                rows={6}

                placeholder="Describe your product..."

                className="
                w-full

                px-5 py-4

                rounded-2xl

                border border-white/20

                bg-white/40
                backdrop-blur-xl

                outline-none

                resize-none
              "
              />

            </div>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"

            disabled={loading}

            className="
            mt-10

            w-full

            py-5

            rounded-2xl

            bg-gradient-to-r
            from-orange-500
            to-amber-500

            text-white
            text-lg
            font-bold

            shadow-2xl

            hover:scale-[1.01]

            transition-all

            disabled:opacity-60
          "
          >
            {
              loading
                ? "Uploading Product..."
                : "Create Product"
            }
          </button>

        </div>

      </div>

    </form>
  );
}