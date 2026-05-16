export default function OrdersStats({
    orders
  }: any) {
  
    const completed =
      orders.filter(
        (o: any) =>
          o.status ===
          "completed"
      ).length;
  
    const pending =
      orders.filter(
        (o: any) =>
          o.status ===
          "pending"
      ).length;
  
    const revenue =
      orders.reduce(
        (acc: number, order: any) =>
          acc +
          Number(
            order.total_price
          ),
        0
      );
  
    return (
      <div
        className="
        grid
        md:grid-cols-3
  
        gap-6
      "
      >
  
        <Card
          title="Orders"
          value={orders.length}
          icon="📦"
        />
  
        <Card
          title="Completed"
          value={completed}
          icon="✅"
        />
  
        <Card
          title="Revenue"
          value={`Rp ${revenue.toLocaleString()}`}
          icon="💰"
        />
  
      </div>
    );
  }
  
  function Card({
    title,
    value,
    icon
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
  
        <div className="text-4xl">
          {icon}
        </div>
  
        <p
          className="
          mt-5
          text-zinc-500
        "
        >
          {title}
        </p>
  
        <h2
          className="
          mt-2
  
          text-4xl
          font-black
        "
        >
          {value}
        </h2>
  
      </div>
    );
  }