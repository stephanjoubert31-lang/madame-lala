"use client";

import { useState } from "react";

function PlaceholderImage({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}
    >
      {label && (
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#3D1F0D", opacity: 0.3, textTransform: "uppercase", textAlign: "center", padding: "8px" }}>
          {label}
        </p>
      )}
    </div>
  );
}

const VIGNETTES = ["Vue de face", "Vue de dos", "Détail tressage", "Fond & anses"];

export default function ProductGallery({ name }: { name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Photo principale */}
      <PlaceholderImage
        label={`${name} — ${VIGNETTES[active]}`}
        className="aspect-[4/5] w-full"
      />

      {/* Vignettes */}
      <div className="grid grid-cols-4 gap-3">
        {VIGNETTES.map((label, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative overflow-hidden"
            style={{
              padding: 0,
              background: "none",
              border: `1.5px solid ${active === i ? "#C9A84C" : "transparent"}`,
              cursor: "pointer",
              outline: "none",
            }}
            aria-label={label}
          >
            <PlaceholderImage
              label={label}
              className="aspect-square w-full"
            />
            {/* Overlay actif */}
            {active === i && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(201,168,76,0.06)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
