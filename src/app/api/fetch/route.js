// src/app/api/fetch/route.js

import connect from "@/utils/db";
import Product from "@/models/Product";

export async function GET() {
  await connect();

  try {
    const products = await Product.find({}).lean();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
