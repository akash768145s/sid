"use client";
import Image from "next/image";

const FooterComponent = () => {
  return (
    <>
      <style jsx>{`
        .footer {
          background-color: #004aad;
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
          font-family: "Oswald", sans-serif;
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
