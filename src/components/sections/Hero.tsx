import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">

      {/* ── Fond : dégradé radial épuré ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, #5C2E0E 0%, #2C1005 100%)",
        }}
      />

      {/* ═══════════════════════════════
          COMPOSITION LOGO
      ═══════════════════════════════ */}
      <div className="relative z-[3] flex flex-col items-center text-center px-6">

        {/* Logo image — remplace titre + séparateur + "Made in Madagascar" */}
        <Image
          src="/LOGOMADAMELALA.PNG"
          alt="Madame Lala"
          width={520}
          height={0}
          style={{ width: "min(520px, 90vw)", height: "auto" }}
          priority
        />

        {/* Sous-titre */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(250,247,240,0.65)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: "30rem",
            marginTop: "32px",
            letterSpacing: "0.02em",
          }}
        >
          Des sacs en raphia tissés à la main par des artisanes de Madagascar.
          Une élégance qui raconte une histoire.
        </p>

        {/* 5 — Boutons CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginTop: "2.5rem" }}>
          <Link
            href="/collection"
            className="transition-colors duration-300 hover:bg-[#d4b96a]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              padding: "1rem 2.5rem",
              backgroundColor: "#C9A84C",
              color: "#1A1008",
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Découvrir la collection
          </Link>
          <Link
            href="/savoir-faire"
            className="transition-colors duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              padding: "1rem 2.5rem",
              border: "1px solid rgba(250,247,240,0.3)",
              color: "#FAF7F0",
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Notre savoir-faire
          </Link>
        </div>
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(250,247,240,0.35)",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Défiler
        </p>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}
