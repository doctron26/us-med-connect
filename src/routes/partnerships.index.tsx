import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/hooks/use-reveal";
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  Award, 
  ArrowRight, 
  ClipboardCheck, 
  HeartPulse, 
  CheckCircle2, 
  Scale, 
  Lock 
} from "lucide-react";

export const Route = createFileRoute("/partnerships/")({
  head: () => ({
    meta: [
      { title: "Hospital Partnership Program — USAMedTravel" },
      { name: "description", content: "Partner with USAMedTravel to connect global patients with world-class U.S. and international medical centers. Expand your clinical reach." },
    ],
  }),
  component: PartnershipsPage,
});

const referralSpecialties = [
  { name: "Oncology", sub: ["Medical Oncology", "Radiation Oncology", "Surgical Oncology", "Precision Oncology"] },
  { name: "Cardiac Sciences", sub: ["Interventional Cardiology", "Cardiac Surgery", "Electrophysiology"] },
  { name: "Neurosciences", sub: ["Neurosurgery", "Neurology", "Spine Surgery"] },
  { name: "Orthopedics", sub: ["Joint Replacement", "Sports Medicine", "Complex Trauma"] },
  { name: "Organ Transplant", sub: ["Liver Transplant", "Kidney Transplant", "Heart Transplant", "Lung Transplant"] },
  { name: "Women's Health", sub: ["IVF", "Reproductive Medicine", "High-Risk Pregnancy"] },
  { name: "Pediatrics", sub: ["Pediatric Cardiology", "Pediatric Oncology", "Pediatric Neurology"] },
  { name: "Rare Diseases", sub: ["Genomic Medicine", "Robotic Surgery", "Regenerative Medicine", "Advanced Diagnostics"] },
];

const targetCountries = ["India", "UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Africa", "South Asia", "Southeast Asia"];

const caseTasks = [
  "Medical record collection",
  "Translation coordination",
  "Imaging organization",
  "Appointment scheduling",
  "Patient communication",
  "Follow-up coordination",
  "Travel support",
  "Documentation management"
];

function PartnershipsPage() {
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
                <Building2 className="size-3.5 animate-glow-pulse" />
                Hospital Partnership Program
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                Connecting Global Patients with{" "}
                <span className="bg-gradient-to-r from-white via-ice to-teal bg-clip-text text-transparent">
                  World-Class Medical Expertise
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Partner with USAMedTravel to streamline cross-border medical referrals, clinical second opinions, and virtual consultations.
              </p>
            </Reveal>
            <Reveal delay={300} className="pt-4">
              <Link
                to="/partnerships/apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-navy-deep font-bold shadow-glow hover-lift animate-btn-glow"
              >
                Become a Hospital Partner <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Corporate Overview */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Overview</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-deep leading-tight">
                Headquartered in Mumbai, trusted <span className="text-gradient">across operational borders</span>.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                USAMedTravel is a global healthcare coordination platform headquartered in Mumbai, India, with an operational presence across the UAE and international patient networks worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For over a decade, our healthcare leadership team has been involved in medical tourism, patient coordination, healthcare navigation, and international care facilitation. We collaborate with hospitals, academic medical centers, specialist groups, and centers of excellence.
              </p>
            </Reveal>

            <Reveal className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Medical Second Opinions", desc: "Structured written reports." },
                { title: "Expert Case Reviews", desc: "In-depth clinical evaluations." },
                { title: "Virtual Specialist Consultations", desc: "Live video specialist calls." },
                { title: "International Patient Referrals", desc: "Seamless global navigation." },
                { title: "Treatment Planning Assistance", desc: "Comprehensive cost roadmaps." },
                { title: "Cross-Border Healthcare Coordination", desc: "Conforming to legal safety." }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl p-5 bg-card border border-border shadow-sm hover:border-sky/30 transition-colors">
                  <div className="size-9 rounded-xl gradient-sky text-white flex items-center justify-center mb-3">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div className="font-display font-semibold text-navy-deep text-sm">{item.title}</div>
                  <p className="text-xs text-muted-foreground mt-1.5">{item.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-1/3 -left-20 size-[360px] rounded-full glow-sky opacity-25" />
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <Reveal className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Value Proposition</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
                Why Partner With <span className="text-gradient">USAMedTravel</span>?
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Card 1: Access Global Patients */}
              <Reveal className="rounded-3xl p-8 bg-card border border-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="size-12 rounded-2xl bg-sky/10 text-sky flex items-center justify-center mb-6">
                    <Globe className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-deep mb-3">Access Global Patients</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Receive qualified patient inquiries from our active international networks:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {targetCountries.map((c) => (
                      <span key={c} className="px-3 py-1 rounded-full bg-slate-100 text-navy-deep text-xs font-medium border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Card 2: Streamlined Case Management */}
              <Reveal className="rounded-3xl p-8 bg-card border border-border shadow-card flex flex-col justify-between" delay={100}>
                <div>
                  <div className="size-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-6">
                    <ClipboardCheck className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-deep mb-3">Streamlined Case Management</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Our team takes care of all administrative logistics so your clinical specialists can focus entirely on treatment:
                  </p>
                  <ul className="space-y-2 text-xs text-navy-deep font-semibold">
                    {caseTasks.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-teal shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Card 3: Focus on Clinical Excellence */}
              <Reveal className="rounded-3xl p-8 bg-card border border-border shadow-card flex flex-col justify-between" delay={200}>
                <div>
                  <div className="size-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6">
                    <Award className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-deep mb-3">Focus on Clinical Excellence</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Your specialists remain fully responsible for medical opinions, surgical referrals, and hospital admissions:
                  </p>
                  <ul className="space-y-2 text-xs text-navy-deep font-semibold mb-6">
                    {["Medical opinions", "Clinical recommendations", "Treatment planning", "Teleconsultations", "Surgical recommendations", "Hospital admission decisions"].map((x) => (
                      <li key={x} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-rose-500 shrink-0" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <blockquote className="border-l-2 border-rose-500 pl-3 py-1 italic text-xs text-muted-foreground">
                    USAMedTravel never interferes in clinical decision-making.
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* specialties offered */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Specialties We Refer</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-deep mt-3">
                Targeted <span className="text-gradient">Clinical Disciplines</span>
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {referralSpecialties.map((spec, i) => (
                <Reveal key={spec.name} delay={i * 50} className="rounded-2xl p-6 bg-card border border-border hover-lift shadow-sm">
                  <div className="font-display font-semibold text-navy-deep text-base mb-3 border-b border-border pb-2 flex items-center gap-2">
                    <HeartPulse className="size-4.5 text-sky" />
                    {spec.name}
                  </div>
                  <ul className="space-y-1.5">
                    {spec.sub.map((s) => (
                      <li key={s} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-slate-300" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Models */}
        <section className="py-24 bg-secondary/30 relative">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <Reveal className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest uppercase text-sky">Collaboration Framework</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-navy-deep">
                Flexible <span className="text-gradient">Partnership Models</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { m: "Model A", name: "Medical Second Opinion", path: "Records → USAMedTravel → Specialist Review → Written Opinion" },
                { m: "Model B", name: "Virtual Consultation", path: "Patient → Specialist Video Consultation" },
                { m: "Model C", name: "Treatment Referral", path: "Patient → Hospital Evaluation → Treatment Planning → Admission" },
                { m: "Model D", name: "Center of Excellence Partnership", path: "Dedicated Specialty Partnership for Oncology, Cardiac Sciences, Transplant Programs, Neurosciences" }
              ].map((mod, idx) => (
                <Reveal key={mod.m} delay={idx * 65} className="rounded-3xl p-6 bg-card border border-border shadow-sm flex gap-4">
                  <div className="size-12 rounded-2xl bg-sky/10 text-sky flex items-center justify-center font-display font-bold shrink-0">
                    {mod.m.split(" ")[1]}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-navy-deep text-base">{mod.name}</div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                      {mod.path}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance, Security & CTA */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
            {/* Compliance */}
            <Reveal className="glass-premium rounded-3xl p-8 border border-white/10 text-white space-y-6">
              <div className="flex items-center gap-3">
                <Scale className="size-6 text-teal" />
                <h3 className="font-display font-semibold text-xl">Compliance & Ethics</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                USAMedTravel strictly operates as a medical coordination platform. We do not practice medicine, provide diagnosis, prescribe treatment, or guarantee clinical outcomes. All clinical liability remains with the treating provider.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-medium">
                {["Does not practice medicine", "Does not provide diagnosis", "Does not prescribe treatment", "Does not guarantee outcomes", "Does not influence physician decisions"].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Data Security */}
            <Reveal className="glass-premium rounded-3xl p-8 border border-white/10 text-white space-y-6">
              <div className="flex items-center gap-3">
                <Lock className="size-6 text-teal" />
                <h3 className="font-display font-semibold text-xl">Data Security</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Patient records are completely protected using encrypted transport protocols and strict access parameters.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-medium">
                {["HIPAA-conscious workflows", "Patient Consent Authorization", "Secure Medical Record Transfer", "Encrypted Communication Channels", "Confidential Case Management"].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mx-auto max-w-4xl px-6 mt-16 text-center">
            <Reveal className="glass-dark border border-white/10 p-10 rounded-3xl space-y-5">
              <h3 className="font-display text-2xl font-bold text-white">Become a Hospital Partner</h3>
              <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
                Interested institutions may submit: Hospital Profile, International Patient Department Contact, Available Specialties, Second Opinion Services, Telemedicine Capabilities, and Preferred Commercial Model to get started.
              </p>
              <div className="pt-3">
                <Link
                  to="/partnerships/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal to-sky text-white font-bold hover-lift shadow-glow animate-btn-glow"
                >
                  Submit Partnership Application <ArrowRight className="size-4" />
                </Link>
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
