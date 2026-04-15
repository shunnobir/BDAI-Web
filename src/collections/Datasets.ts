import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Datasets: CollectionConfig = {
  slug: "datasets",
  admin: {
    useAsTitle: "name",
    group: "Research",
    defaultColumns: ["name", "version", "license", "status"],
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: "version",
      type: "text",
      required: true,
      admin: { description: "e.g. 1.0.0" },
    },
    {
      name: "license",
      type: "select",
      options: [
        { label: "CC0 1.0",       value: "cc0" },
        { label: "CC BY 4.0",     value: "cc-by-4.0" },
        { label: "CC BY-SA 4.0",  value: "cc-by-sa-4.0" },
        { label: "CC BY-NC 4.0",  value: "cc-by-nc-4.0" },
        { label: "MIT",           value: "mit" },
        { label: "Apache 2.0",    value: "apache-2.0" },
        { label: "Custom",        value: "custom" },
      ],
    },
    {
      name: "formats",
      type: "select",
      options: [
        { label: "RDF/Turtle (.ttl)", value: "ttl" },
        { label: "RDF/XML (.rdf)",    value: "rdf" },
        { label: "JSON-LD (.jsonld)", value: "jsonld" },
        { label: "N-Triples (.nt)",   value: "nt" },
        { label: "CSV (.csv)",        value: "csv" },
        { label: "TSV (.tsv)",        value: "tsv" },
        { label: "Parquet",           value: "parquet" },
        { label: "ZIP Archive",       value: "zip" },
      ],
    },
    {
      name: "stats",
      type: "group",
      label: "Dataset Statistics",
      fields: [
        { name: "triples",   type: "number", label: "Number of Triples" },
        { name: "entities",  type: "number", label: "Number of Entities" },
        { name: "classes",   type: "number", label: "Number of Classes" },
        { name: "size",      type: "text",   label: "File Size (e.g. 1.2 GB)" },
      ],
    },
    {
      name: "doi",
      type: "text",
      label: "DOI",
    },
    {
      name: "zenodoUrl",
      type: "text",
      label: "Zenodo URL",
    },
    {
      name: "huggingfaceUrl",
      type: "text",
      label: "HuggingFace URL",
    },
    {
      name: "githubUrl",
      type: "text",
      label: "GitHub URL",
    },
    {
      name: "sparqlEndpoint",
      type: "text",
      label: "SPARQL Endpoint Path",
      admin: { description: "The Fuseki dataset name to query, e.g. 'research'." },
    },
    {
      name: "files",
      type: "array",
      label: "Direct Downloads",
      fields: [
        { name: "label",       type: "text" },
        { name: "file",        type: "upload", relationTo: "media" },
        { name: "format",      type: "text",   admin: { description: "e.g. Turtle, CSV" } },
        { name: "description", type: "text" },
      ],
    },
    {
      name: "relatedPublications",
      type: "relationship",
      relationTo: "publications",
      hasMany: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published",  value: "published" },
        { label: "Draft",      value: "draft" },
        { label: "Deprecated", value: "deprecated" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
