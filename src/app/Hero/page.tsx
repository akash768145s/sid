"use client";
import React from "react";
import CImage from "../../../public/Girl-Img.png";
import Image from "next/image";
import SellButton from "../../components/button2";

const Hero = () => {
    // Determine if the screen width is mobile or not
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Define styles with responsiveness in mind
    const containerStyle = {
        position: "relative",
        textAlign: "center",
        marginTop: "20px",
    };

    const textContainerStyle = {
        position: "absolute",
        top: isMobile ? "4rem" : "6rem", // Adjusted top value to move the text block down
        right: isMobile ? "5%" : "10rem",
        color: "#004aad",
        textAlign: isMobile ? "center" : "right",
        padding: isMobile ? "0.5rem" : "1rem",
        width: isMobile ? "90%" : "auto",
        left: isMobile ? "50%" : "auto",
        transform: isMobile ? "translateX(-50%)" : "none",
    };

    const headingStyle = {
        fontSize: isMobile ? "2rem" : "3rem",
        fontWeight: "bold",
        margin: "0",
    };

    const paragraphStyle = {
        fontSize: isMobile ? "1.5rem" : "2rem",
        fontWeight: "lighter",
        margin: "0",
    };

    const buttonContainerStyle = {
        marginTop: "1rem",
        position: "relative",
        left: isMobile ? "-10px" : "-120px",
        display: "inline-block",
    };

    const imageStyle = {
        maxWidth: "100%",
        height: "auto",
    };

    return (
        <>
            <div style={containerStyle}>
                <div style={textContainerStyle}>
                    <h2 style={headingStyle}>Got Stuff? Get Cash!</h2>
                    <p style={paragraphStyle}>TURN YOUR EXTRAS INTO EXTRA CASH</p>
                    <div style={buttonContainerStyle}>
                        <SellButton />
                    </div>
                </div>
                <Image
                    src={CImage}
                    alt="Carousal Image"
                    width={741}
                    height={442}
                    style={imageStyle}
                />
            </div>
        </>
    );
};

export default Hero;
