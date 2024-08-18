"use client";
import Navbar from "@/components/dashboard/navbar";
import Navbar2 from "../app/navbar/page";
import Footer from "@/components/dashboard/footer";
import Hero from "../app/Hero/page";

const Home = () => {
  return (
    <>
      <div id="navbar1">
        <Navbar />
      </div>
      <main style={{ paddingTop: "3px" }}></main>
      <Navbar2 />
      <Hero/>
      <main style={{ paddingTop: "160px" }}></main>
    
      <Footer />
    </>
  );
};

export default Home;
