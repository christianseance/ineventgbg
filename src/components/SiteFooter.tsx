import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Tent, Headphones, Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-card/40 mt-32">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 grid gap-12 lg:grid-cols-[1fr_auto_1fr]">
        {/* Contact (left) */}
        <div className="space-y-5">
          <h4 className="text-sm tracking-widest text-muted-foreground">Kontakt</h4>

          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            <div className="flex items-start gap-3">
              <Mail size={14} className="mt-1 text-primary shrink-0" />
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">E-post</div>
                <a href="mailto:mathias@inevent.se" className="block hover:text-primary">mathias@inevent.se</a>
                <a href="mailto:seance@inevent.se" className="block hover:text-primary">seance@inevent.se</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={14} className="mt-1 text-primary shrink-0" />
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Telefon</div>
                <a href="tel:+46708837997" className="block hover:text-primary">+46 708 83 79 97</a>
                <a href="tel:+46708967690" className="block hover:text-primary">+46 708 96 76 90</a>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin size={14} className="mt-1 text-primary shrink-0" />
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Bas</div>
                <div>Göteborg — vi tar oss dit vi behövs.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigate (middle) */}
        <div className="space-y-3">
          <h4 className="text-sm tracking-widest text-muted-foreground">Navigera</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Vad?</Link></li>
            <li><Link to="/galleri" className="hover:text-primary">Galleri</Link></li>
            <li><Link to="/talt" className="hover:text-primary">Tält</Link></li>
            <li><Link to="/interior" className="hover:text-primary">Interiör</Link></li>
            <li><Link to="/tjanster" className="hover:text-primary">Hur?</Link></li>
            <li><Link to="/om-oss" className="hover:text-primary">Om</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
          </ul>
        </div>

        {/* Brand (right) */}
        <div className="space-y-5 lg:text-right lg:items-end flex flex-col">
          <div className="lg:self-end">
            <Logo />
          </div>
          <div className="inline-flex items-center gap-2 border border-border px-3 py-2 lg:self-end">
            <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Svar oftast inom <span className="text-foreground">någon timma</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm lg:ml-auto">
            Vi löser allt ifrån cirkustält och scen<br />till bröllop, företagsfester och festivaler.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-10 flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-12 text-xs text-muted-foreground uppercase tracking-widest">
          <span className="order-1 sm:order-1 sm:justify-self-start">© {new Date().getFullYear()} Inevent</span>
          <div className="order-2 sm:order-2 flex items-center gap-2 sm:justify-self-center">
            <a
              href="https://paralello.se"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paralello: cirkustält"
              title="Paralello: cirkustält"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Tent size={14} />
            </a>
            <a
              href="https://christianseance.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Christian Seance: DJ"
              title="Christian Seance: DJ"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Headphones size={14} />
            </a>
            <a
              href="https://instagram.com/cirkusparalello"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://facebook.com/music.magic.art.heart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Facebook size={14} />
            </a>
          </div>
          <span className="order-3 sm:order-3 sm:justify-self-end sm:text-right">Vi löser nästan allt inom event.</span>
        </div>
      </div>
    </footer>
  );
}
