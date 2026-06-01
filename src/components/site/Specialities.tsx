const items = [
  { icon: "🎗️", name: "Oncology", desc: "Solid tumors, blood cancers, precision therapy." },
  { icon: "🧠", name: "Neurology", desc: "Stroke, epilepsy, MS, movement disorders." },
  { icon: "⚕️", name: "Neurosurgery", desc: "Brain tumors, spine, vascular surgery." },
  { icon: "❤️", name: "Cardiology", desc: "CAD, arrhythmia, structural heart." },
  { icon: "🫀", name: "Cardiac Surgery", desc: "Bypass, valve, complex repair." },
  { icon: "🦴", name: "Orthopedics & Spine", desc: "Joint replacement, sports, spine." },
  { icon: "👶", name: "Pediatrics", desc: "Neonatal, pediatric oncology, congenital." },
  { icon: "👶🏻", name: "IVF & Fertility", desc: "Advanced ART, donor programs." },
  { icon: "🫁", name: "Pulmonology", desc: "Interstitial lung, COPD, sleep." },
  { icon: "🩺", name: "Gastroenterology", desc: "IBD, hepatology, advanced endoscopy." },
  { icon: "🧫", name: "Urology", desc: "Prostate, kidney, robotic urology." },
  { icon: "🩸", name: "Nephrology", desc: "CKD, dialysis, transplant workup." },
  { icon: "🧬", name: "Endocrinology", desc: "Diabetes, thyroid, adrenal." },
  { icon: "🦵", name: "Rheumatology", desc: "Autoimmune, biologics guidance." },
  { icon: "🫁", name: "Transplant Guidance", desc: "Liver, kidney, heart, lung pathways." },
  { icon: "🩻", name: "Radiology & Imaging", desc: "MRI, CT, PET, second-read." },
  { icon: "🧪", name: "Precision Medicine", desc: "Genomics, biomarkers, NGS." },
  { icon: "❓", name: "Rare Diseases", desc: "Undiagnosed and orphan conditions." },
];

export function Specialities() {
  return (
    <section id="specialities" className="py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <span className="size-1.5 rounded-full bg-sky" /> Specialities
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
            Expert care across <span className="text-gradient">every major specialty</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((s) => (
            <div
              key={s.name}
              className="group rounded-2xl p-5 bg-card border border-border hover-lift cursor-pointer"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-3 font-display font-semibold text-navy-deep">{s.name}</div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
              <div className="mt-3 text-xs font-semibold text-sky opacity-0 group-hover:opacity-100 transition">
                Request opinion →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
