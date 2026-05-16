export default function LatestUsers({
    users
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
            Latest Users 👥
          </h2>
  
          <p
            className="
            mt-2
            text-zinc-500
          "
          >
            Recently registered users
          </p>
  
        </div>
  
        {/* LIST */}
        <div className="mt-8 space-y-5">
  
          {users?.map(
            (user: any) => (
  
              <div
                key={user.id}
  
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
                    {user.name}
                  </h3>
  
                  <p
                    className="
                    text-sm
                    text-zinc-500
                  "
                  >
                    {user.email}
                  </p>
  
                </div>
  
                <span
                  className="
                  px-4 py-2
  
                  rounded-full
  
                  bg-blue-100
  
                  text-blue-700
                  text-sm
                  font-bold
                "
                >
                  {user.role}
                </span>
  
              </div>
  
            )
          )}
  
        </div>
  
      </div>
    );
  }