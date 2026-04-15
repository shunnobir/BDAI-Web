import { Calendar, MapPin, ExternalLink, Video, FileText } from "lucide-react";

export const metadata = { title: "Events & Workshops" };

const MOCK_EVENTS = [
  {
    id: "1", title: "International Workshop on Open Knowledge Graphs",
    eventType: "workshop", startDate: "2025-10-20", endDate: "2025-10-20",
    location: "Vienna, Austria", venue: "Co-located with ISWC 2025",
    description: "A full-day workshop bringing together researchers working on knowledge graph construction, alignment, and publication. Featuring invited talks, paper presentations, and a hands-on tutorial session.",
    registrationUrl: "https://example.com/register", recordingUrl: null, slidesUrl: null, upcoming: true,
  },
  {
    id: "2", title: "Tutorial: Building Knowledge Graphs with KGBuilder",
    eventType: "tutorial", startDate: "2025-06-15", endDate: "2025-06-15",
    location: "Online (Zoom)", venue: null,
    description: "A 3-hour hands-on tutorial covering end-to-end knowledge graph construction using our open-source KGBuilder toolkit.",
    registrationUrl: "https://example.com/register-tutorial", recordingUrl: null, slidesUrl: null, upcoming: true,
  },
  {
    id: "3", title: "Seminar: FAIR Data Principles in Knowledge Graph Research",
    eventType: "seminar", startDate: "2024-11-08", endDate: "2024-11-08",
    location: "University of Example", venue: "Room CS-104",
    description: "An invited seminar on applying FAIR data principles to the publication and reuse of research knowledge graphs.",
    registrationUrl: null, recordingUrl: "https://youtube.com/example", slidesUrl: "https://slides.com/example", upcoming: false,
  },
  {
    id: "4", title: "Hackathon: Linked Data for Open Science",
    eventType: "hackathon", startDate: "2024-09-12", endDate: "2024-09-13",
    location: "Berlin, Germany", venue: "Mozilla Festival Space",
    description: "A 2-day hackathon exploring how linked data and knowledge graphs can accelerate open science. 18 teams, 3 prize categories.",
    registrationUrl: null, recordingUrl: null, slidesUrl: "https://slides.com/hackathon", upcoming: false,
  },
];

const TYPE_STYLE: Record<string, string> = {
  workshop:   "badge-sky",
  tutorial:   "badge-green",
  seminar:    "badge",
  hackathon:  "badge-gold",
  conference: "badge-sky",
  webinar:    "badge",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function EventsPage() {
  const upcoming = MOCK_EVENTS.filter((e) => e.upcoming);
  const past     = MOCK_EVENTS.filter((e) => !e.upcoming);

  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Community</p>
        <h1 className="section-title mb-3">Events & Workshops</h1>
        <p className="section-subtitle max-w-2xl">
          Workshops, tutorials, seminars, and hackathons organised or co-organised by the project team.
        </p>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-14">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold
                         mb-6 pb-3 border-b border-brand-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((event) => (
              <article key={event.id} className="card p-6 border-brand-sky/30">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={TYPE_STYLE[event.eventType] ?? "badge"}>
                    {event.eventType}
                  </span>
                  <span className="badge-gold">Upcoming</span>
                </div>
                <h3 className="font-serif text-lg text-brand-navy mb-3 leading-snug">{event.title}</h3>
                <div className="space-y-1.5 mb-4">
                  <p className="flex items-center gap-2 font-sans text-xs text-brand-muted">
                    <Calendar size={12} className="text-brand-sky" />
                    {formatDate(event.startDate)}
                    {event.endDate !== event.startDate && ` – ${formatDate(event.endDate)}`}
                  </p>
                  <p className="flex items-center gap-2 font-sans text-xs text-brand-muted">
                    <MapPin size={12} className="text-brand-sky" />
                    {event.location}
                    {event.venue && ` · ${event.venue}`}
                  </p>
                </div>
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-5 line-clamp-3">
                  {event.description}
                </p>
                {event.registrationUrl && (
                  <a href={event.registrationUrl} target="_blank" rel="noreferrer"
                     className="btn-primary text-sm py-2">
                    <ExternalLink size={13} /> Register
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      <section>
        <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-muted
                       mb-6 pb-3 border-b border-brand-border">
          Past Events
        </h2>
        <div className="space-y-4">
          {past.map((event) => (
            <article key={event.id} className="card p-5 flex flex-col sm:flex-row gap-5">
              {/* Date block */}
              <div className="flex-shrink-0 w-20 text-center">
                <p className="font-serif text-2xl font-bold text-brand-navy">
                  {new Date(event.startDate).getDate()}
                </p>
                <p className="font-sans text-xs text-brand-muted uppercase">
                  {new Date(event.startDate).toLocaleString("en", { month: "short" })}{" "}
                  {new Date(event.startDate).getFullYear()}
                </p>
              </div>
              <div className="w-px bg-brand-border hidden sm:block" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={TYPE_STYLE[event.eventType] ?? "badge"}>{event.eventType}</span>
                  <span className="font-sans text-xs text-brand-muted flex items-center gap-1">
                    <MapPin size={10} /> {event.location}
                  </span>
                </div>
                <h3 className="font-serif text-base text-brand-navy mb-1">{event.title}</h3>
                <p className="font-body text-sm text-brand-muted line-clamp-2">{event.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {event.recordingUrl && (
                  <a href={event.recordingUrl} target="_blank" rel="noreferrer"
                     className="flex items-center gap-1.5 font-sans text-xs text-brand-muted hover:text-brand-navy transition-colors">
                    <Video size={13} /> Recording
                  </a>
                )}
                {event.slidesUrl && (
                  <a href={event.slidesUrl} target="_blank" rel="noreferrer"
                     className="flex items-center gap-1.5 font-sans text-xs text-brand-muted hover:text-brand-navy transition-colors">
                    <FileText size={13} /> Slides
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
