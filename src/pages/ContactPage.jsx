import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet";
import { ChevronDown, ChevronUp } from "lucide-react";

const ContactPage = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    {
      question: "Bagaimana cara menghubungi tim kami?",
      answer:
        "Anda dapat menghubungi kami melalui email, telepon, atau isi formulir di atas.",
    },
    {
      question: "Apakah ada layanan pelanggan 24 jam?",
      answer: "Kami melayani setiap hari kerja pukul 08.00 - 17.00 WIB.",
    },
    {
      question: "Di mana lokasi kantor kami?",
      answer: "Lokasi kantor kami dapat Anda temukan di peta di atas.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>Toko Online | Contact</title>
      </Helmet>
      <Header />
      <main className="flex-grow container mt-14 mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Kami senang mendengar dari Anda! Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Informasi Kontak
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-xl text-blue-500" />
                <span>
                  <strong>Email:</strong> akbarfajar2112@gmail.com
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-xl text-green-500" />
                <span>
                  <strong>Telepon:</strong> +62 895-3355-45919
                </span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-xl text-red-500" />
                <span>
                  <strong>Alamat:</strong> Jl. Kp. Pamahan Setya Mulya, Cikarang
                  Timur, Bekasi
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Tentang Kami
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Kami adalah tim yang berdedikasi untuk memberikan layanan terbaik
              kepada pelanggan kami. Jika Anda memiliki pertanyaan, saran, atau
              membutuhkan bantuan, hubungi kami.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-6">Lokasi Kami</h2>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1133.4911517688026!2d107.18028177809437!3d-6.287360324369286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b445d8375b1%3A0x2be0e0c5314813b1!2sPesantren%20SMP%20dan%20SMA%20Rabbaanii%20Islamic%20School!5e0!3m2!1sen!2sid!4v1733802989670!5m2!1sen!2sid"
              width="100%"
              height="350"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow"
            ></iframe>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 mt-10 p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            FAQ
          </h2>
          <ul className="space-y-4">
            {faqData.map((item, index) => (
              <li
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.question}
                  </h3>
                  {expanded === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expanded === index
                      ? "max-h-40 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default ContactPage;
