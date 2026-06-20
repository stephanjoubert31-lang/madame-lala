"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCart, removeFromCart, CartItem } from "@/lib/cart";

export default function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(getCart());
    setReady(true);
  }, []);

  const remove = (slug: string) => {
    removeFromCart(slug);
    setItems(getCart());
  };

  const total = items.reduce((sum, i) => sum + (i.prix ?? 0), 0);

  const handleCheckout = async () => {
    const payableItems = items.filter((i) => i.prix);
    if (payableItems.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payableItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setLoading(false);
    }
  };

  if (!ready) return null;

  /* ── Panier vide ── */
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center gap-10 text-center">
        <div className="w-full">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3D1F0D", textDecoration: "none" }}
          >
            <span>←</span> La collection
          </Link>
        </div>

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
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1008", opacity: 0.6, lineHeight: 1.8 }}>
            Vous n'avez pas encore sélectionné de pièce.
          </p>
        </div>

        <Link
          href="/collection"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "#3D1F0D", color: "#FAF7F0", padding: "1rem 2rem", textDecoration: "none" }}
          className="hover:bg-[#5c2e12] transition-colors duration-300"
        >
          Découvrir la collection
        </Link>
      </div>
    );
  }

  /* ── Panier rempli ── */
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-10">

      <div className="w-full">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3D1F0D", textDecoration: "none" }}
        >
          <span>←</span> Continuer mes achats
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
          Votre sélection
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#3D1F0D" }}>
          Mon panier
        </h1>
        <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
      </div>

      {/* Liste des articles */}
      <div className="flex flex-col divide-y divide-[#3D1F0D]/10">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center gap-6 py-6">
            {/* Photo */}
            <div className="w-20 h-24 flex-shrink-0 relative overflow-hidden" style={{ backgroundColor: "#EDE8DF" }}>
              {item.photo ? (
                <Image src={item.photo} alt={item.nom} fill className="object-cover" sizes="80px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 18 + 4} x2="80" y2={i * 18 + 4} stroke="#3D1F0D" strokeWidth="6" />
                    ))}
                  </svg>
                </div>
              )}
            </div>

            {/* Infos */}
            <div className="flex-1 flex flex-col gap-1">
              <Link
                href={`/collection/${item.slug}`}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#3D1F0D", textDecoration: "none", letterSpacing: "0.04em" }}
                className="hover:text-[#C9A84C] transition-colors"
              >
                {item.nom}
              </Link>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#3D1F0D", opacity: 0.7 }}>
                {item.prix ? `${item.prix} €` : "Prix sur demande"}
              </p>
            </div>

            {/* Supprimer */}
            <button
              onClick={() => remove(item.slug)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3D1F0D", opacity: 0.4, background: "none", border: "none", cursor: "pointer" }}
              className="hover:opacity-100 hover:text-[#C9A84C] transition-all"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="border-t border-[#3D1F0D]/10 pt-8 flex flex-col gap-6">
        {total > 0 && (
          <div className="flex justify-between items-baseline">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3D1F0D" }}>
              Total estimé
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#3D1F0D", fontWeight: 500 }}>
              {total} €
            </span>
          </div>
        )}

        {error && (
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#b00", textAlign: "center" }}>
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {total > 0 ? (
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: loading ? "#8a6a3a" : "#3D1F0D", color: "#FAF7F0", padding: "1rem 2rem", border: "none", cursor: loading ? "wait" : "pointer", flex: 1, transition: "background-color 0.3s" }}
              className="hover:bg-[#5c2e12]"
            >
              {loading ? "Redirection…" : "Procéder au paiement"}
            </button>
          ) : (
            <Link
              href="/contact"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "#3D1F0D", color: "#FAF7F0", padding: "1rem 2rem", textDecoration: "none", textAlign: "center", flex: 1 }}
              className="hover:bg-[#5c2e12] transition-colors duration-300"
            >
              Nous contacter pour le prix
            </Link>
          )}
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "#1A1008", opacity: 0.5, lineHeight: 1.7, textAlign: "center" }}>
          Paiement sécurisé par Stripe. Votre commande sera confirmée par e-mail.
        </p>
      </div>

    </div>
  );
}
