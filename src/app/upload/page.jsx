"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"; 

// Define the available categories
const categories = [
  "Stationary",
  "Sport Equipment",
  "Electronics",
  "Other Accessories",
];

const UploadButton = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/sign-in"); // Redirect to sign-in page
    }
  }, [session, status, router]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!session) {
      router.push("/sign-in"); // Redirect to sign-in page if not authenticated
      setLoading(false);
      return;
    }

    console.log({
      ...formData,
      imageUrl,
      sellerName: session?.user?.name || "Unknown Seller",
      sellerEmail: session?.user?.email || "placeholder@example.com",
    });

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
          sellerName: session?.user?.name || "Unknown Seller",
          sellerEmail: session?.user?.email || "placeholder@example.com",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product created successfully",
        });
        setFormData({ name: "", description: "", price: "", category: "" });
        setImageUrl("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating product");
        if (imageUrl) {
          setImageUrl(""); // Clear image URL on error
        }
        toast({
          title: "Error",
          description: errorData.message || "Error creating product",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("Error creating product");
      toast({
        title: "Error",
        description: "Error creating product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #004AAD, #ffffff)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <UploadDropzone
        appearance={{
          container: {
            border: "1px solid blue",
          },
          uploadIcon: {
            color: "blue",
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error) => {
          toast({
            title: "Upload Error",
            description: `ERROR! ${error.message}`,
            variant: "destructive",
          });
        }}
      />
      {imageUrl && (
        <div className="my-4">
          <Image src={imageUrl} alt="Uploaded Image" width={500} height={300} />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md p-6 rounded-md shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} // Semi-transparent background
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="border p-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="border p-2"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
          className="border p-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #2563eb 0%, #ffffff 100%)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
};

export default UploadButton;
