import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug, getSuggestedProducts, getAllProductSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getProduct, getSuggested, products as localProducts } from "@/data/products";
import ProductGallery from "@/components/sections/ProductGallery";

/* ── Génère les slugs statiques ──
   Toujours inclure les 4 slugs locaux comme base garantie,
   plus tout slug Sanity supplémentaire éventuel.
─────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  // Slugs locaux — toujours présents (base garantie)
  const localSlugs = new Set(localProducts.map((p) => p.slug));

  try {
    const sanitySlugs = await getAllProductSlugs();
    sanitySlugs.forEach((s) => localSlugs.add(s.slug));
  } catch { /* Sanity inaccessible au build — slugs locaux suffisent */ }

  return Array.from(localSlugs).map((slug) => ({ slug }));
}

/* ── Signature baobab ── */
function BaobabSignature() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
      <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, #C9A84C, rgba(201,168,76,0.2))" }} />
      <svg viewBox="0 0 100 120" width="16" height="19" fill="#C9A84C">
        <path d="M38 110 Q35 80 30 60 Q25 40 35 30 Q50 22 65 30 Q75 40 70 60 Q65 80 62 110 Z" />
        <line x1="50" y1="30" x2="20" y2="10" stroke="#C9A84C" strokeWidth="3" />
        <line x1="50" y1="30" x2="80" y2="10" stroke="#C9A84C" strokeWidth="3" />
        <line x1="50" y1="30" x2="50" y2="5"  stroke="#C9A84C" strokeWidth="3" />
        <line x1="50" y1="30" x2="15" y2="25" stroke="#C9A84C" strokeWidth="2" />
        <line x1="50" y1="30" x2="85" y2="25" stroke="#C9A84C" strokeWidth="2" />
        <line x1="20" y1="10" x2="10" y2="3"  stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="25" y2="2"  stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="80" y1="10" x2="75" y2="2"  stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="80" y1="10" x2="90" y2="3"  stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="50" y1="5"  x2="44" y2="0"  stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="50" y1="5"  x2="56" y2="0"  stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
      <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, #C9A84C, rgba(201,168,76,0.2))" }} />
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // ── 1. PRIORITÉ SANITY ──────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sanityProduct: Awaited<ReturnType<typeof getProductBySlug>> = null;
  try {
    sanityProduct = await getProductBySlug(slug);
  } catch {
    // Sanity inaccessible → on continue avec les données locales
  }

  // ── 2. DONNÉES RÉSOLUES (Sanity prime, local en fallback) ───
  let nom: string;
  let description: string;
  let prix: number | null;
  let stock: number;
  let matieres: string;
  let disponible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let photos: any[];
  let suggestedItems: { nom: string; slug: string; photos?: any[] }[];

  if (sanityProduct) {
    // ✅ Données Sanity — priorité absolue
    nom        = sanityProduct.nom;
    description = sanityProduct.description;
    prix       = sanityProduct.prix;
    stock      = sanityProduct.stock;
    photos     = sanityProduct.photos ?? [];
    matieres   = sanityProduct.matieres ?? "";
    disponible = sanityProduct.disponible;

    let sugg: Awaited<ReturnType<typeof getSuggestedProducts>> = [];
    try { sugg = await getSuggestedProducts(sanityProduct._id); } catch { /* ignore */ }
    suggestedItems = sugg.map((s) => ({ nom: s.nom, slug: s.slug.current, photos: s.photos }));

  } else {
    // ⚠️ Fallback données locales (Sanity vide ou inaccessible)
    const local = getProduct(slug);
    if (!local) notFound();
    nom        = local.name;
    description = local.description;
    prix       = null;
    stock      = 0;
    photos     = [];
    matieres   = local.matieres.join(", ");
    disponible = true;
    suggestedItems = getSuggested(slug).map((s) => ({ nom: s.name, slug: s.slug }));
  }

  if (!disponible) notFound();

  // Données locales complémentaires (détails, dimensions, tagline)
  // utilisées même quand Sanity est la source principale
  const localData = getProduct(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0]">
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">

          {/* ← Retour */}
          <div className="mb-8">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3D1F0D", textDecoration: "none" }}
            >
              <span style={{ fontSize: "1rem" }}>←</span>
              Retour à la collection
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── Galerie ── */}
            {photos.length > 0 ? (
              <div className="flex flex-col gap-4">
                {/* Photo principale */}
                <div className="aspect-[4/5] relative overflow-hidden" style={{ backgroundColor: "#EDE8DF" }}>
                  <Image
                    src={urlFor(photos[0]).width(800).height(1000).url()}
                    alt={photos[0].alt ?? nom}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Vignettes */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {photos.slice(0, 4).map((photo, i) => (
                      <div key={i} className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}>
                        <Image
                          src={urlFor(photo).width(200).height(200).url()}
                          alt={photo.alt ?? `${nom} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <ProductGallery name={nom} />
            )}

            {/* ── Infos produit ── */}
            <div className="flex flex-col">

              {/* Fil d'Ariane */}
              <nav className="flex gap-2 mb-6" aria-label="Fil d'ariane">
                <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#3D1F0D", opacity: 0.5, textDecoration: "none", textTransform: "uppercase" }}>Accueil</Link>
                <span style={{ color: "#C9A84C", opacity: 0.5 }}>·</span>
                <Link href="/collection" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#3D1F0D", opacity: 0.5, textDecoration: "none", textTransform: "uppercase" }}>Collection</Link>
                <span style={{ color: "#C9A84C", opacity: 0.5 }}>·</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#3D1F0D", textTransform: "uppercase" }}>{nom}</span>
              </nav>

              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#3D1F0D", letterSpacing: "0.05em", lineHeight: 1.2 }}>
                {nom}
              </h1>

              <BaobabSignature />

              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.35em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "4px" }}>
                Made in Madagascar
              </p>

              {localData && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#3D1F0D", opacity: 0.65, marginTop: "8px" }}>
                  {localData.tagline}
                </p>
              )}

              {/* Prix + stock */}
              <div className="flex items-center gap-4 mt-5">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#3D1F0D", fontWeight: 500, letterSpacing: "0.05em" }}>
                  {prix ? `${prix} €` : "Prix sur demande"}
                </p>
                {stock > 0 && stock <= 3 && (
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C9A84C", border: "1px solid #C9A84C", padding: "3px 8px", textTransform: "uppercase" }}>
                    Dernières pièces — {stock} disponible{stock > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div style={{ width: "100%", height: "1px", backgroundColor: "#3D1F0D", opacity: 0.1, margin: "20px 0" }} />

              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#1A1008", opacity: 0.75, lineHeight: 1.9 }}>
                {description}
              </p>

              {/* Détails locaux */}
              {localData && (
                <div style={{ marginTop: "24px" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#3D1F0D", textTransform: "uppercase", marginBottom: "10px" }}>Détails</p>
                  <ul className="flex flex-col gap-2">
                    {localData.details.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <span style={{ color: "#C9A84C", lineHeight: 1.6, fontSize: "0.7rem" }}>—</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1A1008", opacity: 0.7, lineHeight: 1.6 }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Matières */}
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#3D1F0D", textTransform: "uppercase", marginBottom: "10px" }}>Matières</p>
                <div className="flex flex-wrap gap-2">
                  {matieres.split(",").map((m) => m.trim()).filter(Boolean).map((m) => (
                    <span key={m} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.1em", color: "#3D1F0D", border: "1px solid rgba(61,31,13,0.2)", padding: "4px 12px" }}>{m}</span>
                  ))}
                </div>
              </div>

              {localData && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "#1A1008", opacity: 0.5, marginTop: "16px", letterSpacing: "0.05em" }}>
                  Dimensions : {localData.dimensions}
                </p>
              )}

              <div style={{ width: "100%", height: "1px", backgroundColor: "#3D1F0D", opacity: 0.1, margin: "28px 0" }} />

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "#3D1F0D", color: "#FAF7F0", padding: "1rem 2rem", border: "none", cursor: "pointer", flex: 1 }}
                  className="hover:bg-[#5c2e12] transition-colors duration-300"
                >
                  Ajouter au panier
                </button>
                <Link
                  href="/contact"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", backgroundColor: "transparent", color: "#3D1F0D", padding: "1rem 2rem", border: "1px solid #C9A84C", textDecoration: "none", textAlign: "center", flex: 1 }}
                  className="hover:bg-[#C9A84C]/10 transition-colors duration-300"
                >
                  Contacter pour cette pièce
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vous aimerez aussi */}
        <section className="border-t border-[#3D1F0D]/10 py-20 px-6 md:px-10 bg-[#FAF7F0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center gap-4">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>À découvrir</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#3D1F0D" }}>Vous aimerez aussi</h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A84C" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {suggestedItems.map((s) => (
                <Link key={s.slug} href={`/collection/${s.slug}`} style={{ textDecoration: "none" }} className="group flex flex-col gap-4">
                  <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}>
                    {s.photos?.[0] ? (
                      <Image src={urlFor(s.photos[0]).width(400).height(500).url()} alt={s.nom} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    ) : null}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400, color: "#1A1008", letterSpacing: "0.04em" }} className="group-hover:text-[#C9A84C] transition-colors duration-300">{s.nom}</h3>
                  <span style={{ display: "inline-block", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3D1F0D", borderBottom: "1px solid #C9A84C", paddingBottom: "1px" }}>Découvrir</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
