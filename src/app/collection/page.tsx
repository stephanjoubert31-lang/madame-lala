import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, SanityProduct } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/* Fallback data (utilisé si Sanity pas encore configuré) */
const FALLBACK_PRODUCTS = [
  { _id: "1", nom: "Le Tote Raphia",         slug: { current: "le-tote-raphia" },          prix: null, description: "Grand tote structuré, tressage serré naturel, anses en cuir végétal.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "2", nom: "Le Hobo Tressé",          slug: { current: "le-hobo-tresse" },           prix: null, description: "Silhouette souple et enveloppante, motif croisé à la main.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "3", nom: "Le Panier Structuré",     slug: { current: "le-panier-structure" },      prix: null, description: "Forme architecturale, fond rigide, raphia naturel non teint.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "4", nom: "Le Grand Panier Évasé",  slug: { current: "le-grand-panier-evase" },   prix: null, description: "Silhouette évasée généreuse, idéale pour les journées d'été.", photos: [], disponible: true, stock: 0, matieres: "" },
] as SanityProduct[];

async function getProducts(): Promise<SanityProduct[]> {
  try {
    const products = await getAllProducts();
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

function ProductCard({ product }: { product: SanityProduct }) {
  const href = `/collection/${product.slug.current}`;
  const photo = product.photos?.[0];

  return (
    <div className="flex flex-col group">

      {/* Photo — cliquable */}
      <Link href={href} className="block">
        <div
          className="aspect-[4/5] relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}
        >
          {photo ? (
            <Image
              src={urlFor(photo).width(600).height(750).url()}
              alt={photo.alt ?? product.nom}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 11 + 4} x2="80" y2={i * 11 + 4} stroke="#3D1F0D" strokeWidth="6" />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 11 + 4} y1="0" x2={i * 11 + 4} y2="80" stroke="#3D1F0D" strokeWidth="3" />
              ))}
            </svg>
          )}
          <div className="absolute inset-0 bg-[#3D1F0D]/0 group-hover:bg-[#3D1F0D]/5 transition-colors duration-500" />
          {/* Badge stock bas */}
          {product.stock > 0 && product.stock <= 3 && (
            <span
              className="absolute bottom-3 left-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", backgroundColor: "#3D1F0D", color: "#C9A84C", padding: "3px 8px", textTransform: "uppercase" }}
            >
              Dernières pièces
            </span>
          )}
        </div>
      </Link>

      {/* Infos */}
      <div className="mt-5 flex flex-col gap-2">
        <Link href={href} style={{ textDecoration: "none" }}>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#1A1008", letterSpacing: "0.04em" }}
            className="group-hover:text-[#C9A84C] transition-colors duration-300"
          >
            {product.nom}
          </h2>
        </Link>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1A1008", opacity: 0.6, lineHeight: 1.7 }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#3D1F0D", fontWeight: 500 }}>
            {product.prix ? `${product.prix} €` : "Prix sur demande"}
          </span>
          <Link
            href={href}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3D1F0D", borderBottom: "1px solid #C9A84C", paddingBottom: "2px", textDecoration: "none" }}
          >
            Découvrir
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

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
