import React from "react";

export default function Pagination({ totalProducts, productsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`btn mx-1 ${index + 1 === currentPage ? "btn-warning" : "btn-outline"}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
