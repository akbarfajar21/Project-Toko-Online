import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section id="home" className="">
      <div className="bg-yellow-600 mt-24 dark:bg-yellow-200 rounded-md h-auto p-8 md:p-14 flex flex-col md:flex-row items-center md:h-[500px]">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              className="font-display text-3xl dark:text-black mt-12 md:text-4xl lg:text-7xl font-bold tracking-[-0.02em] drop-shadow-sm leading-[2.5rem] md:leading-[3rem] lg:leading-[5rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              Selamat Datang <br />
              <span className="text-yellow-400">di Toko E-Shopp</span>
            </motion.h1>

            <motion.div
              className="mt-4"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Link
                to={"product"}
                className="btn border-none bg-yellow-400 hover:bg-yellow-500 rounded-xl px-4 py-2 md:px-6 md:py-3 text-sm md:text-base dark:text-black"
              >
                Belanja Sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./image.gif"
            alt="Hero Image"
            className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
