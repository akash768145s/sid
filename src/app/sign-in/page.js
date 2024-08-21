"use client";
import React from "react";
import GoogleButton from "@/components/googlebutton";
import { useSession, signOut } from "next-auth/react";
import ProductCard from "@/components/priceCard";
import Image from "next/image";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/sign-in.png")' }}
    >
      {session ? (
        <>
          <div className="text-center">
            <Image
              src={session.user.image}
              alt="Profile Picture"
              width={96} // Equivalent to 24 * 4 for consistency with TailwindCSS
              height={96} // Equivalent to 24 * 4 for consistency with TailwindCSS
              className="rounded-full mb-4"
            />
            <p className="text-xl font-semibold">
              Profile Name: {session.user.name}
            </p>
            <p className="text-lg text-gray-700">
              Digital ID: {session.user.digitalId}
            </p>
            <button
              onClick={() => signOut()}
              className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
            >
              Sign out
            </button>
          </div>
          <ProductCard />
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
