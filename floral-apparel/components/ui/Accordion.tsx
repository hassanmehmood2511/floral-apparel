'use client';

/**
 * Purpose: Reusable accordion component for product details
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-pistachio overflow-hidden">
      <button
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="font-display font-bold text-lg text-charcoal group-hover:text-blush transition-colors">
          {title}
        </span>
        <span className="text-charcoal group-hover:text-blush transition-transform duration-300 transform">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="font-body text-charcoal/70 leading-relaxed text-sm">{content}</div>
      </div>
    </div>
  );
}

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: 'Material & Care',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>100% premium sustainable materials</li>
          <li>Machine wash cold with like colors</li>
          <li>Tumble dry low or hang to dry</li>
          <li>Warm iron if needed</li>
          <li>Do not bleach</li>
        </ul>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-2">
          <p>
            <strong>Standard Shipping:</strong> Flat rate of PKR 200 on all orders. Delivery within
            3-5 business days.
          </p>
          <p>
            <strong>Returns:</strong> We accept returns within 14 days of delivery. Items must be
            unworn with tags attached.
          </p>
        </div>
      ),
    },
    {
      title: 'Sustainability',
      content:
        'At Floral Apparel, we are committed to ethical manufacturing practices. This piece was crafted in facilities that ensure fair wages and safe working conditions, using eco-friendly processes.',
    },
  ];

  return (
    <div className="w-full mt-12 border-t border-pistachio">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}
