export default function LoadingTableSkeleton() {
  return (
    <div className="w-full mt-6 rounded-lg">
      <div className="bg-white animate-pulse">
        <div className="w-full border border-gray-200 rounded-lg">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border-b border-gray-200"
            >
              <div className="h-4 bg-gray-200 rounded w-11 sm:w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-11 sm:w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-11 sm:w-24"></div>
              <div className="w-8 h-4 bg-gray-200 rounded sm:w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
