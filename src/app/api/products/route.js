import connect from "@/utils/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { name, description, price, category, imageUrl } = await request.json();
    await connect();
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    await newProduct.save();
    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};



export async function DELETE(request) {
  await connect();
  const { id } = await request.json();

  if (!id) {
    return new NextResponse("Product ID is required", { status: 400 });
  }

  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
