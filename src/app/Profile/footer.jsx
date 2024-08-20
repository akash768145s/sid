"use client";
import Image from "next/image";

const FooterComponent = () => {
  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Ostwald:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
        .footer {
          background-color: #004aad;
          font-family: Ostwald;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: fixed;
          bottom: 0;
          width: 100%;
        }

        .logoContainer {
          display: flex;
          align-items: center;
        }

        .logo {
          margin-right: 1rem;
        }

        .title {
          color: white;
          font-size: 2.5rem;
          font-family: "Ostwald";
          font-weight: 300;
        }

        @media (max-width: 767px) {
          .title {
            display: none;
          }
        }
      `}</style>

      <footer className="footer">
        {/* Logo */}
        <div className="logoContainer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={89}
            height={79}
            className="logo"
          />
          <h1 className="title">Sell it Dude!</h1>
        </div>
      </footer>
    </>
  );
};

export default FooterComponent;
