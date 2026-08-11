"use client";

import { useEffect, useRef } from "react";

/* Curseur personnalisé : point doré + anneau qui suit avec inertie.
   Actif uniquement sur pointeur fin, désactivé si prefers-reduced-motion
   (géré aussi côté CSS). Le curseur natif reste visible. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, input, [role=button]"
      );
      ring.classList.toggle("is-active", !!interactive);
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* positionnés hors écran tant que la souris n'a pas bougé */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
