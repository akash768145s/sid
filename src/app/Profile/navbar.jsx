"use client";
import BackButton from "@/components/backbutton";
const Navbar = () => {
  return (
    <>
      <style jsx>{`
        .navbar {
          background-color: #004aad;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10;
        }

        .backButton {
          color: white;
          font-size: 1.5rem;
          font-family: "Oswald", sans-serif;
          font-weight: 300;
          text-decoration: none;
        }

        .title {
          color: white;
          font-size: 2.5rem;
          font-family: "Oswald", sans-serif;
          font-weight: 500;
        }

        @media (max-width: 767px) {
          .title {
            display: none;
          }
        }
      `}</style>

      <nav className="navbar">
        {/* Back Button */}
        <BackButton />
      
      </nav>
    </>
  );
};

export default Navbar;
