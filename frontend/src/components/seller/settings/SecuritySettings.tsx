"use client";

import SettingsSection from "./SettingsSection";

export default function SecuritySettings() {

  return (
    <SettingsSection
      title="Security"
      description="Update password and secure your account."
    >

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="password"
          placeholder="New Password"

          className="
          px-5 py-4

          rounded-2xl

          border border-white/20

          bg-white/40
        "
        />

        <input
          type="password"
          placeholder="Confirm Password"

          className="
          px-5 py-4

          rounded-2xl

          border border-white/20

          bg-white/40
        "
        />

      </div>

      <button
        className="
        mt-8

        px-6 py-4

        rounded-2xl

        bg-zinc-900

        text-white
        font-bold
      "
      >
        Update Password
      </button>

    </SettingsSection>
  );
}