import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How long does the second opinion take?", a: "Initial response within 1–3 hours. Case review 12–24 hours. Opinion delivery typically 24–72 hours." },
  { q: "Do I need to travel to the USA?", a: "No. Most consultations and reviews are fully remote. Travel is only needed if you choose in-person treatment." },
  { q: "How secure are my reports?", a: "All uploads are encrypted in transit and at rest, with HIPAA-style access controls and audit logs." },
  { q: "Can I upload MRI / CT scans online?", a: "Yes. DICOM uploads are supported, alongside PDFs, images, and pathology reports." },
  { q: "Which diseases are covered?", a: "From oncology and neurology to rare diseases, transplants, pediatrics and complex multi-system cases." },
  { q: "How are doctors selected?", a: "We match your case to specialists with subspecialty expertise at leading U.S. academic medical centers." },
  { q: "Is AI making the diagnosis?", a: "No. AI assists workflow and surfaces information; licensed physicians make all diagnostic and treatment decisions." },
  { q: "Can family members join consultations?", a: "Yes. Family members and local physicians can join video consults with your consent." },
  { q: "What countries do you support?", a: "Patients across India, the Middle East, Africa, Asia, Europe and beyond — with multilingual support." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-sky">FAQ</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-navy-deep">{f.q}</span>
                  <Plus className={`size-5 text-sky transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed animate-fade-up">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
