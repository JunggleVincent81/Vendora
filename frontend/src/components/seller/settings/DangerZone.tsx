import SettingsSection from "./SettingsSection";

export default function DangerZone() {

  return (
    <SettingsSection
      title="Danger Zone"
      description="Irreversible actions for your account."
    >

      <div
        className="
        rounded-3xl

        border border-red-200

        bg-red-50/70

        p-6
      "
      >

        <h3
          className="
          text-xl
          font-black
          text-red-600
        "
        >
          Delete Store
        </h3>

        <p
          className="
          mt-3
          text-red-500
        "
        >
          Permanently remove your seller store and products.
        </p>

        <button
          className="
          mt-6

          px-6 py-4

          rounded-2xl

          bg-red-500

          text-white
          font-bold
        "
        >
          Delete Store
        </button>

      </div>

    </SettingsSection>
  );
}