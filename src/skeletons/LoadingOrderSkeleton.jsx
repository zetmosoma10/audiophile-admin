const LoadingOrderSkeleton = () => {
  return (
    <div className="max-container animate-pulse">
      {/* Header info Text */}
      <div className="mt-10 flex items-center justify-between">
        <div className="bg-gray-200 h-4 w-20"></div>
        <div className="bg-gray-200 h-5 w-20"></div>
      </div>

      <div className="grid mt-4 gap-y-5">
        {/* Order Items Info */}
        <div className="order-1 pt-3 pb-8 mt-5 bg-white border rounded-lg shadow-md md:order-2">
          <div className="px-3 pb-4 mt-4 space-y-3 md:px-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="bg-gray-200 w-14 h-14 rounded-sm"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-3 w-20"></div>
                  <div className="bg-gray-200 h-3 w-14"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details Info */}
        <div className="grid order-2 p-4 bg-white border rounded-lg shadow-md md:p-8 large_tablet:grid-cols-3 md:order-1 gap-y-9">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="bg-gray-200 h-4 w-36"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 h-2 w-24 rounded-sm"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End of Order Info */}
    </div>
  );
};

export default LoadingOrderSkeleton;
