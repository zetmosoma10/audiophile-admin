import { toast } from "react-toastify";
import { useDeleteOrder } from "../../hooks/useDeleteOrder";
import Modal from "./Modal";
import Button from "./../Button";

const DeleteOrderModal = ({ closeDeleteModal, order }) => {
  const { mutate, isPending } = useDeleteOrder();

  const handleMutation = () => {
    mutate(order, {
      onSuccess: (data) => closeDeleteModal(),
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
    <Modal closeModal={closeDeleteModal}>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Confirm Deletion</h3>
        <p className="mt-2 text-base font-medium text-gray-500">
          Are you sure you want to delete order{" "}
          <span className="font-bold text-gray-900">#{order.orderNumber}</span>?
          This action cannot be undone.
        </p>
        <div className="flex items-center justify-end mt-5 space-x-3">
          <Button onClick={closeDeleteModal} className="btn-small btn-dark">
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleMutation}
            className="btn-small btn-danger"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteOrderModal;
