"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("buyer");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password,
            role
          })
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        alert(
          data.message ||
          "Register failed"
        );

        return;

      }

      alert(
        "Register success. Please login."
      );

      router.push("/login");

    } catch (err) {

      console.log(err);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      className="
      min-h-screen

      flex items-center justify-center

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100

      p-6
    "
    >

      <form
        onSubmit={handleRegister}
        className="
        w-full
        max-w-xl

        rounded-[40px]

        border border-white/20

        bg-white/30
        backdrop-blur-2xl

        p-10

        shadow-[0_20px_80px_rgba(0,0,0,0.12)]
      "
      >

        {/* TITLE */}
        <h1
          className="
          text-5xl

          font-black

          text-zinc-900
        "
        >
          Create Account ✨
        </h1>

        <p
          className="
          mt-4

          text-zinc-600
        "
        >
          Join Vendora marketplace ecosystem.
        </p>

        {/* NAME */}
        <div className="mt-10">

          <label
            className="
            block

            mb-3

            font-bold
          "
          >
            Full Name
          </label>

          <input
            type="text"

            required

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

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

        {/* EMAIL */}
        <div className="mt-6">

          <label
            className="
            block

            mb-3

            font-bold
          "
          >
            Email
          </label>

          <input
            type="email"

            required

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

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

        {/* PASSWORD */}
        <div className="mt-6">

          <label
            className="
            block

            mb-3

            font-bold
          "
          >
            Password
          </label>

          <input
            type="password"

            required

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

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

        {/* ROLE */}
        <div className="mt-6">

          <label
            className="
            block

            mb-3

            font-bold
          "
          >
            Account Type
          </label>

          <div
            className="
            grid
            grid-cols-2

            gap-4
          "
          >

            {/* BUYER */}
            <button
              type="button"

              onClick={() =>
                setRole("buyer")
              }

              className={`
                p-5

                rounded-2xl

                border

                transition-all

                ${
                  role === "buyer"
                    ? `
                      border-orange-500
                      bg-orange-100
                    `
                    : `
                      border-white/20
                      bg-white/30
                    `
                }
              `}
            >

              <div className="text-4xl">
                🛒
              </div>

              <h3
                className="
                mt-3

                text-lg
                font-bold
              "
              >
                Buyer
              </h3>

              <p
                className="
                mt-2

                text-sm

                text-zinc-500
              "
              >
                Buy products from sellers.
              </p>

            </button>

            {/* SELLER */}
            <button
              type="button"

              onClick={() =>
                setRole("seller")
              }

              className={`
                p-5

                rounded-2xl

                border

                transition-all

                ${
                  role === "seller"
                    ? `
                      border-orange-500
                      bg-orange-100
                    `
                    : `
                      border-white/20
                      bg-white/30
                    `
                }
              `}
            >

              <div className="text-4xl">
                🏪
              </div>

              <h3
                className="
                mt-3

                text-lg
                font-bold
              "
              >
                Seller
              </h3>

              <p
                className="
                mt-2

                text-sm

                text-zinc-500
              "
              >
                Sell products & manage store.
              </p>

            </button>

          </div>

        </div>

        {/* BUTTON */}
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
        "
        >
          {
            loading
              ? "Creating Account..."
              : "Register"
          }
        </button>

      </form>

    </div>
  );
}