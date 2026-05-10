export default function FloatingBlobs() {
    return (
      <div className="absolute inset-0 overflow-hidden -z-10">
  
        {/* TOP LEFT */}
        <div
          className="
          absolute
  
          top-[-120px]
          left-[-120px]
  
          w-[420px]
          h-[420px]
  
          rounded-full
  
          bg-orange-300/30
  
          blur-3xl
        "
        />
  
        {/* TOP RIGHT */}
        <div
          className="
          absolute
  
          top-[80px]
          right-[-100px]
  
          w-[380px]
          h-[380px]
  
          rounded-full
  
          bg-amber-300/30
  
          blur-3xl
        "
        />
  
        {/* CENTER */}
        <div
          className="
          absolute
  
          top-[35%]
          left-[35%]
  
          w-[320px]
          h-[320px]
  
          rounded-full
  
          bg-yellow-200/20
  
          blur-3xl
        "
        />
  
        {/* BOTTOM LEFT */}
        <div
          className="
          absolute
  
          bottom-[-100px]
          left-[10%]
  
          w-[360px]
          h-[360px]
  
          rounded-full
  
          bg-orange-200/20
  
          blur-3xl
        "
        />
  
        {/* BOTTOM RIGHT */}
        <div
          className="
          absolute
  
          bottom-[-120px]
          right-[-100px]
  
          w-[450px]
          h-[450px]
  
          rounded-full
  
          bg-amber-200/20
  
          blur-3xl
        "
        />
  
      </div>
    );
  }