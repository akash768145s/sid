"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const WishlistPage = () => {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (session) {
      fetchWishlist();
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch wishlist:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing product from wishlist:", errorData.message);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.message);

      // Update the UI or state after successful removal
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  if (!isMounted) {
    return null; // Return null or a loading indicator until the component is mounted
  }

  return (
    <div className="bg-[#004aad] min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-6xl w-full shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          My Wishlist
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={500}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {item.product.description}
                  </p>
                  <p className="text-gray-800 mt-2 font-semibold">
                    ₹{item.product.price}
                  </p>
                  <p className="text-gray-500 mt-1 text-sm">
                    {item.product.category}
                  </p>

                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="mt-4 w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No items in wishlist.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
