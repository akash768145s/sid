"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Main/nav";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

const ProductPage = () => {
  const { data: session } = useSession();
  
  const searchParams = useSearchParams();
  const productName = searchParams.get("name");
  const productPrice = searchParams.get("price");
  const sellerEmail = searchParams.get("sellerEmail");
  const productDescription = searchParams.get("description");
  const productImageUrl = searchParams.get("imageUrl");
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // Wishlist state

  const handleContactSeller = async () => {
    setLoading(true);

    const subject = encodeURIComponent(`Inquiry About ${productName}`);
    const body = encodeURIComponent(`
  Dear Seller,
  
  I am interested in ${productName}. Could you provide more details or suggest a time to discuss?
  
  Thank you!
  
  Best regards,
  ${session?.user?.name}
  
  Note: You can continue the conversation by replying to this email.
  
  For any issues, contact our team.
  
  Best regards,
  Team SID`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${sellerEmail}&su=${subject}&body=${body}`;

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
        window.location.href = gmailUrl;
      } else {
        alert(data.message || "Failed to contact seller.");
      }
    } catch (error) {
      console.error("Error contacting seller:", error);
      alert("Error contacting seller.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${productName} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Wishlist Toggle Functionality
  const handleToggleWishlist = () => {
    setIsInWishlist((prev) => !prev);
    toast.info(
      isInWishlist
        ? `${productName} removed from wishlist`
        : `${productName} added to wishlist`,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="main">
          <div className="default gallery">
            <div className="main-img">
              <img className="active" src={productImageUrl} alt={productName} />
            </div>
          </div>

          <div className="lightbox">
            <div className="gallery">
              <div className="main-img">
                <span className="icon-close">
                  <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                      fill="#69707D"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="icon-prev">
                  <svg
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1 3 9l8 8"
                      stroke="#1D2026"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="icon-next">
                  <svg
                    width="13"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m2 1 8 8-8 8"
                      stroke="#1D2026"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <img
                  className="active"
                  src={productImageUrl}
                  alt={productName}
                />
              </div>
            </div>
          </div>

          <div className="content">
            <div className="product-container">
              <h2 className="product-name">{productName}</h2>
              <div className="wishlist-button">
                <button
                  className={`wishlist-toggle ${
                    isInWishlist ? "in-wishlist" : ""
                  }`}
                  aria-label="Toggle Wishlist"
                  onClick={handleToggleWishlist}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isInWishlist ? "white" : "none"} // Fill color based on wishlist state
                    stroke={isInWishlist ? "white" : "currentColor"} // Stroke color based on wishlist state
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {isInWishlist ? (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    ) : (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <p className="product-desc">{productDescription}</p>
            <div className="price-info">
              <div className="price">
                <span className="current-price">&#x20b9; {productPrice}</span>
              </div>
            </div>

            <div className="add-to-cart-container">
              <button
                className="add-to-cart"
                onClick={handleContactSeller}
                disabled={loading}
              >
                <span>
                  {loading ? "Contacting Seller..." : "Contact Seller"}
                </span>
              </button>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductPage;
