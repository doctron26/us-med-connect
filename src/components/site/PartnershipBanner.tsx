import { Reveal } from "@/hooks/use-reveal";
import { Handshake, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PartnershipBanner() {
  return (
    <section className="relative py-12 md:py-16 bg-background overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-r from-sky/[0.02] via-transparent to-teal/[0.02]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl p-8 md:p-12 glass border border-border/60 shadow-card relative overflow-hidden group">
          {/* Subtle animated background glow */}
          <div className="absolute -inset-20 bg-gradient-to-r from-sky/10 via-teal/10 to-sky/10 blur-3xl group-hover:opacity-70 transition-opacity duration-1000 opacity-30" />
          
          <div className="flex-1 relative max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky mb-4">
              <Handshake className="size-4" /> Global Reach
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep leading-tight mb-4">
              Partner with <span className="text-gradient">USAMedTravel</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We collaborate with premier healthcare institutions and facilitators worldwide to expand access to America's top specialists. Join our network to provide world-class medical second opinions and concierge care to your patients.
            </p>
          </div>

          <div className="relative shrink-0 w-full md:w-auto flex justify-center md:justify-end">
            <div className="relative group">
              {/* World-class glowing backdrop */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-sky via-teal to-sky opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              
              <Link
                to="/partnerships"
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-sky to-teal text-white font-semibold shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:shadow-[0_0_60px_rgba(20,184,166,0.6)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto overflow-hidden"
              >
                {/* Shine effect overlay */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <span className="relative z-10 flex items-center gap-2 text-shadow-sm">
                  Explore Partnerships
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                
                {/* Subtle inner border for premium feel */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
