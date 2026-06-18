"use client";

export const dynamic = "force-dynamic";

import dynamic_ from "next/dynamic";
import config from "@/sanity.config";

// Chargement côté client uniquement pour éviter les erreurs de build SSR
const NextStudio = dynamic_(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
