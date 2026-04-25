import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/server/leads.functions";

const searchSchema = z.object({
  subject: z.string().optional(),
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Ange ditt namn").max(100),
  email: z.string().trim().email("Ogiltig e-postadress").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  event_type: z.string().trim().max(100).optional().or(z.literal("")),
  event_date: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => {
        if (!v) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const d = new Date(v);
        return !isNaN(d.getTime()) && d >= today;
      },
      { message: "Datumet kan inte vara passerat" }
    ),
  guest_count: z.string().optional().or(z.literal("")),
  location: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Berätta lite mer (minst 10 tecken)").max(5000),
  newsletter_opt_in: z.boolean(),
});

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Begär offert | Inevent" },
      {
        name: "description",
        content:
          "Berätta om ditt event så återkommer vi med en konkret offert inom 24-36 timmar. Telefon, e-post och formulär.",
      },
      { property: "og:title", content: "Kontakta Inevent — Begär offert" },
      { property: "og:description", content: "Vi svarar inom 24-36 timmar med en personlig offert." },
    ],
  }),
  validateSearch: zodValidator(searchSchema),
  component: Kontakt,
});

const EVENT_TYPES = [
  "Bröllop",
  "Företagsevent",
  "Konferens",
  "Festival",
  "Privatfest",
  "Sportevent",
  "Bara uthyrning",
  "Annat",
];

function Kontakt() {
  const { subject } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [optIn, setOptIn] = useState(true);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      event_type: String(fd.get("event_type") ?? ""),
      event_date: String(fd.get("event_date") ?? ""),
      guest_count: String(fd.get("guest_count") ?? ""),
      location: String(fd.get("location") ?? ""),
      message: String(fd.get("message") ?? ""),
      newsletter_opt_in: optIn,
    };

    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      toast.error("Vänligen kontrollera formuläret");
      return;
    }

    setSubmitting(true);
    try {
      const v = parsed.data;
      const result = await submitLead({
        data: {
          name: v.name,
          email: v.email,
          phone: v.phone || "",
          event_type: v.event_type || "",
          event_date: v.event_date || "",
          guest_count: v.guest_count || "",
          location: v.location || "",
          message: v.message,
          newsletter_opt_in: v.newsletter_opt_in,
          website: String(fd.get("website") ?? ""),
        },
      });

      if (!result.ok) {
        toast.error(result.error ?? "Något gick fel. Prova igen eller mejla oss direkt.");
        return;
      }

      setDone(true);
      toast.success("Tack! Vi hör av oss inom 24-36 timmar.");
    } catch (err) {
      console.error(err);
      toast.error("Något gick fel. Prova igen eller mejla oss direkt.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <CheckCircle2 size={64} className="mx-auto text-primary mb-6" />
        <h1 className="text-display text-5xl lg:text-7xl">
          Tack!
          <br />
          <span className="text-primary">Vi hör av oss.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Vi har tagit emot din förfrågan och återkommer inom 24-36 timmar med ett personligt svar och tar fram en offert i samråd.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left — info */}
        <aside className="lg:col-span-4 space-y-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Kontakt</span>
            <h1 className="text-display text-5xl lg:text-7xl mt-3">
              Berätta <br />
              <span className="text-primary">om ditt event.</span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Vi återkommer med en personlig dialog och tar fram en offert i samråd. Inga förpliktelser.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="mt-1 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={16} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">E-post</div>
                <a
                  href="mailto:mathias@inevent.se"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  mathias@inevent.se
                </a>
                <a
                  href="mailto:seance@inevent.se"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  seance@inevent.se
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-1 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={16} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</div>
                <a href="tel:+46708837997" className="block text-foreground hover:text-primary transition-colors">
                  +46 708 83 79 97
                </a>
                <a href="tel:+46708967690" className="block text-foreground hover:text-primary transition-colors">
                  +46 708 96 76 90
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-1 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={16} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Bas</div>
                <div className="text-foreground">Göteborg</div>
                <div className="text-sm text-muted-foreground">Finns där du behöver oss</div>
              </div>
            </div>
          </div>

          <div className="border border-border p-5 bg-card">
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs uppercase tracking-widest">Snabbt svar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Vi svarar alltså oftast inom <span className="text-foreground">någon timma</span> på vardagar — och alltid inom 36h.
            </p>
          </div>
        </aside>

        {/* Right — form */}
        <form onSubmit={onSubmit} className="lg:col-span-8 bg-card border border-border p-6 lg:p-10 space-y-5">
          {/* Honeypot — hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Namn *" name="name" error={errors.name} required />
            <Field label="E-post *" name="email" type="email" error={errors.email} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Telefon" name="phone" type="tel" error={errors.phone} />
            <Field label="Plats / stad" name="location" error={errors.location} placeholder="t.ex. Göteborg" />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Typ av event</label>
              <select
                name="event_type"
                defaultValue={subject ?? ""}
                className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Välj...</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Datum (om känt)" name="event_date" type="date" min={new Date().toISOString().split("T")[0]} error={errors.event_date} />
            <Field label="Antal gäster" name="guest_count" type="number" placeholder="t.ex. 150" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Berätta mer om ditt event *
            </label>
            <textarea
              name="message"
              rows={6}
              required
              defaultValue={subject ? `Jag är intresserad av: ${subject}\n\n` : ""}
              placeholder="Vad är visionen? Vad behöver du hjälp med — tält, podium, ljus, DJ, helt event?"
              onInvalid={(e) => e.currentTarget.setCustomValidity("Vänligen fyll i det här fältet")}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary resize-none"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span>
              Lägg till mig på e-postlistan — vi mejlar några gånger per år om nya tält, projekt och
              säsongs-erbjudanden.
            </span>
          </label>

          <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors disabled:opacity-60 shadow-stage"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? "Skickar..." : "Skicka förfrågan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  placeholder,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        min={min}
        onInvalid={(e) => {
          const el = e.currentTarget;
          if (el.validity.valueMissing) el.setCustomValidity("Vänligen fyll i det här fältet");
          else if (el.validity.typeMismatch && type === "email") el.setCustomValidity("Ange en giltig e-postadress");
          else if (el.validity.rangeUnderflow && type === "date") el.setCustomValidity("Datumet kan inte vara passerat");
          else if (el.validity.badInput && type === "number") el.setCustomValidity("Ange ett giltigt nummer");
          else el.setCustomValidity("Ogiltigt värde");
        }}
        onInput={(e) => e.currentTarget.setCustomValidity("")}
        className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
