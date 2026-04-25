import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "inevent_cta_dismissed_at";
const CAP_DAYS = 11;
const CAP_MS = CAP_DAYS * 24 * 60 * 60 * 1000;

function isCapped(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < CAP_MS;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export function StickyCta() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (isCapped()) return;

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShow(true);
    };

    // Desktop: exit-intent (mouse leaves the top of the viewport)
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 0) trigger();
    };

    // Mobile/touch: scroll-based fallback (no exit-intent on touch devices)
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const ratio = scrolled / Math.max(doc.scrollHeight, 1);
      if (window.scrollY > 1200 || ratio > 0.6) trigger();
    };

    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", onMouseOut);
      // Also a generous scroll fallback for desktop users who never leave the window
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClose = () => {
    markDismissed();
    setClosed(true);
  };

  if (closed || !show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-24 z-40 max-w-sm fade-up">
      <div className="relative bg-card border border-border shadow-stage p-5">
        <button
          onClick={handleClose}
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
          onClick={markDismissed}
          className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors w-full justify-center"
        >
          Begär offert <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
