"use client";

import Image from "next/image";
import phoneIcon from "../../../public/sign-out.png";
import backIcon from "../../../public/wishli.png";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleGoWishlist = () => {
    router.push("/wishlist");
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&display=swap");
        h1 {
          font-family: "Oswald";
        }
        .navbar {
          background-color: #004aad;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between; /* Add this line */
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
          <button className="contactButton" onClick={handleGoWishlist}>
            <Image
              src={backIcon}
              alt="Wishlist"
              width={30}
              height={30}
              className="mr-2"
            />
            Wishlist
          </button>

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
