"use client";
import React from "react";
import Link from "next/link"; // Use Link for navigation in Next.js
import "./main.css";
import stationaryIcon from "../../../public/Book.png";
import Home from "../../../public/Home.png";
import sportsIcon from "../../../public/Badminton.png";
import electronicsIcon from "../../../public/Multiple Devices.png";
import accessoriesIcon from "../../../public/Shopping Bag.png";
import profileIcon from "../../../public/Person.png";
import CImage from "../../../public/Girl-Img.png";
import Image from "next/image";
import SellButton from "../../components/button2";
const Navbar2 = () => {
  return (
    <>
      <nav>
        <input type="checkbox" id="sidebar-active" />
        <label htmlFor="sidebar-active" className="open-sidebar-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            viewBox="0 -960 960 960"
            width="32"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </label>
        <label id="overlay" htmlFor="sidebar-active"></label>
        <div className="links-container">
          <label htmlFor="sidebar-active" className="close-sidebar-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </label>

          <Link
            href="/"
            className="nav-link"
            style={{ marginRight: "80px", marginLeft: "50px" }}
          >
            <Image src={Home} alt="Home" width={40} height={40} />
            Home
          </Link>

          <Link href="/" className="nav-link" style={{ marginRight: "80px" }}>
            <Image
              src={stationaryIcon}
              alt="Stationary"
              width={40}
              height={40}
            />
            Stationary
          </Link>
          <Link
            href="/about"
            className="nav-link"
            style={{ marginRight: "80px" }}
          >
            <Image src={sportsIcon} alt="Sports" width={45} height={45} />
            Sports Equipment
          </Link>
          <Link
            href="/products"
            className="nav-link"
            style={{ marginRight: "80px" }}
          >
            <Image
              src={electronicsIcon}
              alt="Electronics"
              width={40}
              height={40}
            />
            Electronics
          </Link>
          <Link
            href="/blog"
            className="nav-link"
            style={{ marginRight: "80px" }}
          >
            <Image
              src={accessoriesIcon}
              alt="Accessories"
              width={60}
              height={60}
            />
            Other Accessories
          </Link>
          <Link href="/login" className="nav-link">
            <Image src={profileIcon} alt="Profile" width={50} height={50} />
            Profile
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
