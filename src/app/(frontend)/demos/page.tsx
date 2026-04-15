import { ExternalLink, Play, Github } from "lucide-react";

export const metadata = { title: "Demos & Showcases" };

const MOCK_DEMOS = [
  {
    title: "KGBuilder Live Demo",
    tool: "KGBuilder",
    description: "Upload a CSV or JSON file and watch KGBuilder convert it to RDF in real time. Explore the generated graph visually.",
    demoUrl: "https://demo.example.com/kgbuilder",
    githubUrl: "https://github.com/your-org/kgbuilder",
    tags: ["RDF", "CSV to KG", "Live"],
    status: "live",
  },
  {
    title: "SPARQL Explorer",
    tool: "SPARQLViz",
    description: "Query our knowledge graph and visualise results as an interactive node-link diagram. Supports PREFIX shortcuts and query history.",
    demoUrl: "/sparql",
    githubUrl: "https://github.com/your-org/sparqlviz",
    tags: ["SPARQL", "Visualisation", "Interactive"],
    status: "live",
  },
  {
    title: "Entity Alignment Playground",
    tool: "OntoAlign",
    description: "Compare entity alignment methods across different knowledge graph pairs. Upload your own graphs or use our benchmark datasets.",
    demoUrl: "https://demo.example.com/ontoalign",
    githubUrl: "https://github.com/your-org/ontoalign",
    tags: ["Alignment", "Benchmarking"],
    status: "beta",
  },
  {
    title: "Annotation Interface Demo",
    tool: "AnnotateKG",
    description: "Try our crowd-sourced annotation tool for labelling entity mentions and relations in text. Exports to RDF/JSON-LD.",
    demoUrl: "https://demo.example.com/annotate",
    githubUrl: "https://github.com/your-org/annotatekg",
    tags: ["Annotation", "NLP", "Crowd-sourcing"],
    status: "live",
  },
];

const STATUS_STYLE: Record<string, string> = {
  live: "badge-green",
  beta: "badge-gold",
  upcoming: "badge",
};

export default function DemosPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Interactive</p>
        <h1 className="section-title mb-3">Demos & Showcases</h1>
        <p className="section-subtitle max-w-2xl">
          Live interactive demonstrations of the tools and services developed by the project.
          No installation required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_DEMOS.map((demo) => (
          <article key={demo.title} className="card p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className={`${STATUS_STYLE[demo.status] ?? "badge"} mb-2 inline-block`}>
                  {demo.status}
                </span>
                <h2 className="font-serif text-lg text-brand-navy">{demo.title}</h2>
                <p className="font-sans text-xs text-brand-muted">{demo.tool}</p>
              </div>
            </div>

            {/* Preview placeholder */}
            <div className="w-full aspect-video bg-brand-navy/5 rounded-lg border border-brand-border
                            flex items-center justify-center mb-4 group cursor-pointer
                            hover:bg-brand-navy/8 transition-colors">
              <div className="flex flex-col items-center gap-2 text-brand-muted">
                <div className="w-10 h-10 rounded-full bg-brand-sky/20 flex items-center justify-center">
                  <Play size={18} className="text-brand-sky ml-0.5" />
                </div>
                <span className="font-sans text-xs">Click to open demo</span>
              </div>
            </div>

            <p className="font-body text-sm text-brand-muted leading-relaxed mb-4 flex-1">
              {demo.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {demo.tags.map((tag) => (
                <span key={tag} className="badge text-[11px]">{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
              <a href={demo.demoUrl} target={demo.demoUrl.startsWith("/") ? "_self" : "_blank"}
                 rel="noreferrer" className="btn-primary text-xs py-2 flex-1 justify-center">
                <ExternalLink size={12} /> Open Demo
              </a>
              <a href={demo.githubUrl} target="_blank" rel="noreferrer"
                 className="btn-secondary text-xs py-2 px-4">
                <Github size={12} /> Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
