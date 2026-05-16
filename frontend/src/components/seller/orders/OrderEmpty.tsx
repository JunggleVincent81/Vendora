export default function OrderEmpty() {

    return (
      <div
        className="
        rounded-[32px]
  
        border border-dashed
        border-zinc-300
  
        p-20
  
        text-center
      "
      >
  
        <div className="text-7xl">
          📭
        </div>
  
        <h2
          className="
          mt-6
  
          text-3xl
          font-black
        "
        >
          No Orders Yet
        </h2>
  
        <p
          className="
          mt-3
  
          text-zinc-500
        "
        >
          Customer orders will appear here.
        </p>
  
      </div>
    );
  }