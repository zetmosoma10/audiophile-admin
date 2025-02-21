import LoadingTableSkeleton from "./LoadingTableSkeleton";

const LoadingDashboardSkeleton = () => {
  return (
    <div className="min-h-screen text-gray-900 max-container">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 large_tablet:grid-cols-4 animate-pulse ">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-24 p-4 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
      <div className="mt-8">
        <LoadingTableSkeleton />
      </div>
    </div>
  );
};

export default LoadingDashboardSkeleton;
