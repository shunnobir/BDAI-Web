import { Database, Download, ExternalLink, GitBranch, Layers } from "lucide-react";
import Link from "next/link";

const MOCK_DATASETS = [
  {
    id: "1", name: "Research Knowledge Graph v2.0", slug: "rkg-v2",
    description: "A comprehensive knowledge graph covering entities, relations, and provenance metadata across the research domain.",
    version: "2.0.0", license: "CC BY 4.0",
    stats: { triples: "50M", entities: "1.2M", classes: 340, size: "4.2 GB" },
    formats: ["ttl", "rdf", "jsonld", "csv"],
    doi: "10.5281/zenodo.123456", featured: true,
    zenodoUrl: "https://zenodo.org/record/123456",
  },
  {
    id: "2", name: "Entity Alignment Benchmark", slug: "entity-alignment-benchmark",
    description: "A gold-standard benchmark for evaluating entity alignment methods across multiple knowledge graphs.",
    version: "1.1.0", license: "CC0 1.0",
    stats: { triples: "2.1M", entities: "85K", classes: 28, size: "340 MB" },
    formats: ["ttl", "csv"],
    doi: "10.5281/zenodo.789012", featured: false,
    zenodoUrl: "https://zenodo.org/record/789012",
  },
];

const FORMAT_COLORS: Record<string, string> = {
  ttl: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rdf: "bg-blue-50 text-blue-700 border-blue-200",
  jsonld: "bg-amber-50 text-amber-700 border-amber-200",
  csv: "bg-purple-50 text-purple-700 border-purple-200",
  nt: "bg-rose-50 text-rose-700 border-rose-200",
};

export const metadata = { title: "Datasets" };

export default function DatasetsPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Open Data</p>
        <h1 className="section-title mb-3">Datasets</h1>
        <p className="section-subtitle max-w-2xl">
          All datasets are FAIR-compliant and available for free download. Persistent identifiers via Zenodo.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_DATASETS.map((ds) => (
          <article key={ds.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {ds.featured && <span className="badge-gold">Featured</span>}
                  <span className="badge">v{ds.version}</span>
                  <span className="badge-sky">{ds.license}</span>
                </div>
                <h2 className="font-serif text-xl text-brand-navy">{ds.name}</h2>
              </div>
              <Link href={`/sparql?dataset=${ds.slug}`} className="btn-secondary text-sm py-2">
                Query in SPARQL
              </Link>
            </div>

            <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
              {ds.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Triples",  value: ds.stats.triples,  icon: Layers },
                { label: "Entities", value: ds.stats.entities, icon: Database },
                { label: "Classes",  value: ds.stats.classes,  icon: GitBranch },
                { label: "Size",     value: ds.stats.size,     icon: Download },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-lg bg-brand-cream border border-brand-border
                                             p-3 flex items-center gap-2">
                  <Icon size={14} className="text-brand-sky flex-shrink-0" />
                  <div>
                    <p className="font-serif text-sm font-bold text-brand-navy">{value}</p>
                    <p className="font-sans text-[10px] text-brand-muted uppercase tracking-wide">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formats */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {ds.formats.map((f) => (
                <span key={f}
                      className={`badge text-[11px] ${FORMAT_COLORS[f] ?? ""}`}>
                  .{f}
                </span>
              ))}
            </div>

            {/* DOI + links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-border">
              <div className="doi-box flex-1 min-w-0">
                DOI: {ds.doi}
              </div>
              <div className="flex gap-2">
                <a href={ds.zenodoUrl} target="_blank" rel="noreferrer" className="btn-secondary text-xs py-1.5">
                  <ExternalLink size={12} /> Zenodo
                </a>
                <button className="btn-primary text-xs py-1.5">
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
