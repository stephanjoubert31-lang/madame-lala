"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const font = { fontFamily: "'Cormorant Garamond', serif" };

export default function CartDrawer() {
  const { items, total, count, removeFromCart, updateQuantity, isDrawerOpen, closeDrawer } =
    useCart();

  // Fermer avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  // Bloquer le scroll quand ouvert
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-[#1A1008]/40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Tiroir */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-[#FAF7F0] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panier"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#3D1F0D]/10">
          <div>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase" style={font}>
              Votre sélection
            </p>
            <h2 className="text-[#3D1F0D] text-xl font-light tracking-wider" style={font}>
              Panier {count > 0 && <span className="text-[#C9A84C]">({count})</span>}
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-[#1A1008]/40 hover:text-[#1A1008] transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Articles */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="text-[#1A1008]/40 text-lg" style={font}>
                Votre panier est vide
              </p>
              <button
                onClick={closeDrawer}
                className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase border-b border-[#C9A84C]/40 pb-px hover:border-[#C9A84C] transition-colors"
                style={font}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={item.product.slug}
                  className="flex gap-4 pb-5 border-b border-[#3D1F0D]/10 last:border-0"
                >
                  {/* Vignette */}
                  <div
                    className="w-16 h-20 shrink-0"
                    style={{
                      backgroundColor: item.product.color + "22",
                      border: `1px solid ${item.product.color}20`,
                    }}
                  />
                  {/* Infos */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-[#1A1008] font-light tracking-wide" style={font}>
                      {item.product.name}
                    </p>
                    <p className="text-[#1A1008]/50 text-xs" style={font}>
                      {item.product.description}
                    </p>
                    <p className="text-[#3D1F0D] text-sm mt-1" style={font}>
                      {item.product.price * item.quantity} €
                    </p>
                    {/* Quantité */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#3D1F0D]/20 text-[#3D1F0D] text-sm hover:border-[#3D1F0D] transition-colors"
                        aria-label="Diminuer"
                      >
                        −
                      </button>
                      <span className="text-[#1A1008] text-sm w-4 text-center" style={font}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#3D1F0D]/20 text-[#3D1F0D] text-sm hover:border-[#3D1F0D] transition-colors"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.slug)}
                        className="ml-auto text-[#1A1008]/25 text-xs hover:text-[#1A1008]/50 transition-colors"
                        style={font}
                        aria-label="Retirer"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pied */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#3D1F0D]/10 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-[#1A1008]/60 text-sm" style={font}>
                Sous-total
              </p>
              <p className="text-[#3D1F0D] text-xl font-light" style={font}>
                {total} €
              </p>
            </div>
            <p className="text-[#1A1008]/40 text-xs" style={font}>
              Livraison offerte · calculée au moment du paiement
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.25em] uppercase text-center hover:bg-[#5c2e12] transition-colors duration-300 mt-1"
              style={font}
            >
              Passer la commande
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full py-3 text-[#1A1008]/50 text-xs tracking-[0.25em] uppercase hover:text-[#1A1008] transition-colors"
              style={font}
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
