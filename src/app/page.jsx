"use client";
import Navbar from "@/components/Main/navbar";
import Navbar2 from "../components/Main/pNavbar/pNav";
import Footer from "../components/Main/Footer/footer";
import Hero from "../components/Main/Hero/Hero";
const Home = () => {
  return (
    <>
      <div id="navbar1">
        <Navbar />
      </div>
      <Navbar2 />
      <Hero />
      <main style={{ paddingTop: "160px" }}></main>

      <Footer />
    </>
  );
};

export default Home;
