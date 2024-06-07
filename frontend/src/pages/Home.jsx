import React from "react";
import Hero from "../components/Hero";
import About from "../components/TentangKami";
import Services from "../components/Pelayanan";
import Appointment from "../components/Appointment";
import Pricing from "../components/Pricing";
import Team from "../components/Team";
import Search from "../components/Search";
import Testimonial from "../components/Testimonial";
import Blog from "../components/Blog";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Appointment />
      <Pricing />
      <Team />
      <Search />
      <Testimonial />
      <Blog />
    </>
  );
};

export default Home;
