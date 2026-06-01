import { CheckCircle2 } from "lucide-react";

const items = [
  "Direct access to U.S. medical expertise",
  "AI-enabled healthcare navigation",
  "Faster second opinions (24–72 hours)",
  "Truly global accessibility & multilingual",
  "Personalized treatment planning",
  "International patient concierge",
  "Secure, encrypted report handling",
  "Transparent, written communication",
  "Multidisciplinary tumor board reviews",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-sky">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
            Built for outcomes. <span className="text-gradient">Designed for trust.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl p-5 bg-card border border-border hover-lift">
              <CheckCircle2 className="size-5 text-sky shrink-0 mt-0.5" />
              <span className="text-foreground/85">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
