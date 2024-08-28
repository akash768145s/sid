// src/app/display/page.jsx
import React from "react";
import connect from "@/utils/db";
import Product from "@/models/Product";
import ClientProductsPage from "./ClientProductsPage"; // Import the client-side component

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

  // Render the client-side component and pass products as props
  return <ClientProductsPage products={products} />;
};

export default ProductsPage;
