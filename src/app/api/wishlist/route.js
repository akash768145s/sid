
import { getServerSession } from 'next-auth/next';
import connect from '../../../utils/db';
import Wishlist from '../../../models/Wishlist';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connect();

  try {
    const { product } = await request.json();

    // Check if the product already exists in the wishlist
    const existingWishlistItem = await Wishlist.findOne({ user: session.user.email, 'product._id': product._id });

    if (existingWishlistItem) {
      return NextResponse.json({ message: 'Product already in wishlist' }, { status: 400 });
    }

    const wishlistItem = new Wishlist({ user: session.user.email, product });
    await wishlistItem.save();
    return NextResponse.json({ message: 'Product added to wishlist' }, { status: 200 });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    return NextResponse.json({ message: 'Error adding product to wishlist', error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connect();

  try {
    const wishlist = await Wishlist.find({ user: session.user.email });
    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ message: 'Error fetching wishlist', error: error.message }, { status: 500 });
  }
}
