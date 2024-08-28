"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductList from "./ProductList";
import Navbar from "./nav"; // Make sure to use the correct Navbar component

const ClientProductsPage = ({ products }) => {
  const router = useRouter();
  const query = router.query;

  // Check if query is defined and safely access category
  const category = query?.category || "All"; // Default to "All" if not defined

  // Filter products based on the category from the URL
  const filteredProducts = products.filter(
    (product) => category === "All" || product.category === category
  );

  return (
    <>
      <Navbar />

      <div className="p-24 bg-[#004aad] -mt-20 w">
        <h1 className="text-2xl text-white font-bold mb-4">Product Listings</h1>
        <ProductList products={filteredProducts} />
      </div>
    </>
  );
};

export default ClientProductsPage;
