export default function AnalyticsCard({
    title,
    value,
    icon
  }: any) {
  
    return (
      <div
        className="
        rounded-[32px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-xl
  
        p-8
  
        shadow-lg
      "
      >
  
        <div className="text-4xl">
          {icon}
        </div>
  
        <p
          className="
          mt-5
          text-zinc-500
        "
        >
          {title}
        </p>
  
        <h2
          className="
          mt-2
  
          text-4xl
          font-black
        "
        >
          {value}
        </h2>
  
      </div>
    );
  }