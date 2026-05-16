export default function TopProducts({
    products
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
          Top Products 🔥
        </h2>
  
        <div className="mt-8 space-y-5">
  
          {products.map(
            (product: any) => (
  
              <div
                key={product.id}
  
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
                    {product.name}
                  </h3>
  
                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    Sold:
                    {" "}
                    {product.totalSold}
                  </p>
  
                </div>
  
                <p
                  className="
                  font-black
                "
                >
                  Rp{" "}
                  {Number(
                    product.revenue
                  ).toLocaleString()}
                </p>
  
              </div>
  
            )
          )}
  
        </div>
  
      </div>
    );
  }