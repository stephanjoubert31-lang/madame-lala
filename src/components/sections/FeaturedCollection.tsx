import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Le Baobab",
    price: 285,
    description: "Tote bag structuré en raphia naturel",
    slug: "le-baobab",
    color: "#5c3a1e",
  },
  {
    id: 2,
    name: "La Vanille",
    price: 320,
    description: "Pochette baguette tressée à la main",
    slug: "la-vanille",
    color: "#8B6914",
  },
  {
    id: 3,
    name: "L'Ylang",
    price: 195,
    description: "Mini sac panier en raphia teinté",
    slug: "lylang",
    color: "#3D1F0D",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <p
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Nouveautés
          </p>
          <h2
            className="text-[#3D1F0D] text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            La Collection
          </h2>
          <div className="w-16 h-px bg-[#C9A84C]" />
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collection/${product.slug}`}
              className="group flex flex-col gap-4"
            >
              {/* Image placeholder */}
              <div
                className="aspect-[3/4] overflow-hidden relative"
                style={{ backgroundColor: product.color + "22", border: `1px solid ${product.color}20` }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: product.color + "15" }}
                >
                  {/* Raphia texture SVG placeholder */}
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="opacity-30"
                  >
                    <rect x="20" y="10" width="80" height="100" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                    <line x1="35" y1="25" x2="85" y2="25" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="35" x2="85" y2="35" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="45" x2="85" y2="45" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="55" x2="85" y2="55" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="65" x2="85" y2="65" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="75" x2="85" y2="75" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="35" y1="85" x2="85" y2="85" stroke="#C9A84C" strokeWidth="1" />
                    <line x1="45" y1="10" x2="45" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="60" y1="10" x2="60" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="75" y1="10" x2="75" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-[#3D1F0D]/0 group-hover:bg-[#3D1F0D]/5 transition-colors duration-500" />
                {/* Tag */}
                <span
                  className="absolute top-4 left-4 bg-[#C9A84C] text-[#1A1008] text-xs px-3 py-1 tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Nouveau
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <h3
                  className="text-[#1A1008] text-xl font-light tracking-wider group-hover:text-[#C9A84C] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[#1A1008]/60 text-sm tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.description}
                </p>
                <p
                  className="text-[#3D1F0D] text-lg font-medium mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.price} €
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/collection"
            className="inline-block px-12 py-4 border border-[#3D1F0D] text-[#3D1F0D] text-sm tracking-[0.3em] uppercase hover:bg-[#3D1F0D] hover:text-[#FAF7F0] transition-all duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
