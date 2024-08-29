// src/app/api/products/route.js

import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";
import { getToken } from "next-auth/jwt";

export async function POST(request) {
  await connect();

  const { name, description, price, category, imageUrl } = await request.json();


  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const sellerName = token?.name || "Unknown Seller"; // Default to 'Unknown Seller' if not available
  const sellerEmail = token?.email || "placeholder@example.com"; // Default to 'placeholder@example.com' if not available

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    imageUrl,
    sellerName,
    sellerEmail,
  });

  try {
    await newProduct.save();
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  await connect();

  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sellerEmail = searchParams.get("sellerEmail");

  await connect();

  try {
    let products;
    if (sellerEmail) {
      products = await Product.find({ sellerEmail });
    } else {
      products = await Product.find();
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
