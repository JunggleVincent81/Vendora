"use client";

import { useEffect, useState } from "react";

import {
  getToken
} from "@/services/auth";

import SettingsSection
  from "./SettingsSection";

export default function ProfileSettings() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [avatar, setAvatar] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH PROFILE
  // ==========================
  const fetchProfile = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/v1/users/me",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

      const data =
        await res.json();

      setName(data.name || "");
      setEmail(data.email || "");

      if (data.avatar) {

        setPreview(
          `http://localhost:5000/uploads/${data.avatar}`
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // SAVE PROFILE
  // ==========================
  const handleSave = async () => {

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "email",
        email
      );

      if (avatar) {

        formData.append(
          "avatar",
          avatar
        );

      }

      const res = await fetch(
        "http://localhost:5000/api/v1/users/profile",
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${getToken()}`
          },

          body: formData
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        alert(
          data.message ||
          "Failed updating profile"
        );

        return;

      }

      alert("Profile updated");

      fetchProfile();

    } catch (err) {

      console.log(err);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <SettingsSection
      title="Profile"
      description="Manage your seller profile information."
    >

      {/* AVATAR */}
      <div
        className="
        flex items-center gap-6
      "
      >

        {/* IMAGE */}
        <div
          className="
          relative

          w-28 h-28

          rounded-[32px]

          overflow-hidden

          border border-white/20

          bg-white/40
          backdrop-blur-xl

          shadow-xl
        "
        >

          {
            preview ? (

              <img
                src={preview}

                alt="avatar"

                className="
                w-full
                h-full

                object-cover
              "
              />

            ) : (

              <div
                className="
                w-full
                h-full

                flex items-center justify-center

                text-5xl
              "
              >
                👤
              </div>

            )
          }

        </div>

        {/* UPLOAD */}
        <div>

          <h3
            className="
            text-xl
            font-black
            text-zinc-900
          "
          >
            Profile Avatar
          </h3>

          <p
            className="
            mt-2

            text-zinc-500
            text-sm
          "
          >
            PNG, JPG, WEBP up to 5MB
          </p>

          <input
            type="file"

            accept="image/*"

            onChange={(e) => {

              const file =
                e.target.files?.[0];

              if (!file) return;

              setAvatar(file);

              setPreview(
                URL.createObjectURL(file)
              );

            }}

            className="
            mt-5

            block

            text-sm
          "
          />

        </div>

      </div>

      {/* FORM */}
      <div
        className="
        mt-10

        grid
        md:grid-cols-2

        gap-6
      "
      >

        <Input
          label="Full Name"
          value={name}
          onChange={setName}
        />

        <Input
          label="Email"
          value={email}
          onChange={setEmail}
        />

      </div>

      {/* ACTION */}
      <button
        onClick={handleSave}

        disabled={loading}

        className="
        mt-8

        px-8 py-4

        rounded-2xl

        bg-gradient-to-r
        from-orange-500
        to-amber-500

        text-white
        font-bold

        shadow-xl

        hover:scale-[1.02]

        transition-all

        disabled:opacity-50
      "
      >
        {
          loading
            ? "Saving..."
            : "Save Changes"
        }
      </button>

    </SettingsSection>
  );
}

/* ==========================
   INPUT
========================== */
function Input({
  label,
  value,
  onChange
}: any) {

  return (
    <div>

      <label
        className="
        block

        mb-3

        font-bold
        text-zinc-800
      "
      >
        {label}
      </label>

      <input
        value={value}

        onChange={(e) =>
          onChange(
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

        text-zinc-800

        shadow-lg

        focus:ring-2
        focus:ring-orange-400/40
      "
      />

    </div>
  );
}