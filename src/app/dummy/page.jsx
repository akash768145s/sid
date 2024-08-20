import React from "react";
import "./main.css"; // Ensure this path is correct based on your project structure
import Navbar from "@/components/Main/nav";

const ProductPage = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      <section className="main">
        <div className="default gallery">
          <div className="main-img">
            <img
              className="active"
              src="/image-product-1.jpg"
              alt="product-img" />
          </div>
        </div>

        <div className="lightbox">
          <div className="gallery">
            <div className="main-img">
              <span className="icon-close">
                <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                    fill="#69707D"
                    fillRule="evenodd" />
                </svg>
              </span>
              <span className="icon-prev">
                <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 1 3 9l8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd" />
                </svg>
              </span>
              <span className="icon-next">
                <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m2 1 8 8-8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd" />
                </svg>
              </span>

              <img
                className="active"
                src="/image-product-1.jpg"
                alt="product-img" />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="product-container">
            <h2 className="product-name">Fall Limited Edition Sneakers</h2>
            <div className="wishlist-button">
              <button className="wishlist-toggle" aria-label="Toggle Wishlist">
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>

          <p className="product-desc">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="price-info">
            <div className="price">
              <span className="current-price">₹125.00</span>
            </div>
          </div>

          <div className="add-to-cart-container">
            <button className="add-to-cart">
              <span>Contact Seller</span>
            </button>
          </div>
        </div>
      </section>
    </div></>
  );
};

export default ProductPage;
