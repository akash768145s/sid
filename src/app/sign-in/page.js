"use client";
import React from "react";
import GoogleButton from "@/components/googlebutton";
import { useSession, signOut } from "next-auth/react";
import ProductCard from "@/components/priceCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/"); // Adjust the path to your dashboard route
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/sign-in.png")' }}
    >
      {session ? (
        <>
          <div className="text-center">
          <Image
            src="/Logo2.png" // Update the path to your logo image
            alt="Logo"
            width={175} // Set the desired width
            height={175} // Set the desired height
            className="mb-4"
            style={{ marginLeft: "20px" }} // Adjust the margin to move the image to the right
          />
          <h1
            className="font-semibold text-white mb-2"
            style={{ fontSize: "2rem", marginTop: "-35px" }} // Move the tagline up slightly
          >
            Sell it Dude!
          </h1>
            <button
              onClick={handleGoToDashboard}
              className="px-4 -mr-3 py-2 bg-[#004aad] text-white rounded hover:bg-[#004aad] transition-colors duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <Image
            src="/Logo2.png" // Update the path to your logo image
            alt="Logo"
            width={175} // Set the desired width
            height={175} // Set the desired height
            className="mb-4"
            style={{ marginLeft: "20px" }} // Adjust the margin to move the image to the right
          />
          <h1
            className="font-semibold text-white mb-2"
            style={{ fontSize: "2rem", marginTop: "-35px" }} // Move the tagline up slightly
          >
            Sell it Dude!
          </h1>
          <GoogleButton />
        </div>
      )}
    </div>
  );
};

export default HomePage;
