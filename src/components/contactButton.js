"use client"; // Ensure this is a client component

import { useState } from "react";
import { useSession } from "next-auth/react";

const GmailSender = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleContactSeller = async () => {
    setLoading(true);

    // Use the session email as the user identifier
    const userEmail = session?.user?.email;

    const response = await fetch("/api/contact-seller", {
      method: "POST",
      body: JSON.stringify({ userEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    alert(data.message);
    setLoading(false);
  };

  return (
    <button
      onClick={handleContactSeller}
      disabled={loading}
      className="bg-blue-500 text-white p-2 rounded"
    >
      {loading ? "Scheduling..." : "Contact Seller"}
    </button>
  );
};

export default GmailSender;
