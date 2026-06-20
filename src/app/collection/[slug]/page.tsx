import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductActions from "@/components/ui/ProductActions";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF7F0] pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Visual */}
          <div
            className="aspect-[3/4] relative"
            style={{
              background: `linear-gradient(135deg, ${product.color}33 0%, ${product.color}66 100%)`,
              border: `1px solid ${product.color}30`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="160" height="160" viewBox="0 0 120 120" fill="none" className="opacity-20">
                <rect x="20" y="10" width="80" height="100" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                {[25, 35, 45, 55, 65, 75, 85].map((y) => (
                  <line key={y} x1="35" y1={y} x2="85" y2={y} stroke="#C9A84C" strokeWidth="1" />
                ))}
                {[45, 60, 75].map((x) => (
                  <line key={x} x1={x} y1="10" x2={x} y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" />
                ))}
              </svg>
            </div>
            <span
              className="absolute top-4 left-4 bg-[#C9A84C] text-[#1A1008] text-xs px-3 py-1 tracking-wider"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Nouveau
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 pt-4 md:pt-10">
            <p
              className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Collection
            </p>
            <h1
              className="text-[#1A1008] text-4xl md:text-5xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.name}
            </h1>
            <p
              className="text-[#1A1008]/60 text-lg font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.description}
            </p>
            <div className="w-12 h-px bg-[#C9A84C]" />
            <p
              className="text-[#3D1F0D] text-3xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.price} €
            </p>

            {/* Details */}
            <ul className="flex flex-col gap-2 mt-2">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="text-[#1A1008]/70 text-sm tracking-wide flex items-start gap-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="text-[#C9A84C] mt-[2px]">—</span>
                  {detail}
                </li>
              ))}
            </ul>

            <ProductActions product={product} />

            <p
              className="text-[#1A1008]/40 text-xs tracking-wider mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Livraison offerte dès 200 € · Retours sous 14 jours
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
