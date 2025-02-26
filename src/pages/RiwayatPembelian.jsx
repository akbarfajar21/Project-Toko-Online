import { useEffect, useState } from "react";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";
import { Helmet } from "react-helmet";

const formatHarga = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
};

const RiwayatPembelian = () => {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const fetchRiwayat = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("riwayat")
        .select(
          "id, order_id, barang_id, quantity, status, created_at, barang(nama_barang, harga, foto_barang)"
        )
        .eq("profile_id", user.user.id)
        .order("created_at", { ascending: false });

      if (!error) setRiwayat(data);
    };

    fetchRiwayat();
  }, []);

  return (
    <div className="p-5">
      <Helmet>
        <title>Project Toko Online | Riwayat</title>
      </Helmet>
      <Header />
      <h1 className="mt-20 text-3xl font-bold text-center text-gray-800 mb-6">
        Riwayat Pembelian
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-2 ">
        {riwayat.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
          >
            <img
              src={item.barang.foto_barang}
              alt={item.barang.nama_barang}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              {item.barang.nama_barang}
            </h2>

            <p className="text-gray-600 text-sm mt-1">
              Jumlah: {item.quantity}
            </p>
            <p className="text-gray-700 font-medium mt-1">
              Total Harga: {formatHarga(item.barang.harga * item.quantity)}
            </p>

            <p
              className={`text-sm font-semibold mt-2 px-2 py-1 rounded-md w-fit ${
                item.status === "Success"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              Status: {item.status}
            </p>

            {/* Menampilkan tanggal transaksi */}
            <p className="text-gray-500 text-xs mt-2">
              Tanggal :{" "}
              {new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(item.created_at))}
            </p>

            <p className="text-gray-500 text-xs mt-1">
              Order ID : {item.order_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatPembelian;
