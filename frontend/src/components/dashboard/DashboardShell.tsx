"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardShell({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="
      min-h-screen

      bg-gradient-to-br
      from-orange-100
      via-amber-50
      to-yellow-100
    "
    >

      <div
        className="
        flex
      "
      >

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
          className="
          flex-1

          min-h-screen

          p-6
          lg:p-8
        "
        >

          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <div>
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}