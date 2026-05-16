export default function PendingPage() {

    return (
      <div
        className="
        min-h-screen
  
        flex items-center justify-center
  
        bg-gradient-to-br
        from-orange-100
        via-amber-50
        to-yellow-100
  
        p-6
      "
      >
  
        <div
          className="
          max-w-2xl
          w-full
  
          rounded-[40px]
  
          border border-white/20
  
          bg-white/30
          backdrop-blur-2xl
  
          p-12
  
          text-center
  
          shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        "
        >
  
          <div className="text-7xl">
            ⏳
          </div>
  
          <h1
            className="
            mt-8
  
            text-5xl
            font-black
          "
          >
            Store Under Review
          </h1>
  
          <p
            className="
            mt-6
  
            text-zinc-600
            text-lg
  
            leading-relaxed
          "
          >
            Your store request is currently being reviewed
            by the Vendora admin team.
          </p>
  
          <div
            className="
            mt-10
  
            rounded-3xl
  
            bg-orange-100
  
            p-6
          "
          >
  
            <p
              className="
              text-orange-700
              font-semibold
            "
            >
              Estimated review time:
            </p>
  
            <h2
              className="
              mt-3
  
              text-3xl
              font-black
  
              text-orange-600
            "
            >
              1–2 Business Days
            </h2>
  
          </div>
  
        </div>
  
      </div>
    );
  }