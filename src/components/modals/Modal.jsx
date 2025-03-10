import { motion } from "motion/react";

const Modal = ({ children, closeModal }) => {
  return (
    <section
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="p-6 mx-3 text-gray-900 bg-white rounded-lg shadow-md w-96"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Modal;
