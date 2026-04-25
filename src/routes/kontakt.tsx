import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Mail, Phone, MapPin } from "lucide-react";
import { QuickContactForm } from "@/components/QuickContactForm";

const searchSchema = z.object({
  subject: z.string().optional(),
});

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt · Begär offert | Inevent" },
      {
        name: "description",
        content:
          "Berätta om ditt event så återkommer vi med en konkret offert inom 24-36 timmar. Telefon, e-post och formulär.",
      },
      { property: "og:title", content: "Kontakta Inevent · Begär offert" },
      { property: "og:description", content: "Vi svarar inom 24-36 timmar med en personlig offert." },
    ],
  }),
  validateSearch: zodValidator(searchSchema),
  component: Kontakt,
});

function Kontakt() {
  const { subject } = Route.useSearch();

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: info */}
        <aside className="lg:col-span-4 space-y-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Kontakt</span>
            <h1 className="text-display text-5xl lg:text-7xl mt-3">
              Berätta <br />
              <span className="text-primary">om ditt event.</span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Tre korta steg — under en minut. Vi återkommer med en personlig dialog och tar fram en offert i samråd. Inga förpliktelser.
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
              Oftast inom <span className="text-foreground">någon timma</span> på vardagar — annars senast inom 36 timmar.
            </p>
          </div>
        </aside>

        {/* Right: form */}
        <div className="lg:col-span-8">
          <QuickContactForm initialSubject={subject} />
        </div>
      </div>
    </div>
  );
}
