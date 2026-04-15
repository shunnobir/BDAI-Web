import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: [
      "image/*",
      "application/pdf",
      "text/turtle",               // RDF Turtle
      "application/rdf+xml",       // RDF/XML
      "application/ld+json",       // JSON-LD
      "text/csv",
      "application/zip",
      "application/x-zip-compressed",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
