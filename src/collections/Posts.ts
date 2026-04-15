import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "author", "category", "status", "publishedAt"],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    {
      name: "title",
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
      name: "excerpt",
      type: "textarea",
      admin: { description: "Short summary shown in listing cards (max 200 chars)." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "team-members",
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "News",            value: "news" },
        { label: "Research Update", value: "research-update" },
        { label: "Tutorial",        value: "tutorial" },
        { label: "Opinion",         value: "opinion" },
        { label: "Event Recap",     value: "event-recap" },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft",     value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
  ],
};
