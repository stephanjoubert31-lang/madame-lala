import Link from "next/link";

function BaobabIcon() {
  return (
    <svg viewBox="0 0 100 120" width="40" height="48" fill="#C9A84C">
      {/* Tronc large et renflé */}
      <path d="M38 110 Q35 80 30 60 Q25 40 35 30 Q50 22 65 30 Q75 40 70 60 Q65 80 62 110 Z" />
      {/* Branches principales */}
      <line x1="50" y1="30" x2="20" y2="10" stroke="#C9A84C" strokeWidth="3" />
      <line x1="50" y1="30" x2="80" y2="10" stroke="#C9A84C" strokeWidth="3" />
      <line x1="50" y1="30" x2="50" y2="5"  stroke="#C9A84C" strokeWidth="3" />
      <line x1="50" y1="30" x2="15" y2="25" stroke="#C9A84C" strokeWidth="2" />
      <line x1="50" y1="30" x2="85" y2="25" stroke="#C9A84C" strokeWidth="2" />
      {/* Petites branches */}
      <line x1="20" y1="10" x2="10" y2="3"  stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="20" y1="10" x2="25" y2="2"  stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="80" y1="10" x2="75" y2="2"  stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="80" y1="10" x2="90" y2="3"  stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="50" y1="5"  x2="44" y2="0"  stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="50" y1="5"  x2="56" y2="0"  stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
  );
}

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

        {/* 1 — MADAME LALA */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.2rem, 8vw, 6rem)",
            letterSpacing: "0.22em",
            color: "#C9A84C",
            fontWeight: 400,
            lineHeight: 1,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Madame Lala
        </h1>

        {/* 2 — Séparateur : ligne — baobab — ligne */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "18px" }}>
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(to left, #C9A84C, rgba(201,168,76,0.3))" }} />
          <BaobabIcon />
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(to right, #C9A84C, rgba(201,168,76,0.3))" }} />
        </div>

        {/* 3 — MADE IN MADAGASCAR */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            color: "#B09050",
            textTransform: "uppercase",
            marginTop: "14px",
            fontWeight: 400,
          }}
        >
          Made in Madagascar
        </p>

        {/* 4 — Sous-titre */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(250,247,240,0.65)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: "30rem",
            marginTop: "40px",
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
