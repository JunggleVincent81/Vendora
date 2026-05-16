"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  getToken
} from "@/services/auth";

export default function AdminStoresPage() {

  const [stores, setStores] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  // ==========================
  // FETCH STORES
  // ==========================
  const fetchStores =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:5000/api/v1/admin/stores",
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

        const data =
          await res.json();

        // FIX ERROR:
        // stores.map is not a function
        setStores(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

        setStores([]);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchStores();
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
          `http://localhost:5000/api/v1/admin/stores/${id}/status`,
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

        fetchStores();

      } catch (err) {

        console.log(err);

        alert(
          "Failed updating store"
        );

      }

    };

  // ==========================
  // FILTERED STORES
  // ==========================
  const filteredStores =
    useMemo(() => {

      return stores.filter(
        (store) => {

          const matchStatus =
            filter === "all"
              ? true
              : store.status === filter;

          const matchSearch =
            store.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchStatus &&
            matchSearch
          );

        }
      );

    }, [
      stores,
      filter,
      search
    ]);

  // ==========================
  // STATS
  // ==========================
  const stats = {

    total:
      stores.length,

    pending:
      stores.filter(
        (s) =>
          s.status ===
          "pending"
      ).length,

    approved:
      stores.filter(
        (s) =>
          s.status ===
          "approved"
      ).length,

    rejected:
      stores.filter(
        (s) =>
          s.status ===
          "rejected"
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

          bg-orange-100

          text-orange-700
          text-sm
          font-bold
        "
        >
          🏪 Marketplace Moderation
        </div>

        <h1
          className="
          mt-5

          text-5xl

          font-black

          text-zinc-900
        "
        >
          Store Approval
        </h1>

        <p
          className="
          mt-3

          text-zinc-500
          text-lg
        "
        >
          Review, approve, and manage
          seller marketplace stores.
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
          title="Total Stores"
          value={stats.total}
          icon="🏪"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon="🟡"
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          icon="🟢"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon="🔴"
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

          placeholder="Search store..."

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

        {/* FILTER */}
        <div className="flex gap-3 flex-wrap">

          {[
            "all",
            "pending",
            "approved",
            "rejected"
          ].map((item) => (

            <button
              key={item}

              onClick={() =>
                setFilter(item)
              }

              className={`
                px-5 py-3

                rounded-2xl

                font-bold

                transition-all

                ${
                  filter === item
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
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* =======================
          STORE LIST
      ======================== */}
      <div className="grid gap-6">

        {filteredStores.length === 0 ? (

          <div
            className="
            rounded-[32px]

            bg-white/30
            backdrop-blur-xl

            border border-white/20

            p-20

            text-center
          "
          >

            <div className="text-6xl">
              🏪
            </div>

            <h2
              className="
              mt-5

              text-3xl
              font-black
            "
            >
              No Stores Found
            </h2>

            <p
              className="
              mt-3

              text-zinc-500
            "
            >
              No stores match current filters.
            </p>

          </div>

        ) : (

          filteredStores.map((store) => (

            <div
              key={store.id}

              className="
              rounded-[36px]

              border border-white/20

              bg-white/30
              backdrop-blur-2xl

              p-8

              shadow-[0_15px_60px_rgba(0,0,0,0.08)]
            "
            >

              {/* TOP */}
              <div
                className="
                flex
                flex-col
                xl:flex-row

                xl:items-start
                xl:justify-between

                gap-8
              "
              >

                {/* LEFT */}
                <div className="flex gap-5">

                  {/* LOGO */}
                  <div
                    className="
                    w-20 h-20

                    rounded-3xl

                    bg-gradient-to-br
                    from-orange-500
                    to-amber-500

                    flex items-center justify-center

                    text-3xl

                    shadow-xl
                  "
                  >
                    🏪
                  </div>

                  {/* INFO */}
                  <div>

                    <h2
                      className="
                      text-3xl
                      font-black
                    "
                    >
                      {store.name}
                    </h2>

                    <p
                      className="
                      mt-3

                      text-zinc-500

                      max-w-2xl
                    "
                    >
                      {
                        store.description
                      }
                    </p>

                    <div
                      className="
                      mt-5

                      flex flex-wrap
                      gap-5

                      text-sm
                    "
                    >

                      <div>
                        <p className="font-bold">
                          Owner
                        </p>

                        <p className="text-zinc-500">
                          {
                            store.owner_name
                          }
                        </p>
                      </div>

                      <div>
                        <p className="font-bold">
                          Email
                        </p>

                        <p className="text-zinc-500">
                          {store.email}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* STATUS */}
                <div>

                  <span
                    className={`
                      px-5 py-3

                      rounded-full

                      text-sm
                      font-black

                      ${
                        store.status ===
                        "approved"
                          ? `
                            bg-green-100
                            text-green-700
                          `
                          : store.status ===
                            "rejected"
                          ? `
                            bg-red-100
                            text-red-700
                          `
                          : `
                            bg-yellow-100
                            text-yellow-700
                          `
                      }
                    `}
                  >
                    {store.status}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div
                className="
                mt-8

                flex flex-wrap
                gap-4
              "
              >

                <button
                  onClick={() =>
                    updateStatus(
                      store.id,
                      "approved"
                    )
                  }

                  className="
                  px-6 py-4

                  rounded-2xl

                  bg-green-500

                  text-white
                  font-bold

                  shadow-xl
                "
                >
                  Approve Store
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      store.id,
                      "rejected"
                    )
                  }

                  className="
                  px-6 py-4

                  rounded-2xl

                  bg-red-500

                  text-white
                  font-bold

                  shadow-xl
                "
                >
                  Reject Store
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      store.id,
                      "pending"
                    )
                  }

                  className="
                  px-6 py-4

                  rounded-2xl

                  bg-zinc-800

                  text-white
                  font-bold

                  shadow-xl
                "
                >
                  Reset Pending
                </button>

              </div>

            </div>

          ))

        )}

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