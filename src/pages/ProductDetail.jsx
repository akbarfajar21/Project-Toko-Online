import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";
import { Helmet } from "react-helmet";

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

  const getCategoryColor = (jenis) => {
    const colors = {
      "Kebutuhan Rumah Tangga": "bg-blue-500",
      Minuman: "bg-green-500",
      "Bahan Pokok": "bg-yellow-500",
      Kemasan: "bg-purple-500",
      Makanan: "bg-red-500",
    };
    return colors[jenis] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>{`Toko Online - ${product.nama_barang}`}</title>
      </Helmet>

      <Header />
      <div className="container mx-auto px-6 py-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 mt-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-5 rounded-lg shadow-md transition-all"
        >
          ← Kembali
        </button>

        {/* Card Produk */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-md mx-auto p-6">
          {/* Gambar Produk (ditengahkan) */}
          <div className="flex justify-center">
            <img
              src={product.foto_barang}
              alt={product.nama_barang}
              className="w-60 h-60 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Detail Produk */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.nama_barang}
            </h1>

            <p className="text-yellow-500 font-semibold text-2xl mt-2">
              {formatRupiah(product.harga)}
            </p>

            <p className="text-gray-700 dark:text-gray-300 mt-4 text-base leading-relaxed">
              {product.deskripsi}
            </p>

            {/* Informasi Tambahan */}
            <div className="bg-gray-100 dark:bg-gray-700 p-5 mt-6 rounded-lg shadow-md">
              <div className="flex justify-around items-center text-sm text-gray-600 dark:text-gray-300">
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {product.stok}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Stok
                  </p>
                </div>

                {/* Garis Pemisah */}
                <div className="w-px h-10 bg-gray-400 opacity-40"></div>

                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {new Date(product.created_at).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Dibuat
                  </p>
                </div>

                {/* Garis Pemisah */}
                <div className="w-px h-10 bg-gray-400 opacity-40"></div>

                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {new Date(product.updated_at).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Terakhir Diperbarui
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
