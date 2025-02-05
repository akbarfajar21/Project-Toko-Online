import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import FloatingButton from "../components/FloatingButton";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="container mt-5 mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-6 mt-14 text-yellow-500 dark:text-white">
            Tentang Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selamat datang di platform kami! Kami berkomitmen memberikan layanan
            terbaik kepada Anda dengan pengalaman belanja online yang
            menyenangkan, aman, dan terpercaya.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">
            Apa yang Kami Tawarkan?
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="/shopping.gif"
              alt="Tentang Website"
              className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <div className="md:w-1/2 md:pl-10">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center ">
                Kami memahami pentingnya kemudahan berbelanja di era modern.
                Oleh karena itu, kami menyediakan platform yang menawarkan
                berbagai produk berkualitas, layanan pelanggan yang responsif,
                dan pengiriman cepat. Dengan desain antarmuka yang ramah
                pengguna, kami memastikan pengalaman Anda tetap mudah dan
                efisien, kapan saja dan di mana saja.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">
            Visi dan Misi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Visi Kami
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Menjadi platform e-commerce terbaik di Indonesia yang menawarkan
                solusi belanja online terlengkap, terpercaya, dan inovatif bagi
                semua.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Misi Kami
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>Menyediakan produk berkualitas dengan harga kompetitif.</li>
                <li>
                  Mengutamakan kepuasan pelanggan melalui layanan terbaik.
                </li>
                <li>
                  Memanfaatkan teknologi untuk meningkatkan pengalaman
                  berbelanja.
                </li>
                <li>
                  Membangun hubungan yang kuat dengan mitra dan pelanggan.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">
            Tim Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="text-center">
              <img
                src="/saya.webp"
                alt="Muhammad Akbar"
                className="w-32 h-32 mx-auto rounded-full shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
                Muhammad Akbar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Lead Developer</p>
            </div>
            <div className="text-center">
              <img
                src="/saya2.jpeg"
                alt="Fajar"
                className="w-32 h-32 mx-auto rounded-full shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
                Fajar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">UI/UX Designer</p>
            </div>
            <div className="text-center">
              <img
                src="/saya3.png"
                alt="Fadillah"
                className="w-32 h-32 mx-auto rounded-full shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
                Fadillah
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Marketing Specialist
              </p>
            </div>
          </div>
        </section>

        <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-500 dark:text-white mb-4">
            Mulai Belanja Sekarang!
          </h2>
          <p className="text-lg text-gray-700 dark:text-white mb-6">
            Bergabunglah dengan ribuan pelanggan kami yang puas. Temukan produk
            favorit Anda dan nikmati pengalaman belanja online terbaik hanya di
            platform kami.
          </p>
          <Link
            to="/product"
            className="btn bg-yellow-400 dark:text-white hover:bg-yellow-500 border-none"
          >
            Lihat Produk Kami
          </Link>
          <FloatingButton />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
