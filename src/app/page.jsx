"use client";
import Navbar from "@/components/dashboard/navbar";
import Navbar2 from "@/components/dashboard/navbar2";
import Footer from "@/components/dashboard/footer";

const DashboardPage = () => {
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

export default DashboardPage;
