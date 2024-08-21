"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./1.css";
import "./2.css";
import "./3.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/Model/Modal";

const categories = [
  "All",
  "Stationary",
  "Sport Equipment",
  "Electronics",
  "Other Accessories",
];

const ProductCard = ({ product, onDelete, onAddToWishlist }) => {
  const { data: session } = useSession();
  const isSeller = session?.user?.email === product.sellerEmail;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigateToProductPage = (product) => {
    const productPageUrl = `/product/${product._id}?_id=${encodeURIComponent(
      product._id
    )}&name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(
      product.price
    )}&sellerEmail=${encodeURIComponent(
      product.sellerEmail
    )}&sellerName=${encodeURIComponent(
      product.sellerName
    )}&description=${encodeURIComponent(
      product.description
    )}&imageUrl=${encodeURIComponent(
      product.imageUrl
    )}&category=${encodeURIComponent(product.category)}
    &sellerName=${product.sellerName}`;

    router.push(productPageUrl);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this product?"
    );
    if (confirmDelete) {
      onDelete(product._id);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = async () => {
    // Prepare the email content
    setLoading(true);
    const subject = encodeURIComponent(`Inquiry About [${product.name}]`);
    const body = encodeURIComponent(`
  Dear ${product.sellerName},
  
  I am interested in the ${
    product.name
  } listed on SellITDUDE. Could you provide more details or suggest a time to discuss?
  
  Thank you!
  
  Best regards,
  ${session?.user?.name || "Buyer"}
  
  Note: You can continue the conversation by replying to this email.
  
  For any issues, contact our team.
  
  Best regards,
  Team SID`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${product.sellerEmail}&su=${subject}&body=${body}`;

    try {
      const userEmail = session?.user?.email;
      const response = await fetch("/api/contact-seller", {
        method: "POST",
        body: JSON.stringify({ userEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Open Gmail with the prepared email content
        window.location.href = gmailUrl;
      } else {
        // Handle API response errors
        alert(data.message || "Failed to contact seller.");
      }
    } catch (error) {
      console.error("Error contacting seller:", error);
      alert("Error contacting seller.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#004aad] py-5 mb-[-140px] ">
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="row p-2 bg-[#004aad] border rounded">
              <div className="col-md-3 mt-1">
                <Image
                  className="w-[150px] h-[150px] object-cover rounded product-image"
                  src={product.imageUrl}
                  alt={product.name}
                  width={150}
                  height={150}
                />
              </div>
              <div className="col-md-6 mt-1">
                <div className="p-4 bg-[#004aad] rounded-lg max-w-sm">
                  <div className="text-5xl font-semibold text-white">
                    {product.name}
                  </div>
                  <div className="text-[18px] font-medium text-gray-400 mt-1">
                    {product.category}
                  </div>
                  <div className="text-[18px] text-gray-300 mt-2">
                    Seller:{" "}
                    <span className="font-medium text-gray-300 ">
                      {product.sellerName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1 text-white">&#x20b9; {product.price}</h4>
                </div>
                <div className="d-flex flex-column h-full mt-4">
                  {isSeller && (
                    <button
                      className="btn btn-danger btn-sm mb-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                  {!isSeller && (
                    <button
                      className="btn btn-primary btn-sm mb-2"
                      onClick={() => onAddToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                  )}
                  <button
                    className="bg-blue-500 btn btn-primary btn-sm"
                    onClick={() => handleNavigateToProductPage(product)}
                  >
                    View Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          message="Do you want to chat with the seller?"
        />
        <ToastContainer />
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
        toast.success(responseData.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(responseData.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Error adding product to wishlist.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    <div className="bg-[#004aad]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteProduct}
              onAddToWishlist={handleAddToWishlist}
              className="mb-[-10px]" // Negative margin to reduce gap
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
