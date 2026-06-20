"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productName: string;
  prix: number | null;
}

export default function AddToCartButton({ productName, prix }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!prix) {
      // Pas de prix → rediriger vers contact
      router.push("/contact");
      return;
    }
    setAdded(true);
    router.push("/panier");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.78rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        backgroundColor: added ? "#5c2e12" : "#3D1F0D",
        color: "#FAF7F0",
        padding: "1rem 2rem",
        border: "none",
        cursor: "pointer",
        flex: 1,
        transition: "background-color 0.3s",
      }}
    >
      {prix ? (added ? "Ajouté ✓" : "Ajouter au panier") : "Demander le prix"}
    </button>
  );
}
