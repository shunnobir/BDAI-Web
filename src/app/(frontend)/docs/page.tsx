import Link from "next/link";
import { BookOpen, Terminal, Database, Layers, ArrowRight, ExternalLink } from "lucide-react";

export const metadata = { title: "Documentation" };

const DOC_SECTIONS = [
  {
    icon: Terminal,
    title: "Getting Started",
    description: "Install the tools, set up your environment, and run your first knowledge graph pipeline in under 10 minutes.",
    links: [
      { label: "Quick Start Guide",     href: "#" },
      { label: "Installation",          href: "#" },
      { label: "Prerequisites",         href: "#" },
    ],
  },
  {
    icon: Database,
    title: "SPARQL Endpoint",
    description: "Learn how to query our knowledge graph using the public SPARQL endpoint and explore example queries.",
    links: [
      { label: "Endpoint Reference",    href: "/sparql" },
      { label: "Example Queries",       href: "#" },
      { label: "Rate Limits & Access",  href: "#" },
    ],
  },
  {
    icon: Layers,
    title: "Ontology Reference",
    description: "Browse the full documentation for our ontologies, including class hierarchies and property definitions.",
    links: [
      { label: "RDO Ontology",          href: "/ontologies" },
      { label: "SMO Ontology",          href: "/ontologies" },
      { label: "Namespace Guide",       href: "#" },
    ],
  },
  {
    icon: BookOpen,
    title: "Tool Documentation",
    description: "Full API reference, configuration options, and tutorials for each open-source tool.",
    links: [
      { label: "KGBuilder Docs",        href: "https://docs.example.com/kgbuilder" },
      { label: "OntoAlign Docs",        href: "https://docs.example.com/ontoalign" },
      { label: "AnnotateKG Docs",       href: "https://docs.example.com/annotatekg" },
    ],
  },
];

const API_EXAMPLE = `# Query the SPARQL endpoint
curl -X POST https://your-site.com/api/sparql \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "SELECT * WHERE { ?s ?p ?o } LIMIT 10"
  }'`;

export default function DocsPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-12">
        <p className="section-eyebrow">Documentation</p>
        <h1 className="section-title mb-3">Technical Documentation</h1>
        <p className="section-subtitle max-w-2xl">
          Guides, API references, and tutorials for using the project's datasets, tools, and SPARQL endpoint.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        {DOC_SECTIONS.map(({ icon: Icon, title, description, links }) => (
          <div key={title} className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy/8 flex items-center justify-center">
                <Icon size={16} className="text-brand-navy" />
              </div>
              <h2 className="font-serif text-base text-brand-navy">{title}</h2>
            </div>
            <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">{description}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-sans text-sm text-brand-sky hover:underline">
                    <ArrowRight size={12} /> {link.label}
                    {link.href.startsWith("http") && <ExternalLink size={10} className="text-brand-muted" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* API Quick Reference */}
      <section className="mb-14">
        <h2 className="section-title text-2xl mb-3">SPARQL API Quick Reference</h2>
        <p className="font-body text-sm text-brand-muted mb-6">
          The SPARQL endpoint is available at <code className="doi-box inline text-xs px-2 py-0.5">/api/sparql</code>.
          It accepts POST requests with JSON or form-encoded bodies.
        </p>
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-brand-navy/5
                          border-b border-brand-border">
            <span className="font-mono text-xs text-brand-muted">Shell</span>
          </div>
          <pre className="p-5 font-mono text-sm text-brand-navy bg-brand-paper overflow-x-auto leading-relaxed">
            <code>{API_EXAMPLE}</code>
          </pre>
        </div>
      </section>

      {/* Data formats */}
      <section>
        <h2 className="section-title text-2xl mb-6">Supported Data Formats</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-brand-border rounded-lg overflow-hidden">
            <thead className="bg-brand-navy text-white">
              <tr>
                {["Format", "Extension", "MIME Type", "Use Case"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                ["RDF/Turtle",  ".ttl",    "text/turtle",              "Human-readable RDF (recommended)"],
                ["RDF/XML",     ".rdf",    "application/rdf+xml",      "Standard W3C RDF serialisation"],
                ["JSON-LD",     ".jsonld", "application/ld+json",      "JSON-friendly linked data"],
                ["N-Triples",   ".nt",     "application/n-triples",    "Line-based, easy to parse/stream"],
                ["SPARQL JSON", ".json",   "application/sparql-results+json", "Query results"],
              ].map(([format, ext, mime, useCase], i) => (
                <tr key={format} className={i % 2 === 0 ? "bg-brand-paper" : "bg-brand-cream"}>
                  <td className="px-5 py-3 font-sans font-medium text-brand-navy">{format}</td>
                  <td className="px-5 py-3 font-mono text-xs text-brand-sky">{ext}</td>
                  <td className="px-5 py-3 font-mono text-xs text-brand-muted">{mime}</td>
                  <td className="px-5 py-3 font-body text-xs text-brand-muted">{useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
