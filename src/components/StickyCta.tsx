import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

export function StickyCta() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || !show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-sm fade-up">
      <div className="relative bg-card border border-border shadow-stage p-5">
        <button
          onClick={() => setClosed(true)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          aria-label="Stäng"
        >
          <X size={16} />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-widest text-primary">Gör en fri förfrågan nu</span>
        </div>
        <h3 className="text-2xl mb-2">Planerar du ett event?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Få en personlig offert inom 24-36 timmar. Inga förpliktelser.
        </p>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors w-full justify-center"
        >
          Begär offert <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
