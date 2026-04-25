import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import { CATEGORIES, GROUPS, type Group } from "@/data/gallery";

export const Route = createFileRoute("/tjanster")({
  head: () => ({
    meta: [
      { title: "Tjänster · Inevent" },
      {
        name: "description",
        content:
          "Uthyrning, eventproduktion och team. Vi har människorna och utrustningen för ditt event.",
      },
      { property: "og:title", content: "Tjänster · Inevent" },
      { property: "og:description", content: "Tre sätt att jobba med oss: uthyrning, event och funktioner." },
    ],
  }),
  component: Tjanster,
});

function Tjanster() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20 space-y-24">
      <header className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Tjänster</span>
          <h1 className="text-display text-6xl lg:text-8xl mt-3">
            Allt under <br /><span className="text-primary">ett tak.</span>
          </h1>
        </div>
        <div className="lg:col-span-5 self-end">
          <p className="text-muted-foreground text-lg">
            Vi hyr ut delar, lägger upp ett komplett event eller tar in en av våra experter i ditt team.
            Tre tydliga vägar, alla fullt skalbara.
          </p>
        </div>
      </header>

      {(Object.keys(GROUPS) as Group[]).map((g, idx) => {
        const cats = CATEGORIES.filter((c) => c.group === g);
        return (
          <section key={g} className="grid lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="lg:sticky lg:top-32 space-y-5">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">0{idx + 1}</span>
                <h2 className="text-display text-5xl lg:text-6xl">{GROUPS[g].label}</h2>
                <p className="text-muted-foreground">{GROUPS[g].description}</p>
                <Link
                  to="/galleri"
                  search={{ group: g }}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:gap-3 transition-all"
                >
                  Se galleri <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {cats.map((c) => {
                const isCirkus = c.slug === "cirkustalt";
                const isOvriga = c.slug === "ovriga-talt";
                const linkProps = isCirkus
                  ? ({ to: "/cirkustalt" } as const)
                  : isOvriga
                  ? ({ to: "/talt" } as const)
                  : ({ to: "/kontakt", search: { subject: c.name } } as const);
                return (
                <Link
                  key={c.slug}
                  {...linkProps}
                  className="group relative aspect-[4/3] overflow-hidden bg-card border border-border"
                >
                  <img
                    src={c.cover}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="text-display text-3xl">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.blurb}</p>
                  </div>
                </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* INLINE CTA + SOCIAL PROOF */}
      <section className="relative pt-8 border-t border-border">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Låter det rätt?</span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Boka en kostnadsfri <span className="text-primary">konsultation.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
              Femton minuter där vi lyssnar, ställer rätt frågor och säger ärligt om vi är rätt för
              ditt event. Inga säljpitchar, inget krångel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kontakt"
                className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
              >
                Boka konsultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+46708967690"
                className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground hover:bg-foreground/5 transition-colors"
              >
                Ring oss direkt
              </a>
            </div>
          </div>

          {/* Social proof */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-px bg-border border border-border">
              <div className="bg-background p-6 text-center">
                <div className="text-display text-4xl text-primary">96%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Nöjda kunder</div>
              </div>
              <div className="bg-background p-6 text-center">
                <div className="text-display text-4xl text-primary">25</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">År i branschen</div>
              </div>
              <div className="bg-background p-6 text-center">
                <div className="text-display text-4xl text-primary">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Levererade i tid</div>
              </div>
            </div>
            <blockquote className="mt-5 border-l-2 border-primary pl-5 py-2 text-sm text-muted-foreground italic">
              ”Raka besked, snabb uppställning och ett tält som lyfte hela kvällen.”
              <footer className="mt-2 not-italic text-xs uppercase tracking-widest text-foreground/60">
                Tidigare kund, bröllop i Bohuslän
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
