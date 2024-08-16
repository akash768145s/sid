"use client";
import Navbar from "@/components/dashboard/navbar";
import Navbar2 from "../app/navbar/page";
import Footer from "@/components/dashboard/footer";

const Home = () => {
  return (
    <>
      <div id="navbar1">
        <Navbar />
      </div>
      <Navbar2 />
      <main style={{ paddingTop: "160px" }}></main>
    
      <Footer />
    </>
  );
};

export default Home;
