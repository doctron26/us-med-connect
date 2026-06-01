import { Upload, BrainCircuit, UserSearch, Users, FileCheck2, Plane, ArrowRight } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";

const steps = [
  { letter: "A", icon: Upload, t: "Upload Reports", d: "Securely share medical records, scans, and prior reports." },
  { letter: "B", icon: BrainCircuit, t: "AI Case Triage", d: "AI organizes records and flags critical findings for the team." },
  { letter: "C", icon: UserSearch, t: "Specialist Matching", d: "We route your case to the most relevant U.S. subspecialists." },
  { letter: "D", icon: Users, t: "Expert Review", d: "Multidisciplinary review, including tumor board when needed." },
  { letter: "E", icon: FileCheck2, t: "Receive Opinion", d: "Detailed written opinion plus optional video consultation." },
  { letter: "F", icon: Plane, t: "Ongoing Navigation", d: "Treatment planning, second-line options, and travel concierge." },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 gradient-hero relative overflow-hidden text-white">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 size-[420px] rounded-full glow-sky" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-teal">
            <span className="size-1.5 rounded-full bg-teal" /> How It Works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">
            A clear path from <span className="text-teal">first upload</span> to expert opinion.
          </h2>
        </Reveal>

        {/* Desktop flow */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-4 relative">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-[68px] h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
            {steps.map((s, i) => (
              <Reveal key={s.letter} delay={i * 100} className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="size-[136px] rounded-full glass-dark border border-teal/30 flex flex-col items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                    <s.icon className="size-7 text-teal mb-1" />
                    <div className="font-display text-2xl font-bold text-white">{s.letter}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 size-7 rounded-full bg-teal text-navy-deep font-bold text-xs flex items-center justify-center shadow-elegant">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-5 font-display font-semibold text-lg">{s.t}</div>
                <p className="text-white/65 text-xs mt-2 leading-relaxed px-2">{s.d}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute top-[60px] -right-3 size-5 text-teal/70" />
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet flow */}
        <div className="lg:hidden space-y-4">
          {steps.map((s, i) => (
            <Reveal key={s.letter} delay={i * 60} className="flex items-start gap-4 glass-dark rounded-3xl p-5 border border-white/10 hover-lift">
              <div className="shrink-0 size-16 rounded-2xl bg-teal/15 border border-teal/30 flex flex-col items-center justify-center">
                <s.icon className="size-5 text-teal" />
                <div className="font-display text-sm font-bold text-white mt-0.5">{s.letter}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-teal font-semibold">Step {String(i + 1).padStart(2, "0")}</div>
                <div className="font-display font-semibold text-lg mt-0.5">{s.t}</div>
                <p className="text-white/70 text-sm mt-1 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
