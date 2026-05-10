import DashboardShell from "@/components/dashboard/DashboardShell";

export default function SellerLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}