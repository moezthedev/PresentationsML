import React from "react";
import Navbar from "../../components/navbar/navbar";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import FeatureCards from "../../components/features/features";
import Slider from "../../components/Slider/slider";
import Shape from "../../components/shape/shape";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Shape />
      <FeatureCards />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
