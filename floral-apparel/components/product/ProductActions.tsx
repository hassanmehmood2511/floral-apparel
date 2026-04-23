'use client';

/**
 * Purpose: Interactive product actions (size, quantity, add to cart)
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { useState } from 'react';
import { useCartContext } from '@/lib/CartContext';
import { cn } from '@/lib/utils';

interface ProductActionsProps {
  product: {
    _id: string;
    name: string;
    price: number;
    sizes: string[];
    images: string[];
    stock: number;
    isActive: boolean;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCartContext();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const inStock = product.stock > 0 && product.isActive;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !inStock) return;

    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.images?.[0] || 'https://via.placeholder.com/400x500?text=Floral+Apparel',
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-body text-sm font-bold text-charcoal/50 uppercase tracking-widest">
            Select Size
          </h3>
          <button className="text-xs text-charcoal underline underline-offset-2 hover:text-blush transition-colors">
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'w-14 h-12 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center',
                  isSelected
                    ? 'bg-blush border-blush text-white shadow-md'
                    : 'bg-white border-pistachio text-charcoal hover:border-blush hover:text-blush',
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Stock */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-body text-sm font-bold text-charcoal/50 uppercase tracking-widest">
            Quantity
          </h3>
          {inStock ? (
            <span className="text-sm font-bold text-green-600 flex items-center gap-1">
              In Stock <span className="text-lg leading-none">✓</span>
            </span>
          ) : (
            <span className="text-sm font-bold text-red-500">Out of Stock</span>
          )}
        </div>

        <div className="flex items-center w-32 bg-white border border-pistachio rounded-xl overflow-hidden h-12">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-pistachio-light hover:text-blush disabled:opacity-50 disabled:hover:bg-transparent transition-colors font-bold text-xl"
          >
            -
          </button>
          <div className="flex-1 h-full flex items-center justify-center font-bold text-charcoal border-x border-pistachio/50">
            {quantity}
          </div>
          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stock}
            className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-pistachio-light hover:text-blush disabled:opacity-50 disabled:hover:bg-transparent transition-colors font-bold text-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedSize}
        className={cn(
          'w-full h-14 rounded-full flex items-center justify-center gap-2 font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg',
          !inStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
            : isAdded
              ? 'bg-green-500 text-white'
              : 'bg-blush hover:bg-blush-dark text-white',
        )}
      >
        {isAdded ? (
          <span>Added to Cart ✓</span>
        ) : (
          <>
            <span>Add to Cart</span>
            <span className="text-xl">🌸</span>
          </>
        )}
      </button>
    </div>
  );
}
