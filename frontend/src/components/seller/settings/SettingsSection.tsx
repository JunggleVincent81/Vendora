export default function SettingsSection({
    title,
    description,
    children
  }: any) {
  
    return (
      <div
        className="
        rounded-[36px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-2xl
  
        shadow-[0_20px_80px_rgba(0,0,0,0.08)]
  
        p-8
      "
      >
  
        <div>
  
          <h2
            className="
            text-2xl
            font-black
            text-zinc-900
          "
          >
            {title}
          </h2>
  
          <p
            className="
            mt-2
            text-zinc-500
          "
          >
            {description}
          </p>
  
        </div>
  
        <div className="mt-8">
          {children}
        </div>
  
      </div>
    );
  }