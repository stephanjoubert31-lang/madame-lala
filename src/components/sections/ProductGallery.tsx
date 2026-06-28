"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface GalleryPhoto { url: string; alt?: string; }

const VIGNETTES = ["Vue de face", "Vue de dos", "Détail tressage", "Fond & anses"];

function PlaceholderGallery({ name }: { name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/5] w-full flex items-center justify-center" style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#3D1F0D", opacity: 0.3, textTransform: "uppercase", textAlign: "center", padding: "8px" }}>
          {name} — {VIGNETTES[active]}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {VIGNETTES.map((label, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: 0, background: "none", border: `1.5px solid ${active === i ? "#C9A84C" : "transparent"}`, cursor: "pointer", outline: "none" }} aria-label={label}>
            <div className="aspect-square w-full flex items-center justify-center" style={{ backgroundColor: "#EDE8DF", border: "1px solid #D4C9B5" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.5rem", color: "#3D1F0D", opacity: 0.25, textTransform: "uppercase", textAlign: "center", padding: "4px" }}>{label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function RealGallery({ photos, name }: { photos: GalleryPhoto[]; name: string }) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => { setActive(idx); setFading(false); }, 200);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40 && active < photos.length - 1) goTo(active + 1);
    if (dx > 40 && active > 0) goTo(active - 1);
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/5] relative overflow-hidden" style={{ backgroundColor: "#EDE8DF" }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Image key={active} src={photos[active].url} alt={photos[active].alt ?? name}
          fill className="object-cover" priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.2s ease" }} />
        {photos.length > 1 && (
          <>
            {active > 0 && (
              <button onClick={() => goTo(active - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden"
                style={{ background: "rgba(250,247,240,0.85)", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", color: "#3D1F0D", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            )}
            {active < photos.length - 1 && (
              <button onClick={() => goTo(active + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 md:hidden"
                style={{ background: "rgba(250,247,240,0.85)", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", color: "#3D1F0D", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            )}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
              {photos.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i === active ? "#C9A84C" : "rgba(250,247,240,0.7)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="hidden md:grid grid-cols-4 gap-3">
          {photos.slice(0, 8).map((photo, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ padding: 0, background: "none", border: `1.5px solid ${active === i ? "#C9A84C" : "transparent"}`, cursor: "pointer", outline: "none", transition: "border-color 0.2s" }}>
              <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#EDE8DF" }}>
                <Image src={photo.url} alt={photo.alt ?? `${name} ${i + 1}`} fill className="object-cover"
                  style={{ opacity: active === i ? 1 : 0.6, transition: "opacity 0.2s" }} sizes="15vw" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductGallery({ name }: { name: string }) {
  return <PlaceholderGallery name={name} />;
}
