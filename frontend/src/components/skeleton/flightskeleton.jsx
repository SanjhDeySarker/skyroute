export default function FlightSkeleton() {
  return (
    <div className="bg-white p-4 rounded shadow border animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>

      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
