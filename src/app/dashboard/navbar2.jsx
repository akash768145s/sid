"use client";
import Image from "next/image";
import Link from "next/link";
import stationaryIcon from "../../../public/Book.png";
import sportsIcon from "../../../public/Badminton.png";
import electronicsIcon from "../../../public/Multiple Devices.png";
import accessoriesIcon from "../../../public/Shopping Bag.png";
import inboxIcon from "../../../public/Letter.png";
import profileIcon from "../../../public/Person.png";
import CImage from "../../../public/Carousal image.png";
import Button from "@/components/button2";
const Navbar2 = () => {
  const containerStyle = {
    position: "relative",
    textAlign: "center",
  };

  const buttonWrapperStyle = {
    position: "absolute",
    top: '73%',
    left: '53%', 
    transform: "translate(-50%, -50%)",
  };
  return (
    <>
      <style jsx>{`
        .navbar {
          background-color: white;
          height: 80px; /* Decreased height */
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 1rem; /* Decreased padding */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .navItems {
          display: flex;
          align-items: center;
          gap: 1rem; /* Decrease the gap between items */
        }

        .navItem {
          color: #004aad; /* Set the text color */
          font-size: 1rem;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          margin-left: 0.5rem; /* Add some space between image and link */
        }

        .navItem:hover {
          color: #002a6e;
        }

        .navImage {
          width: 30px; /* Decreased image size */
          height: 30px;
        }

        @media (max-width: 767px) {
          .navbar {
            flex-direction: column;
            height: auto;
            padding: 1rem;
          }

          .navItems {
            flex-direction: column;
            gap: 1rem;
          }

          .navImage {
            width: 25px; /* Adjusted image size for mobile view */
            height: 25px;
          }

          .navItem {
            margin-left: 0; /* Reset margin for mobile view */
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navItems">
          <Link href="/" className="navItem">
            Home
          </Link>
          <Image src={stationaryIcon} alt="Stationary" className="navImage" />
          <Link href="/stationary" className="navItem">
            Stationary
          </Link>
          <Image src={sportsIcon} alt="Sports Equipment" className="navImage" />
          <Link href="/sports-equipment" className="navItem">
            Sports Equipment
          </Link>
          <Image src={electronicsIcon} alt="Electronics" className="navImage" />
          <Link href="/electronics" className="navItem">
            Electronics
          </Link>
          <Image
            src={accessoriesIcon}
            alt="Other Accessories"
            className="navImage"
          />
          <Link href="/other-accessories" className="navItem">
            Other Accessories
          </Link>
          <Image src={inboxIcon} alt="Inbox" className="navImage" />
          <Link href="/inbox" className="navItem">
            Inbox
          </Link>
          <Image src={profileIcon} alt="Profile" className="navImage" />
          <Link href="/profile" className="navItem">
            Profile
          </Link>
        </div>
      </nav>
      <div style={containerStyle}>
        <Image
          src={CImage}
          alt="logo"
          width={1600}
          height={414}
          className="logo"
        />
        <div style={buttonWrapperStyle}>
          <Button/>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
