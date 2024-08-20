'use client';
import React, { useState, useEffect } from "react";
import CImage from "../../../../public/Girl-Img.png";
import Image from "next/image";
import SellButton from "../../../components/sellitb";

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isDesktop ? (
        // Desktop Layout
        <div className="relative text-center mt-1">
          <div
            style={{
              position: "absolute",
              top: "5rem",
              right: "10rem",
              color: "#004aad",
              textAlign: "right",
              padding: "1rem",
            }}
          >
            <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              Got Stuff? Get Cash!
            </h2>
            <p style={{ fontSize: "2rem", fontWeight: "lighter" }}>
              TURN YOUR EXTRAS INTO EXTRA CASH
            </p>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <SellButton />
            </div>
          </div>

          <Image
            src={CImage}
            alt="Carousel Image"
            width={741}
            height={442}
            style={{ maxWidth: "100%", marginTop: "1rem" }}
          />
        </div>
      ) : (
        // Mobile Layout
        <div className="relative text-center mt-1 lg:text-right lg:pr-40">
          <div className="lg:hidden flex flex-col items-center text-center mt-4">
            <h2 className="text-3xl font-bold text-[#004aad] -mt-10 lg:-mt-10">
              Got Stuff? Get Cash!
            </h2>
            <Image
              src={CImage}
              alt="Carousel Image"
              width={741}
              height={442}
              className="w-full max-w-sm mx-auto mb-4"
            />
            <SellButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
