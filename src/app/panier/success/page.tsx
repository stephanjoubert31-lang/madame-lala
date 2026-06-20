"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { clearCart } from "@/lib/cart";

export default function SuccessPage() {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-10 text-center">

          {/* Icône */}
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="#C9A84C" strokeWidth="1.2" />
            <path d="M17 28l8 8 14-16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex flex-col items-center gap-4">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Commande confirmée
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
              Merci pour votre confiance
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1008", opacity: 0.6, lineHeight: 1.8, maxWidth: "32rem" }}>
              Votre paiement a bien été reçu. Nous vous enverrons une confirmation par e-mail et prendrons contact avec vous pour organiser l'envoi de votre pièce.
            </p>
          </div>

          <Link
            href="/collection"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "#3D1F0D", color: "#FAF7F0", padding: "1rem 2rem", textDecoration: "none" }}
            className="hover:bg-[#5c2e12] transition-colors duration-300"
          >
            Retour à la collection
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
