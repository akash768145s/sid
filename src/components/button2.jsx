import React, { useState, useEffect } from "react";
import Link from "next/link";

const SellButton = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Default styles
  const baseStyle = {
    padding: "4px 18px",
    border: "0",
    borderRadius: "120px",
    backgroundColor: "#004AAD",
    color: "#ffffff",
    fontWeight: "extrabold",
    fontSize: "24px",
    transition: "all 0.5s",
    WebkitTransition: "all 0.5s",
    marginLeft: "-20px", // Adjust this value to move the button to the left
  };

  // Responsive styles based on window width
  const responsiveStyle =
    windowWidth <= 480
      ? {
          padding: "10px 30px",
          borderRadius: "60px",
          fontSize: "18px",
          marginLeft: "-10px", // Adjust this value for smaller screens
        }
      : windowWidth <= 768
      ? {
          padding: "10px 30px",
          borderRadius: "60px",
          fontSize: "20px",
          marginLeft: "-15px", // Adjust this value for medium screens
        }
      : {};

  const buttonStyle = {
    ...baseStyle,
    ...responsiveStyle,
  };

  const hoverStyle = {
    boxShadow: "0 0 25px #6fc5ff50",
    transform: "scale(1.1)",
  };

  const activeStyle = {
    transition: "all 0.25s",
    WebkitTransition: "all 0.25s",
    boxShadow: "none",
    transform: "scale(0.98)",
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Link href="/upload" passHref>
      <button
        style={{
          ...buttonStyle,
          ...(isHovered ? hoverStyle : {}),
          ...(isActive ? activeStyle : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        Sell it!
      </button>
    </Link>
  );
};

export default SellButton;
