import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const QuantitySelector = ({
  quantity,
  stock,
  onIncrease,
  onDecrease,
  onChange,
}) => {
  const handleIncrease = () => {
    if (quantity < stock) {
      onIncrease();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Stok Tidak Cukup!",
        text: `Maksimum stok yang tersedia hanya ${stock} unit.`,
        confirmButtonColor: "#f59e0b", // Warna amber
      });
    }
  };

  const handleChange = (e) => {
    let newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity > stock) {
      Swal.fire({
        icon: "warning",
        title: "Stok Tidak Cukup!",
        text: `Maksimum stok yang tersedia hanya ${stock} stok.`,
        confirmButtonColor: "#f59e0b",
      });
      newQuantity = stock;
    }
    onChange(newQuantity);
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full shadow p-0.5">
      {/* Tombol Kurangi */}
      <button
        onClick={onDecrease}
        className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 text-xs"
        disabled={quantity <= 1}
      >
        <FaMinus />
      </button>

      {/* Input Angka */}
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-8 mx-1 text-center bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 text-sm font-medium"
        min="1"
      />

      {/* Tombol Tambah */}
      <button
        onClick={handleIncrease}
        className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-xs"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;
