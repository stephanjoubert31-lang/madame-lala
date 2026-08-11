import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, getAllProducts, SanityProduct } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/components/ui/Reveal";

const FALLBACK: SanityProduct[] = [
  { _id: "1", nom: "Le Tote Raphia",        slug: { current: "le-tote-raphia" },        prix: null, description: "Grand tote structuré, tressage serré naturel, anses en cuir végétal.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "2", nom: "Le Hobo Tressé",        slug: { current: "le-hobo-tresse" },         prix: null, description: "Silhouette souple et enveloppante, motif croisé à la main.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "3", nom: "Le Panier Structuré",   slug: { current: "le-panier-structure" },    prix: null, description: "Forme architecturale, fond rigide, raphia naturel non teint.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "4", nom: "Le Grand Panier Évasé", slug: { current: "le-grand-panier-evase" }, prix: null, description: "Silhouette évasée généreuse, idéale pour les journées d'été.", photos: [], disponible: true, stock: 0, matieres: "" },
];

async function getProducts(): Promise<SanityProduct[]> {
  try {
    const featured = await getFeaturedProducts();
    if (featured.length > 0) return featured.slice(0, 4);
    const all = await getAllProducts();
    if (all.length > 0) return all.slice(0, 4);
    return FALLBACK;
  } catch {
    return FALLBACK;
  }
}

/* Motif tressé de substitution quand un produit n'a pas encore de photo */
function WovenPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #3D1F0D 0%, #2C1005 100%)" }}>
      <svg width="140" height="140" viewBox="0 0 120 120" fill="none" className="opacity-25">
        <rect x="20" y="10" width="80" height="100" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
        {[25, 35, 45, 55, 65, 75, 85].map((y) => (
          <line key={y} x1="35" y1={y} x2="85" y2={y} stroke="#C9A84C" strokeWidth="1" />
        ))}
        {[45, 60, 75].map((x) => (
          <line key={x} x1={x} y1="10" x2={x} y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
        ))}
      </svg>
    </div>
  );
}

export default async function FeaturedCollection() {
  const products = await getProducts();

  return (
    <section className="relative py-28 px-6 md:px-10 grain" style={{ backgroundColor: "#1A1008" }}>
      <div className="max-w-7xl mx-auto relative">

        {/* ── En-tête display ── */}
        <Reveal>
          <div className="mb-20">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.5em", color: "#C9A84C", textTransform: "uppercase" }}>
              Nouveautés
            </p>
            <h2
              className="mt-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                fontWeight: 300,
                color: "#FAF7F0",
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              La <span className="text-outline">Collection</span>
            </h2>
          </div>
        </Reveal>

        {/* ── Grille immersive ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => {
            const href = `/collection/${product.slug.current}`;
            const photo = product.photos?.[0];
            return (
              <Reveal key={product._id} delay={(index % 2) * 120}>
                <Link
                  href={href}
                  className="group block relative overflow-hidden"
                  style={{ textDecoration: "none", border: "1px solid rgba(201,168,76,0.18)" }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    {photo ? (
                      <Image
                        src={urlFor(photo).width(800).height(1000).url()}
                        alt={photo.alt ?? product.nom}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <WovenPlaceholder />
                    )}
                    {/* Voile bas pour la lisibilité + éclat doré au survol */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(26,16,8,0.9) 0%, rgba(26,16,8,0.15) 45%, rgba(26,16,8,0) 70%)" }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 55%)" }}
                    />

                    {/* Numéro de pièce */}
                    <span
                      className="absolute top-5 right-6"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.8rem",
                        letterSpacing: "0.3em",
                        color: "rgba(250,247,240,0.45)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Infos en pied de carte */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                      <div>
                        <h3
                          className="transition-colors duration-300 group-hover:text-[#C9A84C]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                            fontWeight: 400,
                            color: "#FAF7F0",
                            lineHeight: 1.1,
                          }}
                        >
                          {product.nom}
                        </h3>
                        <p
                          className="mt-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.78rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(250,247,240,0.6)",
                          }}
                        >
                          {product.prix ? `${product.prix} €` : "Prix sur demande"}
                        </p>
                      </div>
                      <span
                        className="hidden md:inline-block translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.7rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#C9A84C",
                          borderBottom: "1px solid #C9A84C",
                          paddingBottom: "3px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Découvrir →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="text-center mt-20">
            <Link
              href="/collection"
              className="btn-lift hover:bg-[#C9A84C] hover:text-[#1A1008]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.78rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
                border: "1px solid #C9A84C",
                padding: "1rem 3rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Voir toute la collection
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
