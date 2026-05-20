import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import cirkustalt1 from "@/assets/cirkustalt-1.jpg";
import cirkustalt2 from "@/assets/cirkustalt-2.jpg";
import cirkustalt3 from "@/assets/cirkustalt-3.jpg";
import cirkustalt4 from "@/assets/cirkustalt-4.jpg";
import cirkustalt5 from "@/assets/cirkustalt-5.jpg";
import cirkustalt6 from "@/assets/cirkustalt-6.jpg";
import rigg01 from "@/assets/cirkustalt-rigg-01-falt.jpg";
import rigg02 from "@/assets/cirkustalt-rigg-02-master-upp.jpg";
import rigg03 from "@/assets/cirkustalt-rigg-03-master-himmel.jpg";
import rigg04 from "@/assets/cirkustalt-rigg-04-duk-lyfts.jpg";
import rigg05 from "@/assets/cirkustalt-rigg-05-duk-spanns.jpg";
import rigg06 from "@/assets/cirkustalt-rigg-06-team.jpg";
import rigg07 from "@/assets/cirkustalt-rigg-07-stomme.jpg";
import rigg08 from "@/assets/cirkustalt-rigg-08-vaggar.jpg";
import rigg09 from "@/assets/cirkustalt-rigg-09-spand.jpg";
import rigg10 from "@/assets/cirkustalt-rigg-10-fardig.jpg";

const RIGG_STEPS: { src: string; alt: string; caption: string }[] = [
  { src: rigg01, alt: "Tomt fält i morgonljus innan riggen börjar", caption: "Tomt fält. Soluppgång." },
  { src: rigg02, alt: "Master-stänger reses på fältet med lådor och fordon", caption: "Master på plats." },
  { src: rigg03, alt: "Master-stänger pekar mot blå himmel med duk på marken", caption: "Sex master mot himlen." },
  { src: rigg04, alt: "Duken börjar lyftas över de första två masterna", caption: "Första lyftet." },
  { src: rigg05, alt: "Alla master uppe och duken spänns ut", caption: "Duken vecklas ut." },
  { src: rigg06, alt: "Team i gula västar arbetar med att fästa duken", caption: "Hands on." },
  { src: rigg07, alt: "Stommen reses med fyrhjuling och team i förgrunden", caption: "Stommen reses." },
  { src: rigg08, alt: "Väggar börjar sättas på plats runt tältet", caption: "Väggar på." },
  { src: rigg09, alt: "Mörkblå vägg spänd och färdig runt tältet", caption: "Spänt och tätt." },
  { src: rigg10, alt: "Det färdigresta blå cirkustältet i full prakt", caption: "Katedralen står." },
];

export const Route = createFileRoute("/cirkustalt")({
  head: () => ({
    meta: [
      { title: "Cirkustält uthyrning · Inevent" },
      {
        name: "description",
        content:
          "Hyr ikoniska cirkustält / big tops för festivaler, släpp, pop-ups och stora event. Flera storlekar, professionell rigg och leverans i hela Sverige.",
      },
      { property: "og:title", content: "Cirkustält uthyrning · Inevent" },
      {
        property: "og:description",
        content: "Big tops i flera storlekar. Perfekt för festivaler, släpp och pop-ups.",
      },
      { property: "og:image", content: cirkustalt1 },
      { name: "twitter:image", content: cirkustalt1 },
    ],
  }),
  component: Cirkustalt,
});

const features = [
  "Storlekar från intima 200 kvm till massiva 1500+ kvm",
  "Professionell rigg av certifierat team",
  "Klarar svenskt väder: vind, regn och kyla",
  "Anpassningsbart med scen, ljus, ljud och inredning",
  "Leverans och uppställning i hela Sverige",
  "Försäkrade och kontrollerade enligt branschstandard",
];

function Cirkustalt() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <img
          src={cirkustalt1}
          alt="Stort blått cirkustält uppställt på fält"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="relative h-full mx-auto max-w-[1400px] px-5 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Uthyrning</span>
          <h1 className="text-display text-6xl lg:text-9xl mt-3 max-w-4xl">
            Cirkus<span className="text-primary">tält.</span>
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-foreground/90 max-w-2xl">
            Ikoniska big tops som vänder vilket fält, torg eller parkering som helst till en
            destination. Sett från månen, eller åtminstone från andra sidan stan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              search={{ subject: "Cirkustält" }}
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

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-20 lg:py-28 space-y-24">
        {/* INTRO + FEATURES */}
        <section className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Varför cirkustält</span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Mer än ett <span className="text-stroke">tak.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Ett cirkustält är scenografi i sig självt. Spirorna, draperingarna, känslan av att
              kliva in i något större. Det är därför festivaler, märken och städer väljer big tops
              när de vill att något ska kännas.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {features.map((f) => (
                <li key={f} className="bg-background p-6 flex items-start gap-3">
                  <Check size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GALLERY — masonry style */}
        <section>
          <div className="flex items-end justify-between mb-8 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Galleri</span>
              <h2 className="text-display text-4xl lg:text-6xl mt-3">Tälten i sitt rätta element.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            <figure className="relative overflow-hidden bg-card border border-border lg:row-span-2 lg:col-span-2">
              <img
                src={cirkustalt2}
                alt="Cirkustält från ovan med kö av besökare"
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/5] lg:aspect-auto"
              />
            </figure>
            <figure className="relative overflow-hidden bg-card border border-border">
              <img
                src={cirkustalt4}
                alt="Cirkustält vid stranden"
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/3]"
              />
            </figure>
            <figure className="relative overflow-hidden bg-card border border-border">
              <img
                src={cirkustalt3}
                alt="Cirkustält med folksamling utanför"
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/3]"
              />
            </figure>
            <figure className="relative overflow-hidden bg-card border border-border sm:col-span-2 lg:col-span-3">
              <img
                src={cirkustalt6}
                alt="Cirkustält uppställt på torg i stadsmiljö"
                loading="lazy"
                className="h-full w-full object-cover aspect-[21/9]"
              />
            </figure>
            <figure className="relative overflow-hidden bg-card border border-border sm:col-span-2 lg:col-span-3">
              <img
                src={cirkustalt5}
                alt="Insidan av ett cirkustält med rigg och belysning"
                loading="lazy"
                className="h-full w-full object-cover aspect-[21/9]"
              />
            </figure>
          </div>
        </section>

        {/* RIGG TIMELINE */}
        <section>
          <div className="grid lg:grid-cols-12 gap-10 mb-10 items-end">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Process</span>
              <h2 className="text-display text-4xl lg:text-6xl mt-3">
                Från fält till <span className="text-primary">katedral.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
              Ett cirkustält reser sig inte av sig självt. Här är koreografin — från tom äng i
              gryningen till spänd duk mot blå himmel. Timmar av precision, komprimerade till tio bilder.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {RIGG_STEPS.map((step, i) => {
              const isWide = i === 0 || i === RIGG_STEPS.length - 1;
              return (
                <figure
                  key={step.src}
                  className={`group relative overflow-hidden bg-card border border-border ${
                    isWide ? "col-span-2" : ""
                  }`}
                >
                  <img
                    src={step.src}
                    alt={step.alt}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isWide ? "aspect-[21/9]" : "aspect-[4/5]"
                    }`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-3 lg:p-4 flex items-end justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-foreground/90">
                      {step.caption}
                    </span>
                    <span className="text-display text-2xl lg:text-3xl text-primary leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </figure>
              );
            })}
          </div>
        </section>

        {/* USE CASES */}

        <section className="grid lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            {
              title: "Festivaler",
              text: "Huvudscen, klubbtält eller artistlounge. Vi har riggat allt från intima scener till festivalhuvudtält för tusentals.",
            },
            {
              title: "Släpp & Pop-ups",
              text: "Ett cirkustält mitt i stan stoppar trafiken. Perfekt för märkesreleaser och aktiveringar som ska synas.",
            },
            {
              title: "Stadsfester & Galor",
              text: "Stadens torg blir festsal. Från julmarknad till kommunjubileum, tältet sätter scenen.",
            },
          ].map((c) => (
            <article key={c.title} className="bg-background p-8 lg:p-10">
              <h3 className="text-display text-3xl">{c.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="border-t border-border pt-16 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Nästa steg</span>
            <h2 className="text-display text-4xl lg:text-6xl mt-3">
              Berätta om ditt <span className="text-primary">event.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
              Skicka in datum, plats och ungefärligt antal gäster så återkommer vi med förslag på
              storlek, layout och pris.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/kontakt"
              search={{ subject: "Cirkustält" }}
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow transition-colors shadow-stage"
            >
              Begär offert
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/talt"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-foreground hover:bg-foreground/5 transition-colors"
            >
              Övriga tält
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
