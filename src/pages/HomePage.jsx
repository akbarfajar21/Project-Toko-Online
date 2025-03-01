import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/home/Hero";
import ProductList from "../components/home/ProductList";
import Footer from "../components/Footer";
import CTA from "../components/home/CTA";
import SupportPayment from "../components/home/SupportPayment";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Header />
      <Helmet>
        <title>Toko Online | Home</title>
      </Helmet>
      <div className="m-5">
        <Hero />
        <ProductList />
        <SupportPayment />
        <CTA />

        <FloatingButton />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
