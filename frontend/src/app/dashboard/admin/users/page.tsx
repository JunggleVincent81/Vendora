"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  getToken
} from "@/services/auth";

export default function AdminUsersPage() {

  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filterRole, setFilterRole] =
    useState("all");

  // ==========================
  // FETCH USERS
  // ==========================
  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:5000/api/v1/admin/users",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

        // FIX:
        // users.map is not a function
        setUsers(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

        setUsers([]);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // UPDATE STATUS
  // ==========================
  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/v1/admin/users/${id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${getToken()}`
            },

            body: JSON.stringify({
              status
            })
          }
        );

        const data =
          await res.json();

        alert(data.message);

        fetchUsers();

      } catch (err) {

        console.log(err);

        alert(
          "Failed updating user"
        );

      }

    };

  // ==========================
  // FILTERED USERS
  // ==========================
  const filteredUsers =
    useMemo(() => {

      return users.filter(
        (user) => {

          const matchSearch =
            user.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            user.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchRole =
            filterRole === "all"
              ? true
              : user.role === filterRole;

          return (
            matchSearch &&
            matchRole
          );

        }
      );

    }, [
      users,
      search,
      filterRole
    ]);

  // ==========================
  // STATS
  // ==========================
  const stats = {

    total:
      users.length,

    buyers:
      users.filter(
        (u) =>
          u.role === "buyer"
      ).length,

    sellers:
      users.filter(
        (u) =>
          u.role === "seller"
      ).length,

    admins:
      users.filter(
        (u) =>
          u.role === "admin"
      ).length

  };

  if (loading) {

    return (
      <div className="p-10">

        <div className="grid md:grid-cols-4 gap-6">

          {[...Array(4)].map(
            (_, i) => (
              <div
                key={i}
                className="
                h-36

                rounded-[30px]

                bg-white/40

                animate-pulse
              "
              />
            )
          )}

        </div>

      </div>
    );

  }

  return (
    <div className="space-y-10">

      {/* =======================
          HEADER
      ======================== */}
      <div>

        <div
          className="
          inline-flex
          items-center
          gap-2

          px-5 py-2

          rounded-full

          bg-blue-100

          text-blue-700
          text-sm
          font-bold
        "
        >
          👥 Platform Administration
        </div>

        <h1
          className="
          mt-5

          text-5xl

          font-black

          text-zinc-900
        "
        >
          Users Management
        </h1>

        <p
          className="
          mt-3

          text-zinc-500
          text-lg
        "
        >
          Monitor, manage, and moderate
          all marketplace users.
        </p>

      </div>

      {/* =======================
          STATS
      ======================== */}
      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-4

        gap-6
      "
      >

        <StatCard
          title="Total Users"
          value={stats.total}
          icon="👥"
        />

        <StatCard
          title="Buyers"
          value={stats.buyers}
          icon="🛒"
        />

        <StatCard
          title="Sellers"
          value={stats.sellers}
          icon="🏪"
        />

        <StatCard
          title="Admins"
          value={stats.admins}
          icon="🛡️"
        />

      </div>

      {/* =======================
          FILTER BAR
      ======================== */}
      <div
        className="
        flex
        flex-col
        lg:flex-row

        lg:items-center
        lg:justify-between

        gap-5
      "
      >

        {/* SEARCH */}
        <input
          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Search user..."

          className="
          w-full
          lg:w-[380px]

          px-6 py-4

          rounded-2xl

          border border-white/20

          bg-white/40
          backdrop-blur-xl

          outline-none

          shadow-lg
        "
        />

        {/* ROLE FILTER */}
        <div className="flex gap-3 flex-wrap">

          {[
            "all",
            "buyer",
            "seller",
            "admin"
          ].map((role) => (

            <button
              key={role}

              onClick={() =>
                setFilterRole(role)
              }

              className={`
                px-5 py-3

                rounded-2xl

                font-bold

                transition-all

                ${
                  filterRole === role
                    ? `
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500

                      text-white

                      shadow-xl
                    `
                    : `
                      bg-white/40
                      backdrop-blur-xl

                      text-zinc-700
                    `
                }
              `}
            >
              {role}
            </button>

          ))}

        </div>

      </div>

      {/* =======================
          TABLE
      ======================== */}
      <div
        className="
        overflow-hidden

        rounded-[36px]

        border border-white/20

        bg-white/30
        backdrop-blur-2xl

        shadow-[0_15px_60px_rgba(0,0,0,0.08)]
      "
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead
              className="
              bg-white/40
            "
            >

              <tr>

                <th className="p-6 text-left">
                  User
                </th>

                <th className="p-6 text-left">
                  Role
                </th>

                <th className="p-6 text-left">
                  Status
                </th>

                <th className="p-6 text-left">
                  Joined
                </th>

                <th className="p-6 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}

                    className="
                    text-center

                    py-20

                    text-zinc-500
                  "
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                filteredUsers.map(
                  (user) => (

                    <tr
                      key={user.id}

                      className="
                      border-t
                      border-white/10

                      hover:bg-white/20

                      transition-all
                    "
                    >

                      {/* USER */}
                      <td className="p-6">

                        <div className="flex items-center gap-4">

                          <div
                            className="
                            w-14 h-14

                            rounded-2xl

                            bg-gradient-to-br
                            from-orange-500
                            to-amber-500

                            flex items-center justify-center

                            text-white
                            font-black
                            text-lg
                          "
                          >
                            {
                              user.name
                                ?.charAt(0)
                                ?.toUpperCase()
                            }
                          </div>

                          <div>

                            <p className="font-black">
                              {user.name}
                            </p>

                            <p
                              className="
                              text-sm
                              text-zinc-500
                            "
                            >
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="p-6">

                        <span
                          className={`
                            px-4 py-2

                            rounded-full

                            text-sm
                            font-bold

                            ${
                              user.role ===
                              "admin"
                                ? `
                                  bg-purple-100
                                  text-purple-700
                                `
                                : user.role ===
                                  "seller"
                                ? `
                                  bg-orange-100
                                  text-orange-700
                                `
                                : `
                                  bg-blue-100
                                  text-blue-700
                                `
                            }
                          `}
                        >
                          {user.role}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="p-6">

                        <span
                          className={`
                            px-4 py-2

                            rounded-full

                            text-sm
                            font-bold

                            ${
                              user.status ===
                              "active"
                                ? `
                                  bg-green-100
                                  text-green-700
                                `
                                : user.status ===
                                  "suspended"
                                ? `
                                  bg-yellow-100
                                  text-yellow-700
                                `
                                : `
                                  bg-red-100
                                  text-red-700
                                `
                            }
                          `}
                        >
                          {user.status}
                        </span>

                      </td>

                      {/* DATE */}
                      <td className="p-6 text-zinc-500">

                        {
                          new Date(
                            user.created_at
                          ).toLocaleDateString()
                        }

                      </td>

                      {/* ACTIONS */}
                      <td className="p-6">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              updateStatus(
                                user.id,
                                "active"
                              )
                            }

                            className="
                            px-4 py-2

                            rounded-xl

                            bg-green-500

                            text-white
                            font-bold

                            shadow-lg
                          "
                          >
                            Activate
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                user.id,
                                "suspended"
                              )
                            }

                            className="
                            px-4 py-2

                            rounded-xl

                            bg-yellow-500

                            text-white
                            font-bold

                            shadow-lg
                          "
                          >
                            Suspend
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                user.id,
                                "banned"
                              )
                            }

                            className="
                            px-4 py-2

                            rounded-xl

                            bg-red-500

                            text-white
                            font-bold

                            shadow-lg
                          "
                          >
                            Ban
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

// ==========================
// STAT CARD
// ==========================
function StatCard({
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

      p-7

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