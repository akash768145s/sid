import React from "react";
import "./main.css"; // Ensure this path is correct based on your project structure

const ProductPage = () => {
  return (
    <div className="container">


      <section className="main">
        
        <div className="default gallery">
          <div className="main-img">
            <img
              className="active"
              src="/image-product-1.jpg"
              alt="product-img"
            />
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
                    fillRule="evenodd"
                  />
                </svg>
              </span>
              <span className="icon-prev">
                <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
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
                <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
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
                src="/image-product-1.jpg"
                alt="product-img"
              />
            </div>
          </div>
        </div>

        <div className="content">
          <h3>INNO3DTECH</h3>
          <h2 className="product-name">Fall Limited Edition Sneakers</h2>
          <p className="product-desc">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="price-info">
            <div className="price">
              <span className="current-price">₹125.00</span>
              <span className="discount">50%</span>
            </div>
            <div className="prev-price">₹250.00</div>
          </div>
          <div className="add-to-cart-container">
            <div className="counter">
              <button className="minus">
                <svg
                  width="12"
                  height="4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#FFFFFF" fillRule="nonzero" xlinkHref="#a" />
                </svg>
              </button>

              <span className="count">0</span>
              <button className="plus">
                <svg
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.69c0 .357.287.643.643.643h2.046c.357 0 .643-.287.643-.643v-3.69h3.69a.641.641 0 0 0 .643-.643Z"
                      id="b"
                    />
                  </defs>
                  <use fill="#FFFFFF" fillRule="nonzero" xlinkHref="#b" />
                </svg>
              </button>
            </div>
            <button className="add-to-cart">
              <img className="cart-icon" src="/icon-cart.svg" alt="cart icon" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
