export default function DashboardSkeleton() {

    return (
      <div className="space-y-8">
  
        {/* OVERVIEW */}
        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-5
  
          gap-6
        "
        >
  
          {[...Array(5)].map(
            (_, i) => (
  
              <div
                key={i}
  
                className="
                h-40
  
                rounded-[32px]
  
                bg-white/30
  
                animate-pulse
              "
              />
  
            )
          )}
  
        </div>
  
        {/* MAIN */}
        <div
          className="
          grid
          xl:grid-cols-2
  
          gap-8
        "
        >
  
          {[...Array(4)].map(
            (_, i) => (
  
              <div
                key={i}
  
                className="
                h-[320px]
  
                rounded-[32px]
  
                bg-white/30
  
                animate-pulse
              "
              />
  
            )
          )}
  
        </div>
  
      </div>
    );
  }