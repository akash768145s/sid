"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import stationaryIcon from "../../../public/Book.png";
import sportsIcon from "../../../public/Badminton.png";
import electronicsIcon from "../../../public/Multiple Devices.png";
import accessoriesIcon from "../../../public/Shopping Bag.png";
import inboxIcon from "../../../public/Letter.png";
import profileIcon from "../../../public/Person.png";
import CImage from "../../../public/Carousal image.png";
import Button from "@/components/button2";
import Home from "../../../public/Home.png";

// NavItem Component
const NavItem: React.FC<NavItemProps> = ({ href, title, icon, iconSize }) => (
  <Link
    href={href}
    className="flex items-center text-[#004aad] font-semibold transition-all hover:text-blue-600"
    passHref
  >
    <Image
      src={icon}
      alt={title}
      width={iconSize}
      height={iconSize}
      className="flex-shrink-0"
    />
    <span>{title}</span>
  </Link>
);

interface NavItemProps {
  href: string;
  title: string;
  icon: StaticImageData;
  iconSize: number; // Size of the icon
}

const Navbar2 = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const navbar1Height = document.getElementById("navbar1")?.offsetHeight || 0;
      setIsFixed(scrollPosition > navbar1Height);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${isFixed ? "fixed" : "relative"
          } top-0 left-0 w-full z-1000 transition-all bg-white h-20 flex items-center justify-between px-4 ${isFixed ? "shadow-md" : ""
          }`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6.5rem' }}> {/* Increased gap to 5rem */}
          <NavItem href="/" title="Home" icon={Home} iconSize={40} />
          <NavItem href="/stationary" title="Stationary" icon={stationaryIcon} iconSize={35} />
          <NavItem href="/sports-equipment" title="Sports Equipment" icon={sportsIcon} iconSize={45} />
          <NavItem href="/electronics" title="Electronics" icon={electronicsIcon} iconSize={50} />
          <NavItem href="/other-accessories" title="Other Accessories" icon={accessoriesIcon} iconSize={40} />
          <NavItem href="/inbox" title="Inbox" icon={inboxIcon} iconSize={40} />
          <NavItem href="/profile" title="Profile" icon={profileIcon} iconSize={40} />
        </div>
      </nav>

      <div
        className={`relative text-center mt-${isFixed ? "20" : "0"}`}
      >
        <Image
          src={CImage}
          alt="Carousal Image"
          width={1600}
          height={414}
          style={{ maxWidth: "100%" }}
        />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button />
        </div>
      </div>
    </>
  );
};

export default Navbar2;
