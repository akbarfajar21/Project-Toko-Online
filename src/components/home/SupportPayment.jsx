import React from "react";

const SupportPayment = () => {
  return (
    <section id="support-payment" className="my-20">
      {/* Judul dengan garis bawah */}
      <h2 className="text-center text-4xl font-extrabold dark:text-white relative pb-3">
        Support Payment
        <span className="block w-20 h-1 bg-yellow-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      {/* Grid Logo Payment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10 px-4 lg:px-16">
        <LogoSupportPayment logo="https://i0.wp.com/umsu.ac.id/berita/wp-content/uploads/2024/07/cara-lihat-nomor-gopay-di-aplikasi-gojek.webp?fit=850%2C510&ssl=1" />
        <LogoSupportPayment logo="https://logowik.com/content/uploads/images/qris-qris-quick-response-code-indonesian-standard8461.logowik.com.webp" />
        <LogoSupportPayment logo="https://logowik.com/content/uploads/images/shopeepay4268.jpg" />
        <LogoSupportPayment logo="https://i.pinimg.com/originals/f5/8c/a3/f58ca3528b238877e9855fcac1daa328.jpg" />
      </div>
    </section>
  );
};

const LogoSupportPayment = ({ logo }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={logo}
        alt="logo"
        className="h-24 sm:h-28 md:h-32 object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg dark:shadow-gray-700"
      />
    </div>
  );
};

export default SupportPayment;
