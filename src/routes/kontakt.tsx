import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10 py-8 sm:py-12 lg:py-20">
      {/* Header */}
      <header className="max-w-4xl">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-primary">
          Kontakt
        </span>
        <h1 className="text-display text-4xl sm:text-5xl lg:text-7xl mt-2 sm:mt-3 leading-[1.05]">
          Berätta <span className="text-primary">om ditt event.</span>
        </h1>
        <p className="mt-3 sm:mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Tre korta steg — under en minut. Vi återkommer med en dialog och tar fram en offert i samråd. Inga förpliktelser.
        </p>
      </header>

      {/* Form */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <QuickContactForm initialSubject={subject} />
      </div>
    </div>
  );
}
