import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import { MdLocalShipping } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import dayjs from "dayjs";
import BackLink from "../components/BackLink";
import { useGetOrder } from "../hooks/useGetOrder";
import LoadingOrderSkeleton from "../skeletons/LoadingOrderSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";

const baseUrl = import.meta.env.VITE_BASE_URL;

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const {
    data: currentOrder,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrder(orderId);

  if (isLoading) {
    return <LoadingOrderSkeleton />;
  }

  // ! EXPECTED ERRORS
  if (isError && error?.response?.status === 401) {
    logout();

    return navigate("/login", {
      state: { from: location, message: "You should login first" },
    });
  }

  if (
    isError &&
    (error?.response?.status === 400 || error?.response?.status === 404)
  ) {
    return navigate("*", { replace: true });
  }

  // ! UNEXPECTED ERRORS
  if (isError && (!error.response || error.response?.status >= 500)) {
    return (
      <UnExpectedError refetch={refetch} error={error} isLoading={isLoading} />
    );
  }

  const vat = currentOrder?.order?.vat * currentOrder?.order?.grandTotal;

  let statusColor = "";
  if (currentOrder?.order?.status === "pending") {
    statusColor = "bg-green-300 text-green-700";
  } else if (currentOrder?.order?.status === "shipped") {
    statusColor = "bg-orange-300 text-orange-700";
  } else if (currentOrder?.order?.status === "delivered") {
    statusColor = "bg-blue-300 text-blue-700";
  } else if (currentOrder?.order?.status === "cancelled") {
    statusColor = "bg-red-300 text-red-700";
  }

  return (
    <div className="text-gray-900 max-container">
      <BackLink />
      {/* Header info Text */}
      <div className="mt-10 space-y-4 ">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            Order #{currentOrder?.order?._id.toString().toUpperCase().slice(-4)}
          </p>
          <div
            className={`py-1 px-2 text-sm font-medium tracking-[0.6px] text-WHITE ${statusColor} uppercase rounded-sm`}
          >
            {currentOrder?.order?.status}
          </div>
        </div>
        <p className="space-x-3 text-sm uppercase opacity-50">
          <span>
            ORDERED:{" "}
            {dayjs(currentOrder?.order?.createdAt).format("DD MMM YYYY")}
          </span>
          <span>
            PAID:{dayjs(currentOrder?.order?.createdAt).format("DD MMM YYYY")}
          </span>
        </p>
      </div>

      <div className="grid mt-4 gap-y-5">
        {/* Order Items Info */}
        <div className="order-1 pt-3 pb-8 mt-5 bg-white border rounded-lg shadow-md md:order-2">
          <header className="px-3 pb-2 border-b md:px-8 border-b-gray-300">
            <p className="text-lg font-bold">
              {currentOrder?.order?.status === "cancelled"
                ? "Cancelled"
                : `Delivery -
                ${dayjs(currentOrder?.order?.deliveryDate).format(
                  "DD MMM YYYY"
                )}`}
            </p>
          </header>
          <div className="px-3 pb-4 mt-4 space-y-3 border-b border-gray-300 md:px-8">
            {currentOrder?.order?.items?.map((item) => (
              <div key={item._id} className="flex space-x-2">
                <img
                  className="w-[75px] rounded-lg"
                  src={`${baseUrl}${item?.product?.imageSmall}`}
                  alt="product image"
                />
                <div>
                  <p className="text-sm font-bold">{item?.product?.name}</p>
                  <div className="space-x-2">
                    <span className="font-bold text-[12px]">
                      R{item?.price}
                    </span>
                    <span className="font-semibold text-[12px] opacity-70">
                      Qty: {item?.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details Info */}
        <div className="grid order-2 p-4 bg-white border rounded-lg shadow-md md:p-8 large_tablet:grid-cols-3 md:order-1 gap-y-9">
          <div className="order-1 space-y-3 large_tablet:order-3 ">
            <h4 className="text-lg uppercase opacity-70 large_tablet:font-bold large_tablet:opacity-100 large_tablet:capitalize large_tablet:flex large_tablet:items-center large_tablet:space-x-1">
              <span className="hidden large_tablet:inline-block">
                <GoListUnordered />
              </span>
              <span>Order summary</span>
            </h4>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm ">
                  {currentOrder?.order?.items?.length} item(s)
                </span>
                <span className="text-sm font-bold">
                  R{currentOrder?.order?.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm ">Delivery Fee</span>
                <span className="text-sm font-bold">
                  R{currentOrder?.order?.shipping}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm ">VAT(INCLUDE)</span>
                <span className="text-sm font-bold">
                  R{parseFloat(vat.toFixed(2))}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm ">Order Total:</span>
                <span className="text-sm font-bold">
                  R{currentOrder?.order?.grandTotal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm ">
                  Paid({currentOrder?.order?.paymentMethod})
                </span>
                <span className="text-sm font-bold">
                  -R{currentOrder?.order?.grandTotal}
                </span>
              </div>
            </div>
          </div>
          <div className="order-2 space-y-3 large_tablet:order-1">
            <h4 className="text-lg uppercase opacity-70 large_tablet:font-bold large_tablet:opacity-100 large_tablet:capitalize large_tablet:flex large_tablet:items-center large_tablet:space-x-1">
              <span className="hidden large_tablet:inline-block">
                <FaAddressBook />
              </span>
              <span>Shipping address</span>
            </h4>
            <div>
              <p className="text-sm ">{currentOrder?.order?.name}</p>
              <p className="text-sm">{currentOrder?.order?.address}</p>
              <p className="text-sm">{currentOrder?.order?.city}</p>
              <p className="text-sm">{currentOrder?.order?.postalCode}</p>
              <p className="text-sm">{currentOrder?.order?.country}</p>
            </div>
          </div>
          <div className="order-3 space-y-3 large_tablet:order-2">
            <div>
              <h4 className="text-lg uppercase opacity-70 large_tablet:font-bold large_tablet:opacity-100 large_tablet:capitalize large_tablet:flex large_tablet:items-center large_tablet:space-x-1">
                <span className="hidden large_tablet:inline-block">
                  <MdLocalShipping />
                </span>
                <span>Delivery Method</span>
              </h4>
              <p className="text-sm ">Standard</p>
            </div>
            <div>
              <h4 className="text-lg uppercase opacity-70 large_tablet:font-bold large_tablet:opacity-100 large_tablet:capitalize large_tablet:flex large_tablet:items-center large_tablet:space-x-1">
                <span className="hidden large_tablet:inline-block">
                  <MdOutlinePayment />
                </span>
                <span>Payment Method</span>
              </h4>
              <p className="text-sm ">{currentOrder?.order?.paymentMethod}</p>
            </div>
          </div>
        </div>
        {/* End of Order Info */}
      </div>
    </div>
  );
};

export default OrderDetails;
