/**
 * Purpose: API route handler for creating and fetching products
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { ProductSchema } from '@/lib/validators';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const size = searchParams.get('size');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (size) {
      query.sizes = size;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products,
      totalPages,
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const validationResult = ProductSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data as any;
    validatedData.slug = slugify(validatedData.name);

    await connectDB();

    const newProduct = new Product(validatedData);
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Product name must be unique (slug collision)' },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
