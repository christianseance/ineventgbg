import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Tent, Music } from "lucide-react";
import heroImg from "@/assets/hero-tent.jpg";
import heroCanopy from "@/assets/hero-canopy.webp";
import { CATEGORIES, GROUPS } from "@/data/gallery";
import { QuickLeadForm } from "@/components/QuickLeadForm";

const HERO_IMAGES = [
  { src: heroImg, alt: "Cirkustält upplyst i rött med scenljus och rök" },
  { src: heroCanopy, alt: "Färgsprakande tygbaldakin i skogen med publik och rök" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inevent · Cirkustält, podium, ljus & komplett eventproduktion" },
      {
        name: "description",
        content:
          "Cirkustält, podium, ljus, DJ och allt event-pyssel. Vi gör hela ditt event. Utgår från Göteborg, finns där du behöver oss.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://inevent.se/" },
      { property: "og:site_name", content: "Inevent" },
      { property: "og:locale", content: "sv_SE" },
      { property: "og:title", content: "Inevent · Vi löser nästan allt inom event" },
      {
        property: "og:description",
        content: "Cirkustält, podium, ljus, DJ, bröllop, företagsfest. Begär offert idag.",
      },
      { property: "og:image", content: "https://inevent.se/og-hero.jpg" },
      { property: "og:image:secure_url", content: "https://inevent.se/og-hero.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Cirkustält upplyst i rött med scenljus" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Inevent · Vi löser nästan allt inom event" },
      {
        name: "twitter:description",
        content: "Cirkustält, podium, ljus, DJ, bröllop, företagsfest. Begär offert idag.",
      },
      { name: "twitter:image", content: "https://inevent.se/og-hero.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredSlugs = [
    "cirkustalt",
    "teknik",
    "brollop",
    "foretagsevent",
    "eventarkitekt",
    "dj",
  ];
  const featured = featuredSlugs
    .map((slug) => CATEGORIES.find((c) => c.slug === slug)!)
    .filter(Boolean);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO: asymmetric */}
      <section className="relative min-h-[92vh] overflow-hidden grain">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1920}
              height={1080}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                i === heroIndex ? "opacity-60" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 pt-24 lg:pt-32 pb-40 lg:pb-48">
          <div className="grid lg:grid-cols-12 gap-8 items-end min-h-[70vh]">
            {/* Left: main headline */}
            <div className="lg:col-span-8 fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary">Eventproduktion sedan 2001</span>
              </div>
              <h1 className="text-display text-[clamp(3.5rem,11vw,11rem)] text-foreground uppercase">
                Vi reser <br />
                <span className="text-primary">och lyfter</span> <br />
                <span className="text-stroke">rummet</span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Cirkustält, podier, belysning, diverse eventtält, bar/bord-stolar och mattor. Nämn det vi <em className="italic text-foreground">inte</em> har själva eller i vårt fantastiska nätverk..? Vi
                utgår från Göteborg, men dyker upp där vi behövs.
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

            {/* Right: stats card (asymmetric) */}
            <div className="lg:col-span-4 lg:translate-y-12 fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card/80 backdrop-blur-md border border-border p-8 space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs uppercase tracking-widest">Tillgänglig nu</span>
                </div>
                <div>
                  <div className="text-display text-5xl text-foreground">300+</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Genomförda event</div>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <div className="text-display text-5xl text-foreground">
                    25<span className="text-primary">år</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">I branschen</div>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <div className="text-display text-5xl text-foreground">24-36h</div>
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
                <span>★ Belysning</span>
                <span>★ DJ</span>
                <span>★ Bröllop</span>
                <span>★ Företagsevent</span>
                <span>★ Konferens</span>
                <span>★ Festival</span>
                <span>★ Teknik</span>
                <span>★ Eventarkitekt</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO: three pillars */}
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
                Hyr direkt från lagret, boka komplett mindre/mellanstort event eller lägg till en av våra experter i ditt team. Allt
                skalbart, från ett ensamt podium via en mindre festivalproduktion till ett enormt cirkustält!
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
                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all"
                    />
                  </div>
                  <h3 className="text-display text-4xl mb-3">{g.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED: asymmetric grid */}
      <section className="relative py-20 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Galleri</span>
              <h2 className="text-display text-5xl lg:text-7xl mt-3">Ett urval ur vår arsenal</h2>
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

      {/* QUICK LEAD: lead magnet — förberedelseguide */}
      <QuickLeadForm />

      {/* FINAL CTA */}
      <section className="relative py-24 border-t border-border bg-gradient-to-b from-background to-card/50">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <h2 className="text-display text-5xl lg:text-8xl">
            Redo att börja <span className="text-primary">bygga</span> ditt event..?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Berätta om visionen. Vi återkommer med första steget till en plan snarast!
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
