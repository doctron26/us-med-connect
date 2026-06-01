import { Sparkles, FileSearch, Cpu, Activity, GitBranch, Gauge } from "lucide-react";

const features = [
  { icon: FileSearch, t: "AI Report Organization", d: "Structures unstructured reports & history." },
  { icon: Cpu, t: "Smart Specialist Routing", d: "Matches cases to the right subspecialists." },
  { icon: Activity, t: "Imaging Analysis Assist", d: "AI-aided second read on MRI, CT, PET." },
  { icon: GitBranch, t: "Clinical Data Structuring", d: "Unified timelines across providers." },
  { icon: Gauge, t: "Faster Decision Workflows", d: "Reduce time-to-opinion measurably." },
];

export function AISection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <Sparkles className="size-3.5" /> AI Healthcare Intelligence
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep leading-tight">
            AI that <span className="text-gradient">accelerates clinical workflows</span> —
            doctors that make the call.
          </h2>
          <p className="text-lg text-muted-foreground mt-5">
            Our intelligence layer organizes records, surfaces patterns, and routes your case faster
            so specialists spend their time on judgment, not paperwork.
          </p>
          <p className="text-xs text-muted-foreground mt-5 italic border-l-2 border-sky pl-3">
            AI tools assist workflow efficiency and do not replace physician diagnosis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={f.t}
              className={`rounded-2xl p-5 bg-card border border-border shadow-card hover-lift ${
                i === 0 ? "sm:row-span-2 gradient-hero text-white border-transparent" : ""
              }`}
            >
              <div className={`size-11 rounded-xl flex items-center justify-center mb-4 ${
                i === 0 ? "bg-white/15 text-white" : "gradient-sky text-white"
              }`}>
                <f.icon className="size-5" />
              </div>
              <div className={`font-display font-semibold ${i === 0 ? "text-white text-xl" : "text-navy-deep"}`}>
                {f.t}
              </div>
              <p className={`text-sm mt-2 leading-relaxed ${i === 0 ? "text-white/80" : "text-muted-foreground"}`}>
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
