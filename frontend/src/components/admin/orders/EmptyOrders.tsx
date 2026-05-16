export default function EmptyOrders() {

    return (
      <div
        className="
        rounded-[32px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-xl
  
        py-24
  
        text-center
      "
      >
  
        <div className="text-7xl">
          📦
        </div>
  
        <h2
          className="
          mt-6
  
          text-3xl
          font-black
        "
        >
          No Orders Found
        </h2>
  
        <p
          className="
          mt-3
  
          text-zinc-500
        "
        >
          Marketplace has no
          matching orders.
        </p>
  
      </div>
    );
  }