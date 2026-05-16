export default function OrdersFilter({
    search,
    setSearch,
    status,
    setStatus
  }: any) {
  
    return (
      <div
        className="
        flex
        flex-col
        lg:flex-row
  
        gap-5
  
        lg:items-center
        lg:justify-between
      "
      >
  
        {/* SEARCH */}
        <input
          value={search}
  
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
  
          placeholder="Search order or customer..."
  
          className="
          w-full
          lg:w-[420px]
  
          px-6 py-4
  
          rounded-2xl
  
          border border-white/20
  
          bg-white/40
          backdrop-blur-xl
  
          outline-none
        "
        />
  
        {/* FILTERS */}
        <div className="flex gap-3 flex-wrap">
  
          {[
            "all",
            "pending",
            "packed",
            "shipped",
            "completed"
          ].map((item) => (
  
            <button
              key={item}
  
              onClick={() =>
                setStatus(item)
              }
  
              className={`
                px-5 py-3
  
                rounded-2xl
  
                font-bold
  
                transition-all
  
                ${
                  status === item
                    ? `
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500
  
                      text-white
                    `
                    : `
                      bg-white/40
                      text-zinc-700
                    `
                }
              `}
            >
              {item}
            </button>
  
          ))}
  
        </div>
  
      </div>
    );
  }