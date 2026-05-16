import AnalyticsCard
from "./AnalyticsCard";

export default function AnalyticsOverview({
  overview
}: any) {

  return (
    <div
      className="
      grid

      md:grid-cols-2
      xl:grid-cols-5

      gap-6
    "
    >

      <AnalyticsCard
        title="Users"
        value={
          overview.totalUsers
        }
        icon="👥"
      />

      <AnalyticsCard
        title="Stores"
        value={
          overview.totalStores
        }
        icon="🏪"
      />

      <AnalyticsCard
        title="Products"
        value={
          overview.totalProducts
        }
        icon="📦"
      />

      <AnalyticsCard
        title="Orders"
        value={
          overview.totalOrders
        }
        icon="🛒"
      />

      <AnalyticsCard
        title="Revenue"
        value={`Rp ${Number(
          overview.totalRevenue
        ).toLocaleString()}`}
        icon="💰"
      />

    </div>
  );
}