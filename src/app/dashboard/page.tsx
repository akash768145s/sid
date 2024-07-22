'use client';
import Navbar from "@/app/dashboard/navbar";
import Navbar2 from "@/app/dashboard/navbar2";
import Footer from "@/app/dashboard/footer";
const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <Footer />
    </>
  );
}

export default DashboardPage;


{/* <div className="grid grid-cols-auto gap-4 p-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gridAutoRows: '120px' }}>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>

</div> */}