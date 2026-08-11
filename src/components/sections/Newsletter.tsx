"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section
      className="relative py-28 px-6 md:px-10 grain"
      style={{ backgroundColor: "#1A1008", borderTop: "1px solid rgba(201,168,76,0.15)" }}
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6 relative">
        <Reveal>
          <p
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Restez connectée
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="text-[#FAF7F0] font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            }}
          >
            {sent ? "Merci de votre confiance" : (
              <>
                L&apos;univers <span className="text-outline">Madame Lala</span>
              </>
            )}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p
            className="text-[#FAF7F0]/60 text-base leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {sent
              ? "Vous recevrez nos actualités et avant-premières en exclusivité."
              : "Recevez nos nouvelles collections, inspirations et offres exclusives."}
          </p>
        </Reveal>
        {!sent && (
          <Reveal delay={260} className="w-full">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-4 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-1 py-4 bg-transparent text-[#FAF7F0] placeholder-[#FAF7F0]/35 text-base tracking-wider focus:outline-none transition-colors"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "none",
                  borderBottom: "1px solid rgba(201,168,76,0.35)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#C9A84C")}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(201,168,76,0.35)")}
              />
              <button
                type="submit"
                className="btn-lift px-8 py-4 bg-[#C9A84C] text-[#1A1008] text-sm tracking-[0.3em] uppercase whitespace-nowrap"
                style={{ fontFamily: "'Cormorant Garamond', serif", border: "none", cursor: "pointer" }}
              >
                S&apos;inscrire
              </button>
            </form>
          </Reveal>
        )}
        <Reveal delay={320}>
          <p
            className="text-[#FAF7F0]/35 text-xs tracking-wider mt-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Pas de spam. Désinscription à tout moment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
