import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "madame-lala",
  title: "MADAME LALA — Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "REMPLACER_PAR_TON_PROJECT_ID",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",

  plugins: [
    structureTool(),
    visionTool(), // outil GROQ interactif (dev)
  ],

  schema: {
    types: schemaTypes,
  },
});
