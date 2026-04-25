import { useState } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/server/leads.functions";
import { PrivacyDisclosure } from "@/components/PrivacyDisclosure";

const GUIDE_URL = "/inevent-guide.pdf";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress").max(255),
  name: z.string().trim().min(2, "Ange ditt namn").max(100).optional().or(z.literal("")),
});

export function QuickLeadForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, name });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as "email" | "name";
        if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await submitLead({
        data: {
          name: parsed.data.name || "Guide-nedladdning",
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
        // Auto-trigger nedladdning
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
    <section className="relative py-24 border-y border-border bg-card/40">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary inline-flex items-center gap-2">
              <FileText size={12} /> Gratis guide
            </span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Förbered dig <span className="text-primary">smart</span> inför bokningen.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Vår förberedelseguide samlar allt vi önskar att alla kunder visste innan första samtalet.
              Checklistor, frågor att tänka igenom och tips som sparar både tid och pengar.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><span className="text-primary">›</span> Vad vi behöver veta för att kunna offerera</li>
              <li className="flex gap-2"><span className="text-primary">›</span> Hur vi planerar kring väder och datum</li>
              <li className="flex gap-2"><span className="text-primary">›</span> Vanliga misstag att undvika</li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-border bg-background p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Download size={18} />
                  </div>
                  <div>
                    <h3 className="text-2xl mb-2">Tack! Nedladdningen startade.</h3>
                    <p className="text-sm text-muted-foreground">
                      Om inget händer, klicka på knappen nedan. Vi hör av oss om du har frågor!
                    </p>
                  </div>
                </div>
                <a
                  href={GUIDE_URL}
                  download="Inevent-Forberedelseguide.pdf"
                  className="group inline-flex items-center gap-3 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors"
                >
                  <Download size={16} /> Beställ guiden
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="border border-border bg-background p-6 lg:p-8 space-y-4">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Webbplats
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guide-name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Namn (valfritt)
                    </label>
                    <input
                      id="guide-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ditt namn"
                      className="w-full bg-card border border-border px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="guide-email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      E-post
                    </label>
                    <input
                      id="guide-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="namn@exempel.se"
                      className="w-full bg-card border border-border px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "guide-email-err" : undefined}
                    />
                    {errors.email && (
                      <p id="guide-email-err" className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors w-full sm:w-auto disabled:opacity-60"
                >
                  {submitting ? "Skickar…" : "Beställ guiden"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-muted-foreground">
                  Du får den direkt! Du signar upp dig för våra mejl, som kommer då och då. Avregistrera när du vill.
                </p>
                <PrivacyDisclosure />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
