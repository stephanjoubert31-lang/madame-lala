"use client";

import Link from "next/link";
import Image from "next/image";
import { SanityProduct } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductCard({ product }: { product: SanityProduct }) {
  const href = `/collection/${product.slug.current}`;
  const photo = product.photos?.[0];
  const photoUrl = photo ? urlFor(photo).width(600).height(750).url() : undefined;

  return (
    <div className="flex flex-col group">

      {/* Photo */}
      <div className="relative">
        <Link href={href} className="block">
          <div
            className="aspect-[4/5] relative overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}
          >
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photo?.alt ?? product.nom}
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

            {/* Badge rupture */}
            {product.stock === 0 && (
              <span className="absolute top-3 left-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.2em", backgroundColor: "#c0392b", color: "#fff", padding: "3px 8px", textTransform: "uppercase" }}>
                Rupture
              </span>
            )}
            {product.stock > 0 && product.stock <= 3 && (
              <span className="absolute bottom-3 left-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", backgroundColor: "#3D1F0D", color: "#C9A84C", padding: "3px 8px", textTransform: "uppercase" }}>
                Dernières pièces
              </span>
            )}
          </div>
        </Link>

        {/* Bouton ajout rapide — visible au survol desktop, toujours visible mobile */}
        <div className="absolute bottom-0 left-0 right-0 md:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <AddToCartButton
            slug={product.slug.current}
            productName={product.nom}
            prix={product.prix}
            stock={product.stock}
            photo={photoUrl}
            style={{ width: "100%", flex: "none", fontSize: "0.7rem", padding: "0.8rem 1rem", letterSpacing: "0.2em" }}
          />
        </div>
      </div>

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
