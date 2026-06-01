import {
  Stethoscope, Brain, Microscope, Video, ClipboardList,
  Plane, HeartPulse, Dna,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope, title: "U.S. Medical Second Opinions",
    desc: "Remote expert reviews for cancer, neurosurgery, cardiology, orthopedics, rare diseases, and organ conditions."
  },
  {
    icon: Brain, title: "AI-Assisted Radiology Review",
    desc: "Upload MRI, CT, PET, X-Ray, Ultrasound, Pathology. Get AI-assisted interpretation + expert radiology review."
  },
  {
    icon: Microscope, title: "Cancer Intelligence & Oncology",
    desc: "Precision oncology, molecular profiling, tumor board review, immunotherapy guidance, clinical trial navigation."
  },
  {
    icon: Video, title: "Teleconsultation With U.S. Doctors",
    desc: "Secure video consultations with subspecialists, surgeons, and academic experts."
  },
  {
    icon: ClipboardList, title: "Personalized Treatment Planning",
    desc: "Treatment roadmaps, alternative therapies, surgery-necessity review, estimated treatment planning."
  },
  {
    icon: Plane, title: "Medical Travel Concierge",
    desc: "Visa assistance, hospital coordination, accommodation, airport pickup, international patient support."
  },
  {
    icon: HeartPulse, title: "Rare Disease & Complex Case Desk",
    desc: "Dedicated support for undiagnosed and difficult medical cases requiring multidisciplinary expertise."
  },
  {
    icon: Dna, title: "Preventive & Precision Medicine",
    desc: "Genomic health, advanced screening, longevity-focused medicine and personalized healthcare."
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <span className="size-1.5 rounded-full bg-sky" /> Core Services
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep leading-tight">
            A complete <span className="text-gradient">U.S. healthcare</span> ecosystem,
            built around your case.
          </h2>
          <p className="text-lg text-muted-foreground mt-5">
            Eight integrated service lines connecting patients worldwide to America's leading
            specialists, hospitals, and AI-enabled clinical workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative rounded-3xl p-6 bg-card border border-border shadow-card hover-lift overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-16 -right-16 size-40 rounded-full gradient-sky opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
              <div className="size-12 rounded-2xl gradient-sky text-white flex items-center justify-center shadow-glow mb-5">
                <s.icon className="size-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-navy-deep">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
