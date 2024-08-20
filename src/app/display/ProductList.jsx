"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./prdlist css.css";
import "./hello.css";
import "./boot.css";
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
    router.push(
      `/product/${product.id}?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&description=${encodeURIComponent(product.description)}&imageUrl=${encodeURIComponent(product.imageUrl)}`
    );
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
    <div className="container mt-5 mb-5" onClick={() => handleNavigateToProductPage(product)}>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
            <div className="col-md-3 mt-1">
              <Image
                className="img-fluid img-responsive rounded product-image"
                src={product.imageUrl}
                alt={product.name}
                width={150}
                height={150}
              />
            </div>
            <div className="col-md-6 mt-1">
              <div className="p-4 bg-white shadow-md rounded-lg max-w-sm">
                <div className="text-lg font-semibold text-gray-800">
                  {product.name}
                </div>
                <div className="text-md font-medium text-blue-600 mt-1">
                  {product.category}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Seller:{" "}
                  <span className="font-medium text-gray-800">
                    {product.sellerName}
                  </span>
                </div>
                <p className="text-justify text-gray-700 mt-3">
                  {product.description.length > 250
                    ? `${product.description.slice(0, 250)}...`
                    : product.description}
                </p>
                {!isSeller && (
                  <button
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                    onClick={handleOpenModal}
                  >
                    Contact Seller
                  </button>
                )}
              </div>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-row align-items-center">
                <h4 className="mr-1">&#x20b9; {product.price}</h4>
              </div>
              <div className="d-flex flex-column mt-4">
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
                    className="btn btn-primary btn-sm"
                    onClick={() => onAddToWishlist(product)}
                  >
                    Add to Wishlist
                  </button>
                )}
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
