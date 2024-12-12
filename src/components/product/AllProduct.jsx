import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Card from "../daisyui/Card";

const SkeletonCard = () => (
  <div className="border rounded-lg shadow-md p-4 animate-pulse">
    <div className="h-40 bg-gray-300 rounded-md"></div>
    <div className="mt-4 h-6 bg-gray-300 rounded"></div>
    <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const AllProduct = ({ products, isLoading }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    const authToken = localStorage.getItem(
      "sb-nohdhimjdnmcytzooteh-auth-token"
    );

    if (authToken) {
      navigate(`/product/${id}`);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Anda belum login",
        text: "Silakan login untuk melihat detail produk.",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="dark:text-white w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="cursor-pointer"
              >
                <Card
                  title={item.nama_barang}
                  price={item.harga}
                  description={item.deskripsi}
                  image={item.foto_barang}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
