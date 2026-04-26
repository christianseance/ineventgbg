import { useState } from "react";
import { ArrowRight, Download, FileText, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/server/leads.functions";
import { PrivacyDisclosure } from "@/components/PrivacyDisclosure";

const GUIDE_URL = "/inevent-guide.pdf";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress").max(255),
});

export function QuickLeadForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ogiltig e-post");
      return;
    }
    setError(undefined);
    setSubmitting(true);
    try {
      const res = await submitLead({
        data: {
          name: "Guide-nedladdning",
          email: parsed.data.email,
          message: "Laddade ner förberedelseguiden från startsidan.",
          newsletter_opt_in: newsletter,
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
    } catch (err) {
      console.error(err);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 border-y border-border bg-card/40 overflow-hidden">
      {/* Subtil bakgrundsglow */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1100px] px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* VÄNSTER — pitch */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
              <FileText size={11} /> Gratis · 25 års erfarenhet
            </span>
            <h2 className="text-display text-3xl lg:text-5xl mt-4 leading-[1.05]">
              Spara <span className="text-primary">tid &amp; pengar</span><br />
              — innan du bokar.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Guide med <span className="text-foreground font-medium">checklista, mall, väderstrategi</span> och <span className="text-foreground font-medium">riktpriser</span>. Ge mejlen, sen är den din.
            </p>

            {/* Mikroproof */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check size={11} className="text-primary" /> 5 sidor
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={11} className="text-primary" /> PDF
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={11} className="text-primary" /> 30 sek
              </span>
            </div>
          </div>

          {/* HÖGER — form-kort */}
          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-primary/40 bg-primary/5 p-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Check size={18} strokeWidth={3} />
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-semibold text-foreground">Tack — guiden är på väg!</div>
                  <div className="text-muted-foreground text-xs mt-0.5">Startade inte nedladdningen automatiskt?</div>
                </div>
                <a
                  href={GUIDE_URL}
                  download="Inevent-Forberedelseguide.pdf"
                  className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors"
                >
                  <Download size={14} /> Ladda ner
                </a>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="border border-border bg-background/60 backdrop-blur-sm p-5 lg:p-6 space-y-3 shadow-stage"
              >
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Email + knapp i en rad */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="guide-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.se"
                    className="flex-1 min-w-0 bg-card border border-border px-4 py-3.5 text-base focus:outline-none focus:border-primary transition-colors"
                    aria-invalid={!!error}
                    aria-describedby={error ? "guide-email-err" : undefined}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors disabled:opacity-60 shrink-0"
                  >
                    {submitting ? "Skickar…" : "Hämta"}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {error && (
                  <p id="guide-email-err" className="text-xs text-destructive">{error}</p>
                )}

                {/* Checkbox under */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Ja tack — guide &amp; nyhetsbrev
                  </span>
                </label>

                <PrivacyDisclosure />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
