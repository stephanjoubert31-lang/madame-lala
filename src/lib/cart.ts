export interface CartItem {
  slug: string;
  nom: string;
  prix: number | null;
  photo?: string;
}

const KEY = "madamelala_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const exists = cart.find((c) => c.slug === item.slug);
  if (!exists) cart.push(item);
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function removeFromCart(slug: string) {
  const cart = getCart().filter((c) => c.slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(KEY);
}
