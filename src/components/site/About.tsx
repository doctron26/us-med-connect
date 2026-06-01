import worldMap from "@/assets/world-map-connections.jpg";

const stats = [
  { k: "50+", v: "Countries Served" },
  { k: "13+", v: "Top U.S. Hospitals" },
  { k: "24–72h", v: "Opinion Delivery" },
  { k: "30+", v: "Medical Specialties" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 gradient-soft">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 gradient-sky rounded-3xl blur-3xl opacity-20" />
          <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img src={worldMap} alt="Global medical access connecting patients to U.S. specialists"
              loading="lazy" width={1536} height={768} className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {stats.map((s) => (
              <div key={s.v} className="glass rounded-2xl p-5 shadow-card">
                <div className="text-3xl font-display font-bold text-gradient">{s.k}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <span className="size-1.5 rounded-full bg-sky" /> About USAMedTravel
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-navy-deep">
            Bringing America's Top Medical Expertise{" "}
            <span className="text-gradient">To Patients Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            USAMedTravel combines AI-assisted healthcare intelligence with access to globally
            reputed U.S. specialists and institutions — helping patients make informed treatment
            decisions without unnecessary delays or travel.
          </p>

          <ul className="space-y-3 pt-2">
            {[
              "Multidisciplinary review from leading U.S. academic centers",
              "AI-organized records & smart specialist routing",
              "Concierge support for international patients & families",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 size-5 rounded-full gradient-sky flex items-center justify-center text-white text-[10px]">✓</span>
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
