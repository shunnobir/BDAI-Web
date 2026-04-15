import { CheckCircle2, Clock, Circle, AlertCircle } from "lucide-react";

const STATUS_CONFIG = {
  completed:   { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200", label: "Completed" },
  "in-progress":{ icon: Clock,       color: "text-brand-sky",   bg: "bg-blue-50 border-blue-200",       label: "In Progress" },
  upcoming:    { icon: Circle,       color: "text-brand-muted", bg: "bg-brand-cream border-brand-border",label: "Upcoming" },
  delayed:     { icon: AlertCircle,  color: "text-amber-500",   bg: "bg-amber-50 border-amber-200",     label: "Delayed" },
};

const MOCK_MILESTONES = [
  { id: "1", title: "Project Kickoff", date: "Jan 2023", workPackage: "WP0", status: "completed", description: "Official project start, team onboarding, and infrastructure setup." },
  { id: "2", title: "Requirements Analysis & Ontology Design", date: "Apr 2023", workPackage: "WP1", status: "completed", description: "Domain requirements gathered from stakeholders; initial ontology framework designed." },
  { id: "3", title: "Knowledge Graph v1.0 Release", date: "Sep 2023", workPackage: "WP2", status: "completed", description: "First public release of the knowledge graph with 10M triples and SPARQL endpoint." },
  { id: "4", title: "Tool Suite Beta Release", date: "Jan 2024", workPackage: "WP3", status: "completed", description: "Beta versions of all core tools released on GitHub." },
  { id: "5", title: "Knowledge Graph v2.0 & Benchmark Release", date: "Jun 2024", workPackage: "WP2", status: "in-progress", description: "Major update to the knowledge graph including 50M triples; entity alignment benchmark published." },
  { id: "6", title: "International Workshop", date: "Oct 2024", workPackage: "WP4", status: "upcoming", description: "International workshop co-located with a major conference; papers and demos presented." },
  { id: "7", title: "Final Evaluation & Impact Assessment", date: "Mar 2025", workPackage: "WP5", status: "upcoming", description: "Comprehensive evaluation of all project outputs and societal impact assessment." },
  { id: "8", title: "Project Completion & Final Report", date: "Jun 2025", workPackage: "WP0", status: "upcoming", description: "Submission of final project report to funders; all resources archived." },
];

export const metadata = { title: "Project Timeline" };

export default function TimelinePage() {
  return (
    <div className="content-grid py-12">
      <div className="mb-12">
        <p className="section-eyebrow">Project Lifecycle</p>
        <h1 className="section-title mb-3">Timeline & Milestones</h1>
        <p className="section-subtitle max-w-2xl">
          Track the project's progress from kickoff to completion across all work packages.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {Object.entries(STATUS_CONFIG).map(([key, { icon: Icon, color, bg, label }]) => (
          <span key={key} className={`badge ${bg} flex items-center gap-1.5`}>
            <Icon size={12} className={color} /> {label}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-brand-border" />

        <div className="space-y-6">
          {MOCK_MILESTONES.map((m) => {
            const { icon: Icon, color, bg } = STATUS_CONFIG[m.status as keyof typeof STATUS_CONFIG];
            return (
              <div key={m.id} className="relative flex gap-6 pl-12">
                {/* Icon bubble */}
                <div className={`absolute left-0 w-10 h-10 rounded-full border-2 ${bg}
                                  flex items-center justify-center flex-shrink-0 bg-brand-paper z-10`}>
                  <Icon size={16} className={color} />
                </div>

                {/* Content card */}
                <div className="card flex-1 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="badge mb-2">{m.workPackage}</span>
                      <h3 className="font-serif text-base text-brand-navy">{m.title}</h3>
                    </div>
                    <span className="font-sans text-xs text-brand-muted whitespace-nowrap">{m.date}</span>
                  </div>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
