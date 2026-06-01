import { useEffect, useState } from "react";
import { Upload, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#specialities", label: "Specialities" },
  { href: "#hospitals", label: "Hospitals" },
  { href: "#how", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-card" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="size-8 rounded-xl gradient-sky flex items-center justify-center text-white shadow-glow">
            <span className="text-sm">✚</span>
          </span>
          <span className={scrolled ? "text-navy-deep" : "text-white"}>
            USA<span className="text-gradient">MedTravel</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors ${
                scrolled ? "text-foreground/80 hover:text-navy-deep" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-sky text-white text-sm font-semibold shadow-glow hover-lift"
          >
            <Upload className="size-4" /> Upload Reports
          </a>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-navy-deep" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/10 px-6 py-4 space-y-2 animate-fade-up">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-foreground/80 hover:text-navy-deep"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-flex w-full justify-center items-center gap-2 px-4 py-2.5 rounded-full gradient-sky text-white text-sm font-semibold"
          >
            <Upload className="size-4" /> Upload Reports
          </a>
        </div>
      )}
    </header>
  );
}
