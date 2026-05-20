import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import interiorHero from "@/assets/interior-hero.jpg";
import mobler from "@/assets/cat-mobler.jpg";
import belysning from "@/assets/cat-belysning-interior.jpg";
import vaxter from "@/assets/cat-vaxter.jpg";
import bar from "@/assets/cat-bar.jpg";
import dukning from "@/assets/cat-dukning.jpg";
import effektmaskiner from "@/assets/cat-effektmaskiner.jpg";
import draperier from "@/assets/cat-draperier.jpg";
import mattorLounge from "@/assets/cat-mattor-loungeyta.jpg";

export const Route = createFileRoute("/interior")({
  head: () => ({
    meta: [
      { title: "Interiör · Inevent" },
      {
        name: "description",
        content:
          "Hyr inredning, belysning, växter, bar, draperier och scenografi. Vi dekorerar rummet — från möbler och mattor till effektmaskiner och dukning.",
      },
      { property: "og:title", content: "Interiör · Inevent" },
      {
        property: "og:description",
        content:
          "Allt för att klä rummet: möbler, belysning, växter, bar, draperier, mattor, dukning och effektmaskiner.",
      },
      { property: "og:image", content: interiorHero },
      { name: "twitter:image", content: interiorHero },
    ],
  }),
  component: InteriorPage,
});

type InteriorCategory = {
  name: string;
  blurb: string;
  cover: string;
  details: string[];
};

const INTERIOR_CATEGORIES: InteriorCategory[] = [
  {
    name: "Möbler & inredning",
    cover: mobler,
    blurb:
      "Sammet, skinn, vintage och modern design. Soffgrupper, fåtöljer, soffbord och accentmöbler som bygger rummets karaktär.",
    details: ["Loungesoffor och fåtöljer", "Soffbord i mässing och marmor", "Stolar, bord och barpallar"],
  },
  {
    name: "Belysning & atmosfär",
    cover: belysning,
    blurb:
      "Edisonlampor, slingor, golvlampor, lyktor och bordslampor. Det varma ljuset som förvandlar ett rum från lokal till upplevelse.",
    details: ["Slingor och Edisonbulbar", "Bord- och golvlampor", "Lyktor och levande ljus"],
  },
  {
    name: "Växter & botaniskt",
    cover: vaxter,
    blurb:
      "Stora palmer, hängväxter, monstera och blomsterarrangemang. Vi bygger gröna rum som andas och lever.",
    details: ["Palmer och stora golv-växter", "Hängväxter i tak", "Färska blomsterarrangemang"],
  },
  {
    name: "Bar & glas",
    cover: bar,
    blurb:
      "Mobila barer i mässing, trä eller marmor. Backbar, glas, shakers och allt däromkring — färdigt för bartendern.",
    details: ["Mobila bardiskar i flera material", "Backbar med belysning", "Glas, karaffer och bartillbehör"],
  },
  {
    name: "Dukning & porslin",
    cover: dukning,
    blurb:
      "Linnedukar, ljusstakar, keramik, mässingsbestick och vasor. En komplett dukning från första tallrik till sista servett.",
    details: ["Linne, bomull och sammet", "Porslin, glas och bestick", "Ljusstakar, vaser och bordsdekor"],
  },
  {
    name: "Effekt- & rökmaskiner",
    cover: effektmaskiner,
    blurb:
      "Hazers, rökmaskiner, lågrök, konfettikanoner och CO2-jets. Maskinerna som förstärker scenens dramatik.",
    details: ["Haze och rökmaskin", "Lågrök för dansgolv", "Konfetti och CO2-effekter"],
  },
  {
    name: "Draperier & scenografi",
    cover: draperier,
    blurb:
      "Tygdraperier i tak och som väggar. Vi delar in rummet, mjukar upp akustik och bygger scenografi i textil.",
    details: ["Takdraperier i chiffong", "Sceniska bakgrundsdraperier", "Rumsavdelare och tunnlar"],
  },
  {
    name: "Mattor & loungeytor",
    cover: mattorLounge,
    blurb:
      "Persiska mattor, marockanska puffar och golvkuddar. Loungeytor som inbjuder till samtal sent in på natten.",
    details: ["Persiska och kelimmattor", "Puffar och golvkuddar", "Lågsittsoffor och plattformer"],
  },
];

function InteriorPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={interiorHero}
          alt="Stämningsfull tältinteriör med Edisonlampor, hängväxter och loungemöbler"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="relative h-full mx-auto max-w-[1400px] px-5 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Dekor & utrustning</span>
          <h1 className="text-display text-6xl lg:text-9xl mt-3 max-w-4xl">
            Interiör<span className="text-primary">.</span>
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-foreground/90 max-w-2xl">
            Vi klär rummet. Från soffor och mattor till växter, ljus och draperier — allt för att
            förvandla ett tomt skal till ett rum man inte vill lämna.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
            >
              Begär offert
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
              Åtta världar. <span className="text-primary">Ett rum.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Vårt lager rymmer tusentals dekorobjekt — från sammetssoffor och persiska mattor till
            lågrök, draperier och tropiska palmer. Vi plockar ihop, levererar och bygger upp så att
            allt står klart när du går in i rummet.
          </p>
        </section>

        {/* CATEGORY GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTERIOR_CATEGORIES.map((cat, i) => (
            <article
              key={cat.name}
              className={`group relative overflow-hidden bg-card border border-border ${
                i % 5 === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"} overflow-hidden`}>
                <img
                  src={cat.cover}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                <div className="absolute top-4 left-4">
                  <span className="bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest text-primary">
                    Interiör
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-display text-3xl">{cat.name}</h3>
                  <Link
                    to="/kontakt"
                    search={{ subject: cat.name }}
                    className="shrink-0 h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    aria-label={`Få offert för ${cat.name}`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{cat.blurb}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-foreground/80 pt-4 border-t border-border">
                  {cat.details.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-card border border-border p-10 lg:p-16 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Nästa steg</span>
          <h2 className="text-display text-4xl lg:text-5xl max-w-3xl mx-auto">
            Berätta om stämningen — vi bygger rummet.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skicka in datum, plats och en känsla — moodboard, referensbild eller bara några ord. Vi
            återkommer med förslag på dekor, layout och pris.
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
              to="/galleri"
              className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground transition-colors"
            >
              Tillbaka till galleriet
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
