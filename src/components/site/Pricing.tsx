import { useEffect, useState } from "react";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";
import { supabase } from "@/lib/supabase";

type Tier = {
  id: string;
  name: string;
  price: string;
  unit?: string;
  tagline: string;
  featured?: boolean;
  sort_order: number;
};

// Fallback data — used while fetching or on error so the page never appears empty
const FALLBACK_TIERS: Tier[] = [
  { id: "basic",      name: "Basic Second Opinion",    price: "$299",   unit: "one-time",  tagline: "Written specialist review",        featured: false, sort_order: 1 },
  { id: "specialist", name: "Specialist Consultation", price: "$599",   unit: "one-time",  tagline: "Live video with U.S. doctor",       featured: true,  sort_order: 2 },
  { id: "tumor",      name: "Oncology / Tumor Board",  price: "$1,499", unit: "per case",  tagline: "Multidisciplinary cancer panel",    featured: false, sort_order: 3 },
  { id: "concierge",  name: "Concierge Package",        price: "Custom", unit: "tailored",  tagline: "End-to-end medical travel",         featured: false, sort_order: 4 },
];

type Cell = boolean | string;
type Group = { title: string; rows: { label: string; values: Record<string, Cell> }[] };

const groups: Group[] = [
  {
    title: "Clinical Review",
    rows: [
      { label: "Written specialist opinion", values: { basic: true, specialist: true, tumor: true, concierge: true } },
      { label: "Turnaround time", values: { basic: "48–72h", specialist: "24–48h", tumor: "5–7 days", concierge: "Priority" } },
      { label: "Live video consultation", values: { basic: false, specialist: "45 min", tumor: "60 min", concierge: "Unlimited" } },
      { label: "AI-assisted case summary", values: { basic: true, specialist: true, tumor: true, concierge: true } },
      { label: "Multidisciplinary tumor board", values: { basic: false, specialist: false, tumor: true, concierge: true } },
    ],
  },
  {
    title: "Care Navigation",
    rows: [
      { label: "Treatment roadmap", values: { basic: false, specialist: true, tumor: true, concierge: true } },
      { label: "Clinical trial navigation", values: { basic: false, specialist: false, tumor: true, concierge: true } },
      { label: "Hospital & appointment coordination", values: { basic: false, specialist: false, tumor: false, concierge: true } },
      { label: "Visa & travel concierge", values: { basic: false, specialist: false, tumor: false, concierge: true } },
      { label: "Dedicated relationship manager", values: { basic: false, specialist: false, tumor: false, concierge: true } },
    ],
  },
  {
    title: "Security & Access",
    rows: [
      { label: "Secure portal & encrypted uploads", values: { basic: true, specialist: true, tumor: true, concierge: true } },
      { label: "HIPAA & GDPR compliant", values: { basic: true, specialist: true, tumor: true, concierge: true } },
    ],
  },
];

function CellRender({ v, featured }: { v: Cell; featured?: boolean }) {
  if (v === true)
    return (
      <span
        className={`inline-flex size-7 rounded-full items-center justify-center transition-transform duration-300 hover:scale-110 ${
          featured ? "bg-teal text-navy-deep shadow-[0_0_0_4px_rgba(20,184,166,0.15)]" : "bg-sky/10 text-sky"
        }`}
      >
        <Check className="size-4" strokeWidth={3} />
      </span>
    );
  if (v === false) return <Minus className="size-4 text-muted-foreground/30 mx-auto" />;
  return (
    <span className={`text-sm font-semibold ${featured ? "text-teal" : "text-navy-deep"}`}>{v}</span>
  );
}

// Skeleton loader for price cells while fetching
function PriceSkeleton() {
  return (
    <div className="animate-pulse space-y-1.5">
      <div className="h-8 w-16 rounded-lg bg-slate-200/60 mx-auto" />
      <div className="h-3 w-10 rounded bg-slate-200/40 mx-auto" />
    </div>
  );
}

export function Pricing() {
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    supabase
      .from("pricing_plans")
      .select("id, name, price, unit, tagline, featured, sort_order")
      .order("sort_order")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setTiers(data as Tier[]);
        }
        // On error: silently keep fallback values — page stays functional
        setFetching(false);
      });
  }, []);

  const gridCols = "grid-cols-[1.5fr_repeat(4,1fr)]";

  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary/40 relative overflow-hidden">
      <div className="absolute -top-32 -left-20 size-[420px] rounded-full glow-sky" />
      <div className="absolute -bottom-40 -right-20 size-[420px] rounded-full glow-teal" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <Sparkles className="size-3.5" /> Transparent Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
            Compare plans in <span className="text-gradient">USD</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Pick the level of care that fits your case. Custom pricing available for complex international journeys.
          </p>
        </Reveal>

        <Reveal className="rounded-3xl overflow-hidden border border-border shadow-elegant bg-card">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px] lg:min-w-0">
              {/* Header row */}
          <div className={`grid ${gridCols} bg-gradient-to-br from-white via-ice/30 to-white border-b border-border`}>
            <div className="hidden md:flex items-end p-6">
              <div>
                <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">Plans</div>
                <div className="font-display text-lg font-bold text-navy-deep mt-1">Features</div>
              </div>
            </div>
            <div className="md:hidden p-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">Plan</div>
            {tiers.map((t, i) => (
              <div
                key={t.id}
                className={`relative p-5 md:p-7 text-center border-l border-border transition-all hover:-translate-y-0.5 ${
                  t.featured ? "gradient-hero text-white" : "bg-white"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {t.featured ? (
                  <span className="mb-3 inline-block px-3 py-1 rounded-full bg-teal text-navy-deep text-[10px] font-bold tracking-wider whitespace-nowrap shadow-md animate-glow-pulse">
                    MOST POPULAR
                  </span>
                ) : (
                  <span className="mb-3 inline-block h-[24px]" aria-hidden="true" />
                )}
                <div className={`text-[11px] font-semibold tracking-widest uppercase ${t.featured ? "text-teal" : "text-sky"}`}>
                  {t.name}
                </div>
                <div className={`font-display text-3xl md:text-4xl font-bold mt-3 ${t.featured ? "text-white" : "text-navy-deep"}`}>
                  {fetching ? <PriceSkeleton /> : t.price}
                </div>
                {!fetching && (
                  <div className={`text-[11px] mt-1 uppercase tracking-wider ${t.featured ? "text-white/60" : "text-muted-foreground/80"}`}>
                    {t.unit}
                  </div>
                )}
                <div className={`text-xs mt-3 leading-relaxed ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>
                  {t.tagline}
                </div>
              </div>
            ))}
          </div>

          {/* Grouped rows */}
          {groups.map((g) => (
            <div key={g.title} className="group/section">
              <div className={`grid ${gridCols} bg-gradient-to-r from-ice/60 to-transparent border-y border-border`}>
                <div className="p-3 md:p-4 text-[11px] font-bold tracking-widest uppercase text-sky">
                  {g.title}
                </div>
                {tiers.map((t) => (
                  <div key={t.id} className={`border-l border-border ${t.featured ? "bg-navy-deep/[0.04]" : ""}`} />
                ))}
              </div>

              {g.rows.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid ${gridCols} items-center transition-colors duration-200 hover:bg-ice/50 ${
                    i % 2 === 0 ? "bg-background" : "bg-secondary/20"
                  }`}
                >
                  <div className="p-4 md:p-5 text-sm font-medium text-navy-deep">{r.label}</div>
                  {tiers.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 md:p-5 text-center border-l border-border ${t.featured ? "bg-navy-deep/[0.03]" : ""}`}
                    >
                      <CellRender v={r.values[t.id]} featured={t.featured} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* CTA row */}
          <div className={`grid ${gridCols} bg-gradient-to-b from-background to-ice/40 border-t border-border`}>
            <div className="hidden md:block" />
            {tiers.map((t) => (
              <div key={t.id} className={`p-4 md:p-5 border-l border-border ${t.featured ? "bg-navy-deep/[0.03]" : ""}`}>
                <a
                  href="#contact"
                  className={`group inline-flex w-full items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all hover:scale-[1.04] hover:shadow-glow ${
                    t.featured ? "gradient-hero text-white shadow-glow" : "bg-navy-deep text-white hover:bg-navy"
                  }`}
                >
                  Get Started
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            ))}
          </div>
            </div>
          </div>
        </Reveal>

        <p className="text-center text-xs text-muted-foreground mt-6">
          All prices in USD. Pricing may vary by case complexity and required subspecialties.
        </p>
      </div>
    </section>
  );
}
