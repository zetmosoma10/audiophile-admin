import _ from "lodash";

const Pagination = ({
  incrementPage,
  decrementPage,
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  const pageArray = _.range(1, totalPages + 1);

  let bgColor;
  bgColor = "lightgray";

  return (
    <nav className="flex items-center mt-6" aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={decrementPage}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg bg-white  border border-gray-200 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous"
      >
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="hidden sm:block">Previous</span>
      </button>
      {pageArray.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          style={{ backgroundColor: currentPage === page && bgColor }}
          className=" min-h-[38px] min-w-[38px] flex justify-center items-center bg-white  text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none $focus:bg-gray-300 hover:bg-gray-300 -700 disabled:opacity-50 disabled:pointer-events-none   "
          aria-current="page"
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={incrementPage}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg bg-white  border border-gray-200 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next"
      >
        <span className="hidden sm:block">Next</span>
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
