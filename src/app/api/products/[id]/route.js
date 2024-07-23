// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import Product from '@/models/Product';
import { getToken } from 'next-auth/jwt';

export async function DELETE(request, { params }) {
  await connect();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Get the token or user context to check the user's identity
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Check if the current user is the seller of the product
    if (product.sellerName !== token.name) {
      return NextResponse.json({ message: 'Not authorized to delete this product' }, { status: 403 });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
