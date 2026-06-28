import Link from "next/link";
import { getFeaturedProducts, getAllProducts, SanityProduct } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const FALLBACK: SanityProduct[] = [
  { _id: "1", nom: "Le Tote Raphia",        slug: { current: "le-tote-raphia" },        prix: null, description: "Grand tote structuré, tressage serré naturel, anses en cuir végétal.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "2", nom: "Le Hobo Tressé",        slug: { current: "le-hobo-tresse" },         prix: null, description: "Silhouette souple et enveloppante, motif croisé à la main.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "3", nom: "Le Panier Structuré",   slug: { current: "le-panier-structure" },    prix: null, description: "Forme architecturale, fond rigide, raphia naturel non teint.", photos: [], disponible: true, stock: 0, matieres: "" },
  { _id: "4", nom: "Le Grand Panier Évasé", slug: { current: "le-grand-panier-evase" }, prix: null, description: "Silhouette évasée généreuse, idéale pour les journées d'été.", photos: [], disponible: true, stock: 0, matieres: "" },
];

async function getProducts(): Promise<SanityProduct[]> {
  try {
    // Priorité : produits mis en avant
    const featured = await getFeaturedProducts();
    if (featured.length > 0) return featured.slice(0, 4);
    // Fallback : tous les produits
    const all = await getAllProducts();
    if (all.length > 0) return all.slice(0, 4);
    return FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function FeaturedCollection() {
  const products = await getProducts();

  return (
    <section className="py-24 px-6 md:px-10 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.5em", color: "#C9A84C", textTransform: "uppercase" }}>
            Nouveautés
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
            La Collection
          </h2>
          <div style={{ width: "64px", height: "1px", backgroundColor: "#C9A84C" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {products.map((product) => {
            const href = `/collection/${product.slug.current}`;
            const photo = product.photos?.[0];
            return (
              <Link key={product._id} href={href} className="group flex flex-col gap-4" style={{ textDecoration: "none" }}>
                <div className="aspect-[3/4] overflow-hidden relative" style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}>
                  {photo ? (
                    <Image
                      src={urlFor(photo).width(600).height(800).url()}
                      alt={photo.alt ?? product.nom}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-20">
                        <rect x="20" y="10" width="80" height="100" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                        {[25, 35, 45, 55, 65, 75, 85].map((y) => (
                          <line key={y} x1="35" y1={y} x2="85" y2={y} stroke="#C9A84C" strokeWidth="1" />
                        ))}
                        {[45, 60, 75].map((x) => (
                          <line key={x} x1={x} y1="10" x2={x} y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                        ))}
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#3D1F0D]/0 group-hover:bg-[#3D1F0D]/5 transition-colors duration-500" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#1A1008", letterSpacing: "0.04em" }} className="group-hover:text-[#C9A84C] transition-colors duration-300">
                    {product.nom}
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1A1008", opacity: 0.6, lineHeight: 1.7 }}>
                    {product.description}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3D1F0D", marginTop: "6px" }}>
                    {product.prix ? `${product.prix} €` : "Prix sur demande"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/collection"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3D1F0D", border: "1px solid #3D1F0D", padding: "1rem 3rem", textDecoration: "none", display: "inline-block" }}
            className="hover:bg-[#3D1F0D] hover:text-[#FAF7F0] transition-all duration-300"
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
