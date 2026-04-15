# Research Project Website

A full-stack academic research project website built with **Next.js 15**, **Payload CMS v3**, **PostgreSQL**, and **Apache Jena Fuseki**.

---

## 🗂️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) |
| CMS & Admin | Payload CMS v3 (lives inside Next.js) |
| Database | PostgreSQL 16 |
| Triplestore | Apache Jena Fuseki (Docker) |
| Styling | Tailwind CSS + shadcn/ui |
| Deployment (now) | Vercel + your server for Fuseki/Postgres |
| Deployment (later) | Full self-hosted Docker Compose |

---

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 20+
- Docker & Docker Compose
- VS Code (recommended extensions below)

### 2. Clone & install

```bash
git clone <your-repo-url>
cd research-project
npm install
```

### 3. Environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 4. Start Docker services (PostgreSQL + Fuseki)

```bash
docker compose up -d

# Verify they're running:
docker compose ps

# Fuseki UI (local only): http://localhost:3030
# Postgres port: 5432
```

### 5. Run the dev server

```bash
npm run dev
```

- **Website:** http://localhost:3000  
- **Admin panel:** http://localhost:3000/admin  
- **SPARQL proxy:** http://localhost:3000/api/sparql  

### 6. Create your first admin user

Navigate to http://localhost:3000/admin and create the first user — Payload will prompt you on first launch.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (frontend)/          # All public-facing pages
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   ├── blog/
│   │   ├── publications/
│   │   ├── datasets/
│   │   ├── tools/
│   │   ├── sparql/          # SPARQL Explorer UI
│   │   ├── team/
│   │   ├── events/
│   │   ├── timeline/
│   │   ├── contact/
│   │   └── ...more
│   ├── (payload)/admin/     # Payload CMS admin panel
│   └── api/
│       ├── sparql/          # SPARQL proxy (hides Fuseki)
│       ├── contact/         # Contact form mailer
│       └── [...payload]/    # Payload REST API
├── collections/             # Payload content type definitions
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sparql/              # SPARQL editor components
│   └── shared/              # Reusable UI
├── lib/
│   ├── payload.ts           # Server-side Payload client
│   └── fuseki.ts            # Server-side Fuseki query helpers
└── payload.config.ts        # Main Payload configuration
docker/
└── fuseki/config/           # Fuseki dataset config
docker-compose.yml           # PostgreSQL + Fuseki
```

---

## 🔐 Admin Panel

Navigate to `/admin` to access the Payload CMS admin panel.

### User Roles

| Role | Capabilities |
|---|---|
| **Admin** | Full access — manage users, all content |
| **Editor** | Create and edit all content types |
| **Contributor** | Create drafts only; cannot publish |

### Content Types (Collections)

- **Posts** — Blog posts with rich text, cover images, categories
- **Publications** — Papers with DOI, BibTeX, PDF upload, Zenodo links
- **Datasets** — Datasets with stats, formats, download links, SPARQL endpoint config
- **Tools** — Research tools with GitHub, demo, docs links
- **Team Members** — Profiles with ORCID, social links, roles
- **Events** — Workshops, conferences, webinars with registration links
- **Milestones** — Project timeline with work packages and status
- **Ontologies** — Vocabulary/ontology documentation with OWL file upload
- **Partners** — Funders and partners with grant IDs and logos
- **Media Coverage** — Press and news mentions
- **Use Cases** — Impact stories linking tools, datasets, partners

---

## 🔗 SPARQL Endpoint

### Public endpoint (read-only proxy)
```
POST https://yoursite.com/api/sparql
Content-Type: application/json

{ "query": "SELECT * WHERE { ?s ?p ?o } LIMIT 10" }
```

### Direct Fuseki endpoint (internal only — never expose publicly)
```
http://localhost:3030/research/sparql
```

The Next.js proxy at `/api/sparql`:
- Blocks all write operations (INSERT, DELETE, DROP, etc.)
- Adds rate limiting (60 req/min per IP)
- Forwards requests to Fuseki with auth headers
- Adds security headers on responses

### Loading data into Fuseki

```bash
# Upload a Turtle file via Fuseki UI at http://localhost:3030
# Or use the command line:
curl -X POST http://localhost:3030/research/data \
  -H "Authorization: Basic $(echo -n admin:fuseki_admin_pass | base64)" \
  -H "Content-Type: text/turtle" \
  --data-binary @yourdata.ttl
```

---

## 🚢 Deployment

### Option A: Vercel (frontend) + Your server (Fuseki + Postgres)

1. Push to GitHub
2. Import to Vercel — set all env vars from `.env.example`
3. On your server, run `docker compose up -d` for Fuseki + Postgres
4. Set `FUSEKI_URL` in Vercel env vars to point to your server's internal IP/hostname
5. Set `DATABASE_URI` to a managed Postgres service (e.g. Neon, Supabase) or your server

### Option B: Full self-hosted (your server only)

```bash
# Build and start everything
npm run build
docker compose up -d

# Then run Next.js with a process manager:
pm2 start npm --name "research-site" -- start

# Or add Next.js as a service in docker-compose.yml
```

Add nginx/Caddy as a reverse proxy in front of port 3000. Do **not** expose port 3030 (Fuseki) publicly.

---

## 🛠️ VS Code Extensions (Recommended)

Install these from the VS Code Extensions panel:

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **Prisma** — `Prisma.prisma` (useful for DB inspection)
- **REST Client** — `humao.rest-client` (test SPARQL API)
- **Thunder Client** — `rangav.vscode-thunder-client` (API testing)
- **GitLens** — `eamodio.gitlens`
- **Docker** — `ms-azuretools.vscode-docker`

---

## 📦 Connecting pages to Payload CMS

Each page currently uses mock data. Replace with real Payload queries like this:

```ts
// In any Server Component page:
import { getPayloadClient } from "@/lib/payload";

const payload = await getPayloadClient();

const publications = await payload.find({
  collection: "publications",
  where: { featured: { equals: true } },
  sort: "-year",
  limit: 10,
});
```

---

## 🗄️ Adding data to Fuseki

1. Go to http://localhost:3030 (Fuseki UI)
2. Select your dataset (`research`)
3. Use **Upload files** to load `.ttl`, `.rdf`, or `.nt` files
4. Or use **SPARQL Update** for inline INSERT DATA queries

---

## 📄 License

Content: CC BY 4.0 · Code: MIT
