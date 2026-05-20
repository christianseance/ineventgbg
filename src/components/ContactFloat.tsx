import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, MessageSquare, X } from "lucide-react";

const PHONE_DISPLAY = "0708-96 76 90";
const PHONE_TEL = "+46708967690";
// WhatsApp uses the international number without the leading +
const WHATSAPP_NUMBER = "46708967690";
const SMS_BODY = encodeURIComponent(
  "Hej Inevent! Jag är intresserad av att höra mer om era tjänster.",
);

export function ContactFloat() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-64 bg-card border border-border shadow-stage p-4 fade-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-primary">Hör av dig direkt</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Stäng"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Snabbast svar via WhatsApp eller SMS. Vi svarar oftast inom någon timme.
          </p>
          <div className="space-y-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${SMS_BODY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <MessageCircle size={16} className="text-primary" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`sms:${PHONE_TEL}?&body=${SMS_BODY}`}
              className="flex items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <MessageSquare size={16} className="text-primary" />
              <span>SMS</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Phone size={16} className="text-primary" />
              <span>Ring {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Stäng kontaktmeny" : "Öppna kontaktmeny"}
        aria-expanded={open}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-stage hover:bg-crimson-glow transition-colors flex items-center justify-center"
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
