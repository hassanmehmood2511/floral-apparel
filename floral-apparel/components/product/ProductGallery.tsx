'use client';

/**
 * Purpose: Interactive image gallery for product pages
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const validImages =
    images?.length > 0 ? images : ['https://via.placeholder.com/600x800?text=Floral+Apparel'];
  const [mainImage, setMainImage] = useState(validImages[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-cream border border-pistachio shadow-sm">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative h-24 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                mainImage === img
                  ? 'border-blush'
                  : 'border-transparent hover:border-pistachio-dark'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
