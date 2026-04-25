import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Tent, Music, Lightbulb } from "lucide-react";
import heroImg from "@/assets/hero-tent.jpg";
import { CATEGORIES, GROUPS } from "@/data/gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inevent — Cirkustält, podium, ljus & komplett eventproduktion" },
      {
        name: "description",
        content:
          "Cirkustält, podium, ljus, DJ och allt event-pyssel — vi gör hela ditt event. Utgår från Göteborg — finns där du behöver oss.",
      },
      { property: "og:title", content: "Inevent — Vi löser allt inom event" },
      {
        property: "og:description",
        content: "Cirkustält, podium, ljus, DJ, bröllop, företagsfest. Begär offert idag.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = CATEGORIES.slice(0, 6);

  return (
    <>
      {/* HERO — asymmetric */}
      <section className="relative min-h-[92vh] overflow-hidden grain">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cirkustält upplyst i rött med scenljus och rök"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 pt-24 lg:pt-32 pb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end min-h-[70vh]">
            {/* Left — main headline */}
            <div className="lg:col-span-8 fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary">Eventproduktion sedan 2001</span>
              </div>
              <h1 className="text-display text-[clamp(3.5rem,11vw,11rem)] text-foreground">
                Vi reser <br />
                <span className="text-primary">rummet.</span> <br />
                <span className="text-stroke">Du gör showen.</span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Cirkustält, podier, ljus, lasrar, DJ:s, bröllop, företagsfester — du namnger det,
                vi bygger det. Utgår från Göteborg — finns där du behöver oss.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/kontakt"
                  className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
                >
                  Begär offert
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/galleri"
                  className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground hover:bg-foreground/5 transition-colors"
                >
                  Utforska galleri
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right — stats card (asymmetric) */}
            <div className="lg:col-span-4 lg:translate-y-12 fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card/80 backdrop-blur-md border border-border p-8 space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs uppercase tracking-widest">Tillgänglig nu</span>
                </div>
                <div>
                  <div className="text-display text-5xl text-foreground">500+</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Genomförda event</div>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <div className="text-display text-5xl text-foreground">25<span className="text-primary">år</span></div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">I branschen</div>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <div className="text-display text-5xl text-foreground">24h</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Svar på offert</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 inset-x-0 border-y border-border bg-background/60 backdrop-blur-sm py-4 overflow-hidden">
          <div className="marquee flex gap-12 whitespace-nowrap text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0">
                <span>★ Cirkustält</span>
                <span>★ Podium & scen</span>
                <span>★ Ljus & lasrar</span>
                <span>★ DJ</span>
                <span>★ Bröllop</span>
                <span>★ Företagsevent</span>
                <span>★ Konferens</span>
                <span>★ Festival</span>
                <span>★ Ljudteknik</span>
                <span>★ Eventarkitekt</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO — three pillars */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Vad vi gör</span>
              <h2 className="text-display text-5xl lg:text-7xl mt-3">
                Tre <span className="text-primary">sätt</span> att jobba med oss.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 self-end">
              <p className="text-lg text-muted-foreground">
                Hyr direkt från lagret, boka komplett event eller lägg till en av våra människor i ditt team.
                Allt skalbart — från ett ensamt podium till en full festivalproduktion.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-border">
            {(Object.keys(GROUPS) as Array<keyof typeof GROUPS>).map((key, i) => {
              const g = GROUPS[key];
              const Icon = key === "uthyrning" ? Tent : key === "event" ? Sparkles : Music;
              return (
                <Link
                  key={key}
                  to="/galleri"
                  search={{ group: key }}
                  className="group relative bg-background p-10 hover:bg-card transition-colors"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">0{i + 1}</span>
                      <Icon size={20} className="text-primary" />
                    </div>
                    <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
                  </div>
                  <h3 className="text-display text-4xl mb-3">{g.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED — asymmetric grid */}
      <section className="relative py-20 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Galleri</span>
              <h2 className="text-display text-5xl lg:text-7xl mt-3">Ett urval ur vårt arsenal</h2>
            </div>
            <Link
              to="/galleri"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors"
            >
              Se alla kategorier <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {featured.map((cat, i) => {
              // Asymmetric pattern
              const layouts = [
                "col-span-12 lg:col-span-7 lg:row-span-2",
                "col-span-6 lg:col-span-5 lg:row-span-1",
                "col-span-6 lg:col-span-5 lg:row-span-1",
                "col-span-6 lg:col-span-4 lg:row-span-1",
                "col-span-6 lg:col-span-4 lg:row-span-1",
                "col-span-12 lg:col-span-4 lg:row-span-1",
              ];
              return (
                <Link
                  key={cat.slug}
                  to="/galleri"
                  search={{ group: cat.group, category: cat.slug }}
                  className={`group relative overflow-hidden bg-card ${layouts[i]}`}
                >
                  <img
                    src={cat.cover}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-xs uppercase tracking-widest text-primary mb-1">
                      {GROUPS[cat.group].label}
                    </span>
                    <h3 className="text-display text-3xl lg:text-4xl">{cat.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Hur det går till</span>
              <h2 className="text-display text-5xl lg:text-7xl mt-3">
                Idé till <br /><span className="text-primary">uppställning</span> <br />på fyra steg.
              </h2>
              <Link
                to="/kontakt"
                className="mt-10 inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors"
              >
                <Lightbulb size={16} /> Starta projekt
              </Link>
            </div>
            <ol className="lg:col-span-7 space-y-6">
              {[
                { n: "01", t: "Briefen", d: "Ring eller fyll i formuläret. Vi lyssnar, ställer frågor och förstår vad du vill skapa." },
                { n: "02", t: "Förslaget", d: "Inom 24h får du en konkret offert med setup, teknik, tider och pris." },
                { n: "03", t: "Produktionen", d: "Vi tar hand om logistik, tillstånd, leverantörer och rigging. Du fokuserar på gästerna." },
                { n: "04", t: "Showen", d: "Vi är på plats hela vägen — från första spik till sista bil ut från området." },
              ].map((step) => (
                <li key={step.n} className="group flex gap-6 border-b border-border pb-6 hover:border-primary transition-colors">
                  <span className="text-display text-5xl text-primary shrink-0 w-20">{step.n}</span>
                  <div>
                    <h3 className="text-display text-3xl mb-2">{step.t}</h3>
                    <p className="text-muted-foreground">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 border-t border-border bg-gradient-to-b from-background to-card/50">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <h2 className="text-display text-5xl lg:text-8xl">
            Redo att <span className="text-primary">bygga</span> ditt event?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Berätta om visionen — vi återkommer med en plan inom 24 timmar.
          </p>
          <Link
            to="/kontakt"
            className="mt-10 inline-flex items-center gap-3 bg-primary px-10 py-5 text-base font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
          >
            Begär offert <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
