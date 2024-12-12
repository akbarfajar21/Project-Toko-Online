import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";
import AllProduct from "../components/product/AllProduct";
import Sidebar from "../components/product/Sidebar";
import Pagination from "../components/product/Pagination";
import supabase from "../utils/supaClient";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("barang")
    .select("id, nama_barang, harga, deskripsi, foto_barang, jenis_barang");

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

const ProductsPage = () => {
  const {
    data: rawProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 8;

  React.useEffect(() => {
    if (!isLoading && !isError) {
      setProducts(
        rawProducts.map((item) => ({
          ...item,
          hargaFormatted: formatRupiah(item.harga),
        }))
      );
    }
  }, [rawProducts, isLoading, isError]);

  const applyFilters = () => {
    let filteredProducts = [...rawProducts];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (item) => item.jenis_barang === selectedCategory
      );
    }

    if (selectedSort === "highest") {
      filteredProducts.sort((a, b) => b.harga - a.harga);
    } else if (selectedSort === "lowest") {
      filteredProducts.sort((a, b) => a.harga - b.harga);
    } else if (selectedSort === "A-Z") {
      filteredProducts.sort((a, b) =>
        a.nama_barang.localeCompare(b.nama_barang)
      );
    } else if (selectedSort === "Z-A") {
      filteredProducts.sort((a, b) =>
        b.nama_barang.localeCompare(a.nama_barang)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (item) =>
          item.nama_barang.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query)
      );
    }

    filteredProducts = filteredProducts.map((item) => ({
      ...item,
      hargaFormatted: formatRupiah(item.harga),
    }));

    setProducts(filteredProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortByHighest = () => {
    setSelectedSort("highest");
  };

  const handleSortByLowest = () => {
    setSelectedSort("lowest");
  };

  const handleSortByAZ = () => {
    setSelectedSort("A-Z");
  };

  const handleSortByZA = () => {
    setSelectedSort("Z-A");
  };

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedSort(null);
    setSearchQuery("");
    setProducts(rawProducts.map((item) => ({})));
  };

  React.useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSort, searchQuery]);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <>
      <Header />
      <main className="m-4 flex flex-col items-center ">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden mb-4 mt-24 flex items-center justify-center w-full max-w-xs py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Filter Produk
        </button>

        <input
          type="text"
          placeholder="Cari produk..."
          className="input input-bordered w-full max-w-lg mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex w-full">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onCloseSidebar={() => setIsSidebarOpen(false)}
            onSortByHighest={handleSortByHighest}
            onSortByLowest={handleSortByLowest}
            onSortByAZ={handleSortByAZ}
            onSortByZA={handleSortByZA}
            onResetFilter={handleResetFilter}
            onFilterCategory={handleFilterByCategory}
          />
          <section className="w-full px-4">
            {isError ? (
              <p className="text-red-500">Error: {error.message}</p>
            ) : (
              <AllProduct
                products={getCurrentPageProducts().map((item) => ({
                  ...item,
                  harga: item.hargaFormatted,
                }))}
                isLoading={isLoading}
              />
            )}
          </section>
        </div>

        <Pagination
          totalProducts={products.length}
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
