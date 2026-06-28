"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCart().length);
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  return count;
}
