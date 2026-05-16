const statuses = [
    "all",
    "pending",
    "packed",
    "shipped",
    "completed"
  ];
  
  export default function OrderFilter({
    value,
    onChange
  }: any) {
  
    return (
      <div className="flex gap-3 flex-wrap">
  
        {statuses.map((status) => (
  
          <button
            key={status}
  
            onClick={() =>
              onChange(status)
            }
  
            className={`
              px-5 py-3
  
              rounded-2xl
  
              font-semibold
  
              transition-all
  
              ${
                value === status
                  ? `
                    bg-orange-500
                    text-white
                  `
                  : `
                    bg-white/40
                    text-zinc-700
                  `
              }
            `}
          >
            {status}
          </button>
  
        ))}
  
      </div>
    );
  }