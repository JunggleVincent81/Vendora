"use client";

import { useState } from "react";
import SettingsSection from "./SettingsSection";

export default function NotificationSettings() {

  const [emailNotif, setEmailNotif] =
    useState(true);

  return (
    <SettingsSection
      title="Notifications"
      description="Manage seller notifications."
    >

      <div
        className="
        flex items-center justify-between

        rounded-2xl

        bg-white/40

        p-5
      "
      >

        <div>

          <h3 className="font-bold">
            Email Notifications
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Receive updates about orders and store activity.
          </p>

        </div>

        <button
          onClick={() =>
            setEmailNotif(
              !emailNotif
            )
          }

          className={`
            w-16 h-9

            rounded-full

            transition-all

            ${
              emailNotif
                ? "bg-orange-500"
                : "bg-zinc-300"
            }
          `}
        />

      </div>

    </SettingsSection>
  );
}