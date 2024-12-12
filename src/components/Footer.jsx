import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              Tentang Kami
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 dark:text-white">
              Kami adalah platform yang menyediakan berbagai produk berkualitas
              dengan harga terjangkau. Misi kami adalah memberikan pengalaman
              belanja yang mudah, aman, dan menyenangkan untuk semua pengguna.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              Tautan Penting
            </h3>
            <ul className="space-y-2 ">
              {[
                { name: "Beranda", href: "/" },
                { name: "Produk", href: "/product" },
                { name: "Tentang Kami", href: "/about" },
                { name: "Kontak", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 dark:text-white hover:text-yellow-400 hover:underline transition duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Kontak</h3>
            <ul className="space-y-2 text-sm dark:text-white">
              <li>
                <span className="font-medium text-gray-300">Email:</span>{" "}
                akbarfajar2112@gmail.com
              </li>
              <li>
                <span className="font-medium text-gray-300">Telepon:</span> +62
                895335545919
              </li>
              <li>
                <span className="font-medium text-gray-300">Alamat:</span> Jalan
                Tambun, Bekasi, Indonesia
              </li>
            </ul>

            <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 dark:text-white">
            &copy; {new Date().getFullYear()} Platform Belanja Online. Semua Hak
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
