// lib/products.js

export const getProducts = async ({ sellerEmail } = {}) => {
  // Replace with your actual data fetching logic
  const response = await fetch("https://your-database-api/products"); // Adjust the API URL

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  let products = data.products;

  if (sellerEmail) {
    products = products.filter(
      (product) => product.sellerEmail === sellerEmail
    );
  }

  return products;
};
