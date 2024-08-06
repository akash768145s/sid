"use client";
import SearchInput from "@/components/searchbar";
import Image from "next/image";
import phoneIcon from "../../../public/sign-out.png";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

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

        .navButtons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contactButton {
          display: flex;
          align-items: center;
          background-color: #004aad;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border-bottom: 2px solid #004aad;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contactButton:hover {
          filter: brightness(110%);
          transform: translateY(-1px);
          border-bottom: 4px solid #004aad;
        }

        .contactButton:active {
          filter: brightness(90%);
          transform: translateY(1px);
          border-bottom: 1px solid #004aad;
        }

        @media (max-width: 767px) {
          .title {
            display: none;
          }

          .contactButton {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <nav className="navbar">
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

        {/* Navigation Links */}
        <div className="navButtons">
          <SearchInput />
          <button
            className="contactButton"
            onClick={() => (session ? signOut() : alert("Contact Us"))}
          >
            <Image
              src={phoneIcon}
              alt="Phone"
              width={30}
              height={30}
              className="mr-2"
            />
            {session ? "Sign Out" : "Contact Us"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

{
  /* <div className="grid grid-cols-auto gap-4 p-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gridAutoRows: '120px' }}>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>
<div className="bg-[#004AAD] h-30 w-30 rounded-lg"></div>

</div> */
}
