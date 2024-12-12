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

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="my-10 dark:text-white">
      <h2 className="text-5xl font-bold text-center">Our Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {displayedProducts.map((item) => (
          <Card
            key={item.id}
            title={item.nama_barang}
            price={formatRupiah(item.harga)}
            description={item.deskripsi}
            image={item.foto_barang}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          className="btn btn-warning text-white bg-yellow-500 hover:bg-yellow-400 py-2 px-4 rounded-md transition-colors duration-300"
          to="/product"
        >
          Product Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default ProductList;