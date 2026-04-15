import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    group: "Research",
    defaultColumns: ["title", "year", "type", "status"],
  },
  access: { read: () => true },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "authors",
      type: "array",
      required: true,
      fields: [
        { name: "name",  type: "text", required: true },
        { name: "orcid", type: "text" },
        {
          name: "isTeamMember",
          type: "relationship",
          relationTo: "team-members",
          admin: { description: "Link to team member profile if applicable." },
        },
      ],
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Journal Article",      value: "journal" },
        { label: "Conference Paper",     value: "conference" },
        { label: "Book Chapter",         value: "book-chapter" },
        { label: "Workshop Paper",       value: "workshop" },
        { label: "Preprint",             value: "preprint" },
        { label: "Technical Report",     value: "report" },
        { label: "Thesis / Dissertation",value: "thesis" },
        { label: "Dataset Paper",        value: "dataset-paper" },
      ],
    },
    {
      name: "venue",
      type: "text",
      admin: { description: "Journal name, conference name, or book title." },
    },
    {
      name: "doi",
      type: "text",
      label: "DOI",
      admin: { description: "e.g. 10.1234/example" },
    },
    {
      name: "abstract",
      type: "richText",
      editor: lexicalEditor({}),
    },
    {
      name: "keywords",
      type: "array",
      fields: [{ name: "keyword", type: "text" }],
    },
    {
      name: "pdf",
      type: "upload",
      relationTo: "media",
      label: "PDF Upload",
    },
    {
      name: "zenodoUrl",
      type: "text",
      label: "Zenodo URL",
    },
    {
      name: "arxivUrl",
      type: "text",
      label: "arXiv URL",
    },
    {
      name: "openAccessUrl",
      type: "text",
      label: "Open Access URL",
    },
    {
      name: "bibtex",
      type: "code",
      label: "BibTeX",
      admin: { language: "plaintext" },
    },
    {
      name: "relatedDatasets",
      type: "relationship",
      relationTo: "datasets",
      hasMany: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on homepage highlights.",
      },
    },
  ],
};
