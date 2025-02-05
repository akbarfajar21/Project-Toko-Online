import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";

const fetchProductDetail = async (id) => {
  const { data, error } = await supabase
    .from("barang")
    .select("*")
    .eq("id", id)
    .single();

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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600 text-xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mt-16 mb-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md shadow-md"
        >
          ← Kembali
        </button>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={product.foto_barang}
                alt={product.nama_barang}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {product.nama_barang}
              </h1>
              <p className="text-xl text-yellow-500 font-semibold mb-4">
                {formatRupiah(product.harga)}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {product.deskripsi}
              </p>

              <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-semibold">Jenis Barang</p>
                  <p>{product.jenis_barang}</p>
                </div>
                <div>
                  <p className="font-semibold">Stok</p>
                  <p>{product.stok}</p>
                </div>
                <div>
                  <p className="font-semibold">Dibuat</p>
                  <p>
                    {new Date(product.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Terakhir Diperbarui</p>
                  <p>
                    {new Date(product.updated_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
