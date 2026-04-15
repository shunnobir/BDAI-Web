import Link from "next/link";
import {
  BookOpen, Database, Wrench, Users, ArrowRight,
  Globe, FileText, Layers, Zap, Award
} from "lucide-react";

// ── Static placeholder data — replace with Payload CMS fetches ──────────────
const STATS = [
  { label: "Publications",   value: "120+", icon: BookOpen },
  { label: "Datasets",       value: "18",   icon: Database },
  { label: "Tools",          value: "12",   icon: Wrench },
  { label: "Team Members",   value: "24",   icon: Users },
  { label: "RDF Triples",    value: "50M+", icon: Layers },
  { label: "Countries",      value: "14",   icon: Globe },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Publications",
    desc:  "Peer-reviewed articles, conference papers, preprints — all open access.",
    href:  "/publications",
    color: "bg-blue-50 text-brand-sky",
  },
  {
    icon: Database,
    title: "Datasets",
    desc:  "Downloadable RDF, CSV, and JSON-LD datasets with full provenance.",
    href:  "/datasets",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Wrench,
    title: "Tools",
    desc:  "Open-source tools and APIs developed throughout the project.",
    href:  "/tools",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: Zap,
    title: "SPARQL Explorer",
    desc:  "Query our knowledge graph directly in the browser with live results.",
    href:  "/sparql",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: Layers,
    title: "Ontologies",
    desc:  "Reusable vocabularies and ontologies produced by the project.",
    href:  "/ontologies",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: FileText,
    title: "Use Cases",
    desc:  "Real-world applications and impact stories from our research.",
    href:  "/use-cases",
    color: "bg-sky-50 text-sky-700",
  },
];

const RECENT_POSTS = [
  {
    title:     "Milestone 3 completed: Knowledge graph integration live",
    date:      "15 March 2025",
    category:  "Research Update",
    href:      "/blog/milestone-3",
  },
  {
    title:     "Workshop on Semantic Web Technologies — Call for Papers",
    date:      "2 February 2025",
    category:  "Event",
    href:      "/blog/workshop-cfp",
  },
  {
    title:     "New dataset release: v2.0 with 12M new triples",
    date:      "10 January 2025",
    category:  "News",
    href:      "/blog/dataset-v2",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                          bg-brand-sky/10 blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                          bg-brand-gold/8 blur-3xl -translate-x-1/3 translate-y-1/3" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        <div className="content-grid relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                             bg-brand-gold/20 text-brand-gold text-xs font-sans font-semibold
                             tracking-widest uppercase border border-brand-gold/30">
              <Award size={11} /> Funded Research Project
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white
                         leading-tight max-w-3xl mb-6 animate-fade-up delay-100">
            {process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Your Research Project"}{" "}
            <em className="text-brand-gold not-italic">Knowledge Graph</em>
          </h1>

          <p className="font-body text-lg text-white/70 max-w-2xl leading-relaxed mb-10
                        animate-fade-up delay-200">
            We are building open, interoperable knowledge graphs to advance research in
            [your domain]. Explore our datasets, tools, publications, and live SPARQL endpoint.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
            <Link href="/about" className="btn-gold">
              About the Project <ArrowRight size={15} />
            </Link>
            <Link href="/sparql"
                  className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              Try SPARQL Explorer
            </Link>
          </div>

          {/* Partner logos strip */}
          <div className="mt-16 pt-10 border-t border-white/10 animate-fade-up delay-400">
            <p className="font-sans text-xs text-white/40 uppercase tracking-widest mb-5">
              Funded & supported by
            </p>
            <div className="flex flex-wrap items-center gap-8 opacity-50">
              {["EU Horizon", "NSF", "EPSRC", "Partner University"].map((p) => (
                <span key={p} className="font-sans font-semibold text-sm text-white/80">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="bg-brand-paper border-b border-brand-border">
        <div className="content-grid">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y
                          sm:divide-y-0 divide-brand-border">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center justify-center
                                          gap-1 py-8 px-4 text-center group">
                <Icon size={18} className="text-brand-sky mb-1 group-hover:text-brand-gold transition-colors" />
                <p className="font-serif text-2xl font-bold text-brand-navy">{value}</p>
                <p className="font-sans text-xs text-brand-muted uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature grid ─────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="content-grid">
          <div className="mb-12 text-center">
            <p className="section-eyebrow">What we offer</p>
            <h2 className="section-title mb-4">Open Research Resources</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              All research outputs are freely available and FAIR-compliant — findable,
              accessible, interoperable, and reusable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, href, color }) => (
              <Link key={title} href={href} className="card-hover group p-6 block">
                <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-lg text-brand-navy mb-2 group-hover:text-brand-sky transition-colors">
                  {title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">{desc}</p>
                <span className="font-sans text-xs font-medium text-brand-sky
                                 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest news ──────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-paper border-t border-brand-border">
        <div className="content-grid">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">Latest</p>
              <h2 className="section-title">News & Updates</h2>
            </div>
            <Link href="/blog" className="btn-secondary hidden sm:inline-flex">
              All posts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {RECENT_POSTS.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="card group flex items-start gap-5 p-5 hover:border-brand-sky/30"
              >
                <div className="hidden sm:block flex-shrink-0 text-right min-w-[90px]">
                  <p className="font-sans text-xs text-brand-muted">{post.date}</p>
                </div>
                <div className="w-px bg-brand-border self-stretch hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <span className="badge mb-2">{post.category}</span>
                  <h3 className="font-sans font-medium text-brand-navy group-hover:text-brand-sky
                                  transition-colors text-sm leading-snug">
                    {post.title}
                  </h3>
                </div>
                <ArrowRight size={16} className="text-brand-border group-hover:text-brand-sky
                                                  transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/blog" className="btn-secondary w-full justify-center">
              All posts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-sky">
        <div className="content-grid text-center">
          <p className="section-eyebrow text-white/60">Try it now</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Query our Knowledge Graph
          </h2>
          <p className="font-body text-white/80 max-w-xl mx-auto mb-8">
            Use our interactive SPARQL explorer to run federated queries against
            our triplestore directly from your browser.
          </p>
          <Link href="/sparql"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-sky
                           font-sans font-semibold rounded hover:bg-brand-cream
                           transition-colors shadow-lg">
            Open SPARQL Explorer <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
