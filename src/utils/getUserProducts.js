// utils/getUserProducts.js

export const getUserProducts = async (userEmail) => {
  try {
    const response = await fetch(
      `/api/products?sellerEmail=${encodeURIComponent(userEmail)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching user products:", error);
    return [];
  }
};
