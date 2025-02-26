import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../daisyui/Card";
import supabase from "../../utils/supaClient";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("barang")
    .select("id, nama_barang, harga, deskripsi, foto_barang");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const ProductList = () => {
  const [showAllProducts, setShowAllProducts] = useState(false); // State to track if all products are shown

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#f59e0b" size={50} />
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;

  const displayedProducts = products.slice(0, 5);

  return (
    <div className="my-16 text-gray-900 dark:text-white">
      {/* Judul dengan garis bawah */}
      <h2 className="text-4xl font-extrabold text-center relative pb-3">
        Our Product
        <span className="block w-16 h-1 bg-yellow-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      {/* Grid produk */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2">
        {displayedProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={item.foto_barang}
              alt={item.nama_barang}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{item.nama_barang}</h3>
            <p className="text-yellow-500 font-bold">
              {formatRupiah(item.harga)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {item.deskripsi}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/product"
          className="inline-block bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-400"
        >
          Lihat Semua Produk
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
