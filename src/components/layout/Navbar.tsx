"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { label: "About",        href: "/about" },
  {
    label: "Research",
    href: "#",
    children: [
      { label: "Publications",     href: "/publications" },
      { label: "Datasets",         href: "/datasets" },
      { label: "Tools",            href: "/tools" },
      { label: "Ontologies",       href: "/ontologies" },
      { label: "Use Cases",        href: "/use-cases" },
    ],
  },
  {
    label: "Explore",
    href: "#",
    children: [
      { label: "SPARQL Endpoint",  href: "/sparql" },
      { label: "Demos",            href: "/demos" },
      { label: "Documentation",    href: "/docs" },
    ],
  },
  { label: "Team",         href: "/team" },
  { label: "Events",       href: "/events" },
  { label: "Blog",         href: "/blog" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Timeline",         href: "/timeline" },
      { label: "Media & Press",    href: "/media" },
      { label: "Partners",         href: "/partners" },
      { label: "FAQ",              href: "/faq" },
      { label: "Contact",          href: "/contact" },
    ],
  },
];

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME ?? "ResearchProject";
const acronym     = process.env.NEXT_PUBLIC_PROJECT_ACRONYM ?? "RP";

export function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [dropdown,  setDropdown]  = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-paper/95 backdrop-blur border-b border-brand-border shadow-card"
          : "bg-brand-paper/90 backdrop-blur"
      }`}
    >
      <div className="content-grid">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-brand-navy flex items-center justify-center
                            text-white font-serif font-bold text-sm group-hover:bg-brand-blue
                            transition-colors duration-200">
              {acronym.slice(0, 2)}
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-brand-navy font-semibold text-sm leading-tight">{projectName}</p>
              <p className="font-sans text-[10px] text-brand-muted tracking-wide uppercase">Research Project</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="nav-link flex items-center gap-1 px-3 py-2">
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${dropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdown === item.label && (
                    <div className="absolute top-full left-0 pt-1 min-w-[200px] animate-fade-in">
                      <div className="bg-brand-paper border border-brand-border rounded-lg shadow-panel py-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm font-sans text-brand-navy/80
                                       hover:text-brand-navy hover:bg-brand-cream transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link px-3 py-2 ${pathname === item.href ? "active text-brand-navy" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/sparql" className="hidden md:inline-flex btn-primary text-xs py-2 px-4">
              SPARQL Explorer
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-brand-navy/70 hover:text-brand-navy"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-brand-border bg-brand-paper shadow-panel">
          <nav className="content-grid py-4 space-y-0.5">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-2 text-xs font-sans font-semibold uppercase tracking-widest
                                text-brand-gold mt-3 mb-1">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 text-sm font-sans text-brand-navy/80
                                 hover:text-brand-navy hover:bg-brand-cream rounded transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-sans text-brand-navy/80
                             hover:text-brand-navy hover:bg-brand-cream rounded transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-brand-border mt-3">
              <Link href="/sparql" className="btn-primary w-full justify-center">
                SPARQL Explorer
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
