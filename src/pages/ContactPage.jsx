import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

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
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-6 mt-12">Hubungi Kami</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kami senang mendengar dari Anda! Jangan ragu untuk menghubungi kami
            melalui informasi di bawah ini.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
              Informasi Kontak
            </h2>
            <ul className="space-y-6">
              <li className="flex items-center text-lg text-gray-600 dark:text-gray-300">
                <FaEnvelope className="mr-4 text-3xl text-blue-500" />
                <span>
                  <strong>Email:</strong> akbarfajar2112@gmail.com
                </span>
              </li>
              <li className="flex items-center text-lg text-gray-600 dark:text-gray-300">
                <FaPhoneAlt className="mr-4 text-3xl text-green-500" />
                <span>
                  <strong>Telepon:</strong> +62895335545919
                </span>
              </li>
              <li className="flex items-center text-lg text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="mr-4 text-3xl text-red-500" />
                <span>
                  <strong>Alamat:</strong> Jl. Kp. Pamahan Setya Mulya, Cikarang
                  Timur, Bekasi
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
              Tentang Kami
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Kami adalah tim yang berdedikasi untuk memberikan layanan terbaik
              kepada pelanggan kami. Dengan pengalaman bertahun-tahun di bidang
              kami, kami berkomitmen untuk memenuhi kebutuhan Anda dengan
              profesionalisme dan keahlian.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan,
              jangan ragu untuk menghubungi kami melalui informasi kontak di
              samping. Kami selalu siap membantu Anda.
            </p>
          </div>
        </div>

        <div className="mt-16 mb-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Lokasi Kami
          </h2>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1133.4911517688026!2d107.18028177809437!3d-6.287360324369286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b445d8375b1%3A0x2be0e0c5314813b1!2sPesantren%20SMP%20dan%20SMA%20Rabbaanii%20Islamic%20School!5e0!3m2!1sen!2sid!4v1733802989670!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 mt-16 p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            FAQ
          </h2>
          <ul className="space-y-6">
            {faqData.map((item, index) => (
              <li
                key={index}
                className="border-b border-gray-300 dark:border-gray-700 pb-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
                  {item.question}
                  <span>{expanded === index ? "−" : "+"}</span>
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expanded === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
