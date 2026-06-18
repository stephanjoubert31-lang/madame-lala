export interface Product {
  slug: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  details: string[];
  matieres: string[];
  dimensions: string;
}

export const products: Product[] = [
  {
    slug: "le-tote-raphia",
    name: "Le Tote Raphia",
    price: "Prix sur demande",
    tagline: "Le quotidien réinventé en raphia naturel",
    description:
      "Le Tote Raphia incarne l'élégance fonctionnelle. Son tressage serré en raphia naturel non teint lui confère une solidité remarquable, tandis que sa silhouette généreuse et droite s'adapte à toutes les occasions — du marché au déjeuner en ville. Les anses en cuir véritable teinté brun sont cousues à la main et renforcées aux points de traction. L'intérieur en lin naturel est doté d'une poche zippée. Chaque exemplaire est tissé par une seule artisane, dont le nom figure sur l'étiquette intérieure.",
    details: [
      "Tressage serré double armure",
      "Anses cuir végétal 38 cm",
      "Intérieur lin naturel, 1 poche zippée",
      "Fermeture magnétique dorée",
      "Numéroté et signé par l'artisane",
    ],
    matieres: ["Raphia naturel non teint", "Cuir véritable brun", "Quincaillerie dorée"],
    dimensions: "40 × 32 × 14 cm",
  },
  {
    slug: "le-hobo-tresse",
    name: "Le Hobo Tressé",
    price: "Prix sur demande",
    tagline: "La souplesse du raphia, la grâce d'un hobo",
    description:
      "Le Hobo Tressé joue sur la tension entre la rigidité naturelle du raphia et la souplesse de sa silhouette tombante. Son motif croisé à la main — alternance de points serrés et de jours aérés — lui donne une texture unique qui change selon la lumière. La longue bandoulière en cuir tressé permet de le porter en main, à l'épaule ou en bandoulière. Un sac qui épouse le corps et se fait oublier.",
    details: [
      "Tressage croisé à points aérés",
      "Bandoulière cuir tressé réglable 60–120 cm",
      "Intérieur suédine ivoire, 2 poches plates",
      "Zip principal dissimulé",
      "Fermoir coulissant doré",
    ],
    matieres: ["Raphia naturel sélectionné", "Cuir pleine fleur", "Quincaillerie dorée"],
    dimensions: "36 × 28 × 10 cm",
  },
  {
    slug: "le-panier-structure",
    name: "Le Panier Structuré",
    price: "Prix sur demande",
    tagline: "L'architecture du raphia dans toute sa pureté",
    description:
      "Le Panier Structuré est la pièce signature de la maison. Son fond rigide en bois laqué lui donne une assise parfaite ; ses parois en raphia naturel non teint maintiennent leur forme tout en respirant librement. La construction en spirale concentrique — technique ancienne des vannières malgaches — garantit une résistance exceptionnelle. Un objet à part entière, autant sculpture que sac.",
    details: [
      "Construction en spirale concentrique",
      "Fond en bois laqué mat naturel",
      "Poignées courtes en cuir doublé",
      "Intérieur coton écru, 1 poche",
      "Ouverture large sans fermeture",
    ],
    matieres: ["Raphia naturel brut", "Bois laqué naturel", "Cuir véritable", "Quincaillerie dorée"],
    dimensions: "30 × 22 × 18 cm",
  },
  {
    slug: "le-grand-panier-evase",
    name: "Le Grand Panier Évasé",
    price: "Prix sur demande",
    tagline: "L'été malgache porté en silhouette",
    description:
      "Le Grand Panier Évasé est une ode à la légèreté. Sa forme généreuse qui s'évase vers le haut est obtenue par un tressage progressivement desserré, qui laisse passer la lumière et crée un effet de dentelle végétale. Idéal pour la plage, le marché ou les journées sans contrainte. Malgré sa taille généreuse, il reste étonnamment léger. Les tresses de raphia coloré qui soulignent le bord supérieur sont teintes avec des pigments naturels de Madagascar.",
    details: [
      "Tressage progressif desserré effet dentelle",
      "Finition bord tressé en raphia teinté naturel",
      "Anses plates en cuir naturel 28 cm",
      "Intérieur pochon en coton coulissant",
      "Fond renforcé anti-déformation",
    ],
    matieres: ["Raphia naturel et teinté végétal", "Cuir naturel", "Coton bio"],
    dimensions: "50 × 38 × 20 cm",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getSuggested(slug: string): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, 2);
}
