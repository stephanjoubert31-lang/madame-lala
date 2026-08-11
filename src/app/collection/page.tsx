import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllProducts, SanityProduct } from "@/sanity/lib/queries";
import ProductCard from "@/components/sections/ProductCard";
import BackButton from "@/components/ui/BackButton";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import Cursor from "@/components/ui/Cursor";

/* Fallback data (utilisé si Sanity pas encore configuré) */
const FALLBACK_PRODUCTS: SanityProduct[] = [
  { _id: "1", nom: "Le Tote Raphia",        slug: { current: "le-tote-raphia" },         prix: null, description: "Grand tote structuré, tressage serré naturel, anses en cuir végétal.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "2", nom: "Le Hobo Tressé",        slug: { current: "le-hobo-tresse" },          prix: null, description: "Silhouette souple et enveloppante, motif croisé à la main.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "3", nom: "Le Panier Structuré",   slug: { current: "le-panier-structure" },     prix: null, description: "Forme architecturale, fond rigide, raphia naturel non teint.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "4", nom: "Le Grand Panier Évasé", slug: { current: "le-grand-panier-evase" },  prix: null, description: "Silhouette évasée généreuse, idéale pour les journées d'été.", photos: [], disponible: true, stock: 0, matieres: "" },
];

async function getProducts(): Promise<SanityProduct[]> {
  try {
    const products = await getAllProducts();
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <>
      <Cursor />
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0]">

        {/* ── Bandeau immersif d'en-tête ── */}
        <section
          className="relative pt-36 pb-14 px-6 md:px-10 grain overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 130%, #5C2E0E 0%, #2C1005 70%)" }}
        >
          <div className="max-w-6xl mx-auto relative">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.5em", color: "#C9A84C", textTransform: "uppercase" }}>
              Artisanat malgache
            </p>
            <h1
              className="mt-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                fontWeight: 300,
                color: "#FAF7F0",
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              La <span className="text-outline">Collection</span>
            </h1>
            <p
              className="mt-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(250,247,240,0.65)", maxWidth: "36rem", lineHeight: 1.8 }}
            >
              Chaque pièce est unique, fabriquée à la main par nos artisanes à Madagascar.
            </p>
          </div>
          <div
            className="mt-12"
            style={{ borderTop: "1px solid rgba(201,168,76,0.18)", paddingTop: "0.9rem" }}
          >
            <Marquee
              dark
              items={["Pièces uniques", "Tissé main", "Raphia naturel", "Madagascar", "Éditions limitées"]}
            />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-24">
          <div className="mb-10">
            <BackButton href="/" label="Accueil" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {products.map((product, index) => (
              <Reveal key={product._id} delay={(index % 2) * 120}>
                <ProductCard product={product} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
