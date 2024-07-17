import Product from "../../../models/Product";
import connect from "../../../utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, description, price, category, imageUrl } = await request.json();

  await connect();

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    imageUrl,
  });

  try {
    await newProduct.save();
    return new NextResponse("Product created successfully", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
