export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  color: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Le Baobab",
    price: 285,
    description: "Tote bag structuré en raphia naturel",
    slug: "le-baobab",
    color: "#5c3a1e",
    details: [
      "Dimensions : 35 × 30 × 12 cm",
      "Raphia naturel non teint",
      "Doublure en coton bio",
      "Anses en cuir végétal",
      "Fabriqué à Madagascar",
    ],
  },
  {
    id: 2,
    name: "La Vanille",
    price: 320,
    description: "Pochette baguette tressée à la main",
    slug: "la-vanille",
    color: "#8B6914",
    details: [
      "Dimensions : 28 × 14 × 6 cm",
      "Raphia teinté à l'indigo naturel",
      "Fermeture magnétique discrète",
      "Bandoulière amovible en cuir",
      "Fabriqué à Madagascar",
    ],
  },
  {
    id: 3,
    name: "L'Ylang",
    price: 195,
    description: "Mini sac panier en raphia teinté",
    slug: "lylang",
    color: "#3D1F0D",
    details: [
      "Dimensions : 22 × 20 × 10 cm",
      "Raphia teinté à la grenade",
      "Anse en raphia tressé",
      "Idéal pour l'été",
      "Fabriqué à Madagascar",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
