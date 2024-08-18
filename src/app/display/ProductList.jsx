"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {Button} from "@/components/ui/button";

const categories = [
  "All",
  "Stationary",
  "Sport Equipment",
  "Electronics",
  "Other Accessories",
];

const ProductList = ({ products }) => {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState(products);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setProductList((prevList) =>
          prevList.filter((product) => product._id !== id)
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to delete product:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      setMessage("Error adding product to wishlist.");
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setMessage("Error removing product from wishlist.");
    }
  };

  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {message && <div className="alert">{message}</div>}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by product name"
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="border p-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={300}
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
              <p>{product.category}</p>
              <p>Seller: {product.sellerName}</p>
              {/* Gmail-specific Email Link with Dynamic 'From' */}
              {session?.user?.name !== product.sellerName && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-2 p-2 bg-green-500 text-white rounded">
                      Contact Seller
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Proceed to Contact Seller?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to send an inquiry about this
                        product? You will be redirected to your Gmail to send
                        the email.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Link
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                          product.sellerEmail
                        }&su=Inquiry%20About%20${encodeURIComponent(
                          `[${product.name}]`
                        )}&body=Dear%20${encodeURIComponent(
                          product.sellerName
                        )},%0D%0A%0D%0AI’m%20interested%20in%20the%20${encodeURIComponent(
                          product.name
                        )}%20listed%20on%20Sell%20It%20Dude!.%20Could%20you%20provide%20more%20details%20or%20suggest%20a%20time%20to%20discuss?%0D%0A%0D%0AThank%20you!%0D%0A%0D%0ABest%20regards,%0D%0A${encodeURIComponent(
                          session?.user?.name || "Buyer"
                        )}%0D%0A%0D%0A***NOTE: YOU CAN CONTINUE THE CONVERSATION BY REPLYING TO THIS EMAIL.***%0D%0A%0D%0AFor%20any%20issues,%20contact%20our%20team.%0D%0A%0D%0ABest%20regards,%0D%0ATeam%20SID`}
                        passHref
                      >
                        <AlertDialogAction asChild>
                          <Button variant="default">Continue</Button>
                        </AlertDialogAction>
                      </Link>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {(session?.user?.name === product.sellerName ||
                session?.user?.email === "sakthimuruganakash@gmail.com") && (
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-2 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}
              {session?.user?.name !== product.sellerName && (
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Add to Wishlist
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
