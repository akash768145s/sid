"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"; 
import ProductCard from "@/components/priceCard";
export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
      {session ? (
        <><div className="text-center">
          <img
            src={session.user.image}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mb-4" />
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
        </div><ProductCard /></>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Not signed in</p>
          <button
            onClick={() => signIn("google")}
            className="flex items-center px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
