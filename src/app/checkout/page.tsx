"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCart, CartItem } from "@/lib/cart";

const LABEL: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#3D1F0D",
  display: "block",
  marginBottom: "6px",
};

const INPUT: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1rem",
  color: "#1A1008",
  backgroundColor: "#fff",
  border: "1px solid rgba(61,31,13,0.2)",
  padding: "0.9rem 1.1rem",
  width: "100%",
  outline: "none",
};

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "",
    adresse: "", ville: "", codePostal: "", pays: "France",
  });

  useEffect(() => {
    const cart = getCart();
    if (cart.length === 0) router.replace("/panier");
    else setItems(cart);
  }, [router]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const total = items.reduce((s, i) => s + (i.prix ?? 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payableItems = items.filter((i) => i.prix);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payableItems, customer: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-10">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Finaliser
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#3D1F0D" }}>
              Vos coordonnées
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            {/* Identité */}
            <div>
              <p style={{ ...LABEL, marginBottom: "14px", fontSize: "0.65rem", letterSpacing: "0.4em" }}>Identité</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={LABEL}>Prénom *</label>
                  <input required style={INPUT} value={form.prenom} onChange={set("prenom")} placeholder="Marie" className="focus:border-[#C9A84C] transition-colors" />
                </div>
                <div>
                  <label style={LABEL}>Nom *</label>
                  <input required style={INPUT} value={form.nom} onChange={set("nom")} placeholder="Dupont" className="focus:border-[#C9A84C] transition-colors" />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p style={{ ...LABEL, marginBottom: "14px", fontSize: "0.65rem", letterSpacing: "0.4em" }}>Contact</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label style={LABEL}>Email *</label>
                  <input required type="email" style={INPUT} value={form.email} onChange={set("email")} placeholder="marie@exemple.com" className="focus:border-[#C9A84C] transition-colors" />
                </div>
                <div>
                  <label style={LABEL}>Téléphone</label>
                  <input type="tel" style={INPUT} value={form.telephone} onChange={set("telephone")} placeholder="+33 6 00 00 00 00" className="focus:border-[#C9A84C] transition-colors" />
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div>
              <p style={{ ...LABEL, marginBottom: "14px", fontSize: "0.65rem", letterSpacing: "0.4em" }}>Adresse de livraison</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label style={LABEL}>Adresse *</label>
                  <input required style={INPUT} value={form.adresse} onChange={set("adresse")} placeholder="12 rue des Artisans" className="focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={LABEL}>Code postal *</label>
                    <input required style={INPUT} value={form.codePostal} onChange={set("codePostal")} placeholder="75001" className="focus:border-[#C9A84C] transition-colors" />
                  </div>
                  <div>
                    <label style={LABEL}>Ville *</label>
                    <input required style={INPUT} value={form.ville} onChange={set("ville")} placeholder="Paris" className="focus:border-[#C9A84C] transition-colors" />
                  </div>
                </div>
                <div>
                  <label style={LABEL}>Pays *</label>
                  <select required style={{ ...INPUT, cursor: "pointer" }} value={form.pays} onChange={set("pays")} className="focus:border-[#C9A84C] transition-colors">
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Luxembourg</option>
                    <option>Canada</option>
                    <option>Madagascar</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Récap */}
            <div style={{ borderTop: "1px solid rgba(61,31,13,0.1)", paddingTop: "24px" }}>
              <p style={{ ...LABEL, marginBottom: "12px" }}>Récapitulatif</p>
              <div className="flex flex-col gap-2 mb-4">
                {items.map((i) => (
                  <div key={i.slug} className="flex justify-between">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1A1008" }}>{i.nom}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#3D1F0D" }}>{i.prix ? `${i.prix} €` : "—"}</span>
                  </div>
                ))}
              </div>
              {total > 0 && (
                <div className="flex justify-between pt-3" style={{ borderTop: "1px solid rgba(61,31,13,0.1)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3D1F0D" }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#3D1F0D", fontWeight: 500 }}>{total} €</span>
                </div>
              )}
            </div>

            {error && (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c0392b", fontSize: "0.95rem" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", backgroundColor: loading ? "#8a6a3a" : "#3D1F0D", color: "#FAF7F0", padding: "1.1rem 2.5rem", border: "none", cursor: loading ? "wait" : "pointer" }}
              className="hover:bg-[#5c2e12] transition-colors"
            >
              {loading ? "Redirection vers le paiement…" : "Procéder au paiement sécurisé →"}
            </button>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "#1A1008", opacity: 0.45, textAlign: "center", lineHeight: 1.6 }}>
              Paiement sécurisé par Stripe. Vos données ne sont jamais stockées sur nos serveurs.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
