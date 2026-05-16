import OrderRow
from "./OrderRow";

export default function OrdersTable({
  orders
}: any) {

  return (
    <div
      className="
      overflow-hidden

      rounded-[32px]

      border border-white/20

      bg-white/30
      backdrop-blur-xl

      shadow-lg
    "
    >

      <table className="w-full">

        <thead
          className="
          bg-white/40
        "
        >

          <tr>

            <th className="p-6 text-left">
              Order
            </th>

            <th className="p-6 text-left">
              Customer
            </th>

            <th className="p-6 text-left">
              Status
            </th>

            <th className="p-6 text-left">
              Total
            </th>

            <th className="p-6 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order: any) => (

              <OrderRow
                key={order.id}
                order={order}
              />

            )
          )}

        </tbody>

      </table>

    </div>
  );
}