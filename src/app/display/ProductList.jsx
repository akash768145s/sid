"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import "./prdlist css.css";
import "./hello.css";
import "./boot.css";

const categories = [
  "All",
  "Stationary",
  "Sport Equipment",
  "Electronics",
  "Other Accessories",
];

const ProductCard = ({ product, onDelete, onAddToWishlist }) => {
  const { data: session } = useSession();

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
            <div className="col-md-3 mt-1">
              <Image
                className="img-fluid img-responsive rounded product-image"
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={300}
              />
            </div>
            <div className="col-md-6 mt-1">
              <h5>{product.name}</h5>
              <h4>{product.category}</h4>
              <h3>Seller: {product.sellerName}</h3>
              <p className="text-justify para mb-0">{product.description}</p>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-row align-items-center">
                <h4 className="mr-1">&#x20b9; {product.price}</h4>
              </div>
              <div className="d-flex flex-column mt-4">
                {(session?.user?.name === product.sellerName ||
                  session?.user?.email === "sakthimuruganakash@gmail.com") && (
                  <button
                    className="btn btn-danger btn-sm mb-2"
                    onClick={() => onDelete(product._id)}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onAddToWishlist(product)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products = [] }) => {
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
        setMessage("Product deleted successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete product:", errorData.message);
        setMessage("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product.");
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
      {message && <div className="alert alert-info">{message}</div>}
      <div className="mb-4 d-flex flex-column md:flex-row gap-4">
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
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteProduct}
              onAddToWishlist={handleAddToWishlist}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
