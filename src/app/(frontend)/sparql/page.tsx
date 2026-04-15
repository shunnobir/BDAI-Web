"use client";

import { useState } from "react";
import { Play, RotateCcw, Download, Copy, CheckCheck, Loader2, AlertCircle } from "lucide-react";

// ── Sample queries ────────────────────────────────────────────────────────────
const SAMPLE_QUERIES = [
  {
    label: "List all classes",
    query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?class ?label WHERE {
  ?class a owl:Class .
  OPTIONAL { ?class rdfs:label ?label . FILTER(lang(?label) = "en") }
}
ORDER BY ?class
LIMIT 50`,
  },
  {
    label: "Count triples by graph",
    query: `SELECT ?graph (COUNT(*) AS ?count) WHERE {
  GRAPH ?graph { ?s ?p ?o }
}
GROUP BY ?graph
ORDER BY DESC(?count)`,
  },
  {
    label: "List all properties",
    query: `PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?property ?label WHERE {
  ?s ?property ?o .
  OPTIONAL { ?property rdfs:label ?label . FILTER(lang(?label) = "en") }
}
LIMIT 100`,
  },
  {
    label: "Sample entities",
    query: `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?entity ?label ?type WHERE {
  ?entity a ?type ;
          rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 25`,
  },
];

type SparqlResult = {
  head:    { vars: string[] };
  results: { bindings: Record<string, { type: string; value: string; "xml:lang"?: string }>[] };
};

export default function SparqlPage() {
  const [query,    setQuery]    = useState(SAMPLE_QUERIES[0].query);
  const [results,  setResults]  = useState<SparqlResult | null>(null);
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [copied,   setCopied]   = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  async function runQuery() {
    setLoading(true);
    setError(null);
    setResults(null);
    const start = performance.now();

    try {
      const res = await fetch("/api/sparql", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Query failed");
      setResults(data);
      setExecTime(Math.round(performance.now() - start));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function copyQuery() {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadResults() {
    if (!results) return;
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), { href: url, download: "sparql-results.json" });
    a.click();
    URL.revokeObjectURL(url);
  }

  const vars     = results?.head.vars ?? [];
  const bindings = results?.results.bindings ?? [];

  return (
    <div className="content-grid py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="section-eyebrow">Live Query Interface</p>
        <h1 className="section-title mb-2">SPARQL Endpoint Explorer</h1>
        <p className="section-subtitle">
          Query our knowledge graph using SPARQL 1.1. The endpoint is read-only;
          write operations are blocked.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-brand-muted">
            {typeof window !== "undefined" ? window.location.origin : ""}/api/sparql
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sample queries sidebar */}
        <aside className="xl:col-span-1">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest
                        text-brand-muted mb-3">
            Sample Queries
          </p>
          <div className="space-y-2">
            {SAMPLE_QUERIES.map((sq) => (
              <button
                key={sq.label}
                onClick={() => setQuery(sq.query)}
                className="w-full text-left px-3 py-2.5 rounded-lg border border-brand-border
                           bg-brand-paper hover:border-brand-sky/40 hover:bg-brand-sky/5
                           font-sans text-sm text-brand-navy/80 hover:text-brand-navy
                           transition-colors"
              >
                {sq.label}
              </button>
            ))}
          </div>

          {/* Endpoint info */}
          <div className="mt-8 p-4 rounded-lg bg-brand-navy/5 border border-brand-border">
            <p className="font-sans text-xs font-semibold text-brand-navy mb-2">
              Endpoint Info
            </p>
            <dl className="space-y-1.5 font-sans text-xs text-brand-muted">
              <div><dt className="font-medium">Protocol</dt><dd>SPARQL 1.1</dd></div>
              <div><dt className="font-medium">Format</dt><dd>JSON, XML</dd></div>
              <div><dt className="font-medium">Access</dt><dd>Read-only</dd></div>
              <div><dt className="font-medium">Rate limit</dt><dd>60 req / min</dd></div>
            </dl>
          </div>
        </aside>

        {/* Main editor + results */}
        <div className="xl:col-span-3 space-y-4">
          {/* Editor */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-brand-navy/3
                            border-b border-brand-border">
              <span className="font-mono text-xs text-brand-muted">SPARQL Query</span>
              <button onClick={copyQuery}
                      className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                 hover:text-brand-navy transition-colors">
                {copied ? <><CheckCheck size={13} className="text-emerald-500" /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full font-mono text-sm p-4 bg-brand-paper text-brand-navy
                         focus:outline-none resize-y min-h-[220px] leading-relaxed"
              spellCheck={false}
              placeholder="Enter your SPARQL query here..."
            />
            <div className="flex items-center justify-between px-4 py-3
                            border-t border-brand-border bg-brand-navy/3">
              <button
                onClick={() => setQuery(SAMPLE_QUERIES[0].query)}
                className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                           hover:text-brand-navy transition-colors"
              >
                <RotateCcw size={13} /> Reset
              </button>
              <button
                onClick={runQuery}
                disabled={loading || !query.trim()}
                className="btn-primary py-2 px-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> Running...</>
                  : <><Play size={15} /> Run Query</>}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50
                            border border-red-200 text-red-700">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <p className="font-mono text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5
                              bg-brand-navy/3 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs text-brand-muted">
                    {bindings.length} result{bindings.length !== 1 ? "s" : ""}
                    {execTime !== null && (
                      <span className="ml-2 text-brand-muted/60">({execTime}ms)</span>
                    )}
                  </span>
                </div>
                <button
                  onClick={downloadResults}
                  className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                             hover:text-brand-navy transition-colors"
                >
                  <Download size={13} /> Download JSON
                </button>
              </div>

              {bindings.length === 0 ? (
                <p className="p-8 text-center font-sans text-sm text-brand-muted">
                  No results returned.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-brand-navy/5 border-b border-brand-border">
                      <tr>
                        {vars.map((v) => (
                          <th key={v}
                              className="px-4 py-2.5 text-left font-sans text-xs font-semibold
                                         text-brand-navy uppercase tracking-wide">
                            {v}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {bindings.map((row, i) => (
                        <tr key={i} className="hover:bg-brand-cream/60 transition-colors">
                          {vars.map((v) => {
                            const cell = row[v];
                            return (
                              <td key={v}
                                  className="px-4 py-2.5 font-mono text-xs text-brand-navy/80
                                             max-w-[300px] truncate align-top">
                                {cell ? (
                                  cell.type === "uri" ? (
                                    <a href={cell.value} target="_blank" rel="noreferrer"
                                       className="text-brand-sky hover:underline">
                                      {cell.value.length > 60 ? `…${cell.value.slice(-48)}` : cell.value}
                                    </a>
                                  ) : (
                                    <span title={cell.value}>{cell.value}</span>
                                  )
                                ) : (
                                  <span className="text-brand-muted italic">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
