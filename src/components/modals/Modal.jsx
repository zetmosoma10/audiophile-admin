const Modal = ({ children, closeModal }) => {
  return (
    <section
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 mx-3 text-gray-900 bg-white rounded-lg shadow-md w-96"
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
