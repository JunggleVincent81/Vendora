"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  saveAuth
} from "@/services/auth";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data =
        await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {

        alert(
          data.message ||
          "Login failed"
        );

        return;

      }

      // =========================
      // FLEXIBLE USER PARSING
      // =========================

      const user = data.user || {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      };

      // =========================
      // SAVE AUTH
      // =========================

      saveAuth(
        data.token,
        user
      );

      alert("Login success");

      // =========================
      // ROLE REDIRECT
      // =========================

      if (
        user.role === "seller"
      ) {

        router.push(
          "/dashboard/seller"
        );

      } else {

        router.push("/");
      }

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

      {/* GLOW */}
      <div
        className="
        absolute

        top-0 left-0

        w-[500px]
        h-[500px]

        bg-orange-300/30

        blur-3xl

        rounded-full
      "
      />

      <div
        className="
        absolute

        bottom-0 right-0

        w-[400px]
        h-[400px]

        bg-amber-300/20

        blur-3xl

        rounded-full
      "
      />

      {/* CARD */}
      <form
        onSubmit={handleLogin}
        className="
        relative

        w-full
        max-w-lg

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

          tracking-tight
        "
        >
          Welcome Back 👋
        </h1>

        <p
          className="
          mt-4

          text-zinc-600

          leading-relaxed
        "
        >
          Login to continue managing your
          marketplace ecosystem on Vendora.
        </p>

        {/* EMAIL */}
        <div className="mt-10">

          <label
            className="
            block

            mb-3

            font-bold

            text-zinc-800
          "
          >
            Email Address
          </label>

          <input
            type="email"

            required

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            placeholder="you@example.com"

            className="
            w-full

            px-5 py-4

            rounded-2xl

            border border-white/20

            bg-white/40
            backdrop-blur-xl

            outline-none

            placeholder:text-zinc-400

            focus:ring-2
            focus:ring-orange-400/40

            transition-all
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

            text-zinc-800
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

            placeholder="••••••••"

            className="
            w-full

            px-5 py-4

            rounded-2xl

            border border-white/20

            bg-white/40
            backdrop-blur-xl

            outline-none

            placeholder:text-zinc-400

            focus:ring-2
            focus:ring-orange-400/40

            transition-all
          "
          />

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

          shadow-[0_10px_40px_rgba(249,115,22,0.4)]

          hover:scale-[1.01]

          active:scale-[0.99]

          transition-all
        "
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

        {/* FOOTER */}
        <p
          className="
          mt-8

          text-center

          text-sm

          text-zinc-600
        "
        >
          Don&apos;t have an account?{" "}

          <span
            onClick={() =>
              router.push("/register")
            }

            className="
            font-bold

            text-orange-600

            cursor-pointer

            hover:underline
          "
          >
            Register
          </span>

        </p>

      </form>

    </div>
  );
}