import { sanityClient, isSanityConfigured } from "./client";

/* ── Types ── */
export interface SanityProduct {
  _id: string;
  nom: string;
  slug: { current: string };
  description: string;
  prix: number | null;
  stock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photos: any[];
  matieres: string;
  disponible: boolean;
}

function guardSanity() {
  if (!isSanityConfigured) throw new Error("Sanity non configuré — utilisation du fallback local");
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  guardSanity();
  return sanityClient.fetch(
    `*[_type == "produit" && disponible == true] | order(_createdAt asc) {
      _id, nom, slug, description, prix, stock, photos, matieres, disponible
    }`
  );
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  guardSanity();
  return sanityClient.fetch(
    `*[_type == "produit" && disponible == true]{ "slug": slug.current }`
  );
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  guardSanity();
  return sanityClient.fetch(
    `*[_type == "produit" && slug.current == $slug][0] {
      _id, nom, slug, description, prix, stock, photos, matieres, disponible
    }`,
    { slug }
  );
}

export async function getSuggestedProducts(excludeId: string): Promise<SanityProduct[]> {
  guardSanity();
  return sanityClient.fetch(
    `*[_type == "produit" && disponible == true && _id != $excludeId][0..1] {
      _id, nom, slug, description, prix, matieres, photos
    }`,
    { excludeId }
  );
}
