import { Reveal } from "@/hooks/use-reveal";
import { Award, ShieldCheck, Star } from "lucide-react";

type Hospital = {
  name: string;
  domain: string;
  short: string;
  color: string;
  strength: string;
  location: string;
};

const hospitals: Hospital[] = [
  { name: "Mayo Clinic", domain: "mayoclinic.org", short: "MAYO", color: "from-[#003DA5] to-[#0066CC]", strength: "Multidisciplinary care, oncology, cardiology", location: "Rochester, MN" },
  { name: "Johns Hopkins Medicine", domain: "hopkinsmedicine.org", short: "JH", color: "from-[#002D72] to-[#0058A8]", strength: "Neurology, oncology, research excellence", location: "Baltimore, MD" },
  { name: "MD Anderson", domain: "mdanderson.org", short: "MDA", color: "from-[#C8102E] to-[#E63946]", strength: "World leader in cancer treatment", location: "Houston, TX" },
  { name: "Cleveland Clinic", domain: "clevelandclinic.org", short: "CC", color: "from-[#00457C] to-[#0277BD]", strength: "Cardiac surgery, heart & vascular", location: "Cleveland, OH" },
  { name: "Memorial Sloan Kettering", domain: "mskcc.org", short: "MSK", color: "from-[#005DAA] to-[#1E88E5]", strength: "Advanced oncology & immunotherapy", location: "New York, NY" },
  { name: "Stanford Health Care", domain: "stanfordhealthcare.org", short: "SHC", color: "from-[#8C1515] to-[#B83A3A]", strength: "Neurosciences, transplant, AI medicine", location: "Stanford, CA" },
  { name: "Cedars-Sinai", domain: "cedars-sinai.org", short: "CS", color: "from-[#003865] to-[#0B5394]", strength: "Heart, neuroscience, women's health", location: "Los Angeles, CA" },
  { name: "UCLA Health", domain: "uclahealth.org", short: "UCLA", color: "from-[#2774AE] to-[#3CA0E2]", strength: "Transplant, neurology, urology", location: "Los Angeles, CA" },
  { name: "Mount Sinai", domain: "mountsinai.org", short: "MS", color: "from-[#00629B] to-[#1591D6]", strength: "Genomics, cardiology, neurosurgery", location: "New York, NY" },
  { name: "Boston Children's", domain: "childrenshospital.org", short: "BCH", color: "from-[#E03C31] to-[#F26B5C]", strength: "Pediatric subspecialties", location: "Boston, MA" },
  { name: "CHOP Philadelphia", domain: "chop.edu", short: "CHOP", color: "from-[#E4002B] to-[#FF4D6D]", strength: "Pediatric oncology, cardiology", location: "Philadelphia, PA" },
  { name: "Texas Children's", domain: "texaschildrens.org", short: "TCH", color: "from-[#005EB8] to-[#1E88E5]", strength: "Pediatric care & research", location: "Houston, TX" },
];

function LogoBadge({ h, size = "md" }: { h: Hospital; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-10" : "size-12";
  const text = size === "sm" ? "text-[10px]" : "text-xs";
  return (
    <div className={`relative ${dim} rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0`}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${h.domain}&sz=128`}
        alt={`${h.name} logo`}
        loading="lazy"
        className="size-full object-contain p-1.5"
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = "none";
          const fb = img.nextElementSibling as HTMLElement | null;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div
        style={{ display: "none" }}
        className={`absolute inset-0 bg-gradient-to-br ${h.color} text-white items-center justify-center font-display font-bold ${text}`}
      >
        {h.short}
      </div>
    </div>
  );
}

export function Hospitals() {
  return (
    <section id="hospitals" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute top-40 -right-20 size-[400px] rounded-full glow-sky" />
      <div className="absolute -bottom-32 -left-20 size-[400px] rounded-full glow-teal" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <Award className="size-3.5" /> Top U.S. Hospitals Network
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-deep leading-tight mt-3">
            America's most <span className="text-gradient">trusted institutions</span> in your network.
          </h2>
          <p className="text-muted-foreground mt-4">
            We coordinate second opinions and treatment navigation across leading U.S. medical centers.
          </p>
        </Reveal>

        {/* Logo marquee */}
        <Reveal className="mb-14 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-ice/30 to-white shadow-card relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex gap-14 py-8 px-6 animate-marquee whitespace-nowrap">
            {[...hospitals, ...hospitals].map((h, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0 group">
                <div className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <LogoBadge h={h} size="sm" />
                </div>
                <span className="font-display font-semibold text-navy-deep text-sm">{h.name}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Detailed grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((h, i) => (
            <Reveal key={h.name} delay={i * 50}>
              <a
                href={`https://${h.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full rounded-2xl p-5 bg-card border border-border hover-lift transition-all hover:border-sky/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky/0 to-sky/0 group-hover:from-sky/[0.04] group-hover:to-teal/[0.04] transition-colors" />
                <div className="relative flex items-start gap-3">
                  <LogoBadge h={h} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-navy-deep leading-tight group-hover:text-sky transition-colors">{h.name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{h.location}</div>
                  </div>
                </div>
                <p className="relative text-sm text-muted-foreground mt-3 leading-relaxed">{h.strength}</p>
                <div className="relative flex items-center gap-3 mt-4 pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3 text-sky" /> Verified network</span>
                  <span className="inline-flex items-center gap-1"><Star className="size-3 text-teal" /> Top-ranked</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="text-xs text-muted-foreground italic mt-8 text-center max-w-2xl mx-auto">
          Hospital names, logos, and marks are property of their respective owners and referenced for informational and specialist-network positioning purposes only.
        </p>
      </div>
    </section>
  );
}
