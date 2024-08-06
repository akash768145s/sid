'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
        method: 'DELETE',
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
        // Update UI to remove the product from the wishlist
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      setMessage('Error removing product from wishlist.');
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
    return null; // Return null or a loading indicator until the component is mounted
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
              <p>Seller Email: {product.sellerEmail}</p> {/* Display sellerEmail */}
              {(session?.user?.name === product.sellerName ||
                session?.user?.email === "sakthimuruganakash@gmail.com") && (
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-2 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => handleAddToWishlist(product)}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add to Wishlist
              </button>
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
