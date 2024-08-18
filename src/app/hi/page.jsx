"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ContactSellerButton from "../../components/contactButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-screen">
      {session ? (
        <ContactSellerButton />
      ) : (
        <p className="text-gray-500">Please log in to contact the seller.</p>
      )}
    </div>
  );
}
