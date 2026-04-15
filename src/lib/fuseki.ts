/**
 * Server-side Fuseki query helper.
 * Use this in Next.js Server Components or Route Handlers — never in client code.
 */

const FUSEKI_URL     = process.env.FUSEKI_URL     ?? "http://localhost:3030";
const FUSEKI_DATASET = process.env.FUSEKI_DATASET ?? "research";
const FUSEKI_USER    = process.env.FUSEKI_USER    ?? "admin";
const FUSEKI_PASS    = process.env.FUSEKI_ADMIN_PASSWORD ?? "";

const authHeader = `Basic ${Buffer.from(`${FUSEKI_USER}:${FUSEKI_PASS}`).toString("base64")}`;

export type SparqlBinding = Record<string, { type: string; value: string; "xml:lang"?: string }>;

export type SparqlResult = {
  head:    { vars: string[] };
  results: { bindings: SparqlBinding[] };
};

export async function sparqlQuery(query: string): Promise<SparqlResult> {
  const res = await fetch(`${FUSEKI_URL}/${FUSEKI_DATASET}/sparql`, {
    method: "POST",
    headers: {
      "Content-Type":  "application/x-www-form-urlencoded",
      "Accept":        "application/sparql-results+json",
      "Authorization": authHeader,
    },
    body: new URLSearchParams({ query }),
    next: { revalidate: 60 }, // Cache for 60s (adjust per use case)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fuseki error ${res.status}: ${text}`);
  }

  return res.json();
}

/** Shortcut: run a query and get just the bindings array */
export async function sparqlSelect(query: string): Promise<SparqlBinding[]> {
  const result = await sparqlQuery(query);
  return result.results.bindings;
}
