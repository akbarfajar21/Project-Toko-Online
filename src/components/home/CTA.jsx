import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section
      id="cta"
      className="mb-20 bg-yellow-200 rounded-lg"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)),url('https://media.timeout.com/images/106031610/750/562/image.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center gap-4 p-24 max-lg:p-10 max-lg:h-96 max-lg:justify-center max-lg:text-center">
        <h2 className="text-4xl font-bold text-yellow-300">
          Tertarik untuk belanja disini?
        </h2>
        <p className="text-white">
          Silahkan klik tombol di bawah ini untuk berbelanja di toko kami
        </p>

        <Link
          to="/product"
          className="btn bg-yellow-400 hover:bg-yellow-500 border-none dark:text-white"
        >
          Belanja Sekarang
        </Link>
      </div>
    </section>
  );
};

export default CTA;
