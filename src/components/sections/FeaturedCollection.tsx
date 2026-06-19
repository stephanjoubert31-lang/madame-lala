"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <p
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Nouveautés
          </p>
          <h2
            className="text-[#3D1F0D] text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            La Collection
          </h2>
          <div className="w-16 h-px bg-[#C9A84C]" />
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 group">
              {/* Image */}
              <Link href={`/collection/${product.slug}`} className="block">
                <div
                  className="aspect-[3/4] overflow-hidden relative"
                  style={{ backgroundColor: product.color + "22", border: `1px solid ${product.color}20` }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: product.color + "15" }}
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-30">
                      <rect x="20" y="10" width="80" height="100" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                      <line x1="35" y1="25" x2="85" y2="25" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="35" x2="85" y2="35" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="45" x2="85" y2="45" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="55" x2="85" y2="55" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="65" x2="85" y2="65" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="75" x2="85" y2="75" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="35" y1="85" x2="85" y2="85" stroke="#C9A84C" strokeWidth="1" />
                      <line x1="45" y1="10" x2="45" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="60" y1="10" x2="60" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="75" y1="10" x2="75" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-[#3D1F0D]/0 group-hover:bg-[#3D1F0D]/5 transition-colors duration-500" />
                  <span
                    className="absolute top-4 left-4 bg-[#C9A84C] text-[#1A1008] text-xs px-3 py-1 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Nouveau
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <Link href={`/collection/${product.slug}`}>
                  <h3
                    className="text-[#1A1008] text-xl font-light tracking-wider hover:text-[#C9A84C] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {product.name}
                  </h3>
                </Link>
                <p
                  className="text-[#1A1008]/60 text-sm tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.description}
                </p>
                <p
                  className="text-[#3D1F0D] text-lg font-medium mt-1 mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.price} €
                </p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/collection"
            className="inline-block px-12 py-4 border border-[#3D1F0D] text-[#3D1F0D] text-sm tracking-[0.3em] uppercase hover:bg-[#3D1F0D] hover:text-[#FAF7F0] transition-all duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
