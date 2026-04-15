"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "About the Project",
    items: [
      {
        q: "What is this project about?",
        a: "This project investigates the construction, publication, and reuse of large-scale open knowledge graphs for scientific research. We build tools, datasets, and ontologies that help researchers publish and consume linked data following FAIR principles.",
      },
      {
        q: "How is the project funded?",
        a: "The project is funded by [Funding Body] under grant [Grant ID]. Additional co-funding is provided by [Co-funder]. See our Partners page for full details.",
      },
      {
        q: "How long does the project run?",
        a: "The project runs for 36 months, from [Start Date] to [End Date]. See the Timeline page for milestone details.",
      },
    ],
  },
  {
    category: "Data & Datasets",
    items: [
      {
        q: "How can I download your datasets?",
        a: "All datasets are freely available on the Datasets page. They are hosted on Zenodo with persistent DOIs, and some are also available on HuggingFace and GitHub. Files are available in RDF/Turtle, JSON-LD, CSV, and other formats.",
      },
      {
        q: "What licence applies to the datasets?",
        a: "Most datasets are published under CC BY 4.0 or CC0 1.0. The specific licence is noted on each dataset page. You are free to use, share, and adapt the data with attribution.",
      },
      {
        q: "Can I request bulk data access or a custom export?",
        a: "Yes — please use the Contact form and select 'Data Access' as the subject. We'll do our best to accommodate reasonable requests.",
      },
      {
        q: "How do I cite a dataset?",
        a: "Each dataset page includes a citation in BibTeX and plain text format. Please cite the DOI where possible. You can also query the SPARQL endpoint and cite the endpoint URL with an access date.",
      },
    ],
  },
  {
    category: "SPARQL Endpoint",
    items: [
      {
        q: "Is the SPARQL endpoint publicly available?",
        a: "Yes — the endpoint is available at /api/sparql. It is read-only; write operations are blocked. You can also use the interactive SPARQL Explorer in your browser.",
      },
      {
        q: "Is there a rate limit?",
        a: "Yes — the public proxy is rate-limited to 60 requests per minute per IP. For high-volume use cases, please contact us to discuss direct access arrangements.",
      },
      {
        q: "What SPARQL version is supported?",
        a: "We support SPARQL 1.1 SELECT, CONSTRUCT, ASK, and DESCRIBE queries. INSERT/DELETE and other write operations are disabled on the public endpoint.",
      },
    ],
  },
  {
    category: "Tools & Code",
    items: [
      {
        q: "Are your tools open source?",
        a: "Yes — all tools are open source and available on GitHub. Most are licensed under MIT or Apache 2.0. Contributions, bug reports, and feature requests are welcome.",
      },
      {
        q: "How do I install the Python tools?",
        a: "Most Python tools are available on PyPI. Install with pip install <tool-name>. See the individual tool documentation for detailed installation instructions.",
      },
    ],
  },
  {
    category: "Collaboration",
    items: [
      {
        q: "Can I collaborate with the project team?",
        a: "Absolutely — we welcome collaborations, research visits, and joint grant applications. Please reach out via the Contact page with a brief description of your interests.",
      },
      {
        q: "Can I use your tools or datasets in my own research?",
        a: "Yes — all resources are freely available for research use. We only ask that you cite the relevant publications and/or datasets. If you publish work using our resources, we'd love to hear about it!",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
      >
        <span className="font-sans font-medium text-sm text-brand-navy group-hover:text-brand-sky
                          transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-brand-muted transition-transform duration-200 mt-0.5
                      ${open ? "rotate-180 text-brand-sky" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="font-body text-sm text-brand-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-12">
        <p className="section-eyebrow">Help</p>
        <h1 className="section-title mb-3">Frequently Asked Questions</h1>
        <p className="section-subtitle max-w-2xl">
          Can't find what you're looking for?{" "}
          <Link href="/contact" className="text-brand-sky hover:underline">
            Get in touch
          </Link>{" "}
          and we'll be happy to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Category nav */}
        <aside className="hidden lg:block">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-muted mb-4">
            Categories
          </p>
          <nav className="space-y-1">
            {FAQS.map(({ category }) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="block font-sans text-sm text-brand-navy/70 hover:text-brand-navy
                           hover:pl-2 transition-all duration-200 py-1"
              >
                {category}
              </a>
            ))}
          </nav>
        </aside>

        {/* FAQ content */}
        <div className="lg:col-span-2 space-y-10">
          {FAQS.map(({ category, items }) => (
            <section
              key={category}
              id={category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
            >
              <h2 className="font-sans text-xs font-semibold uppercase tracking-widest
                             text-brand-gold mb-4 pb-3 border-b border-brand-border">
                {category}
              </h2>
              <div className="card px-5 py-1">
                {items.map((item) => (
                  <FaqItem key={item.q} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
