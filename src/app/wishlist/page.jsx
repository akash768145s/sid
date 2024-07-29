// src/app/wishlist/page.js
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
        console.error(
          "Error removing product from wishlist:",
          errorData.message
        );
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
    <div>
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item._id} className="border p-4">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                width={500}
                height={300}
              />
              <h2 className="text-xl font-bold">{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p>₹{item.product.price}</p>
              <p>{item.product.category}</p>
              <p>Seller: {item.product.sellerName}</p>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="mt-2 p-2 bg-red-500 text-white rounded"
              >
                Remove from Wishlist
              </button>
            </div>
          ))
        ) : (
          <p>No items in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
