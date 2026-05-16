import OrderStatusBadge
from "./OrderStatusBadge";

export default function OrderRow({
  order
}: any) {

  return (
    <tr
      className="
      border-t
      border-white/10
    "
    >

      <td className="p-6 font-bold">
        #{order.id}
      </td>

      <td className="p-6">

        <p className="font-bold">
          {order.customer_name}
        </p>

        <p
          className="
          text-sm
          text-zinc-500
        "
        >
          {order.customer_email}
        </p>

      </td>

      <td className="p-6">

        <OrderStatusBadge
          status={order.status}
        />

      </td>

      <td className="p-6 font-bold">

        Rp{" "}
        {Number(
          order.total_price
        ).toLocaleString()}

      </td>

      <td className="p-6 text-zinc-500">

        {new Date(
          order.created_at
        ).toLocaleDateString()}

      </td>

    </tr>
  );
}