import { useForm } from "react-hook-form";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { useState } from "react";
import { toast } from "react-toastify";

const Modal = ({ closeModal, order }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { dirtyFields },
  } = useForm({ defaultValues: { status: order.status } });

  const [serverError, setServerError] = useState(null);
  const { mutate, isPending } = useUpdateOrderStatus();

  const isDirty = !dirtyFields.status || getValues("status") === order.status;

  const onSubmit = (data) => {
    order.status = data.status;

    mutate(order, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          toast.error(error.response.data.message);
          setServerError(error.response.data.message);
        }
      },
    });
  };

  return (
    <section
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 mx-3 text-gray-900 bg-white rounded-lg shadow-md w-96"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-bold">Edit Order Status</h3>
          {serverError && (
            <p className="pt-3 text-sm font-bold text-center text-red-500">
              {serverError}
            </p>
          )}
          <div className="mt-3">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                {...register("status")}
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center justify-end mt-5 space-x-3">
              <button
                onClick={closeModal}
                className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>

              <button
                disabled={isDirty || isPending}
                className="px-3 py-1 text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {isPending ? "Submit..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Modal;
