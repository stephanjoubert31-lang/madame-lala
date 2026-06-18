import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";

const etapes = [
  {
    num: "01",
    title: "La Récolte",
    text: "Les feuilles de raphia sont récoltées à la main sur les palmiers sauvages de Madagascar, uniquement en saison sèche pour garantir la qualité de la fibre.",
  },
  {
    num: "02",
    title: "Le Tressage",
    text: "Chaque brin est séché au soleil, puis tressé selon des motifs transmis de génération en génération. Un sac demande plusieurs jours de travail minutieux.",
  },
  {
    num: "03",
    title: "L'Assemblage",
    text: "La finition est assurée à la main : coutures, anses, fermetures. Chaque pièce est inspectée avant d'être signée par l'artisane qui l'a créée.",
  },
];

function PhotoPlaceholder({ label, aspect = "aspect-[16/7]" }: { label: string; aspect?: string }) {
  return (
    <div
      className={`${aspect} w-full flex items-center justify-center relative overflow-hidden`}
      style={{ backgroundColor: "#3D1F0D" }}
    >
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.4)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

export default function SavoirFairePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        <div className="px-6 md:px-10 pt-24 max-w-7xl mx-auto">
          <BackButton />
        </div>

        {/* ── Hero pleine largeur ── */}
        <section className="pt-4">
          <PhotoPlaceholder label="Artisanes au travail — Madagascar" aspect="aspect-[16/7]" />
          <div className="bg-[#FAF7F0] text-center py-14 px-6">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Héritage & Tradition
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#3D1F0D", marginTop: "12px", lineHeight: 1.1 }}>
              Le Savoir-faire
            </h1>
          </div>
        </section>

        {/* ── L'Art du Raphia ── */}
        <section className="bg-[#FAF7F0] py-20 px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#3D1F0D" }}>
              L&apos;Art du Raphia
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1A1008", opacity: 0.75, lineHeight: 1.9 }}>
              Le raphia est l&apos;une des fibres végétales les plus nobles de Madagascar. Issu du palmier <em>Raphia farinifera</em>, il pousse naturellement dans les zones humides de l&apos;île. Sa résistance exceptionnelle et sa souplesse naturelle en font le matériau idéal pour créer des sacs à la fois solides et raffinés.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1A1008", opacity: 0.75, lineHeight: 1.9 }}>
              Chez MADAME LALA, nous travaillons exclusivement avec du raphia brut non traité, récolté de manière responsable pour préserver les écosystèmes locaux. Chaque fibre porte en elle l&apos;histoire d&apos;une île extraordinaire.
            </p>
          </div>
        </section>

        {/* ── Les Mains qui Créent ── */}
        <section className="bg-[#3D1F0D] py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <PhotoPlaceholder label="Portrait artisane — atelier" aspect="aspect-square" />
            <div className="flex flex-col gap-6">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
                Femmes & Savoir-faire
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2 }}>
                Les Mains<br />qui Créent
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A84C" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(250,247,240,0.75)", lineHeight: 1.9 }}>
                Nos sacs sont fabriqués par des artisanes de la région d&apos;Antananarivo et de la côte Est malgache. Ces femmes exceptionnelles maîtrisent des techniques de tressage héritées de leurs mères et grand-mères.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(250,247,240,0.75)", lineHeight: 1.9 }}>
                MADAME LALA s&apos;engage à les rémunérer justement, à valoriser leur nom sur chaque création, et à contribuer au développement de leurs communautés. Acheter un sac MADAME LALA, c&apos;est choisir un acte de soutien concret.
              </p>
            </div>
          </div>
        </section>

        {/* ── De la Fibre au Sac : 3 étapes ── */}
        <section className="bg-[#FAF7F0] py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 flex flex-col items-center gap-4">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
                Le processus
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#3D1F0D" }}>
                De la Fibre au Sac
              </h2>
              <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {etapes.map((etape) => (
                <div key={etape.num} className="flex flex-col gap-5">
                  <PhotoPlaceholder label={etape.title} aspect="aspect-[4/3]" />
                  <div className="flex flex-col gap-3">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>
                      {etape.num}
                    </span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#3D1F0D" }}>
                      {etape.title}
                    </h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1A1008", opacity: 0.65, lineHeight: 1.8 }}>
                      {etape.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
