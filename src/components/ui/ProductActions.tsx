"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 600);
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-[#C9A84C] text-[#1A1008] text-sm tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-[#d4b96a] active:scale-[0.98]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
      <button
        onClick={() => { addToCart(product); window.location.href = "/checkout"; }}
        className="w-full text-center py-4 border border-[#3D1F0D]/30 text-[#3D1F0D] text-sm tracking-[0.25em] uppercase hover:bg-[#3D1F0D] hover:text-[#FAF7F0] transition-all duration-300"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Acheter maintenant
      </button>
    </div>
  );
}
