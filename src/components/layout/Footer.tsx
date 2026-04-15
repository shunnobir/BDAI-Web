import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

const FOOTER_LINKS = {
  Research: [
    { label: "Publications",  href: "/publications" },
    { label: "Datasets",      href: "/datasets" },
    { label: "Tools",         href: "/tools" },
    { label: "Ontologies",    href: "/ontologies" },
    { label: "SPARQL Endpoint", href: "/sparql" },
  ],
  Project: [
    { label: "About",         href: "/about" },
    { label: "Team",          href: "/team" },
    { label: "Events",        href: "/events" },
    { label: "Timeline",      href: "/timeline" },
    { label: "Partners",      href: "/partners" },
  ],
  Connect: [
    { label: "Blog",          href: "/blog" },
    { label: "Media & Press", href: "/media" },
    { label: "FAQ",           href: "/faq" },
    { label: "Contact",       href: "/contact" },
  ],
};

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Research Project";
const acronym     = process.env.NEXT_PUBLIC_PROJECT_ACRONYM ?? "RP";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-navy text-white/80 mt-24">
      <div className="content-grid py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-brand-gold flex items-center justify-center
                              text-brand-navy font-serif font-bold text-sm">
                {acronym.slice(0, 2)}
              </div>
              <span className="font-serif text-white font-semibold">{projectName}</span>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4">
              A funded research project advancing open science through knowledge graphs,
              linked data, and semantic technologies.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                 className="text-white/50 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="/contact"
                 className="text-white/50 hover:text-white transition-colors" aria-label="Contact">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase
                            text-brand-gold mb-4">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-white/40">
            © {year} {projectName}. Content licensed under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
               rel="noreferrer" className="underline hover:text-white/70 transition-colors">
              CC BY 4.0
            </a>{" "}
            unless otherwise stated.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors
                         flex items-center gap-1"
            >
              Admin <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
