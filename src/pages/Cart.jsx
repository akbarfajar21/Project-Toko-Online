import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";
import { Helmet } from "react-helmet";
import CheckoutButton from "../components/CheckoutButton";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("keranjang")
        .select(
          "id, barang_id, quantity, barang(nama_barang, foto_barang, harga, stok)"
        )
        .eq("profile_id", user.user.id);

      if (error) {
        console.error(error);
      } else {
        const groupedCart = data.reduce((acc, item) => {
          const foundItem = acc.find(
            (cartItem) => cartItem.barang_id === item.barang_id
          );
          if (foundItem) {
            foundItem.quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        setCart(groupedCart);
      }
    };

    fetchCart();
  }, []);

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const totalHarga = cart.reduce(
    (total, item) => total + item.barang.harga * item.quantity,
    0
  );

  const handleDelete = async (barang_id) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Produk akan dihapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("keranjang")
        .delete()
        .eq("profile_id", user.user.id)
        .eq("barang_id", barang_id);

      if (error) {
        Swal.fire("Terjadi kesalahan", error.message, "error");
      } else {
        setCart(cart.filter((item) => item.barang_id !== barang_id));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Produk berhasil dihapus",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#d4edda",
          color: "#155724",
          iconColor: "#155724",
          customClass: {
            popup: "shadow-md",
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Project Toko Online | Cart</title>
      </Helmet>
      <Header />
      <div className="p-4 sm:p-6 flex-grow max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate("/product")}
            className="text-gray-600 dark:text-gray-200 text-xl hover:text-gray-800 dark:hover:text-gray-400 transition-colors"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-2xl sm:text-3xl mt-28 font-bold flex-grow text-center text-gray-800 dark:text-gray-200">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-gray-500 dark:text-gray-300 text-lg text-center">
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/product")}
              className="mt-6 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.barang_id}
                className="flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                {/* Gambar Produk */}
                <img
                  src={item.barang.foto_barang}
                  alt={item.barang.nama_barang}
                  className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                />

                {/* Detail Produk */}
                <div className="flex-grow ml-5">
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {item.barang.nama_barang}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {formatHarga(item.barang.harga)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Jumlah: {item.quantity}
                  </p>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => handleDelete(item.barang_id)}
                  className="text-red-600 dark:text-red-400 text-lg hover:text-red-800 dark:hover:text-red-500 transition-all"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tombol Checkout */}
        {cart.length > 0 && (
          <div className="mt-8 flex justify-center">
            <CheckoutButton
              cart={cart}
              totalHarga={totalHarga}
              navigate={navigate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
