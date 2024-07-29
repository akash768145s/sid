import { getServerSession } from 'next-auth/next';
import connect from '../../../../utils/db';
import Wishlist from '../../../../models/Wishlist';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connect();

  try {
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop(); // Extract productId from URL path

    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const result = await Wishlist.findOneAndDelete({
      user: session.user.email,
      'product._id': productId
    });

    if (!result) {
      return NextResponse.json({ message: 'Product not found in wishlist' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product removed from wishlist' }, { status: 200 });
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    return NextResponse.json({ message: 'Error removing product from wishlist', error: error.message }, { status: 500 });
  }
}
