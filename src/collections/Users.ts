import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Administration",
  },
  access: {
    read:   () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "contributor",
      options: [
        { label: "Admin",       value: "admin" },
        { label: "Editor",      value: "editor" },
        { label: "Contributor", value: "contributor" },
      ],
      admin: {
        description: "Admin: full access. Editor: create & edit all content. Contributor: create drafts only.",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
};
