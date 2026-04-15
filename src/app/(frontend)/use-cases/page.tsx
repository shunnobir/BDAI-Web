import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Use Cases & Impact" };

const MOCK_USE_CASES = [
  {
    slug: "biomedical-discovery",
    title: "Accelerating Biomedical Discovery",
    domain: "Healthcare & Life Sciences",
    summary: "Integrating clinical trial data, drug databases, and genomics resources into a unified knowledge graph to surface novel drug-disease associations.",
    tools: ["KGBuilder", "OntoAlign"],
    outcomes: ["2x faster hypothesis generation", "3 novel drug targets identified", "Published in Nature Medicine"],
    featured: true,
  },
  {
    slug: "smart-city-monitoring",
    title: "Smart City Sensor Data Integration",
    domain: "Smart Cities & IoT",
    summary: "Linking heterogeneous IoT sensor streams from urban infrastructure into a queryable knowledge graph for real-time city monitoring.",
    tools: ["KGBuilder", "SPARQLViz"],
    outcomes: ["14 cities integrated", "Real-time dashboards deployed", "Open dataset released"],
    featured: false,
  },
  {
    slug: "scholarly-knowledge-graph",
    title: "Scholarly Communication Knowledge Graph",
    domain: "Open Science",
    summary: "Constructing a knowledge graph of publications, authors, institutions, and funding relationships to support research evaluation and collaboration discovery.",
    tools: ["KGBuilder", "AnnotateKG"],
    outcomes: ["5M papers indexed", "ORCID & OpenAlex integration", "Used by 3 national libraries"],
    featured: false,
  },
];

export default function UseCasesPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Impact</p>
        <h1 className="section-title mb-3">Use Cases</h1>
        <p className="section-subtitle max-w-2xl">
          Real-world applications of our research outputs — showing how knowledge graphs
          are driving discovery across diverse domains.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_USE_CASES.map((uc) => (
          <article key={uc.slug} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge-gold">{uc.domain}</span>
                  {uc.featured && <span className="badge-green">Featured</span>}
                </div>
                <h2 className="font-serif text-xl text-brand-navy">{uc.title}</h2>
              </div>
            </div>
            <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">{uc.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-muted mb-2">Tools Used</p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.tools.map((t) => (
                    <Link key={t} href={`/tools`} className="badge badge-sky hover:bg-brand-sky/20 transition-colors">{t}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-muted mb-2">Key Outcomes</p>
                <ul className="space-y-1">
                  {uc.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 font-body text-xs text-brand-muted">
                      <span className="text-emerald-500 mt-0.5">✓</span> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border">
              <Link href={`/use-cases/${uc.slug}`}
                    className="font-sans text-sm text-brand-sky flex items-center gap-1 hover:gap-2 transition-all">
                Read full case study <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
