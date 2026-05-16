export default function TopSellers({
    sellers
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
  
        <h2
          className="
          text-2xl
          font-black
        "
        >
          Top Sellers 🏪
        </h2>
  
        <div className="mt-8 space-y-5">
  
          {sellers.map(
            (seller: any) => (
  
              <div
                key={seller.id}
  
                className="
                flex
                items-center
                justify-between
  
                border-b
                border-white/10
  
                pb-4
              "
              >
  
                <div>
  
                  <h3
                    className="
                    font-bold
                  "
                  >
                    {seller.name}
                  </h3>
  
                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    Orders:
                    {" "}
                    {seller.totalOrders}
                  </p>
  
                </div>
  
                <p
                  className="
                  font-black
                "
                >
                  Rp{" "}
                  {Number(
                    seller.revenue
                  ).toLocaleString()}
                </p>
  
              </div>
  
            )
          )}
  
        </div>
  
      </div>
    );
  }