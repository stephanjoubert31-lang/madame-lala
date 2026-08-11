import Link from "next/link";
import Marquee from "@/components/ui/Marquee";

/* Titre display géant révélé lettre à lettre (CSS pur, delay par index) */
function DisplayLine({
  text,
  startDelay = 0,
  outline = false,
}: {
  text: string;
  startDelay?: number;
  outline?: boolean;
}) {
  return (
    <span className="block whitespace-nowrap" aria-hidden="true">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`letter ${outline ? "text-outline" : ""}`}
          style={{ animationDelay: `${startDelay + i * 55}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col overflow-hidden grain">
      {/* ── Fond : brun profond + lueur dorée qui respire ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 120%, #5C2E0E 0%, #2C1005 65%)",
        }}
      />
      <div
        className="absolute z-0 glow-breathe"
        style={{
          left: "50%",
          bottom: "-30%",
          width: "70vw",
          height: "70vw",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0) 60%)",
        }}
      />

      {/* ── Composition centrale ── */}
      <div className="relative z-[2] flex-1 flex flex-col items-center justify-center text-center px-4">
        <p
          className="letter"
          style={{
            animationDelay: "150ms",
            fontFamily: "'Cormorant Garamond', serif",
            color: "#C9A84C",
            fontSize: "0.72rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
          }}
        >
          Maison artisanale — Madagascar
        </p>

        <h1
          className="mt-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#FAF7F0",
            fontSize: "clamp(3.4rem, 12.5vw, 11rem)",
            lineHeight: 0.98,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span className="sr-only">Madame Lala</span>
          <DisplayLine text="Madame" startDelay={350} />
          <DisplayLine text="Lala" startDelay={800} outline />
        </h1>

        <p
          className="letter"
          style={{
            animationDelay: "1300ms",
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(250,247,240,0.65)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: "32rem",
            marginTop: "2rem",
            letterSpacing: "0.02em",
          }}
        >
          Des sacs en raphia tissés à la main par des artisanes de Madagascar.
          Une élégance qui raconte une histoire.
        </p>

        <div
          className="letter flex flex-wrap gap-4 justify-center"
          style={{ animationDelay: "1550ms", marginTop: "2.6rem" }}
        >
          <Link
            href="/collection"
            className="btn-lift"
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
            className="btn-lift hover:border-[#C9A84C] hover:text-[#C9A84C]"
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

      {/* ── Bandeau défilant + indicateur ── */}
      <div className="relative z-[2] pb-6 flex flex-col gap-6">
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.18)",
            borderBottom: "1px solid rgba(201,168,76,0.18)",
            padding: "0.9rem 0",
          }}
        >
          <Marquee
            dark
            items={[
              "Tissé main",
              "Raphia naturel",
              "Madagascar",
              "Pièces uniques",
              "Artisanat d'exception",
              "Transmis de mère en fille",
            ]}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
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
              height: "40px",
              background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
