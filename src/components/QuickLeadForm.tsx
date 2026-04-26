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
    <section className="relative py-16 border-y border-border bg-card/40">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary inline-flex items-center gap-2">
              <FileText size={12} /> Gratis · 25 års erfarenhet
            </span>
            <h2 className="text-display text-3xl lg:text-5xl mt-3">
              Spara <span className="text-primary">tid &amp; pengar</span> — innan du bokar.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Guide med <span className="text-foreground font-medium">checklista, mall, väderstrategi</span> och <span className="text-foreground font-medium">riktpriser</span>. Ge mejlen, sen är den din.
            </p>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-border bg-background p-5 flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Download size={16} />
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">Tack!</span>{" "}
                  <span className="text-muted-foreground">Nedladdningen startade.</span>
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
              <form onSubmit={onSubmit} noValidate className="space-y-3">
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

                <div className="flex flex-col sm:flex-row gap-2">
                  <label
                    className={`flex items-center gap-2 cursor-pointer border px-3 py-3 transition-all shrink-0 select-none ${
                      newsletter
                        ? "border-primary/60 bg-primary/5"
                        : "border-border hover:border-primary/40 bg-background"
                    }`}
                    title="Ja tack — skicka mig tips, nya tält och säsongs-erbjudanden då och då"
                  >
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">Ja tack — guide &amp; nyhetsbrev</span>
                  </label>

                  <input
                    id="guide-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.se"
                    className="sm:w-56 bg-background border border-border px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                    aria-invalid={!!error}
                    aria-describedby={error ? "guide-email-err" : undefined}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors disabled:opacity-60 shrink-0"
                  >
                    {submitting ? "Skickar…" : "Hämta"}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {error && (
                  <p id="guide-email-err" className="text-xs text-destructive">{error}</p>
                )}
                <PrivacyDisclosure />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
