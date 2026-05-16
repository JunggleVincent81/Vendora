export default function OrdersSkeleton() {

    return (
      <div className="space-y-6">
  
        {[...Array(5)].map(
          (_, i) => (
  
            <div
              key={i}
  
              className="
              h-32
  
              rounded-[32px]
  
              bg-white/30
  
              animate-pulse
            "
            />
  
          )
        )}
  
      </div>
    );
  }