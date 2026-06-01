const items = [
  { n: "Priya S.", c: "🇮🇳 India", t: "Avoided unnecessary brain surgery",
    q: "A Stanford neurosurgeon reviewed my husband's MRI within 48 hours and recommended a less invasive approach. Life-changing." },
  { n: "Ahmed K.", c: "🇦🇪 UAE", t: "Oncology second opinion",
    q: "MD Anderson's tumor board confirmed the diagnosis and refined the protocol. The clarity was worth every minute." },
  { n: "Grace O.", c: "🇳🇬 Nigeria", t: "Pediatric specialist matched",
    q: "Boston Children's helped us understand options for our daughter that local doctors couldn't offer." },
  { n: "Daniel M.", c: "🇰🇪 Kenya", t: "Complex cardiac case",
    q: "Cleveland Clinic's review changed the surgical plan completely. We're grateful for USAMedTravel's coordination." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-sky">Patient Stories</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
            Real outcomes from <span className="text-gradient">global patients</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((i) => (
            <figure key={i.n} className="rounded-3xl p-7 bg-card border border-border shadow-card hover-lift">
              <div className="text-4xl text-sky/40 font-serif leading-none">"</div>
              <blockquote className="text-lg text-foreground/85 leading-relaxed -mt-2">
                {i.q}
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="font-display font-semibold text-navy-deep">{i.n}</div>
                  <div className="text-xs text-muted-foreground">{i.c}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full gradient-sky text-white">{i.t}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
