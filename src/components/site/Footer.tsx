import { MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80 pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-white">
              <span className="size-8 rounded-xl gradient-sky flex items-center justify-center">✚</span>
              USAMedTravel
            </div>
            <p className="text-sm mt-4 leading-relaxed">
              Access America's top doctors without leaving home. AI-powered, concierge-led, globally available.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/10">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display font-semibold text-white mb-4">Quick Links</div>
            <ul className="space-y-2 text-sm">
              {["About", "Services", "Specialities", "Hospitals", "How It Works", "Pricing", "FAQ", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display font-semibold text-white mb-4">Services</div>
            <ul className="space-y-2 text-sm">
              {["Second Opinions", "Radiology Review", "Oncology Navigation", "Teleconsultation", "Treatment Planning", "Medical Travel"].map((l) => (
                <li key={l}><a href="#services" className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display font-semibold text-white mb-4">Trust & Legal</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">HIPAA-Style Privacy</a></li>
              <li><a href="#" className="hover:text-white">GDPR Notice</a></li>
            </ul>
            <a href="https://wa.me/919821629786" target="_blank" rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal text-navy-deep text-sm font-semibold">
              <MessageCircle className="size-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs space-y-3">
          <p className="italic">
            USAMedTravel facilitates access to medical expertise and healthcare navigation services.
            Final diagnosis and treatment decisions remain the responsibility of licensed medical professionals.
          </p>
          <p className="text-white/60">
            For medical emergencies, contact your local emergency services immediately. This site does not provide emergency care.
          </p>
          <p className="text-white/50">© {new Date().getFullYear()} USAMedTravel. All rights reserved.</p>
          {/* BUILD v18 — 2026-05-31 */}
          <p className="text-white/20 text-[10px]">v18</p>
        </div>
      </div>
    </footer>
  );
}
