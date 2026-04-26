import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Download, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/server/leads.functions";

const STORAGE_KEY = "inevent_cta_dismissed_at";
const GUIDE_URL = "/inevent-guide.pdf";
const emailSchema = z.string().trim().toLowerCase().email().max(255);
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
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  // Guide form state (only used on home)
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | undefined>();
  const [consent, setConsent] = useState(false);

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

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 0) trigger();
    };

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

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: om botar fyller i "website" (osynligt fält) — fejka success
    // utan att skicka något. Användarflödet ser konsekvent ut, men ingen lead
    // skapas och ingen guide laddas ner.
    if (website.trim() !== "") {
      setDone(true);
      markDismissed();
      return;
    }

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setErr("Ange en giltig e-post");
      return;
    }
    if (!consent) {
      setErr("Bekräfta att du vill ha guiden");
      return;
    }
    setErr(undefined);
    setSubmitting(true);
    try {
      const res = await submitLead({
        data: {
          name: "Guide-nedladdning",
          email: parsed.data,
          message: "Laddade ner förberedelseguiden via sticky CTA.",
          newsletter_opt_in: consent,
          website,
          phone: "",
          event_type: "guide_download",
          event_date: "",
          guest_count: "",
          location: "",
          attachment: null,
        },
      });
      if (res.ok) {
        setDone(true);
        markDismissed();
        toast.success("Tack! Här är din guide.");
        const a = document.createElement("a");
        a.href = GUIDE_URL;
        a.download = "Inevent-Forberedelseguide.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        toast.error(res.error ?? "Något gick fel. Försök igen.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setSubmitting(false);
    }
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

        {isHome ? (
          done ? (
            <div className="flex items-center gap-3 pr-4">
              <div className="h-9 w-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Download size={16} />
              </div>
              <div className="text-sm">
                <span className="font-medium">Tack!</span>{" "}
                <span className="text-muted-foreground">Nedladdningen startade.</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs uppercase tracking-widest text-primary">Gratis guide · 25 års erfarenhet</span>
              </div>
              <h3 className="text-2xl mb-2">Spara tid &amp; pengar</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Checklista, mall, väderstrategi och riktpriser. Ge mejlen, sen är den din.
              </p>
              <form onSubmit={handleGuideSubmit} noValidate className="space-y-2">
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.se"
                  className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  aria-invalid={!!err}
                />
                {err && <p className="text-xs text-destructive">{err}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors w-full justify-center disabled:opacity-60"
                >
                  {submitting ? "Skickar…" : (<><Download size={14} /> Hämta guiden</>)}
                </button>
              </form>
            </>
          )
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
