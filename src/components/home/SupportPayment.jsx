import React from "react";

const SupportPayment = () => {
  return (
    <section id="support-payment" className="my-20">
      <h2 className="text-center text-4xl font-bold dark:text-white">Support Payment</h2>

      <div className="flex justify-center flex-wrap gap-12 mt-8 max-lg:px-2 lg:px-16">
        <LogoSupportPayment
          logo={
            "https://i0.wp.com/umsu.ac.id/berita/wp-content/uploads/2024/07/cara-lihat-nomor-gopay-di-aplikasi-gojek.webp?fit=850%2C510&ssl=1"
          }
        />
        <LogoSupportPayment
          logo={
            "https://logowik.com/content/uploads/images/qris-qris-quick-response-code-indonesian-standard8461.logowik.com.webp"
          }
        />
        <LogoSupportPayment
          logo={"https://logowik.com/content/uploads/images/shopeepay4268.jpg"}
        />
        <LogoSupportPayment
          logo={
            "https://i.pinimg.com/originals/f5/8c/a3/f58ca3528b238877e9855fcac1daa328.jpg"
          }
        />
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
        className="h-32 mix-blend-multiply dark:mix-blend-normal dark:rounded-xl"
      />
    </div>
  );
};

export default SupportPayment;
