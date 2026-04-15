import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata = { title: "Blog & News" };

const CATEGORIES = ["All", "News", "Research Update", "Tutorial", "Opinion", "Event Recap"];

const MOCK_POSTS = [
  {
    slug: "milestone-3-complete",
    title: "Milestone 3 completed: Knowledge graph integration live",
    excerpt: "We are pleased to announce the successful completion of Milestone 3, which marks the integration of our knowledge graph with the public SPARQL endpoint. This is a major step forward for open data access in our domain.",
    date: "15 March 2025",
    category: "Research Update",
    author: "Alice Smith",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "workshop-cfp",
    title: "Workshop on Semantic Web Technologies — Call for Papers",
    excerpt: "We are co-organising an international workshop co-located with ISWC 2025. We invite submissions on knowledge graph construction, ontology alignment, and linked data applications.",
    date: "2 February 2025",
    category: "Event",
    author: "David Lee",
    readTime: "2 min",
    featured: false,
  },
  {
    slug: "dataset-v2-release",
    title: "New dataset release: v2.0 with 50M triples and improved provenance",
    excerpt: "Version 2.0 of our flagship knowledge graph is now available for download on Zenodo. This release includes 50 million triples, improved entity linking, and full provenance metadata.",
    date: "10 January 2025",
    category: "News",
    author: "Bob Jones",
    readTime: "3 min",
    featured: false,
  },
  {
    slug: "sparql-tutorial",
    title: "Tutorial: Querying our knowledge graph with SPARQL 1.1",
    excerpt: "A step-by-step guide to running federated SPARQL queries against our public endpoint — from basic SELECT patterns to complex aggregations and OPTIONAL clauses.",
    date: "5 December 2024",
    category: "Tutorial",
    author: "Carol White",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "tool-v1-release",
    title: "Announcing KGBuilder v1.0 — our open-source knowledge graph construction toolkit",
    excerpt: "After 18 months of development, we are excited to release KGBuilder v1.0 on GitHub and PyPI. The toolkit provides modular pipelines for entity extraction, relation linking, and RDF serialisation.",
    date: "20 November 2024",
    category: "News",
    author: "Eva Chen",
    readTime: "5 min",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = MOCK_POSTS.find((p) => p.featured);
  const rest = MOCK_POSTS.filter((p) => !p.featured);

  return (
    <div className="content-grid py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="section-eyebrow">Latest</p>
        <h1 className="section-title mb-3">Blog & News</h1>
        <p className="section-subtitle max-w-2xl">
          Research updates, tool releases, event announcements, and tutorials from the project team.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded font-sans text-xs font-medium transition-colors
              ${cat === "All"
                ? "bg-brand-navy text-white"
                : "bg-brand-paper border border-brand-border text-brand-navy/70 hover:text-brand-navy"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {featured && (
        <Link href={`/blog/${featured.slug}`}
              className="card group block p-0 overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Image placeholder */}
            <div className="md:col-span-2 bg-brand-navy/8 min-h-[200px] flex items-center
                            justify-center border-r border-brand-border">
              <span className="font-sans text-xs text-brand-muted">Cover image</span>
            </div>
            <div className="md:col-span-3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-gold">Featured</span>
                  <span className="badge">{featured.category}</span>
                </div>
                <h2 className="font-serif text-2xl text-brand-navy mb-3 leading-snug
                               group-hover:text-brand-sky transition-colors">
                  {featured.title}
                </h2>
                <p className="font-body text-sm text-brand-muted leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-border">
                <div className="flex items-center gap-3 text-xs text-brand-muted font-sans">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                  <span>·</span>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
                <span className="flex items-center gap-1 text-xs font-sans font-medium text-brand-sky
                                  group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Post list */}
      <div className="space-y-4">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
                className="card group flex flex-col sm:flex-row gap-0 overflow-hidden hover:border-brand-sky/30">
            {/* Image strip */}
            <div className="sm:w-48 bg-brand-navy/5 flex items-center justify-center
                            min-h-[100px] border-b sm:border-b-0 sm:border-r border-brand-border flex-shrink-0">
              <span className="font-sans text-[10px] text-brand-muted">Image</span>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="badge text-[11px]">
                    <Tag size={10} /> {post.category}
                  </span>
                </div>
                <h3 className="font-serif text-base text-brand-navy mb-2 leading-snug
                               group-hover:text-brand-sky transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-brand-border
                              text-xs text-brand-muted font-sans">
                <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                <span>·</span>
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.readTime} read</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center pr-5">
              <ArrowRight size={16} className="text-brand-border group-hover:text-brand-sky transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
