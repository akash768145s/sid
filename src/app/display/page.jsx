// src/app/display/page.jsx
import React from "react";
import connect from "@/utils/db";
import Product from "@/models/Product";
import ProductList from "./ProductList"; // Import the Client Component

const fetchProducts = async () => {
  try {
    await connect();
    const products = await Product.find({}).lean();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <div className="p-24">
      <h1 className="text-2xl font-bold mb-4">Product Listings</h1>
      <ProductList products={products} /> {/* Pass data to Client Component */}
    </div>
  );
};

export default ProductsPage;
