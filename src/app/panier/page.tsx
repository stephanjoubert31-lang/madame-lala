import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function PanierPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-10 text-center">

          {/* ← Retour */}
          <div className="w-full">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3D1F0D", textDecoration: "none" }}
            >
              <span style={{ fontSize: "1rem" }}>←</span>
              La collection
            </Link>
          </div>

          {/* Icône panier vide */}
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>

          <div className="flex flex-col items-center gap-4">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Votre sélection
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
              Panier vide
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1008", opacity: 0.6, lineHeight: 1.8, maxWidth: "30rem" }}>
              Nos pièces sont fabriquées à la main en quantités limitées.
              Pour toute commande, contactez-nous directement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/collection"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.78rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                backgroundColor: "#3D1F0D",
                color: "#FAF7F0",
                padding: "1rem 2rem",
                textDecoration: "none",
                display: "inline-block",
              }}
              className="hover:bg-[#5c2e12] transition-colors duration-300"
            >
              Découvrir la collection
            </Link>
            <Link
              href="/contact"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.78rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                color: "#3D1F0D",
                padding: "1rem 2rem",
                border: "1px solid #C9A84C",
                textDecoration: "none",
                display: "inline-block",
              }}
              className="hover:bg-[#C9A84C]/10 transition-colors duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
