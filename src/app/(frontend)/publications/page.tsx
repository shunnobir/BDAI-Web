import { ExternalLink, FileText, Download } from "lucide-react";

// Replace with: const publications = await payload.find({ collection: 'publications', ... })
const MOCK_PUBLICATIONS = [
  {
    id: "1", title: "Knowledge Graph Construction for Open Research Data",
    authors: ["Alice Smith", "Bob Jones"],
    year: 2024, type: "journal", venue: "Semantic Web Journal",
    doi: "10.3233/SW-243643", abstract: "We present a comprehensive approach to constructing knowledge graphs from heterogeneous research data sources...",
    keywords: ["Knowledge Graphs", "Open Data", "RDF"], featured: true,
  },
  {
    id: "2", title: "A SPARQL-based Query Interface for Research Datasets",
    authors: ["Carol White", "Alice Smith"],
    year: 2024, type: "conference", venue: "ISWC 2024",
    doi: "10.1007/example", abstract: "This paper presents a novel interface for querying linked research datasets using SPARQL...",
    keywords: ["SPARQL", "Interface", "Linked Data"], featured: false,
  },
  {
    id: "3", title: "Ontology Design Patterns for Scientific Data",
    authors: ["Bob Jones", "David Lee"],
    year: 2023, type: "workshop", venue: "WOP@ISWC 2023",
    doi: "10.1007/example2", abstract: "We propose a set of reusable ontology design patterns for modelling scientific datasets...",
    keywords: ["Ontology", "Design Patterns", "Science"], featured: false,
  },
];

const TYPE_LABELS: Record<string, string> = {
  journal: "Journal Article", conference: "Conference Paper",
  "book-chapter": "Book Chapter", workshop: "Workshop Paper",
  preprint: "Preprint", report: "Technical Report", thesis: "Thesis",
};

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Research Outputs</p>
        <h1 className="section-title mb-3">Publications</h1>
        <p className="section-subtitle max-w-2xl">
          All publications are open access where possible. Use the BibTeX export for citations.
        </p>
      </div>

      {/* Filter bar — make interactive with client component in production */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-brand-paper border border-brand-border rounded-lg">
        {["All", "Journal", "Conference", "Workshop", "Preprint"].map((f) => (
          <button key={f}
                  className={`px-3 py-1.5 rounded font-sans text-xs font-medium transition-colors
                    ${f === "All"
                      ? "bg-brand-navy text-white"
                      : "bg-brand-cream text-brand-navy/70 hover:text-brand-navy hover:bg-brand-border"}`}>
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <input
            type="search"
            placeholder="Search publications…"
            className="px-3 py-1.5 text-xs font-sans border border-brand-border rounded
                       bg-white focus:outline-none focus:border-brand-sky w-48"
          />
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_PUBLICATIONS.map((pub) => (
          <article key={pub.id} className="card p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge-sky">{TYPE_LABELS[pub.type] ?? pub.type}</span>
              <span className="badge">{pub.year}</span>
              {pub.featured && <span className="badge-gold">⭐ Featured</span>}
            </div>

            <h2 className="font-serif text-lg text-brand-navy mb-2 leading-snug">
              {pub.title}
            </h2>

            <p className="font-sans text-sm text-brand-muted mb-1">
              {pub.authors.join(", ")}
              {pub.venue && <span className="italic"> · {pub.venue}</span>}
            </p>

            <p className="font-body text-sm text-brand-muted/80 leading-relaxed mb-4 line-clamp-3">
              {pub.abstract}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {pub.keywords.map((kw) => (
                <span key={kw} className="badge text-[11px]">{kw}</span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-border">
              {pub.doi && (
                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer"
                   className="flex items-center gap-1.5 font-sans text-xs text-brand-sky hover:underline">
                  <ExternalLink size={12} /> DOI: {pub.doi}
                </a>
              )}
              <button className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                  hover:text-brand-navy transition-colors">
                <FileText size={12} /> BibTeX
              </button>
              <button className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                  hover:text-brand-navy transition-colors">
                <Download size={12} /> PDF
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
