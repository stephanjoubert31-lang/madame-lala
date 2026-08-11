import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: "100 %", label: "Fait main" },
  { value: "2", label: "Pays, un lien : Paris — Madagascar" },
  { value: "1", label: "Matière : le raphia naturel" },
];

export default function Savoir() {
  return (
    <section className="relative py-28 px-6 md:px-10 grain" style={{ backgroundColor: "#3D1F0D" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative">
        {/* Texte */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <Reveal>
            <p
              className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              L&apos;art du raphia
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-[#FAF7F0] font-light leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
              }}
            >
              Un savoir-faire
              <br />
              <em className="italic text-[#C9A84C]">transmis de mère en fille</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <div className="w-16 h-px bg-[#C9A84C]/50" />
          </Reveal>
          <Reveal delay={240}>
            <p
              className="text-[#FAF7F0]/70 text-lg leading-relaxed font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Chaque sac MADAME LALA est tissé à la main dans les villages de Madagascar
              par des artisanes qui perpétuent des techniques ancestrales. Le raphia
              est récolté, séché, puis tressé selon des motifs uniques qui racontent
              l&apos;identité malgache.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a
              href="/savoir-faire"
              className="link-sweep inline-block self-start text-[#C9A84C] text-sm tracking-[0.3em] uppercase mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", textDecoration: "none" }}
            >
              En savoir plus
            </a>
          </Reveal>

          {/* Chiffres clés */}
          <Reveal delay={360}>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      fontWeight: 300,
                      color: "#C9A84C",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(250,247,240,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Visuel */}
        <div className="order-1 md:order-2 relative">
          <Reveal delay={150}>
            <div
              className="aspect-square max-w-sm mx-auto md:max-w-none relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #5c2e12 0%, #8B6914 100%)",
                border: "1px solid #C9A84C30",
              }}
            >
              {/* Motif tressé décoratif */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                <svg viewBox="0 0 300 300" className="w-3/4 h-3/4 opacity-20" fill="none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 25 + 12} x2="300" y2={i * 25 + 12} stroke="#C9A84C" strokeWidth="8" />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 25 + 12} y1="0" x2={i * 25 + 12} y2="300" stroke="#FAF7F0" strokeWidth="4" />
                  ))}
                </svg>
              </div>
              <div className="absolute bottom-6 right-6">
                <p
                  className="text-[#C9A84C] text-sm tracking-wider italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Madagascar, 2024
                </p>
              </div>
            </div>
          </Reveal>
          {/* Badge flottant */}
          <div
            className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full items-center justify-center text-center hidden md:flex glow-breathe"
            style={{ backgroundColor: "#C9A84C" }}
          >
            <p
              className="text-[#1A1008] text-xs leading-tight tracking-wide uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              100%
              <br />
              Artisanal
              <br />
              Malgache
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
