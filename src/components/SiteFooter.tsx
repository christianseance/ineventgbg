import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Tent, Headphones, Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-card/40 mt-32">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-5">
          <Logo />
          <p className="text-muted-foreground text-sm max-w-md">
            Vi löser allt inom event. Från cirkustält och podium till bröllop, företagsfester och festivaler.
            Utgår från Göteborg — finns där du behöver oss.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm tracking-widest text-muted-foreground">Navigera</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Start</Link></li>
            <li><Link to="/galleri" className="hover:text-primary">Galleri</Link></li>
            <li><Link to="/tjanster" className="hover:text-primary">Tjänster</Link></li>
            <li><Link to="/om-oss" className="hover:text-primary">Om oss</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
          </ul>

          <div className="pt-4">
            <h4 className="text-sm tracking-widest text-muted-foreground mb-3">Följ oss</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://paralello.se"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Paralello — cirkustält"
                title="Paralello — cirkustält"
                className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Tent size={16} />
              </a>
              <a
                href="https://christianseance.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Christian Seance — DJ"
                title="Christian Seance — DJ"
                className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Headphones size={16} />
              </a>
              <a
                href="https://instagram.com/cirkusparalello"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/music.magic.art.heart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm tracking-widest text-muted-foreground">Kontakt</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-1 text-primary shrink-0" />
              <span>Göteborg — finns där du behöver oss</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={14} className="mt-1 text-primary shrink-0" />
              <a href="mailto:mathias@inevent.se" className="hover:text-primary">mathias@inevent.se</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="mt-1 text-primary shrink-0" />
              <a href="tel:+46708837997" className="hover:text-primary">+46 708 83 79 97</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Inevent</span>
          <span>Vi löser allt inom event.</span>
        </div>
      </div>
    </footer>
  );
}
