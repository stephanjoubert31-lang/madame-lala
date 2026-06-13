"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section className="py-24 px-6 md:px-10 bg-[#FAF7F0] border-t border-[#3D1F0D]/10">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
        <p
          className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Restez connectée
        </p>
        <h2
          className="text-[#3D1F0D] text-3xl md:text-4xl font-light leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {sent ? "Merci de votre confiance" : "L'univers MADAME LALA"}
        </h2>
        <p
          className="text-[#1A1008]/60 text-base leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {sent
            ? "Vous recevrez nos actualités et avant-premières en exclusivité."
            : "Recevez nos nouvelles collections, inspirations et offres exclusives."}
        </p>
        {!sent && (
          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-5 py-4 bg-white border border-[#3D1F0D]/20 text-[#1A1008] placeholder-[#1A1008]/40 text-sm tracking-wider focus:outline-none focus:border-[#C9A84C] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.3em] uppercase hover:bg-[#5c2e12] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              S&apos;inscrire
            </button>
          </form>
        )}
        <p
          className="text-[#1A1008]/40 text-xs tracking-wider mt-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Pas de spam. Désinscription à tout moment.
        </p>
      </div>
    </section>
  );
}
