"use client";

import { useEffect, useState } from "react";

/* Écran de chargement : compteur 0 → 100 % avec ligne de progression,
   puis rideau qui se lève. Affiché une seule fois par session,
   sauté si prefers-reduced-motion. */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"loading" | "lifting" | "done">("loading");
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    let raf = 0;
    let liftTimeout: ReturnType<typeof setTimeout> | undefined;

    raf = requestAnimationFrame(() => {
      if (
        sessionStorage.getItem("ml-preloader-seen") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        sessionStorage.setItem("ml-preloader-seen", "1");
        setSkipped(true);
        setPhase("done");
        return;
      }
      sessionStorage.setItem("ml-preloader-seen", "1");
      document.body.style.overflow = "hidden";

      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(eased * 100));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setPhase("lifting");
          liftTimeout = setTimeout(() => {
            setPhase("done");
            document.body.style.overflow = "";
          }, 900);
        }
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (liftTimeout !== undefined) clearTimeout(liftTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done" || skipped) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#2C1005",
        transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#C9A84C",
          fontSize: "0.85rem",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
      >
        Madame Lala
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#FAF7F0",
          fontSize: "clamp(4rem, 12vw, 8rem)",
          fontWeight: 300,
          lineHeight: 1,
          marginTop: "1rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ fontSize: "0.35em", color: "#C9A84C" }}> %</span>
      </p>
      <div
        style={{
          width: "min(320px, 60vw)",
          height: "1px",
          backgroundColor: "rgba(201,168,76,0.2)",
          marginTop: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#C9A84C",
            transform: `scaleX(${count / 100})`,
            transformOrigin: "left",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "rgba(250,247,240,0.35)",
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          marginTop: "1.5rem",
        }}
      >
        Tissé main · Madagascar
      </p>
    </div>
  );
}
