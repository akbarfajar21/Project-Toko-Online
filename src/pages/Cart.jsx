import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";

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
        // Mengelompokkan produk yang sama berdasarkan barang_id
        const groupedCart = data.reduce((acc, item) => {
          const foundItem = acc.find(
            (cartItem) => cartItem.barang_id === item.barang_id
          );
          if (foundItem) {
            foundItem.quantity += item.quantity; // Menambahkan quantity
          } else {
            acc.push(item); // Menambahkan item baru jika belum ada
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

  // Fungsi untuk menghapus produk dari keranjang
  const handleDelete = async (barang_id) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    // SweetAlert konfirmasi sebelum menghapus
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
        // Menghapus item dari state lokal setelah berhasil dihapus dari database
        setCart(cart.filter((item) => item.barang_id !== barang_id));

        // SweetAlert Toast untuk notifikasi sukses
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
      <Header />
      <div className="p-4 sm:p-6 flex-grow max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/product")}
            className="text-gray-600 dark:text-gray-200 text-xl hover:text-gray-800 dark:hover:text-gray-400 transition-colors"
          >
            <FaArrowLeft />
          </button>

          <h1 className="mt-32 text-2xl sm:text-3xl font-bold text-center flex-grow text-gray-800 dark:text-gray-200">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex justify-center items-center flex-col">
            <p className="text-gray-500 dark:text-gray-300 text-center mt-4">
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
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.barang_id}
                className="flex items-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b border-gray-200 dark:border-gray-700 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
              >
                <img
                  src={item.barang.foto_barang}
                  alt={item.barang.nama_barang}
                  className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="flex-grow ml-4 sm:ml-6">
                  <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {item.barang.nama_barang}
                  </h2>
                  <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-300">
                    {formatHarga(item.barang.harga)}
                  </p>
                  <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-300">
                    Jumlah: {item.quantity}
                  </p>
                  <p className="text-xs sm:text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Subtotal: {formatHarga(item.barang.harga * item.quantity)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDelete(item.barang_id)}
                    className="text-red-600 dark:text-red-400 text-lg sm:text-xl hover:text-red-800 dark:hover:text-red-500 transition-all"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t mt-8 mb-6 dark:border-gray-700"></div>
        {cart.length > 0 && (
          <div className="flex justify-between items-center flex-col sm:flex-row mt-6">
            <p className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0 text-gray-800 dark:text-gray-200">
              Total: {formatHarga(totalHarga)}
            </p>
            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => navigate("/product")}
                className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
