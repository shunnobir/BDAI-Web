import { ExternalLink, Newspaper, Mic, Video, Radio } from "lucide-react";

export const metadata = { title: "Media & Press" };

const TYPE_ICON: Record<string, typeof ExternalLink> = {
  article: Newspaper, interview: Mic, podcast: Radio, video: Video,
  "press-release": Newspaper,
};

const MOCK_COVERAGE = [
  { headline: "Open Knowledge Graphs — The Future of Scientific Data Sharing", outlet: "Nature News & Views", date: "12 Feb 2025", url: "https://nature.com/example", mediaType: "article", excerpt: "Researchers present a compelling case for why structured knowledge graphs represent the next frontier in open science infrastructure." },
  { headline: "How Linked Data is Changing Research", outlet: "BBC Science", date: "5 Jan 2025", url: "https://bbc.com/example", mediaType: "interview", excerpt: "Principal Investigator Prof. Alice Smith discusses the practical impact of the project on reproducibility in research." },
  { headline: "Project Releases 50 Million Triple Knowledge Graph", outlet: "TechCrunch", date: "15 Jan 2025", url: "https://techcrunch.com/example", mediaType: "article", excerpt: "The open dataset, now available on Zenodo, is expected to accelerate research in multiple domains." },
  { headline: "Semantic Web Technology Podcast — Episode 142", outlet: "SW Podcast", date: "20 Nov 2024", url: "https://swpodcast.example.com", mediaType: "podcast", excerpt: "A 45-minute deep dive into knowledge graph construction pipelines with the engineering team." },
];

export default function MediaPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Press & Media</p>
        <h1 className="section-title mb-3">In the News</h1>
        <p className="section-subtitle max-w-2xl">
          Media coverage, interviews, and press mentions of the project and its outputs.
          For press enquiries, please contact us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_COVERAGE.map((item) => {
          const Icon = TYPE_ICON[item.mediaType] ?? Newspaper;
          return (
            <a
              key={item.headline}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="card group p-6 block hover:border-brand-sky/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-navy/8 flex items-center
                                justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans font-semibold text-xs text-brand-gold">{item.outlet}</span>
                    <span className="text-brand-border">·</span>
                    <span className="font-sans text-xs text-brand-muted">{item.date}</span>
                  </div>
                  <h3 className="font-serif text-base text-brand-navy mb-2 leading-snug
                                 group-hover:text-brand-sky transition-colors">
                    {item.headline}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <ExternalLink size={14} className="text-brand-border group-hover:text-brand-sky
                                                    transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Press kit */}
      <div className="mt-12 p-6 rounded-xl bg-brand-navy text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
              Press Kit
            </p>
            <p className="font-serif text-lg text-white">Media resources & press contacts</p>
            <p className="font-body text-sm text-white/60 mt-1">
              Download logos, project description, and key statistics for press use.
            </p>
          </div>
          <a href="/contact" className="btn-gold flex-shrink-0">
            Contact Press Office
          </a>
        </div>
      </div>
    </div>
  );
}
