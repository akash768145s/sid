'use client';
import Navbar from "@/app/dashboard/navbar";
import Navbar2 from "@/app/dashboard/navbar2";
import Footer from "@/app/dashboard/footer";

const DashboardPage = () => {
  return (
    <>
      <div id="navbar1">
        <Navbar />
      </div>

      <Navbar2 />

      <main style={{ paddingTop: '160px' }}> {/* Adjust based on the combined height of Navbar and Navbar2 */}
        {/* Main content goes here */}
      </main>

      <Footer />
    </>
  );
}

export default DashboardPage;
