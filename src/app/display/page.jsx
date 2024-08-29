import React from "react";
import ClientProductsPage from "./ClientProductsPage";

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async () => {
  const products = await fetchProducts();
  return <ClientProductsPage products={products} />;
};

export default ProductsPage;
