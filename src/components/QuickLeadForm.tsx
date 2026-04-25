import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/server/leads.functions";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress").max(255),
  message: z.string().trim().min(10, "Minst 10 tecken").max(2000),
});

export function QuickLeadForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, message });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as "email" | "message";
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
          name: "Snabbförfrågan",
          email: parsed.data.email,
          message: parsed.data.message,
          newsletter_opt_in: false,
          website,
          phone: "",
          event_type: "",
          event_date: "",
          guest_count: "",
          location: "",
          attachment: null,
        },
      });
      if (res.ok) {
        setDone(true);
        setEmail("");
        setMessage("");
        toast.success("Tack! Vi hör av oss så fort vi kan.");
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
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Snabbförfrågan</span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Låt oss <span className="text-primary">kontakta</span> dig.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Två fält. Ingen formulärtrötthet. Vi hör av oss så fort vi kan med nästa steg.
            </p>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-border bg-background p-8 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Tack, vi hör av oss!</h3>
                  <p className="text-sm text-muted-foreground">
                    Vill du berätta mer? Använd det fullständiga formuläret för datum, plats och bilagor.
                  </p>
                </div>
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

                <div>
                  <label htmlFor="quick-email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    E-post
                  </label>
                  <input
                    id="quick-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="namn@exempel.se"
                    className="w-full bg-card border border-border px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "quick-email-err" : undefined}
                  />
                  {errors.email && (
                    <p id="quick-email-err" className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="quick-message" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Kort om eventet
                  </label>
                  <textarea
                    id="quick-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="T.ex. bröllop för 80 gäster i augusti, behöver tält och belysning."
                    className="w-full bg-card border border-border px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors resize-none"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "quick-message-err" : undefined}
                  />
                  {errors.message && (
                    <p id="quick-message-err" className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors w-full sm:w-auto disabled:opacity-60"
                >
                  {submitting ? "Skickar…" : "Be oss höra av oss"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
