"use client";

import { useState } from "react";
import SettingsSection from "./SettingsSection";

export default function StoreSettings() {

  const [storeName, setStoreName] =
    useState("Vendora Store");

  const [description, setDescription] =
    useState(
      "Premium UMKM products from Indonesia."
    );

  return (
    <SettingsSection
      title="Store Branding"
      description="Customize your store identity."
    >

      <div className="space-y-6">

        <div>

          <label className="block mb-3 font-semibold">
            Store Name
          </label>

          <input
            value={storeName}

            onChange={(e) =>
              setStoreName(
                e.target.value
              )
            }

            className="
            w-full

            px-5 py-4

            rounded-2xl

            border border-white/20

            bg-white/40
          "
          />

        </div>

        <div>

          <label className="block mb-3 font-semibold">
            Description
          </label>

          <textarea
            rows={5}

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            className="
            w-full

            px-5 py-4

            rounded-2xl

            border border-white/20

            bg-white/40
          "
          />

        </div>

      </div>

    </SettingsSection>
  );
}