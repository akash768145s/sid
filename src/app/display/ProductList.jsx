"use client";

import React, { useState } from "react";
import Image from "next/image";

const categories = [
  "All",
  "Stationary",
  "Sport Equipment",
  "Electronics",
  "Other Accessories",
];

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState(products);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch("/api/products", {
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
        console.error("Failed to delete product:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter products based on search query and selected category
  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
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
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="mt-2 p-2 bg-red-500 text-white rounded"
              >
                Delete
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
