import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/hooks/use-reveal";
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  FileText,
  HeartPulse,
  Microscope,
  Brain,
  Syringe,
  Radiation,
  FlaskConical,
  Activity,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/second-opinion/")({
  head: () => ({
    meta: [
      { title: "Patient Second Opinion — USAMedTravel" },
      {
        name: "description",
        content:
          "Get a U.S. specialist second opinion on your diagnosis, treatment plan, or surgical recommendation from the comfort of your home.",
      },
    ],
  }),
  component: SecondOpinionPage,
});

const steps = [
  {
    num: "01",
    title: "Submit Your Request",
    desc: "Fill in your patient details, diagnosis, and what you're seeking a second opinion on.",
  },
  {
    num: "02",
    title: "Send Medical Records",
    desc: "Share your MRI, CT scans, lab reports, biopsy results, and discharge summaries via WhatsApp or email.",
  },
  {
    num: "03",
    title: "Expert Case Review",
    desc: "Your case is reviewed by a U.S.-based specialist in the relevant field within 3–5 business days.",
  },
  {
    num: "04",
    title: "Receive Written Opinion",
    desc: "Get a detailed written second opinion report with recommendations, delivered directly to you.",
  },
];

const specialties = [
  { icon: Microscope, name: "Oncology", sub: "Cancer Expert Review" },
  { icon: HeartPulse, name: "Cardiology", sub: "Cardiac Evaluation" },
  { icon: Brain, name: "Neurology", sub: "Brain & Spine Opinion" },
  { icon: Syringe, name: "Orthopedics", sub: "Surgical Second Opinion" },
  { icon: Activity, name: "Transplant", sub: "Transplant Evaluation" },
  { icon: Radiation, name: "Radiology", sub: "Imaging Review" },
  { icon: FlaskConical, name: "Rare Diseases", sub: "Complex Case Review" },
  { icon: Stethoscope, name: "All Specialties", sub: "General Medical Opinion" },
];

const included = [
  "Written second opinion report by a U.S. specialist",
  "Diagnosis confirmation or alternative diagnosis",
  "Treatment plan review and recommendations",
  "Surgical necessity assessment",
  "Alternative treatment options",
  "Cancer staging and treatment pathway review",
  "Rare disease workup guidance",
  "Transplant candidacy evaluation",
];

function SecondOpinionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden gradient-hero text-white">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -top-32 -left-32 size-[420px] rounded-full glow-sky opacity-40" />
          <div className="absolute -bottom-32 -right-20 size-[420px] rounded-full glow-teal opacity-45" />

          <div className="relative mx-auto max-w-7xl px-6 text-center space-y-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-semibold tracking-wide text-teal">
                <Stethoscope className="size-3.5 animate-glow-pulse" />
                Patient Second Opinion Program
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                Get a U.S. Expert Opinion{" "}
                <span className="bg-gradient-to-r from-white via-ice to-teal bg-clip-text text-transparent">
                  Without Leaving Home
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Connect with America's top specialists for a comprehensive second opinion on your diagnosis, treatment plan, or surgical recommendation — delivered in writing.
              </p>
            </Reveal>
            <Reveal delay={300} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/second-opinion/apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-navy-deep font-bold shadow-glow hover-lift animate-btn-glow"
              >
                Request Second Opinion <ArrowRight className="size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-dark border border-white/10 text-white/80 font-semibold hover:text-white hover:border-white/20 transition-all"
              >
                How It Works
              </a>
            </Reveal>
          </div>
        </section>

        {/* Why Get a Second Opinion */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <Reveal className="space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Why It Matters</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-deep leading-tight">
                A second opinion can{" "}
                <span className="text-gradient">change everything</span>.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Medical research shows that up to <strong className="text-navy-deep">30% of diagnoses change</strong> after a second expert review. For major surgeries, cancer diagnoses, or rare conditions, getting a second perspective isn't just advisable — it's essential.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                USAMedTravel connects you directly with board-certified U.S. specialists who review your case independently and provide a written medical opinion, giving you the clarity and confidence to make informed decisions about your health.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["HIPAA-Conscious Process", "U.S. Board-Certified Specialists", "Written Report Delivered", "3–5 Business Days"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-sky/10 text-sky text-xs font-semibold border border-sky/15">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="space-y-3">
              <div className="text-xs font-semibold tracking-widest uppercase text-sky mb-5">What's Included</div>
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm hover:border-sky/20 transition-colors">
                  <CheckCircle2 className="size-4 text-teal shrink-0 mt-0.5" />
                  <span className="text-sm text-navy-deep font-medium">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Specialties */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-1/3 -right-20 size-[360px] rounded-full glow-teal opacity-20" />
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <Reveal className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Areas We Cover</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
                Specialist <span className="text-gradient">Second Opinions</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Our network covers all major medical specialties. No matter how complex your case, we find the right expert.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <Reveal key={spec.name} delay={i * 50} className="rounded-2xl p-6 bg-card border border-border hover-lift shadow-sm group">
                    <div className="size-11 rounded-xl gradient-sky text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <div className="font-display font-semibold text-navy-deep text-base">{spec.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{spec.sub}</div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <Reveal className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">The Process</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
                Simple. Fast. <span className="text-gradient">Reliable.</span>
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 80} className="relative space-y-4">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(100%-1rem)] w-full h-px bg-gradient-to-r from-border to-transparent" />
                  )}
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-sky to-teal text-white flex items-center justify-center font-display font-bold text-lg shadow-glow">
                    {step.num}
                  </div>
                  <div className="font-display font-bold text-navy-deep text-lg">{step.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Privacy + CTA */}
        <section className="py-24 bg-secondary/30 relative">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
            {/* Privacy */}
            <Reveal className="glass-premium rounded-3xl p-8 border border-white/10 text-white space-y-6">
              <div className="flex items-center gap-3">
                <Lock className="size-6 text-teal" />
                <h3 className="font-display font-semibold text-xl">Your Privacy is Protected</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                All medical records you share are handled with strict confidentiality. We use secure, encrypted channels and never share your data with anyone outside of your care team without your explicit consent.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-medium">
                {["HIPAA-conscious workflows", "Explicit patient consent required", "Secure document transfer", "No data sold or shared", "Encrypted case management"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Medical disclaimer */}
            <Reveal className="glass-premium rounded-3xl p-8 border border-white/10 text-white space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-teal" />
                <h3 className="font-display font-semibold text-xl">Medical Disclaimer</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                USAMedTravel is a healthcare coordination platform. The second opinion reports we facilitate are provided by independent, board-certified specialists. We do not practice medicine.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-medium">
                {[
                  "Second opinions are advisory in nature",
                  "Final treatment decisions rest with your physician",
                  "We do not prescribe medication",
                  "We do not diagnose or treat conditions",
                  "All opinions provided by licensed professionals",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* CTA */}
          <div className="mx-auto max-w-4xl px-6 mt-16 text-center">
            <Reveal className="glass-dark border border-white/10 p-10 rounded-3xl space-y-5">
              <div className="size-14 rounded-2xl gradient-sky text-white flex items-center justify-center mx-auto mb-2">
                <FileText className="size-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Ready to Get Clarity on Your Diagnosis?</h3>
              <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
                Submit your request today. Our team will match you with the right specialist and guide you through the process every step of the way.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                  to="/second-opinion/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal to-sky text-white font-bold hover-lift shadow-glow animate-btn-glow"
                >
                  Request Second Opinion <ArrowRight className="size-4" />
                </Link>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Clock className="size-3.5" />
                  <span>3–5 business day turnaround</span>
                  <span>·</span>
                  <Globe className="size-3.5" />
                  <span>Available worldwide</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
