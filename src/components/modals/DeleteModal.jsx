import { toast } from "react-toastify";
import { useDeleteOrder } from "../../hooks/useDeleteOrder";
import Modal from "./Modal";
import Button from "./../Button";
import { useDeleteCustomer } from "../../hooks/useDeleteCustomer";

const DeleteModal = ({ closeDeleteModal, order, user }) => {
  const { mutate: mutateOrder, isPending: isOrderPending } = useDeleteOrder();
  const { mutate: mutateUser, isPending: isUserPending } = useDeleteCustomer();

  let isPending = false;
  if (order) {
    isPending = isUserPending;
  } else if (user) {
    isPending = isOrderPending;
  }

  const handleOrderMutation = () => {
    mutateOrder(order, {
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

  const handleUserMutation = () => {
    mutateUser(user, {
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

  // * Submit user or order handler
  const onSubmit = () => {
    if (order) {
      return handleOrderMutation();
    }

    return handleUserMutation();
  };

  return (
    <Modal closeModal={closeDeleteModal}>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Confirm Deletion</h3>
        <p className="mt-2 text-base font-medium text-gray-500">
          Are you sure you want to delete {order ? "order" : "user"}{" "}
          <span className="font-bold text-gray-900">
            {order ? `#${order?.orderNumber}` : `(${user.email})`}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end mt-5 space-x-3">
          <Button onClick={closeDeleteModal} className="btn-small btn-dark">
            Cancel
          </Button>
          <Button
            disabled={isUserPending || isOrderPending}
            onClick={onSubmit}
            className="btn-small btn-danger"
          >
            {isUserPending || isOrderPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
