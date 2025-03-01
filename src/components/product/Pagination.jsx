import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 mb-6">
      {" "}
      {/* Tambah margin bawah */}
      <nav>
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => handlePageClick(number)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 
                  ${
                    currentPage === number
                      ? "bg-amber-500 text-white font-semibold shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-amber-400 hover:text-white"
                  }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
