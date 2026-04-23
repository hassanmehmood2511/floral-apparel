/**
 * Purpose: API route handler for fetching a single product by slug
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();

    const product = await Product.findOne({ slug: params.slug }).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
