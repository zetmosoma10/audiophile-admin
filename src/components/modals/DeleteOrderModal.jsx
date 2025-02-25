import Modal from "./Modal";

const DeleteOrderModal = ({ closeDeleteModal, order }) => {
  const isPending = false;
  return (
    <Modal closeModal={closeDeleteModal}>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Confirm Deletion</h3>
        <p className="text-base font-medium text-gray-900 opacity-70">
          Are you sure you want to delete order{" "}
          <span className="font-bold opacity-100">#{order.orderNumber}</span>?
          This action cannot be undone.
        </p>
        <div className="flex items-center justify-end mt-5 space-x-3">
          <button
            onClick={closeDeleteModal}
            className="px-3 py-1 text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-500"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteOrderModal;
