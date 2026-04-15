import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";

// In production: fetch from Payload using params.slug
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // TODO: Replace with real Payload fetch:
  // const payload = await getPayloadClient()
  // const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } } })
  // const post = docs[0]

  const MOCK_POST = {
    title:    "Milestone 3 completed: Knowledge graph integration live",
    date:     "15 March 2025",
    author:   "Alice Smith",
    readTime: "4 min",
    category: "Research Update",
    excerpt:  "We are pleased to announce the successful completion of Milestone 3.",
    content: `
## Background

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## What changed

We integrated the knowledge graph with the public SPARQL endpoint, enabling researchers worldwide to query our data directly. The endpoint now serves over 50 million triples across 340 distinct classes.

### Key improvements

- Improved query response time by 40%
- Added support for federated queries
- Published updated ontology documentation
- Released new Python client library

## How to access

The SPARQL endpoint is available at \`/api/sparql\`. See our [SPARQL Explorer](/sparql) for an interactive query interface.

## What's next

Work Package 4 (Evaluation & Benchmarking) begins next month. We will publish the first version of our entity alignment benchmark by June 2025.
    `.trim(),
  };

  return (
    <div className="content-grid py-12">
      <div className="max-w-prose mx-auto">
        {/* Back */}
        <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm font-sans text-brand-muted
                         hover:text-brand-navy transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="badge"><Tag size={10} /> {MOCK_POST.category}</span>
          <span className="font-sans text-xs text-brand-muted flex items-center gap-1">
            <Calendar size={11} /> {MOCK_POST.date}
          </span>
          <span className="font-sans text-xs text-brand-muted flex items-center gap-1">
            <Clock size={11} /> {MOCK_POST.readTime} read
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl text-brand-navy mb-4 leading-tight">
          {MOCK_POST.title}
        </h1>

        <p className="font-body text-lg text-brand-muted mb-8 leading-relaxed border-l-4
                      border-brand-gold pl-4">
          {MOCK_POST.excerpt}
        </p>

        {/* Author bar */}
        <div className="flex items-center justify-between py-4 mb-8
                        border-y border-brand-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center
                            justify-center font-serif text-sm font-bold text-brand-navy">
              {MOCK_POST.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-sans text-sm font-medium text-brand-navy">{MOCK_POST.author}</p>
              <p className="font-sans text-xs text-brand-muted">Research Team</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 font-sans text-xs text-brand-muted
                              hover:text-brand-navy transition-colors">
            <Share2 size={13} /> Share
          </button>
        </div>

        {/* Cover image placeholder */}
        <div className="w-full aspect-[16/7] bg-brand-navy/8 rounded-xl mb-10
                        flex items-center justify-center border border-brand-border">
          <span className="font-sans text-sm text-brand-muted">Cover image</span>
        </div>

        {/* Content — in production render Payload's Lexical rich text */}
        <article className="prose prose-stone max-w-none
                            prose-headings:font-serif prose-headings:text-brand-navy
                            prose-p:font-body prose-p:text-brand-muted prose-p:leading-relaxed
                            prose-a:text-brand-sky prose-a:no-underline hover:prose-a:underline
                            prose-code:font-mono prose-code:text-sm
                            prose-code:bg-brand-navy/8 prose-code:px-1 prose-code:rounded
                            prose-li:font-body prose-li:text-brand-muted">
          {MOCK_POST.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
            if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
            if (block.startsWith("- ")) {
              return (
                <ul key={i}>
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.slice(2)}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-brand-border">
          {["Knowledge Graphs", "SPARQL", "Open Data", "Milestone"].map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>

        {/* Back CTA */}
        <div className="mt-12 pt-8 border-t border-brand-border">
          <Link href="/blog" className="btn-secondary">
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
