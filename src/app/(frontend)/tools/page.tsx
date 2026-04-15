import { Github, ExternalLink, BookOpen, Package, Zap } from "lucide-react";

export const metadata = { title: "Tools" };

const STATUS_STYLE: Record<string, string> = {
  active:   "badge-green",
  stable:   "badge-sky",
  beta:     "badge-gold",
  archived: "badge",
};

const MOCK_TOOLS = [
  {
    name: "KGBuilder",
    slug: "kgbuilder",
    tagline: "Modular pipeline for knowledge graph construction from heterogeneous sources.",
    category: "Knowledge Graph Tool",
    status: "active",
    technologies: ["Python", "RDFLib", "SpaCy", "Docker"],
    githubUrl: "https://github.com/your-org/kgbuilder",
    demoUrl: "https://demo.example.com/kgbuilder",
    docsUrl: "https://docs.example.com/kgbuilder",
    pypiUrl: "https://pypi.org/project/kgbuilder",
    stars: "1.2k",
    featured: true,
  },
  {
    name: "OntoAlign",
    slug: "ontoalign",
    tagline: "Ontology alignment and entity matching tool with benchmark evaluation suite.",
    category: "Data Integration",
    status: "stable",
    technologies: ["Python", "PyTorch", "OWL-API"],
    githubUrl: "https://github.com/your-org/ontoalign",
    demoUrl: null,
    docsUrl: "https://docs.example.com/ontoalign",
    pypiUrl: "https://pypi.org/project/ontoalign",
    stars: "340",
    featured: false,
  },
  {
    name: "SPARQLViz",
    slug: "sparqlviz",
    tagline: "Interactive graph visualisation for SPARQL query results in the browser.",
    category: "Visualisation",
    status: "beta",
    technologies: ["TypeScript", "React", "D3.js", "SPARQL"],
    githubUrl: "https://github.com/your-org/sparqlviz",
    demoUrl: "https://demo.example.com/sparqlviz",
    docsUrl: null,
    pypiUrl: null,
    stars: "89",
    featured: false,
  },
  {
    name: "AnnotateKG",
    slug: "annotatekg",
    tagline: "Browser-based annotation tool for creating gold-standard KG training data.",
    category: "Annotation Tool",
    status: "active",
    technologies: ["Vue.js", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/your-org/annotatekg",
    demoUrl: "https://demo.example.com/annotate",
    docsUrl: "https://docs.example.com/annotatekg",
    pypiUrl: null,
    stars: "210",
    featured: false,
  },
];

const CATEGORY_ICON: Record<string, typeof Github> = {
  "Knowledge Graph Tool": Zap,
  "Data Integration": Package,
  "Visualisation": ExternalLink,
  "Annotation Tool": BookOpen,
};

export default function ToolsPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Open Source</p>
        <h1 className="section-title mb-3">Developed Tools</h1>
        <p className="section-subtitle max-w-2xl">
          All tools are open source, freely available, and actively maintained.
          Contributions and issue reports are welcome.
        </p>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Knowledge Graph Tool", "Data Integration", "Visualisation", "Annotation Tool", "API / Library"].map((cat) => (
          <button key={cat}
                  className={`px-3 py-1.5 rounded font-sans text-xs font-medium transition-colors
                    ${cat === "All"
                      ? "bg-brand-navy text-white"
                      : "bg-brand-paper border border-brand-border text-brand-navy/70 hover:text-brand-navy"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TOOLS.map((tool) => {
          const Icon = CATEGORY_ICON[tool.category] ?? Zap;
          return (
            <article key={tool.slug} className="card p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/8 flex items-center
                                  justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg text-brand-navy">{tool.name}</h2>
                    <p className="font-sans text-[11px] text-brand-muted">{tool.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={STATUS_STYLE[tool.status] ?? "badge"}>{tool.status}</span>
                  {tool.featured && <span className="badge-gold text-[10px]">Featured</span>}
                </div>
              </div>

              <p className="font-body text-sm text-brand-muted leading-relaxed mb-4 flex-1">
                {tool.tagline}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tool.technologies.map((tech) => (
                  <span key={tech} className="badge text-[11px]">{tech}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-brand-border">
                {tool.githubUrl && (
                  <a href={tool.githubUrl} target="_blank" rel="noreferrer"
                     className="btn-secondary text-xs py-1.5 flex items-center gap-1.5">
                    <Github size={12} /> GitHub
                    {tool.stars && (
                      <span className="ml-1 font-mono text-brand-muted">★ {tool.stars}</span>
                    )}
                  </a>
                )}
                {tool.demoUrl && (
                  <a href={tool.demoUrl} target="_blank" rel="noreferrer"
                     className="btn-primary text-xs py-1.5">
                    <ExternalLink size={12} /> Live Demo
                  </a>
                )}
                {tool.docsUrl && (
                  <a href={tool.docsUrl} target="_blank" rel="noreferrer"
                     className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                hover:text-brand-navy transition-colors">
                    <BookOpen size={12} /> Docs
                  </a>
                )}
                {tool.pypiUrl && (
                  <a href={tool.pypiUrl} target="_blank" rel="noreferrer"
                     className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                                hover:text-brand-navy transition-colors">
                    <Package size={12} /> PyPI
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
