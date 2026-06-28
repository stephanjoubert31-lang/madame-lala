"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

interface AddToCartButtonProps {
  slug: string;
  productName: string;
  prix: number | null;
  stock: number;
  photo?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AddToCartButton({
  slug, productName, prix, stock, photo, style, className,
}: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "added">("idle");

  const outOfStock = stock === 0;

  const handleClick = () => {
    if (outOfStock) return;
    if (!prix) { window.location.href = "/contact"; return; }
    addToCart({ slug, nom: productName, prix, photo });
    setState("added");
  };

  const base: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.78rem",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    padding: "1rem 2rem",
    border: "none",
    cursor: outOfStock ? "not-allowed" : "pointer",
    flex: 1,
    transition: "background-color 0.3s",
    color: "#FAF7F0",
    backgroundColor: outOfStock ? "#9e9e9e" : state === "added" ? "#5c6b2e" : "#3D1F0D",
    ...style,
  };

  return (
    <button onClick={handleClick} disabled={outOfStock} style={base} className={className}>
      {outOfStock
        ? "Rupture de stock"
        : !prix
        ? "Demander le prix"
        : state === "added"
        ? "Ajouté ✓"
        : "Ajouter au panier"}
    </button>
  );
}
