import React, { useState } from "react";
import Swal from "sweetalert2";
import supabase from "../utils/supaClient";
import useCartStore from "../utils/store/usecart";

const formatHarga = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
};

const CheckoutButton = ({ cart, totalHarga, navigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const clearCart = useCartStore.getState().clearCart;

  const confirmCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Keranjang Kosong!",
        text: "Silakan pilih produk sebelum melanjutkan pembayaran.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const productList = cart
      .map(
        (item) =>
          `<div class="swal-product">
              <span>${item.quantity}×</span> 
              <span>${item.barang.nama_barang}</span> 
              <span>${formatHarga(item.barang.harga * item.quantity)}</span>
            </div>`
      )
      .join("");

    Swal.fire({
      title: "Konfirmasi Pembelian",
      html: `
          <div class="swal-container">
            <div class="swal-products">${productList}</div>
            <div class="swal-total">
              <b>Total Harga: ${formatHarga(totalHarga)}</b>
            </div>
          </div>
        `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Beli Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckout();
      }
    });
  };

  const handleCheckout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const { data: user } = await supabase.auth.getUser();
    if (!user) {
      Swal.fire("Silakan login terlebih dahulu", "", "info");
      setIsProcessing(false);
      return;
    }

    // Ambil full_name dari Supabase
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.user.id)
      .single();

    if (profileError || !profile) {
      Swal.fire("Gagal mengambil nama pengguna", "Silakan coba lagi.", "error");
      setIsProcessing(false);
      return;
    }

    const itemDetails = cart.map((item) => ({
      id: item.barang_id,
      price: item.barang.harga,
      quantity: item.quantity,
      name: item.barang.nama_barang,
    }));

    const orderId = `ORDER-${new Date().getTime()}`;
    const transactionDetails = {
      order_id: orderId,
      gross_amount: totalHarga,
    };

    const customerDetails = {
      first_name: profile.full_name,
    };

    const response = await fetch(
      "https://beckend-payment.vercel.app/api/midtrans/create-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionDetails,
          customerDetails,
          itemDetails,
        }),
      }
    );

    const { token } = await response.json();

    window.snap.pay(token, {
      onSuccess: async (midtransResponse) => {
        const paymentChannel =
          midtransResponse.payment_type || "Tidak Diketahui";

        const { error: riwayatError } = await supabase.from("riwayat").insert(
          cart.map((item) => ({
            profile_id: user.user.id,
            barang_id: item.barang_id,
            quantity: item.quantity,
            status: "Success",
            order_id: orderId,
            total_harga: cart.reduce(
              (total, item) => total + item.barang.harga * item.quantity,
              0
            ),
            payment_channel: paymentChannel,
          }))
        );

        if (riwayatError) {
          console.error(riwayatError);
          Swal.fire(
            "Terjadi kesalahan saat menyimpan riwayat",
            riwayatError.message,
            "error"
          );
          setIsProcessing(false);
          return;
        }

        // Perbarui stok barang
        for (const item of cart) {
          const { error: stockError } = await supabase
            .from("barang")
            .update({
              stok: item.barang.stok - item.quantity,
            })
            .eq("id", item.barang_id);

          if (stockError) {
            console.error(stockError);
            Swal.fire(
              `Gagal mengurangi stok untuk ${item.barang.nama_barang}`,
              stockError.message,
              "error"
            );
            setIsProcessing(false);
            return;
          }
        }

        await supabase
          .from("keranjang")
          .delete()
          .eq("profile_id", user.user.id)
          .in(
            "barang_id",
            cart.map((item) => item.barang_id)
          );

        Swal.fire({
          title: "Pembayaran Berhasil!",
          html: `<p>Pesanan Anda sedang diproses.</p><p><strong>Order ID:</strong> ${orderId}</p>`,
          icon: "success",
          showCancelButton: true,
          cancelButtonText: "Tutup",
          confirmButtonText: "Salin Order ID",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(orderId);
            Swal.fire(
              "Tersalin!",
              "Order ID telah disalin ke clipboard.",
              "success"
            ).then(() => navigate("/riwayat"));
          } else {
            navigate("/riwayat");
          }
        });
      },

      onPending: () => {
        Swal.fire(
          "Pembayaran Tertunda",
          "Silakan selesaikan pembayaran Anda.",
          "warning"
        );
      },
      onError: () => {
        Swal.fire(
          "Pembayaran Gagal",
          "Terjadi kesalahan saat memproses pembayaran.",
          "error"
        );
      },
    });
  };

  return (
    <div className="mt-6">
      <button
        onClick={confirmCheckout}
        className={`relative flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out transform active:scale-95 w-full text-lg font-semibold tracking-wide h-12 min-w-[180px] ${
          isProcessing
            ? "opacity-60 cursor-not-allowed"
            : "hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl"
        }`}
        disabled={isProcessing}
      >
        <div className="flex items-center space-x-2">
          {isProcessing && (
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}

          <span>{isProcessing ? "Memproses..." : "Lanjutkan Pembayaran"}</span>
        </div>
      </button>
    </div>
  );
};

export default CheckoutButton;
