const LoadingProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-4 mt-10 space-y-5 bg-white border rounded-lg shadow-xl sm:space-x-5 sm:flex-row  animate-pulse max-container">
      <div className="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-full"></div>
      <div className="text-center sm:text-left">
        <h3 className="h-4 w-40 bg-gray-200 mb-4"></h3>
        <p className="h-2 w-24 bg-gray-200"></p>
        <p className="h-2 w-24 mt-2 bg-gray-200"></p>
      </div>
    </div>
  );
};

export default LoadingProfileSkeleton;
