import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Specialities } from "@/components/site/Specialities";
import { Hospitals } from "@/components/site/Hospitals";
import { PartnershipBanner } from "@/components/site/PartnershipBanner";
import { HowItWorks } from "@/components/site/HowItWorks";
import { AISection } from "@/components/site/AISection";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "USAMedTravel — Access America's Top Doctors Without Leaving Home" },
      { name: "description", content: "AI-powered U.S. medical second opinions, oncology reviews, MRI/CT analysis and treatment navigation for international patients. Connect with top U.S. specialists from anywhere." },
      { property: "og:title", content: "USAMedTravel — U.S. Medical Second Opinions & AI Healthcare Navigation" },
      { property: "og:description", content: "Connect with America's top specialists and leading hospitals. AI-assisted radiology, oncology tumor boards, concierge medical travel." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        name: "USAMedTravel",
        slogan: "Access America's Top Doctors Without Leaving Home",
        url: "https://www.usamedtravel.com",
        email: "travel@usamedtravel.com",
        telephone: "+91-98216-29786",
        medicalSpecialty: ["Oncology", "Neurology", "Cardiology", "Radiology", "Pediatrics"],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Specialities />
        <PartnershipBanner />
        <Hospitals />
        <HowItWorks />
        <AISection />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
