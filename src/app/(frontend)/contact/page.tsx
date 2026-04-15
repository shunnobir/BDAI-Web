"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin, Github } from "lucide-react";

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", organisation: "", subject: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg]   = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      setForm({ name: "", email: "", organisation: "", subject: "", message: "" });
    } catch (e: unknown) {
      setStatus("error");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <div className="content-grid py-12">
      <div className="mb-10">
        <p className="section-eyebrow">Get in Touch</p>
        <h1 className="section-title mb-3">Contact Us</h1>
        <p className="section-subtitle max-w-2xl">
          Questions about the project, collaboration proposals, or data access requests?
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info column */}
        <aside className="space-y-8">
          {[
            { icon: Mail,   label: "Email", value: "project@university.ac.uk" },
            { icon: MapPin, label: "Location", value: "Department of Computer Science\nUniversity of Example\nCity, Country" },
            { icon: Github, label: "GitHub", value: "github.com/your-org" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-brand-navy/8 flex items-center
                              justify-center flex-shrink-0">
                <Icon size={16} className="text-brand-navy" />
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest
                               text-brand-muted mb-1">{label}</p>
                <p className="font-body text-sm text-brand-navy whitespace-pre-line">{value}</p>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg bg-brand-cream border border-brand-border">
            <p className="font-sans text-xs font-semibold text-brand-navy mb-2">Data Access Requests</p>
            <p className="font-body text-xs text-brand-muted leading-relaxed">
              For bulk data access, custom dataset exports, or collaboration on SPARQL endpoint
              integration, please use the form and select "Data Access" as the subject.
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 p-12
                            text-center rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle size={40} className="text-emerald-500" />
              <div>
                <h3 className="font-serif text-xl text-brand-navy mb-2">Message sent!</h3>
                <p className="font-body text-sm text-brand-muted">
                  We'll get back to you within 2–3 working days.
                </p>
              </div>
              <button onClick={() => setStatus("idle")} className="btn-secondary mt-2">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name",  label: "Full name *", type: "text",  placeholder: "Jane Smith",        required: true },
                  { id: "email", label: "Email *",      type: "email", placeholder: "jane@example.com",  required: true },
                ].map(({ id, label, type, placeholder, required }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block font-sans text-xs font-semibold
                                                    text-brand-navy mb-1.5">
                      {label}
                    </label>
                    <input
                      id={id} type={type} placeholder={placeholder} required={required}
                      value={form[id as keyof typeof form]}
                      onChange={(e) => update(id, e.target.value)}
                      className="w-full px-3 py-2.5 rounded border border-brand-border bg-white
                                 font-sans text-sm text-brand-navy placeholder-brand-muted/50
                                 focus:outline-none focus:border-brand-sky transition-colors"
                    />
                  </div>
                ))}
              </div>

              {[
                { id: "organisation", label: "Organisation", placeholder: "University / Company" },
                { id: "subject",      label: "Subject",      placeholder: "e.g. Collaboration inquiry, Data access" },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block font-sans text-xs font-semibold text-brand-navy mb-1.5">
                    {label}
                  </label>
                  <input
                    id={id} type="text" placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={(e) => update(id, e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-brand-border bg-white
                               font-sans text-sm text-brand-navy placeholder-brand-muted/50
                               focus:outline-none focus:border-brand-sky transition-colors"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block font-sans text-xs font-semibold text-brand-navy mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message" required rows={6}
                  placeholder="Tell us about your inquiry…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full px-3 py-2.5 rounded border border-brand-border bg-white
                             font-sans text-sm text-brand-navy placeholder-brand-muted/50
                             focus:outline-none focus:border-brand-sky transition-colors resize-y"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={15} />{errMsg}
                </div>
              )}

              <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center">
                {status === "loading"
                  ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
