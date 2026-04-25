import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — Inevent" },
      {
        name: "description",
        content:
          "Inevent har producerat event och hyrt ut tält, podium och teknik sedan 2001. Utgår från Göteborg — finns där du behöver oss.",
      },
      { property: "og:title", content: "Om Inevent" },
      { property: "og:description", content: "Människorna bakom tälten — Inevent sedan 2001." },
    ],
  }),
  component: OmOss,
});

function OmOss() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Om oss</span>
          <h1 className="text-display text-6xl lg:text-8xl mt-3">
            Vi <span className="text-primary">älskar</span> <br />
            att bygga rum <br />
            där saker händer.
          </h1>
          <div className="mt-10 space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">
            <p>
              Inevent startades 2001 i Göteborg av människor som tröttnade på halvdana eventproduktioner.
              Idag äger vi en av Sveriges största lager av cirkustält, eventtält, podium, ljus och teknik —
              och, lika viktigt, ett team som vet exakt hur allt riggas.
            </p>
            <p>
              Vi tar projekt från en enda dag till veckolånga festivaler. Från ett podium på en gata
              till en komplett LED-vägg i en konsertarena. Bröllop med 30 gäster eller företagsfest
              med 3 000.
            </p>
            <p>
              Det vi lovar är enkelt: vi svarar snabbt, vi är ärliga med pris, och när dagen kommer
              fungerar allt.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-px bg-border">
          {[
            { k: "2001", v: "Året vi startade" },
            { k: "500+", v: "Genomförda event" },
            { k: "Norden", v: "Geografisk räckvidd" },
            { k: "24h", v: "Svar på offerter" },
            { k: "12", v: "Människor i teamet" },
            { k: "1500m²", v: "Lagerareal i Göteborg" },
          ].map((s) => (
            <div key={s.k} className="bg-background p-8 flex justify-between items-baseline">
              <span className="text-display text-5xl text-foreground">{s.k}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-32 border-t border-border pt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-display text-5xl lg:text-7xl">
          Låt oss <span className="text-primary">bygga</span> nåt ihop.
        </h2>
        <Link
          to="/kontakt"
          className="mt-8 inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors"
        >
          Begär offert <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
