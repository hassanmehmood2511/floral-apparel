/**
 * Purpose: API route handler for product retrieval and admin updates by id.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { ProductSchema } from '@/lib/validators';
import { slugify } from '@/lib/utils';

type ProductRouteContext = {
  params: {
    id: string;
  };
};

/**
 * Checks if a request includes a valid admin key header.
 * @param request Incoming request.
 * @returns True when admin key is valid.
 */
function hasValidAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('x-admin-key');
  return Boolean(adminKey && adminKey === process.env.ADMIN_KEY);
}

/**
 * Fetches a product by id or slug value.
 * @param request Incoming request.
 * @param context Route context.
 * @returns Product record when found.
 */
export async function GET(request: NextRequest, context: ProductRouteContext) {
  try {
    await connectDB();
    const productIdOrSlug = context.params.id;
    const isAdminRequest = hasValidAdminKey(request);
    const query = isAdminRequest
      ? { $or: [{ _id: productIdOrSlug }, { slug: productIdOrSlug }] }
      : { slug: productIdOrSlug, isActive: true };

    const product = await Product.findOne(query).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

/**
 * Replaces product fields by id.
 * @param request Incoming request.
 * @param context Route context.
 * @returns Updated product.
 */
export async function PUT(request: NextRequest, context: ProductRouteContext) {
  return updateProduct(request, context, false);
}

/**
 * Updates specific product fields by id.
 * @param request Incoming request.
 * @param context Route context.
 * @returns Updated product.
 */
export async function PATCH(request: NextRequest, context: ProductRouteContext) {
  return updateProduct(request, context, true);
}

/**
 * Deletes a product by id.
 * @param request Incoming request.
 * @param context Route context.
 * @returns Success state for delete request.
 */
export async function DELETE(request: NextRequest, context: ProductRouteContext) {
  try {
    if (!hasValidAdminKey(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(context.params.id);

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

/**
 * Handles product update requests with optional partial updates.
 * @param request Incoming request.
 * @param context Route context.
 * @param isPartialUpdate Indicates whether patch mode is enabled.
 * @returns Updated product response.
 */
async function updateProduct(
  request: NextRequest,
  context: ProductRouteContext,
  isPartialUpdate: boolean,
) {
  try {
    if (!hasValidAdminKey(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const payload = (await request.json()) as Record<string, unknown>;

    if (isPartialUpdate) {
      const updatedProduct = await Product.findByIdAndUpdate(context.params.id, payload, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json(updatedProduct);
    }

    const validationResult = ProductSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors[0].message }, { status: 400 });
    }

    const validatedData = validationResult.data as Record<string, unknown>;
    validatedData.slug = slugify(String(validatedData.name));

    const updatedProduct = await Product.findByIdAndUpdate(context.params.id, validatedData, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
