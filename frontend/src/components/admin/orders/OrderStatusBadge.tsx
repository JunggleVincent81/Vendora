export default function OrderStatusBadge({
    status
  }: any) {
  
    return (
      <span
        className={`
          px-4 py-2
  
          rounded-full
  
          text-sm
          font-bold
  
          ${
            status === "completed"
              ? `
                bg-green-100
                text-green-700
              `
              : status === "pending"
              ? `
                bg-yellow-100
                text-yellow-700
              `
              : status === "shipped"
              ? `
                bg-blue-100
                text-blue-700
              `
              : `
                bg-zinc-100
                text-zinc-700
              `
          }
        `}
      >
        {status}
      </span>
    );
  }