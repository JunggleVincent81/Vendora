export default function AnalyticsSkeleton() {

    return (
      <div className="space-y-8">
  
        {/* CARDS */}
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
  
        {/* CHARTS */}
        <div
          className="
          grid
          lg:grid-cols-2
  
          gap-8
        "
        >
  
          {[...Array(2)].map(
            (_, i) => (
  
              <div
                key={i}
  
                className="
                h-[420px]
  
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