import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Sanity est considéré configuré seulement si le projectId est un vrai ID
// (alphanumérique, pas le placeholder)
export const isSanityConfigured =
  !!projectId && /^[a-z0-9-]+$/.test(projectId) && projectId !== "REMPLACER_PAR_TON_PROJECT_ID";

export const sanityClient = createClient({
  projectId: isSanityConfigured ? projectId! : "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
