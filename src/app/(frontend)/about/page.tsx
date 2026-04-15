import { Target, Lightbulb, BarChart3, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "About the Project" };

const OBJECTIVES = [
  {
    icon: Target,
    title: "Build Open Knowledge Graphs",
    description:
      "Construct large-scale, interoperable knowledge graphs from heterogeneous scientific data sources using semantic web standards (RDF, OWL, SPARQL).",
  },
  {
    icon: Lightbulb,
    title: "Develop Reusable Tools",
    description:
      "Design and release open-source tools, APIs, and ontologies that enable the broader research community to work with linked data at scale.",
  },
  {
    icon: BarChart3,
    title: "Evaluate & Benchmark",
    description:
      "Publish gold-standard benchmarks for evaluating knowledge graph construction, entity alignment, and relation extraction methods.",
  },
  {
    icon: Users,
    title: "Foster Community",
    description:
      "Engage stakeholders through workshops, tutorials, and open dissemination — lowering the barrier to adopting linked data in research.",
  },
];

const WORK_PACKAGES = [
  { id: "WP1", title: "Requirements & Ontology Design",   lead: "Prof. Alice Smith",   months: "M1–M6",  status: "completed" },
  { id: "WP2", title: "Knowledge Graph Construction",      lead: "Dr. Bob Jones",      months: "M4–M24", status: "in-progress" },
  { id: "WP3", title: "Tool Development",                  lead: "Eva Chen",            months: "M6–M24", status: "in-progress" },
  { id: "WP4", title: "Evaluation & Benchmarking",         lead: "Carol White",         months: "M12–M30",status: "upcoming" },
  { id: "WP5", title: "Dissemination & Community",         lead: "David Lee",           months: "M1–M36", status: "in-progress" },
  { id: "WP0", title: "Project Management",                lead: "Prof. Alice Smith",   months: "M1–M36", status: "in-progress" },
];

const STATUS_STYLE: Record<string, string> = {
  completed:   "badge-green",
  "in-progress": "badge-sky",
  upcoming:    "badge",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-24">
        <div className="content-grid">
          <p className="section-eyebrow text-brand-gold/80 mb-4">About</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 max-w-3xl leading-tight">
            {process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Research Project"}
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            A {"{duration}"}-year funded research project ({"{start}"} – {"{end}"}) investigating
            the construction, publication, and reuse of open knowledge graphs for scientific
            discovery. Funded by{" "}
            <span className="text-brand-gold">{"{Funding Body}"}</span> under grant{" "}
            <span className="font-mono text-sm text-white/50">{"{Grant ID}"}</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/team" className="btn-gold">Meet the Team <ArrowRight size={15} /></Link>
            <Link href="/publications" className="btn-secondary border-white/20 text-white hover:bg-white/10">
              Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="content-grid">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose-academic">
              <h2 className="font-serif text-2xl text-brand-navy mb-4">Project Overview</h2>
              <p className="font-body text-brand-muted leading-relaxed mb-4">
                [Replace this paragraph with your project abstract or overview. Describe the
                research challenge you are addressing, the context, and why it matters.]
              </p>
              <p className="font-body text-brand-muted leading-relaxed mb-4">
                [Second paragraph — describe your methodology, approach, and the types of outputs
                your project will produce: datasets, tools, ontologies, publications.]
              </p>
              <p className="font-body text-brand-muted leading-relaxed">
                [Third paragraph — describe the expected impact and who will benefit from this
                research.]
              </p>
            </div>

            {/* Quick facts sidebar */}
            <aside className="space-y-4">
              <div className="card p-5">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">
                  Project Details
                </p>
                <dl className="space-y-3">
                  {[
                    { label: "Acronym",   value: process.env.NEXT_PUBLIC_PROJECT_ACRONYM ?? "ACRONYM" },
                    { label: "Duration",  value: "36 months (2023–2026)" },
                    { label: "Funder",    value: "EU Horizon / NSF / EPSRC" },
                    { label: "Grant ID",  value: "GRANT-12345" },
                    { label: "Budget",    value: "€ X,XXX,XXX" },
                    { label: "Partners",  value: "5 institutions" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4 text-sm border-b border-brand-border pb-2 last:border-0 last:pb-0">
                      <dt className="font-sans font-medium text-brand-muted">{label}</dt>
                      <dd className="font-body text-brand-navy text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Link href="/partners" className="card p-5 block hover:border-brand-sky/30 group">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
                  Funded by
                </p>
                <p className="font-body text-sm text-brand-muted group-hover:text-brand-navy transition-colors">
                  View all funders & partners →
                </p>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-brand-paper border-t border-brand-border">
        <div className="content-grid">
          <div className="mb-10 text-center">
            <p className="section-eyebrow">Goals</p>
            <h2 className="section-title">Project Objectives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {OBJECTIVES.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="card p-6 flex gap-5">
                <div className="w-10 h-10 rounded-lg bg-brand-navy flex items-center justify-center
                                flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-semibold text-brand-gold uppercase
                                 tracking-widest mb-1">O{i + 1}</p>
                  <h3 className="font-serif text-base text-brand-navy mb-2">{title}</h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Packages */}
      <section className="py-20">
        <div className="content-grid">
          <div className="mb-10">
            <p className="section-eyebrow">Structure</p>
            <h2 className="section-title mb-3">Work Packages</h2>
            <p className="section-subtitle max-w-2xl">
              The project is organised into six work packages, each with defined deliverables
              and responsible team members.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-brand-border rounded-lg overflow-hidden">
              <thead className="bg-brand-navy text-white">
                <tr>
                  {["WP", "Title", "Lead", "Period", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-sans text-xs font-semibold
                                           uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {WORK_PACKAGES.map((wp, i) => (
                  <tr key={wp.id}
                      className={i % 2 === 0 ? "bg-brand-paper" : "bg-brand-cream"}>
                    <td className="px-5 py-3 font-mono text-xs font-bold text-brand-navy">{wp.id}</td>
                    <td className="px-5 py-3 font-sans text-brand-navy">{wp.title}</td>
                    <td className="px-5 py-3 font-body text-brand-muted">{wp.lead}</td>
                    <td className="px-5 py-3 font-mono text-xs text-brand-muted">{wp.months}</td>
                    <td className="px-5 py-3">
                      <span className={STATUS_STYLE[wp.status] ?? "badge"}>
                        {wp.status.replace("-", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ethics & Open Science */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="content-grid">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Open Access",   desc: "All publications available freely under CC BY 4.0." },
              { label: "FAIR Data",     desc: "All datasets are Findable, Accessible, Interoperable, Reusable." },
              { label: "Open Source",   desc: "All tools released on GitHub under permissive licences." },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest
                               text-brand-gold mb-2">{label}</p>
                <p className="font-body text-sm text-white/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
