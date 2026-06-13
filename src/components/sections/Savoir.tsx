export default function Savoir() {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#3D1F0D]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <p
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            L&apos;art du raphia
          </p>
          <h2
            className="text-[#FAF7F0] text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Un savoir-faire
            <br />
            <em className="italic text-[#C9A84C]">transmis de mère en fille</em>
          </h2>
          <div className="w-16 h-px bg-[#C9A84C]/50" />
          <p
            className="text-[#FAF7F0]/70 text-lg leading-relaxed font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Chaque sac MADAME LALA est tissé à la main dans les villages de Madagascar
            par des artisanes qui perpétuent des techniques ancestrales. Le raphia
            est récolté, séché, puis tressé selon des motifs uniques qui racontent
            l&apos;identité malgache.
          </p>
          <a
            href="/savoir-faire"
            className="inline-block self-start text-[#C9A84C] text-sm tracking-[0.3em] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            En savoir plus
          </a>
        </div>

        {/* Visual */}
        <div className="order-1 md:order-2 relative">
          <div
            className="aspect-square max-w-sm mx-auto md:max-w-none"
            style={{
              background: "linear-gradient(135deg, #5c2e12 0%, #8B6914 100%)",
              border: "1px solid #C9A84C30",
            }}
          >
            {/* Decorative woven pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-3/4 h-3/4 opacity-20"
                fill="none"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={i * 25 + 12}
                    x2="300"
                    y2={i * 25 + 12}
                    stroke="#C9A84C"
                    strokeWidth="8"
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 25 + 12}
                    y1="0"
                    x2={i * 25 + 12}
                    y2="300"
                    stroke="#FAF7F0"
                    strokeWidth="4"
                  />
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
          {/* Floating badge */}
          <div
            className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full flex items-center justify-center text-center hidden md:flex"
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
