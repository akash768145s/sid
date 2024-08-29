'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductList from "./ProductList";
import Navbar from "./nav"; // Make sure to use the correct Navbar component
import { ToastContainer, toast } from "react-toastify";

const ClientProductsPage = ({ products }) => {
  const [productList, setProductList] = useState(products);
  const router = useRouter();
  const query = router.query;

  const category = query?.category || "All";

  // Filter products based on the category from the URL
  const filteredProducts = productList.filter(
    (product) => category === "All" || product.category === category
  );

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
        // Update the state to remove the deleted product
        setProductList(productList.filter((product) => product._id !== id));
        toast.success("Product deleted successfully!");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-24 bg-[#004aad] -mt-20 w">
        <h1 className="text-2xl text-white font-bold mb-4">Product Listings</h1>
        <ProductList products={filteredProducts} onDelete={handleDeleteProduct} />
        <ToastContainer />
      </div>
    </>
  );
};

export default ClientProductsPage;
