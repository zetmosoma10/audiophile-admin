import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUpdateOrderStatus from "../../hooks/useUpdateOrderStatus";
import Modal from "./Modal";
import Button from "../Button";

const UpdateOrderModal = ({ closeUpdateModal, order }) => {
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
      onSuccess: (data) => closeUpdateModal(),
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
    <Modal closeModal={closeUpdateModal}>
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
              className="font-bold text-[12px] tracking-[0.21px] "
            >
              Status
            </label>
            <select
              {...register("status")}
              className="block w-full indent-3 pb-[14px] pt-[15px] font-semibold text-sm mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {["pending", "shipped", "delivered", "cancelled"].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end mt-5 space-x-3">
            <Button onClick={closeUpdateModal} className=" btn-md btn-danger">
              Cancel
            </Button>

            <Button disabled={isDirty || isPending} className="btn-md btn-dark">
              {isPending ? "Submit..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateOrderModal;
