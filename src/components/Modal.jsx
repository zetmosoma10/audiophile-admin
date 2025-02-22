const Modal = ({ closeModal }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full z-50">
      <form className="bg-white text-gray-900 w-96 p-6 rounded-lg shadow-md mx-auto ">
        <h3 className="font-bold text-xl">Edit Order Status</h3>
        <div className="mt-3">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center justify-end mt-5 space-x-3">
            <button
              onClick={closeModal}
              className="py-1 px-3  text-white rounded-md bg-red-600 hover:bg-red-500"
            >
              Cancel
            </button>

            <button className="py-1 px-3  text-white rounded-md bg-gray-900 hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Modal;
