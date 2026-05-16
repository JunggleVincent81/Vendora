export default function RecentOrders({
    orders
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
  
        {/* HEADER */}
        <div>
  
          <h2
            className="
            text-2xl
            font-black
          "
          >
            Recent Orders 🛒
          </h2>
  
          <p
            className="
            mt-2
            text-zinc-500
          "
          >
            Latest marketplace activity
          </p>
  
        </div>
  
        {/* LIST */}
        <div className="mt-8 space-y-5">
  
          {orders?.map(
            (order: any) => (
  
              <div
                key={order.id}
  
                className="
                flex
                items-center
                justify-between
  
                border-b
                border-white/10
  
                pb-5
              "
              >
  
                <div>
  
                  <h3
                    className="
                    font-black
                  "
                  >
                    #{order.id}
                  </h3>
  
                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    {
                      order.customer_name
                    }
                  </p>
  
                </div>
  
                <div className="text-right">
  
                  <p
                    className="
                    font-black
                  "
                  >
                    Rp{" "}
                    {Number(
                      order.total_price
                    ).toLocaleString()}
                  </p>
  
                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    {order.status}
                  </p>
  
                </div>
  
              </div>
  
            )
          )}
  
        </div>
  
      </div>
    );
  }