import { ExternalLink } from "lucide-react";

export const metadata = { title: "Partners & Funders" };

const MOCK_PARTNERS = {
  funders: [
    { name: "European Commission — Horizon Europe", grantId: "GA-101234567", grantPeriod: "2023–2026", grantAmount: "€2,500,000", url: "https://ec.europa.eu", description: "Primary funder under Horizon Europe Research and Innovation programme, Work Programme 2022." },
    { name: "National Science Foundation", grantId: "NSF-2312345", grantPeriod: "2023–2025", grantAmount: "$450,000", url: "https://nsf.gov", description: "Co-funder supporting the US-based components of the project." },
  ],
  academic: [
    { name: "University of Example", url: "https://example.ac.uk", description: "Lead institution. Department of Computer Science." },
    { name: "Institute of Research Excellence", url: "https://ire.example.org", description: "Partner institution leading WP4 evaluation activities." },
    { name: "Data Science Hub", url: "https://dshub.example.org", description: "Contributing expertise in large-scale data processing." },
  ],
  industry: [
    { name: "DataCorp GmbH", url: "https://datacorp.example.com", description: "Industry partner providing real-world use case data and validation scenarios." },
  ],
  advisory: [
    { name: "Prof. John Expert", url: null, description: "University of Oxford · Knowledge Representation" },
    { name: "Dr. Maria Advisor", url: null, description: "INRIA Paris · Semantic Web" },
    { name: "Dr. Kenji Scholar", url: null, description: "National Institute of Informatics, Japan" },
  ],
};

const SECTION_LABELS: Record<string, string> = {
  funders:  "Funders",
  academic: "Academic Partners",
  industry: "Industry Partners",
  advisory: "Advisory Board",
};

export default function PartnersPage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-12">
        <p className="section-eyebrow">Collaboration</p>
        <h1 className="section-title mb-3">Partners & Funders</h1>
        <p className="section-subtitle max-w-2xl">
          This project is made possible through the support of our funders and the
          collaboration of partner institutions worldwide.
        </p>
      </div>

      {Object.entries(MOCK_PARTNERS).map(([type, partners]) => (
        <section key={type} className="mb-14">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold
                         mb-6 pb-3 border-b border-brand-border">
            {SECTION_LABELS[type]}
          </h2>

          {type === "funders" ? (
            <div className="space-y-4">
              {partners.map((p) => (
                <div key={p.name} className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg text-brand-navy mb-1">{p.name}</h3>
                      <p className="font-body text-sm text-brand-muted mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="badge font-mono">Grant: {"grantId" in p ? p.grantId : ""}</span>
                        <span className="badge">{"grantPeriod" in p ? p.grantPeriod : ""}</span>
                        <span className="badge-gold">{"grantAmount" in p ? p.grantAmount : ""}</span>
                      </div>
                    </div>
                    {"url" in p && p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="btn-secondary text-xs py-1.5">
                        <ExternalLink size={12} /> Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {partners.map((p) => (
                <div key={p.name} className="card p-5">
                  {/* Logo placeholder */}
                  <div className="w-full h-16 bg-brand-navy/5 rounded mb-4 flex items-center
                                  justify-center border border-brand-border">
                    <span className="font-sans text-xs text-brand-muted">Logo</span>
                  </div>
                  <h3 className="font-sans font-semibold text-sm text-brand-navy mb-1">{p.name}</h3>
                  <p className="font-body text-xs text-brand-muted leading-relaxed mb-3">{p.description}</p>
                  {"url" in p && p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer"
                       className="font-sans text-xs text-brand-sky hover:underline flex items-center gap-1">
                      <ExternalLink size={11} /> Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Acknowledgement box */}
      <div className="mt-4 p-6 rounded-xl bg-brand-navy/5 border border-brand-border">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-muted mb-2">
          Acknowledgement
        </p>
        <p className="font-body text-sm text-brand-muted leading-relaxed">
          This project has received funding from the European Union's Horizon Europe research and
          innovation programme under grant agreement No. 101234567. Views and opinions expressed
          are those of the authors only and do not necessarily reflect those of the European Union
          or the European Research Executive Agency (REA).
        </p>
      </div>
    </div>
  );
}
