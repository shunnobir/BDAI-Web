import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// ─── Tools ────────────────────────────────────────────────────────────────────
export const Tools: CollectionConfig = {
  slug: "tools",
  admin: { useAsTitle: "name", group: "Research", defaultColumns: ["name", "category", "status"] },
  access: { read: () => true },
  fields: [
    { name: "name",        type: "text",     required: true },
    { name: "slug",        type: "text",     required: true, unique: true, admin: { position: "sidebar" } },
    { name: "tagline",     type: "text",     admin: { description: "One-line description shown on cards." } },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "logo",        type: "upload",   relationTo: "media" },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Knowledge Graph Tool",  value: "kg-tool" },
        { label: "NLP / Text Mining",     value: "nlp" },
        { label: "Data Integration",      value: "data-integration" },
        { label: "Visualisation",         value: "visualisation" },
        { label: "API / Library",         value: "api-library" },
        { label: "Annotation Tool",       value: "annotation" },
        { label: "Other",                 value: "other" },
      ],
    },
    { name: "githubUrl",    type: "text", label: "GitHub URL" },
    { name: "demoUrl",      type: "text", label: "Live Demo URL" },
    { name: "docsUrl",      type: "text", label: "Documentation URL" },
    { name: "pypiUrl",      type: "text", label: "PyPI URL" },
    { name: "paperUrl",     type: "text", label: "Associated Paper URL" },
    { name: "technologies", type: "array", fields: [{ name: "tech", type: "text" }], label: "Tech Stack" },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active",        value: "active" },
        { label: "Stable",        value: "stable" },
        { label: "Beta",          value: "beta" },
        { label: "Archived",      value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};

// ─── Team Members ─────────────────────────────────────────────────────────────
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: { useAsTitle: "name", group: "Content", defaultColumns: ["name", "role", "affiliation"] },
  access: { read: () => true },
  fields: [
    { name: "name",        type: "text",   required: true },
    { name: "role",        type: "text",   required: true, admin: { description: "e.g. Principal Investigator, PhD Student" } },
    { name: "affiliation", type: "text" },
    { name: "photo",       type: "upload", relationTo: "media" },
    { name: "bio",         type: "textarea" },
    { name: "email",       type: "email" },
    { name: "orcid",       type: "text",  label: "ORCID iD" },
    { name: "website",     type: "text" },
    { name: "twitter",     type: "text",  label: "Twitter / X" },
    { name: "github",      type: "text",  label: "GitHub Username" },
    { name: "linkedin",    type: "text",  label: "LinkedIn URL" },
    { name: "googleScholar", type: "text", label: "Google Scholar URL" },
    {
      name: "memberType",
      type: "select",
      options: [
        { label: "Principal Investigator", value: "pi" },
        { label: "Co-Investigator",        value: "co-pi" },
        { label: "Postdoc",                value: "postdoc" },
        { label: "PhD Student",            value: "phd" },
        { label: "Research Engineer",      value: "engineer" },
        { label: "Collaborator",           value: "collaborator" },
        { label: "Alumni",                 value: "alumni" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", defaultValue: 99, admin: { position: "sidebar", description: "Display order (lower = first)." } },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
  ],
};

// ─── Events ───────────────────────────────────────────────────────────────────
export const Events: CollectionConfig = {
  slug: "events",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "eventType", "startDate", "location"] },
  access: { read: () => true },
  fields: [
    { name: "title",       type: "text",     required: true },
    { name: "slug",        type: "text",     required: true, unique: true, admin: { position: "sidebar" } },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "coverImage",  type: "upload",   relationTo: "media" },
    {
      name: "eventType",
      type: "select",
      options: [
        { label: "Workshop",    value: "workshop" },
        { label: "Conference",  value: "conference" },
        { label: "Seminar",     value: "seminar" },
        { label: "Hackathon",   value: "hackathon" },
        { label: "Webinar",     value: "webinar" },
        { label: "Tutorial",    value: "tutorial" },
        { label: "Other",       value: "other" },
      ],
    },
    { name: "startDate",        type: "date", required: true, admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "endDate",          type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "location",         type: "text", admin: { description: "City, Country or 'Online'" } },
    { name: "venue",            type: "text" },
    { name: "registrationUrl",  type: "text" },
    { name: "recordingUrl",     type: "text" },
    { name: "slidesUrl",        type: "text" },
    { name: "speakers",         type: "relationship", relationTo: "team-members", hasMany: true },
  ],
};

// ─── Milestones ───────────────────────────────────────────────────────────────
export const Milestones: CollectionConfig = {
  slug: "milestones",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "date", "status", "workPackage"] },
  access: { read: () => true },
  fields: [
    { name: "title",       type: "text",     required: true },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "date",        type: "date",     required: true },
    { name: "workPackage", type: "text",     admin: { description: "e.g. WP1, WP2" } },
    {
      name: "status",
      type: "select",
      defaultValue: "upcoming",
      options: [
        { label: "Completed",   value: "completed" },
        { label: "In Progress", value: "in-progress" },
        { label: "Upcoming",    value: "upcoming" },
        { label: "Delayed",     value: "delayed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "deliverables", type: "array", fields: [
      { name: "label", type: "text" },
      { name: "file",  type: "upload", relationTo: "media" },
      { name: "url",   type: "text" },
    ]},
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};

// ─── Ontologies ───────────────────────────────────────────────────────────────
export const Ontologies: CollectionConfig = {
  slug: "ontologies",
  admin: { useAsTitle: "name", group: "Research" },
  access: { read: () => true },
  fields: [
    { name: "name",        type: "text", required: true },
    { name: "acronym",     type: "text" },
    { name: "namespace",   type: "text", label: "Namespace URI" },
    { name: "prefix",      type: "text", admin: { description: "e.g. foaf, schema, ex" } },
    { name: "version",     type: "text" },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "docsUrl",     type: "text", label: "Documentation URL" },
    { name: "githubUrl",   type: "text", label: "GitHub URL" },
    { name: "owlFile",     type: "upload", relationTo: "media", label: "OWL / TTL File" },
    { name: "license",     type: "text" },
    { name: "status",      type: "select", options: [
      { label: "Stable",  value: "stable" },
      { label: "Draft",   value: "draft" },
      { label: "Deprecated", value: "deprecated" },
    ], admin: { position: "sidebar" } },
  ],
};

// ─── Partners & Funders ───────────────────────────────────────────────────────
export const Partners: CollectionConfig = {
  slug: "partners",
  admin: { useAsTitle: "name", group: "Content", defaultColumns: ["name", "partnerType", "grantId"] },
  access: { read: () => true },
  fields: [
    { name: "name",        type: "text",   required: true },
    { name: "logo",        type: "upload", relationTo: "media" },
    { name: "url",         type: "text",   label: "Website URL" },
    { name: "grantId",     type: "text",   label: "Grant / Award ID" },
    { name: "grantAmount", type: "text",   label: "Grant Amount" },
    { name: "grantPeriod", type: "text",   label: "Grant Period (e.g. 2023–2026)" },
    { name: "description", type: "textarea" },
    {
      name: "partnerType",
      type: "select",
      options: [
        { label: "Funder",           value: "funder" },
        { label: "Academic Partner", value: "academic" },
        { label: "Industry Partner", value: "industry" },
        { label: "Advisory Board",   value: "advisory" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};

// ─── Media Coverage ───────────────────────────────────────────────────────────
export const MediaCoverage: CollectionConfig = {
  slug: "media-coverage",
  admin: { useAsTitle: "headline", group: "Content" },
  access: { read: () => true },
  fields: [
    { name: "headline",    type: "text", required: true },
    { name: "outlet",      type: "text", required: true, admin: { description: "e.g. BBC News, Nature, TechCrunch" } },
    { name: "url",         type: "text", required: true, label: "Article URL" },
    { name: "date",        type: "date", required: true },
    { name: "logo",        type: "upload", relationTo: "media" },
    { name: "excerpt",     type: "textarea" },
    { name: "mediaType",   type: "select", options: [
      { label: "News Article", value: "article" },
      { label: "Interview",    value: "interview" },
      { label: "Podcast",      value: "podcast" },
      { label: "Video",        value: "video" },
      { label: "Press Release",value: "press-release" },
    ], admin: { position: "sidebar" } },
  ],
};

// ─── Use Cases ────────────────────────────────────────────────────────────────
export const UseCases: CollectionConfig = {
  slug: "use-cases",
  admin: { useAsTitle: "title", group: "Research" },
  access: { read: () => true },
  fields: [
    { name: "title",       type: "text",     required: true },
    { name: "slug",        type: "text",     required: true, unique: true, admin: { position: "sidebar" } },
    { name: "summary",     type: "textarea" },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "image",       type: "upload",   relationTo: "media" },
    { name: "domain",      type: "text",     admin: { description: "e.g. Healthcare, Smart Cities, Finance" } },
    { name: "partners",    type: "relationship", relationTo: "partners", hasMany: true },
    { name: "tools",       type: "relationship", relationTo: "tools",   hasMany: true },
    { name: "datasets",    type: "relationship", relationTo: "datasets", hasMany: true },
    { name: "featured",    type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
