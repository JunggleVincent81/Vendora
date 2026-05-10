export default function StatCard({
    label,
    value,
    icon,
    hint
  }: {
    label: string;
    value: any;
    icon: string;
    hint?: string;
  }) {
  
    return (
      <div className="
        p-6
  
        rounded-[28px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-xl
  
        shadow-[0_15px_50px_rgba(0,0,0,0.1)]
  
        hover:scale-[1.02]
        transition
      ">
  
        <div className="text-3xl">
          {icon}
        </div>
  
        <p className="mt-4 text-gray-500">
          {label}
        </p>
  
        <h3 className="text-3xl font-black mt-2">
          {value}
        </h3>
  
        {hint && (
          <p className="text-xs text-gray-400 mt-2">
            {hint}
          </p>
        )}
  
      </div>
    );
  }