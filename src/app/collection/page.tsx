import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { getAllProducts, SanityProduct } from "@/sanity/lib/queries";
import ProductCard from "@/components/sections/ProductCard";
import BackButton from "@/components/ui/BackButton";

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
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="mb-8">
            <BackButton href="/" label="Accueil" />
          </div>

          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Artisanat malgache
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
              La Collection
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1008", opacity: 0.6, maxWidth: "36rem", lineHeight: 1.8 }}>
              Chaque pièce est unique, fabriquée à la main par nos artisanes à Madagascar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
