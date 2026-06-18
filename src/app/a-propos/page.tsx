import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const valeurs = [
  {
    titre: "Authenticité",
    texte: "Chaque sac porte l&apos;empreinte d&apos;une main, d&apos;une culture, d&apos;une île. Nous ne reproduisons pas — nous créons, une pièce à la fois.",
  },
  {
    titre: "Respect",
    texte: "Respect des artisanes, de leur temps, de leur savoir. Respect de la nature malgache, de ses ressources et de ses équilibres.",
  },
  {
    titre: "Élégance",
    texte: "Le luxe ne crie pas. Il se reconnaît au soin du détail, à la qualité de la matière, à la cohérence d&apos;un geste.",
  },
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0]">

        {/* ── Hero texte ── */}
        <section className="pt-36 pb-20 px-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Notre histoire
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
              Une marque entre<br />deux continents
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1A1008", opacity: 0.75, lineHeight: 1.9 }}>
              MADAME LALA est née d&apos;une rencontre : celle d&apos;une passion française pour le design et d&apos;un amour profond pour Madagascar, ses paysages, ses couleurs, ses femmes. La marque a été fondée avec une conviction simple — que la beauté la plus authentique vient de mains qui savent.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1A1008", opacity: 0.75, lineHeight: 1.9 }}>
              Depuis Paris, nous concevons les silhouettes. Depuis Madagascar, les artisanes leur donnent vie. Chaque sac traverse deux mondes avant d&apos;arriver dans le vôtre.
            </p>
          </div>
        </section>

        {/* ── Notre Vision ── */}
        <section className="bg-[#3D1F0D] py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
                Notre vision
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2 }}>
                Le luxe comme<br />acte de sens
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A84C" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(250,247,240,0.75)", lineHeight: 1.9 }}>
                Nous croyons que le vrai luxe ne se mesure pas au prix d&apos;une étiquette, mais à la valeur de ce qu&apos;il représente. Un sac MADAME LALA raconte une histoire de transmission, de beauté naturelle et de création responsable.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(250,247,240,0.75)", lineHeight: 1.9 }}>
                Notre ambition : faire de MADAME LALA une référence mondiale du luxe artisanal africain, tout en restant profondément fidèles à nos racines malgaches.
              </p>
            </div>
            {/* Photo placeholder */}
            <div
              className="aspect-[4/5] order-1 md:order-2 flex items-center justify-center"
              style={{ backgroundColor: "#5c2e12" }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.35)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Photo fondatrice
              </p>
            </div>
          </div>
        </section>

        {/* ── Nos Valeurs ── */}
        <section className="bg-[#FAF7F0] py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 flex flex-col items-center gap-4">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
                Ce qui nous guide
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#3D1F0D" }}>
                Nos Valeurs
              </h2>
              <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {valeurs.map((v) => (
                <div key={v.titre} className="flex flex-col gap-4 text-center items-center">
                  <div style={{ width: "32px", height: "1px", backgroundColor: "#C9A84C" }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#3D1F0D", letterSpacing: "0.08em" }}>
                    {v.titre}
                  </h3>
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#1A1008", opacity: 0.65, lineHeight: 1.85 }}
                    dangerouslySetInnerHTML={{ __html: v.texte }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Citation ── */}
        <section className="bg-[#FAF7F0] py-20 px-6 border-t border-[#3D1F0D]/10">
          <div className="max-w-2xl mx-auto text-center">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#3D1F0D",
                lineHeight: 1.7,
                letterSpacing: "0.02em",
              }}
            >
              &ldquo; La beauté naît des mains qui savent,<br />
              et des cœurs qui transmettent. &rdquo;
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", marginTop: "20px" }}>
              — MADAME LALA
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
