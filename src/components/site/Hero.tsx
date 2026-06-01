import { Upload, Stethoscope, MessageCircle, ShieldCheck, Lock, Globe2, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-medical-ai.jpg";

const badges = [
  { icon: ShieldCheck, label: "HIPAA-Style Secure" },
  { icon: Lock, label: "Encrypted Uploads" },
  { icon: Globe2, label: "Global Patients" },
  { icon: Zap, label: "Fast Turnaround" },
];

const chips = [
  "AI-Assisted Reviews",
  "U.S. Specialists",
  "Cancer Intelligence",
  "Global Access",
  "Secure Medical Uploads",
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden gradient-hero">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-32 -left-32 size-[480px] rounded-full glow-sky" />
      <div className="absolute -bottom-32 -right-20 size-[520px] rounded-full glow-teal" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div className="text-white space-y-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-medium tracking-wide text-white/90">
            <span className="size-1.5 rounded-full bg-teal animate-glow-pulse" />
            AI-Powered U.S. Healthcare Concierge
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Global AI-Powered{" "}
            <span className="bg-gradient-to-r from-white via-ice to-teal bg-clip-text text-transparent">
              U.S. Medical Second Opinions
            </span>{" "}
            & Treatment Navigation
          </h1>

          <p className="text-lg text-white/85 max-w-xl leading-relaxed">
            Connect with America's top specialists, leading hospitals, and AI-assisted healthcare
            intelligence — from anywhere in the world.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-navy-deep font-semibold shadow-glow hover-lift"
            >
              <Upload className="size-4" /> Upload Medical Reports
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full gradient-sky text-white font-semibold hover-lift"
            >
              <Stethoscope className="size-4" /> Book U.S. Consultation
            </a>
            <a
              href="https://wa.me/919821629786"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-dark text-white font-semibold hover-lift"
            >
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
          </div>


          <div className="flex flex-wrap gap-2 pt-3">
            {chips.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-full text-xs glass-dark text-white/85 border border-white/10"
              >
                ✓ {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-white/80 text-xs">
                <b.icon className="size-4 text-teal" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-up" style={{ animationDelay: ".15s" }}>
          <div className="absolute inset-0 gradient-sky rounded-3xl blur-2xl opacity-40" />
          <div className="relative rounded-3xl overflow-hidden glass-dark border border-white/15 shadow-elegant">
            <img
              src={heroImg}
              alt="AI-powered medical dashboard with brain MRI and global connection map"
              width={1536}
              height={1024}
              className="w-full h-auto"
            />
          </div>

          {/* Floating cards */}
          <div className="absolute -left-4 top-10 glass rounded-2xl p-3 shadow-elegant animate-float hidden md:flex items-center gap-3">
            <div className="size-10 rounded-xl gradient-sky text-white flex items-center justify-center">🧠</div>
            <div className="text-xs">
              <div className="font-semibold text-navy-deep">Neuro Review</div>
              <div className="text-muted-foreground">Stanford Health</div>
            </div>
          </div>
          <div
            className="absolute -right-4 bottom-10 glass rounded-2xl p-3 shadow-elegant animate-float hidden md:flex items-center gap-3"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="size-10 rounded-xl gradient-sky text-white flex items-center justify-center">🎗️</div>
            <div className="text-xs">
              <div className="font-semibold text-navy-deep">Oncology Panel</div>
              <div className="text-muted-foreground">Tumor Board · 24h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
