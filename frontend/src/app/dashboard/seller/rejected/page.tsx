export default function RejectedPage() {

    return (
      <div
        className="
        min-h-screen
  
        flex items-center justify-center
  
        bg-gradient-to-br
        from-red-100
        via-orange-50
        to-amber-100
  
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
            ❌
          </div>
  
          <h1
            className="
            mt-8
  
            text-5xl
            font-black
          "
          >
            Store Rejected
          </h1>
  
          <p
            className="
            mt-6
  
            text-zinc-600
            text-lg
  
            leading-relaxed
          "
          >
            Unfortunately your store request
            did not pass our verification process.
          </p>
  
          <button
            className="
            mt-10
  
            px-8 py-4
  
            rounded-2xl
  
            bg-gradient-to-r
            from-red-500
            to-orange-500
  
            text-white
            font-bold
          "
          >
            Contact Support
          </button>
  
        </div>
  
      </div>
    );
  }