import Sidebar
  from "@/components/admin/Sidebar";

import Navbar
  from "@/components/admin/Navbar";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="
      min-h-screen

      bg-gradient-to-br
      from-red-100
      via-orange-50
      to-amber-100
    "
    >

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <main
          className="
          flex-1

          p-6
        "
        >

          <Navbar />

          <div className="mt-6">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}