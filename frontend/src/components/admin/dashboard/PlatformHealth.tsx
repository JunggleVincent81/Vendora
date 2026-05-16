export default function PlatformHealth() {

    const items = [
      {
        label:
          "API Server",
        status:
          "Operational"
      },
  
      {
        label:
          "Database",
        status:
          "Healthy"
      },
  
      {
        label:
          "Orders System",
        status:
          "Stable"
      },
  
      {
        label:
          "Payments",
        status:
          "Monitoring"
      }
    ];
  
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
  
        <h2
          className="
          text-2xl
          font-black
        "
        >
          Platform Health ⚡
        </h2>
  
        <div
          className="
          mt-8
  
          grid
          md:grid-cols-2
          xl:grid-cols-4
  
          gap-6
        "
        >
  
          {items.map((item) => (
  
            <div
              key={item.label}
  
              className="
              rounded-2xl
  
              bg-white/40
  
              p-6
            "
            >
  
              <div
                className="
                flex
                items-center
                gap-3
              "
              >
  
                <div
                  className="
                  w-3 h-3
  
                  rounded-full
  
                  bg-green-500
                "
                />
  
                <p
                  className="
                  text-zinc-500
                "
                >
                  {item.label}
                </p>
  
              </div>
  
              <h3
                className="
                mt-4
  
                text-2xl
                font-black
              "
              >
                {item.status}
              </h3>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
    );
  }