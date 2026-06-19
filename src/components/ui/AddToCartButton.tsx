"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-4 bg-[#C9A84C] text-[#1A1008] text-sm tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-[#d4b96a] active:scale-[0.98]"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {added ? "Ajouté ✓" : "Ajouter au panier"}
    </button>
  );
}
