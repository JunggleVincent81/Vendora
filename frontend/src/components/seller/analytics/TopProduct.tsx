export default function TopProduct({
    name
  }: {
    name: string;
  }) {
  
    return (
      <div className="
        p-6
  
        rounded-[30px]
  
        border border-white/20
  
        bg-white/30
        backdrop-blur-xl
  
        shadow-lg
      ">
  
        <h2 className="text-xl font-bold">
          🏆 Top Product
        </h2>
  
        <p className="mt-3 text-2xl font-black text-orange-600">
          {name}
        </p>
  
        <p className="mt-2 text-sm text-gray-500">
          Best performing product in your store
        </p>
  
      </div>
    );
  }