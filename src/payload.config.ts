import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users }       from "./collections/Users";
import { Media }       from "./collections/Media";
import { Posts }       from "./collections/Posts";
import { Publications } from "./collections/Publications";
import { Datasets }    from "./collections/Datasets";
import {
  Tools, TeamMembers, Events, Milestones,
  Ontologies, Partners, MediaCoverage, UseCases,
} from "./collections/OtherCollections";

const filename = fileURLToPath(import.meta.url);
const dirname  = path.dirname(filename);

export default buildConfig({
  // ── Core ────────────────────────────────────────────────────────────
  secret:    process.env.PAYLOAD_SECRET ?? "development-secret-change-me",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // ── Admin panel ─────────────────────────────────────────────────────
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: `— ${process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Research Project"} Admin`,
      favicon:     "/favicon.ico",
    },
    components: {
      // You can add custom dashboard components here later
    },
  },

  // ── Collections ─────────────────────────────────────────────────────
  collections: [
    // Administration
    Users,
    Media,
    // Content
    Posts,
    TeamMembers,
    Events,
    Milestones,
    Partners,
    MediaCoverage,
    // Research
    Publications,
    Datasets,
    Tools,
    Ontologies,
    UseCases,
  ],

  // ── Default rich-text editor ─────────────────────────────────────────
  editor: lexicalEditor({}),

  // ── Database ─────────────────────────────────────────────────────────
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),

  // ── TypeScript auto-generation ────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // ── Upload ────────────────────────────────────────────────────────────
  upload: {
    limits: { fileSize: 50_000_000 }, // 50 MB
  },

  // ── CORS & CSRF ───────────────────────────────────────────────────────
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ],
});
