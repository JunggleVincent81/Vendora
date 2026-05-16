"use client";

import ProfileSettings from "@/components/seller/settings/ProfileSettings";
import StoreSettings from "@/components/seller/settings/StoreSettings";
import SecuritySettings from "@/components/seller/settings/SecuritySettings";
import NotificationSettings from "@/components/seller/settings/NotificationSettings";
import DangerZone from "@/components/seller/settings/DangerZone";

export default function SellerSettingsPage() {

  return (
    <div className="p-10 space-y-10">

      {/* HEADER */}
      <div>

        <h1
          className="
          text-5xl
          font-black
          text-zinc-900
        "
        >
          Settings ⚙️
        </h1>

        <p
          className="
          mt-3
          text-zinc-500
        "
        >
          Manage your seller account and store preferences.
        </p>

      </div>

      {/* PROFILE */}
      <ProfileSettings />

      {/* STORE */}
      <StoreSettings />

      {/* SECURITY */}
      <SecuritySettings />

      {/* NOTIFICATION */}
      <NotificationSettings />

      {/* DANGER */}
      <DangerZone />

    </div>
  );
}