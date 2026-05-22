import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import taltHero from "@/assets/talt-hero-yurt.webp";
import hubTalt from "@/assets/talt-hub-inflatable.jpg";

export const Route = createFileRoute("/talt")({
  head: () => ({
    meta: [
      { title: "Tält uthyrning · Inevent" },
      {
        name: "description",
        content:
          "Hyr tält för alla tillfällen: bastutält, jakt- och fisketält, baslägertält, taktält, nomadtält, yurthor, yoga- och marknadstält. Leverans i hela Sverige.",
      },
      { property: "og:title", content: "Tält uthyrning · Inevent" },
      {
        property: "og:description",
        content:
          "Bastutält, baslägertält, taktält, nomadtält, yurthor, yoga- och marknadstält. Riggat av proffs.",
      },
      { property: "og:image", content: taltHero },
      { name: "twitter:image", content: taltHero },
    ],
    links: [{ rel: "canonical", href: "https://ineventgbg.lovable.app/talt" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Tält uthyrning",
          description:
            "Bastutält, jakt- och fisketält, baslägertält, taktält, nomadtält, yurthor, yoga- och marknadstält till uthyrning. Leverans och rigg i hela Sverige.",
          brand: { "@type": "Brand", name: "Inevent" },
          category: "Tent rental",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "SEK",
            url: "https://ineventgbg.lovable.app/talt",
          },
        }),
      },
    ],
  }),
  component: TaltPage,
});

type TentType = {
  name: string;
  blurb: string;
  details: string[];
  image?: string;
};

const TENT_TYPES: TentType[] = [
  {
    name: "Bastutält",
    blurb:
      "Mobil bastuupplevelse mitt i naturen, vid sjön eller på taket. Vedeldat eller eldrivet.",
    details: ["2–12 personer", "Vedeldad eller elektrisk", "Med eller utan omklädning"],
  },
  {
    name: "Jakt & fiske",
    blurb:
      "Robusta tält byggda för väder, vind och långa pass i skogen. Värmer, torkar och håller dig redo.",
    details: ["Kamintält med rökrör", "Vindtåligt vintermaterial", "Snabb uppställning i fält"],
  },
  {
    name: "Basläger tält + gear",
    blurb:
      "Komplett baslägerlösning för expedition, retreat eller filmproduktion. Tält, kök, värme och utrustning.",
    details: ["Modulärt baslägersystem", "Kök, mäss och sov-tält", "Generator, värme och belysning"],
  },
  {
    name: "Taktält",
    blurb:
      "Inspirerade av militära fältförläggningar: rena linjer, robusta tygdukar och seriös känsla.",
    details: ["A-form och pyramidtak", "Naturmaterial och canvas", "För 4–30 personer"],
  },
  {
    name: "Nomadtält",
    blurb:
      "Berber- och beduininspirerade tält i naturmaterial. Skapar omedelbart en magisk atmosfär.",
    details: ["Handvävda tygdukar", "Mattor och kuddar inkluderat", "För lounge eller middag"],
  },
  {
    name: "Yurthor",
    blurb:
      "Centralasiatiska yurthor med trästomme och tygduk. Cirkulär arkitektur med rejäl närvaro.",
    details: ["Diameter 4–10 meter", "Trästomme och canvas", "Vedkamin som tillval"],
  },
  {
    name: "Mindre tält för 4–12 personer",
    blurb:
      "Intima tält för mindre sällskap: privat middag, retreat, glamping eller pop-up-bar.",
    details: ["Pagod, bell tent eller A-form", "4–12 personer", "Plant trägolv som tillval"],
  },
  {
    name: "Yoga, fitness & health",
    blurb:
      "Lugna, ljusa rum för yoga, andning och rörelse. Trägolv, naturligt ljus och rätt akustik.",
    details: ["Plant trägolv", "Mjukt dagsljus genom canvas", "Värme och ventilation"],
  },
  {
    name: "Marknadstält",
    blurb:
      "Klassiska marknads- och torgtält för pop-ups, food trucks, julmarknader och festivaler.",
    details: ["3x3, 4x4, 5x5 m moduler", "Sidoväggar och disk", "Brandgodkänt material"],
  },
  {
    name: "Uppblåsbara hubtält",
    blurb:
      "Lättuppsatta hubar för expeditioner, crew-baser och snabba pop-ups på event. Uppe på minuter, inga stänger att jonglera.",
    details: ["Uppblåst på 5–15 minuter", "Crew-, medical- eller info-hub", "Packas litet, reser lätt"],
    image: hubTalt,
  },
];

function TaltPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={taltHero}
          alt="Yurttält uppställt på gräsfält i skymning"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="relative h-full mx-auto max-w-[1400px] px-5 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Uthyrning</span>
          <h1 className="text-display text-6xl lg:text-9xl mt-3 max-w-4xl">
            Tält<span className="text-primary">.</span>
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-foreground/90 max-w-2xl">
            Från bastutält vid sjökanten till yurthor på fjället. Vi har tält för varje syfte.
            Riggade, värmda och redo när du är.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
            >
              Begär offert
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cirkustalt"
              className="group inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:bg-primary/20 hover:border-primary transition-colors"
            >
              Cirkustält
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+46769023027"
              className="inline-flex items-center gap-3 border border-foreground/30 backdrop-blur-sm bg-background/30 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground hover:bg-background/50 transition-colors"
            >
              Ring 0769-02 30 27
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-20 lg:py-28 space-y-20">
        {/* INTRO */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Vårt utbud</span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Tio tälttyper + hubs. <span className="text-primary">Ett team.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Vi arbetar med tält av alla skalor och stilar, från privata bastutält till storskaliga
            marknadstält. Berätta vad du planerar så hjälper vi dig välja rätt typ, storlek och
            tillval.
          </p>
        </section>

        {/* TENT TYPES GRID */}
        <section className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {TENT_TYPES.map((t) => (
            <article
              key={t.name}
              className="bg-background p-8 lg:p-10 flex flex-col gap-5 hover:bg-card transition-colors"
            >
              {t.image && (
                <div className="relative -mx-8 lg:-mx-10 -mt-8 lg:-mt-10 mb-2 aspect-[16/10] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-display text-2xl lg:text-3xl">{t.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.blurb}</p>
              <ul className="space-y-1.5 text-sm text-foreground/80 mt-auto pt-4 border-t border-border">
                {t.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-card border border-border p-10 lg:p-16 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Nästa steg</span>
          <h2 className="text-display text-4xl lg:text-5xl max-w-3xl mx-auto">
            Berätta om ditt event, vi föreslår rätt tält.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skicka in datum, plats och ungefärligt antal gäster så återkommer vi med förslag på
            typ, storlek och pris.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
            >
              Begär offert
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cirkustalt"
              className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground transition-colors"
            >
              Se cirkustält
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
