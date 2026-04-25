import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
  PartyPopper,
  Building2,
  Music,
  Users,
  Tent,
  Sparkles,
} from "lucide-react";
import { submitLead } from "@/server/leads.functions";
import { PrivacyDisclosure } from "@/components/PrivacyDisclosure";

const EVENT_OPTIONS: { value: string; label: string; icon: typeof PartyPopper }[] = [
  { value: "Bröllop", label: "Bröllop", icon: Sparkles },
  { value: "Företagsevent", label: "Företag", icon: Building2 },
  { value: "Festival", label: "Festival", icon: Music },
  { value: "Privatfest", label: "Privatfest", icon: PartyPopper },
  { value: "Bara uthyrning", label: "Bara tält", icon: Tent },
  { value: "Annat", label: "Annat", icon: Users },
];

const stepOneSchema = z.object({
  event_type: z.string().min(1, "Välj ett alternativ"),
});
const stepTwoSchema = z.object({
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
  guest_count: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v) return true;
        const n = Number(v);
        return Number.isFinite(n) && Number.isInteger(n) && n >= 0 && n <= 100000;
      },
      { message: "Ange ett positivt heltal" }
    ),
  location: z.string().trim().max(150).optional().or(z.literal("")),
});
const stepThreeSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Ogiltig e-postadress").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type State = {
  event_type: string;
  event_date: string;
  guest_count: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: State = {
  event_type: "",
  event_date: "",
  guest_count: "",
  location: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function QuickContactForm({ initialSubject }: { initialSubject?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<State>({
    ...INITIAL,
    event_type: initialSubject && EVENT_OPTIONS.some((o) => o.value === initialSubject) ? initialSubject : "",
    message: initialSubject && !EVENT_OPTIONS.some((o) => o.value === initialSubject)
      ? `Jag är intresserad av: ${initialSubject}`
      : "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof State>(k: K, v: State[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  };

  const selectEventType = (value: string) => {
    setData((d) => ({ ...d, event_type: value }));
    setErrors((e) => ({ ...e, event_type: "" }));
    // Liten fördröjning så användaren ser sitt val markeras innan vi byter steg
    setTimeout(() => setStep(2), 450);
  };

  const goNext = () => {
    if (step === 1) {
      const r = stepOneSchema.safeParse(data);
      if (!r.success) {
        setErrors({ event_type: r.error.issues[0]?.message ?? "Välj ett alternativ" });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const r = stepTwoSchema.safeParse(data);
      if (!r.success) {
        const errs: Record<string, string> = {};
        r.error.issues.forEach((i) => {
          errs[String(i.path[0])] = i.message;
        });
        setErrors(errs);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const goBack = () => {
    setErrors({});
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = stepThreeSchema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const message =
        data.message?.trim() ||
        `Förfrågan via formulär: ${data.event_type}${data.event_date ? `, ${data.event_date}` : ""}${data.location ? `, ${data.location}` : ""}${data.guest_count ? `, ca ${data.guest_count} gäster` : ""}.`;

      const res = await submitLead({
        data: {
          name: data.name.trim() || "Anonym",
          email: data.email,
          phone: data.phone || "",
          event_type: data.event_type || "",
          event_date: data.event_date || "",
          guest_count: data.guest_count || "",
          location: data.location || "",
          message,
          newsletter_opt_in: true,
          website,
          attachment: null,
        },
      });
      if (!res.ok) {
        toast.error(res.error ?? "Något gick fel. Prova igen eller mejla oss direkt.");
        return;
      }
      setDone(true);
      toast.success("Tack! Vi hör av oss inom kort.");
    } catch (err) {
      console.error(err);
      toast.error("Något gick fel. Prova igen eller mejla oss direkt.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-card border border-border p-8 lg:p-12 text-center">
        <CheckCircle2 size={56} className="mx-auto text-primary mb-5" />
        <h3 className="text-display text-3xl lg:text-4xl">Tack {data.name.split(" ")[0]}!</h3>
        <p className="mt-4 text-muted-foreground">
          Vi har tagit emot din förfrågan och hör av oss inom kort — oftast samma dag på vardagar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border p-6 lg:p-10">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Steg {step} av 3
          </span>
          <span className="text-xs text-muted-foreground">
            {step === 1 && "Vad gäller det?"}
            {step === 2 && "När och var?"}
            {step === 3 && "Dina uppgifter"}
          </span>
        </div>
        <div className="h-1 bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-display text-2xl lg:text-3xl mb-6">Vilken typ av event?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EVENT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = data.event_type === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectEventType(opt.value)}
                  className={`group flex flex-col items-center justify-center gap-2 border p-5 transition-all ${
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background hover:border-primary/50 text-foreground/80"
                  }`}
                >
                  <Icon
                    size={22}
                    className={active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
          {errors.event_type && (
            <p className="mt-3 text-xs text-destructive">{errors.event_type}</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-display text-2xl lg:text-3xl mb-2">När och var?</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Allt här är valfritt — fyll i det du vet.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Datum (om känt)
              </label>
              <input
                type="date"
                value={data.event_date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => update("event_date", e.target.value)}
                className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
              />
              {errors.event_date && (
                <p className="mt-1 text-xs text-destructive">{errors.event_date}</p>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Antal gäster
              </label>
              <input
                type="number"
                min="0"
                value={data.guest_count}
                onChange={(e) => update("guest_count", e.target.value)}
                className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
              />
              {errors.guest_count && (
                <p className="mt-1 text-xs text-destructive">{errors.guest_count}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Plats / stad
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-display text-2xl lg:text-3xl mb-2">Vart får vi höra av oss?</h3>
            <p className="text-sm text-muted-foreground">
              Vi återkommer med en personlig dialog — oftast samma dag.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Namn *
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                E-post *
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Telefon (valfritt)
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Något du vill tillägga? (valfritt)
            </label>
            <textarea
              rows={3}
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Vision, behov, önskemål..."
              className="w-full bg-input border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
          
        </div>
      )}

      <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3 pt-5 border-t border-border">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            aria-label="Tillbaka"
            className="shrink-0 inline-flex items-center gap-2 px-2 sm:px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Tillbaka</span>
          </button>
        )}

        {step === 1 && (
          <div className="flex-1 min-w-0 text-xs text-muted-foreground">
            Välj det som passar bäst — du kan precisera senare.
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 min-w-0 overflow-hidden text-xs">
            <PrivacyDisclosure />
          </div>
        )}

        <div className="ml-auto shrink-0">
          {step === 1 && (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 sm:gap-3 bg-primary px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors whitespace-nowrap"
            >
              Nästa <ArrowRight size={16} />
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 sm:gap-3 bg-primary px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors whitespace-nowrap"
            >
              <span className="sm:hidden">Nästa</span>
              <span className="hidden sm:inline">Nästa / hoppa över</span>
              <ArrowRight size={16} />
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 sm:gap-3 bg-primary px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors disabled:opacity-60 shadow-stage whitespace-nowrap"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              <span>{submitting ? "Skickar..." : "Skicka"}</span>
              <span className="hidden sm:inline">{submitting ? "" : "förfrågan"}</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
