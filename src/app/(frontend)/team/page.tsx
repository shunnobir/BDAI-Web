import { Mail, Globe, Github, ExternalLink } from "lucide-react";

const MOCK_TEAM = [
  { name: "Prof. Alice Smith", role: "Principal Investigator", affiliation: "University of Example", memberType: "pi", bio: "Alice leads the project with 20 years of experience in knowledge representation and semantic technologies." },
  { name: "Dr. Bob Jones", role: "Co-Investigator", affiliation: "Institute of Research", memberType: "co-pi", bio: "Bob specialises in ontology engineering and linked data publishing." },
  { name: "Carol White", role: "Postdoctoral Researcher", affiliation: "University of Example", memberType: "postdoc", bio: "Carol's research focuses on SPARQL query optimisation and knowledge graph alignment." },
  { name: "David Lee", role: "PhD Student", affiliation: "University of Example", memberType: "phd", bio: "David is investigating machine learning approaches for knowledge graph completion." },
  { name: "Eva Chen", role: "Research Engineer", affiliation: "University of Example", memberType: "engineer", bio: "Eva builds and maintains the project's open-source tools and infrastructure." },
];

const TYPE_ORDER = ["pi", "co-pi", "postdoc", "engineer", "phd", "collaborator", "alumni"];
const TYPE_LABEL: Record<string, string> = {
  pi: "Principal Investigators", "co-pi": "Co-Investigators",
  postdoc: "Postdoctoral Researchers", phd: "PhD Students",
  engineer: "Research Engineers", collaborator: "Collaborators", alumni: "Alumni",
};

export const metadata = { title: "Team" };

export default function TeamPage() {
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const members = MOCK_TEAM.filter((m) => m.memberType === type);
    if (members.length) acc[type] = members;
    return acc;
  }, {} as Record<string, typeof MOCK_TEAM>);

  return (
    <div className="content-grid py-12">
      <div className="mb-12">
        <p className="section-eyebrow">The People</p>
        <h1 className="section-title mb-3">Our Team</h1>
        <p className="section-subtitle max-w-2xl">
          A multidisciplinary team of researchers, engineers, and collaborators from institutions across the world.
        </p>
      </div>

      {Object.entries(grouped).map(([type, members]) => (
        <section key={type} className="mb-14">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest
                         text-brand-gold mb-6 pb-3 border-b border-brand-border">
            {TYPE_LABEL[type]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.name} className="card p-6 flex flex-col">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-brand-navy/10 flex items-center
                                justify-center text-brand-navy font-serif text-xl font-bold mb-4">
                  {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>

                <h3 className="font-serif text-base text-brand-navy leading-snug">{member.name}</h3>
                <p className="font-sans text-xs text-brand-sky mt-0.5 mb-1">{member.role}</p>
                <p className="font-sans text-xs text-brand-muted mb-3">{member.affiliation}</p>
                <p className="font-body text-sm text-brand-muted leading-relaxed flex-1">{member.bio}</p>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-brand-border">
                  <button className="text-brand-muted hover:text-brand-navy transition-colors" aria-label="Email">
                    <Mail size={15} />
                  </button>
                  <button className="text-brand-muted hover:text-brand-navy transition-colors" aria-label="Website">
                    <Globe size={15} />
                  </button>
                  <button className="text-brand-muted hover:text-brand-navy transition-colors" aria-label="GitHub">
                    <Github size={15} />
                  </button>
                  <button className="text-brand-muted hover:text-brand-navy transition-colors ml-auto text-xs font-sans
                                     flex items-center gap-1" aria-label="ORCID">
                    <ExternalLink size={12} /> ORCID
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
