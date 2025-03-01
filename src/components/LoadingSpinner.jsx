import React from "react";
import { FaUtensils } from "react-icons/fa";

const FoodLoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="relative w-16 h-16">
        {/* Piring */}
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md"></div>
        {/* Makanan (animasi berputar) */}
        <div className="w-full h-full border-4 border-t-4 border-yellow-500 dark:border-yellow-400 rounded-full animate-spin"></div>
      </div>
      {/* Ikon Garpu & Sendok */}
      <FaUtensils className="text-yellow-500 dark:text-yellow-400 text-3xl animate-bounce" />
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium">
        Sedang menyiapkan produk...
      </p>
    </div>
  );
};

export default FoodLoadingSpinner;
