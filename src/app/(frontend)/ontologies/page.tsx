import { ExternalLink, Download, Copy } from "lucide-react";

export const metadata = { title: "Ontologies & Vocabularies" };

const MOCK_ONTOLOGIES = [
  {
    name: "Research Domain Ontology",
    acronym: "RDO",
    prefix: "rdo",
    namespace: "https://w3id.org/rdo/",
    version: "1.2.0",
    status: "stable",
    description: "A comprehensive ontology for representing entities, relations, and provenance in the research domain. Designed to interoperate with Schema.org, DCAT, and PROV-O.",
    classes: 128,
    properties: 214,
    docsUrl: "https://w3id.org/rdo/docs",
    githubUrl: "https://github.com/your-org/rdo",
    license: "CC BY 4.0",
  },
  {
    name: "Scientific Methods Ontology",
    acronym: "SMO",
    prefix: "smo",
    namespace: "https://w3id.org/smo/",
    version: "0.8.1",
    status: "draft",
    description: "An ontology capturing scientific methodologies, experimental protocols, and reproducibility metadata for empirical research workflows.",
    classes: 64,
    properties: 98,
    docsUrl: null,
    githubUrl: "https://github.com/your-org/smo",
    license: "CC0 1.0",
  },
];

const STATUS_STYLE: Record<string, string> = {
  stable:     "badge-green",
  draft:      "badge-gold",
  deprecated: "badge",
};

export default function OntologiesPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Vocabularies</p>
        <h1 className="section-title mb-3">Ontologies</h1>
        <p className="section-subtitle max-w-2xl">
          Reusable, openly licensed ontologies and vocabularies developed by the project.
          All ontologies are resolvable via persistent W3ID URIs.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_ONTOLOGIES.map((onto) => (
          <article key={onto.acronym} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={STATUS_STYLE[onto.status] ?? "badge"}>{onto.status}</span>
                  <span className="badge">v{onto.version}</span>
                  <span className="badge-sky">{onto.license}</span>
                </div>
                <h2 className="font-serif text-xl text-brand-navy">
                  {onto.name}{" "}
                  <span className="font-mono text-brand-sky text-base">({onto.acronym})</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { label: "Classes",     value: onto.classes },
                  { label: "Properties",  value: onto.properties },
                ].map(({ label, value }) => (
                  <div key={label} className="stat-card py-3 px-5">
                    <p className="font-serif text-xl font-bold text-brand-navy">{value}</p>
                    <p className="font-sans text-[10px] uppercase tracking-wide text-brand-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
              {onto.description}
            </p>

            {/* Namespace & prefix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                  Namespace URI
                </p>
                <div className="doi-box flex items-center justify-between gap-2">
                  <span>{onto.namespace}</span>
                  <button className="text-brand-muted hover:text-brand-navy transition-colors" aria-label="Copy namespace">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                  Preferred Prefix
                </p>
                <div className="doi-box">
                  <span className="text-brand-sky">{onto.prefix}</span>:{" "}
                  <span className="text-brand-muted">&lt;{onto.namespace}&gt;</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-border">
              {onto.docsUrl && (
                <a href={onto.docsUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs py-1.5">
                  <ExternalLink size={12} /> Documentation
                </a>
              )}
              {onto.githubUrl && (
                <a href={onto.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary text-xs py-1.5">
                  GitHub
                </a>
              )}
              <button className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                  hover:text-brand-navy transition-colors">
                <Download size={12} /> Download OWL
              </button>
              <button className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                  hover:text-brand-navy transition-colors">
                <Download size={12} /> Download Turtle
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
