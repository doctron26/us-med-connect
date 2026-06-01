import { useEffect, useState } from "react";
import { Upload, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "/#home", label: "Home", isRouter: false },
  { href: "/#about", label: "About", isRouter: false },
  { href: "/#services", label: "Services", isRouter: false },
  { href: "/#specialities", label: "Specialities", isRouter: false },
  { href: "/#hospitals", label: "Hospitals", isRouter: false },
  { href: "/#how", label: "How It Works", isRouter: false },
  { href: "/partnerships", label: "Partnerships", isRouter: true },
  { href: "/second-opinion", label: "Second Opinion", isRouter: true },
  { href: "/#contact", label: "Contact", isRouter: false },
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
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="size-8 rounded-xl gradient-sky flex items-center justify-center text-white shadow-glow">
            <span className="text-sm">✚</span>
          </span>
          <span className={scrolled ? "text-navy-deep" : "text-white"}>
            USA<span className="text-gradient">MedTravel</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
          {links.map((l) =>
            l.isRouter ? (
              <Link
                key={l.href}
                to={l.href}
                className={`relative py-1.5 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-sky after:to-teal after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-foreground/85 hover:text-navy-deep" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={`relative py-1.5 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-sky after:to-teal after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-foreground/85 hover:text-navy-deep" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/#contact"
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
          {links.map((l) =>
            l.isRouter ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-foreground/80 hover:text-navy-deep"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-foreground/80 hover:text-navy-deep"
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full justify-center items-center gap-2 px-4 py-2.5 rounded-full gradient-sky text-white text-sm font-semibold"
          >
            <Upload className="size-4" /> Upload Reports
          </a>
        </div>
      )}
    </header>
  );
}
