import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/home/Hero";
import ProductList from "../components/home/ProductList";
import Footer from "../components/Footer";
import CTA from "../components/home/CTA";
import SupportPayment from "../components/home/SupportPayment";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="m-5">
        <Hero />
        <ProductList />
        <SupportPayment />
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
