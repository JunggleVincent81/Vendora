export default function OrderStatusBadge({
    status
  }: any) {
  
    const styles: any = {
      pending:
        "bg-yellow-100 text-yellow-700",
  
      packed:
        "bg-orange-100 text-orange-700",
  
      shipped:
        "bg-blue-100 text-blue-700",
  
      completed:
        "bg-green-100 text-green-700",
  
      cancelled:
        "bg-red-100 text-red-700"
    };
  
    return (
      <div
        className={`
          px-4 py-2
  
          rounded-full
  
          text-sm
          font-bold
  
          ${styles[status]}
        `}
      >
        {status}
      </div>
    );
  }