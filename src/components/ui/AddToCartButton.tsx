"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

interface AddToCartButtonProps {
  slug: string;
  productName: string;
  prix: number | null;
  photo?: string;
}

export default function AddToCartButton({ slug, productName, prix, photo }: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "added">("idle");

  const handleClick = () => {
    if (!prix) {
      window.location.href = "/contact";
      return;
    }
    addToCart({ slug, nom: productName, prix, photo });
    setState("added");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.78rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        backgroundColor: state === "added" ? "#5c6b2e" : "#3D1F0D",
        color: "#FAF7F0",
        padding: "1rem 2rem",
        border: "none",
        cursor: "pointer",
        flex: 1,
        transition: "background-color 0.3s",
      }}
    >
      {!prix
        ? "Demander le prix"
        : state === "added"
        ? "Ajouté au panier ✓"
        : "Ajouter au panier"}
    </button>
  );
}
