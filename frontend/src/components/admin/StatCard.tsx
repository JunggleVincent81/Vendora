export default function StatCard({
    title,
    value,
    icon
  }: any) {
  
    return (
      <div
        className="
        rounded-[30px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-xl
  
        p-6
  
        shadow-lg
      "
      >
  
        <div
          className="
          flex items-center justify-between
        "
        >
  
          <div>
  
            <p
              className="
              text-zinc-500
            "
            >
              {title}
            </p>
  
            <h2
              className="
              mt-3
  
              text-4xl
              font-black
            "
            >
              {value}
            </h2>
  
          </div>
  
          <div
            className="
            w-16 h-16
  
            rounded-3xl
  
            bg-gradient-to-br
            from-red-500
            to-orange-500
  
            flex items-center justify-center
  
            text-3xl
  
            text-white
          "
          >
            {icon}
          </div>
  
        </div>
  
      </div>
    );
  }