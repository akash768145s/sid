"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserProducts } from "../../utils/getUserProducts"; // Adjust path as necessary
import Footer from "./footer";
import Navbar from "./navbar";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "../../components/Model/Modal";

const Profile = () => {
  const { data: session } = useSession();
  const [isReady, setIsReady] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchProducts = async () => {
        const products = await getUserProducts(session.user.email);
        setUserProducts(products);
      };

      fetchProducts();
    }
  }, [session]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      });

      if (response.ok) {
        setUserProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        alert("Product deleted successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete product:", errorData.message);
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProductToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete._id);
    }
  };

  return (
    <>
      {isReady ? (
        <>
          <Navbar />
          <LazyMotion features={domAnimation}>
            <AnimatePresence>
              <m.div
                className="flex flex-col md:flex-row items-center md:items-start w-full px-4 md:px-8 py-6 md:py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
                  <m.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile Picture"
                        width={96}
                        height={96}
                        className="rounded-full mr-4"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-400 text-5xl mr-4" />
                    )}
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold text-black">
                        {session?.user?.name || "John Doe"}
                      </div>
                      <div className="text-gray-500">
                        Digital ID: {session?.user?.digitalId || "123456789"}
                      </div>
                      <div className="text-gray-500 mt-2 flex items-center">
                        <MdEmail className="text-black text-xl mr-2" />
                        <span>Gmail ID: {session?.user?.email}</span>
                      </div>
                    </div>
                  </m.div>
                </div>
              </m.div>
            </AnimatePresence>
          </LazyMotion>

          <style jsx>
            {`
              @media (max-width: 640px) {
                .product-container {
                  flex-direction: column;
                  gap: 1rem; /* Space between products in column layout */
                }
              }
            `}
          </style>

          <div className="p-4">
  <h2 className="text-xl font-semibold mb-4">Your Products</h2>
  <div className="overflow-x-auto">
    <div className="flex flex-row flex-wrap gap-4 sm:flex-col product-container">
      {userProducts.length > 0 ? (
        userProducts.map((product) => (
          <div
            key={product._id}
            className="w-64 p-4 bg-white shadow-md rounded-lg flex-none"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={150}
              height={150}
              className="rounded mb-4"
            />
            <div className="text-lg font-semibold text-gray-800">
              {product.name}
            </div>
            <div className="text-md font-medium text-blue-600 mt-1">
              {product.category}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleOpenModal(product)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  </div>
</div>


          <Footer />

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmModal}
            message="Do you want to delete this product?"
          />
        </>
      ) : (
        <div className="w-full h-screen bg-white flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Profile;
