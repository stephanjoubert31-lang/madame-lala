import { defineField, defineType } from "sanity";

export const produitSchema = defineType({
  name: "produit",
  title: "Produit",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom du produit",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nom", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "prix",
      title: "Prix (€)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "stock",
      title: "Stock disponible",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "matieres",
      title: "Matières",
      type: "string",
      description: "Ex : Raphia naturel, Cuir véritable, Quincaillerie dorée",
    }),
    defineField({
      name: "disponible",
      title: "Disponible à la vente",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "mettre_en_avant",
      title: "Mettre en avant sur l'accueil",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "nom",
      subtitle: "prix",
      media: "photos.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} €` : "Prix non défini",
        media,
      };
    },
  },
});
