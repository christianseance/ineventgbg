import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo44Hertz from "@/assets/partners/44hertz.jpg";
import logoEasyTiger from "@/assets/partners/easytiger.png";
import logoAfterhour from "@/assets/partners/afterhoursounds.png";
import logoRebellion from "@/assets/partners/rebellion.jpg";
import logoAlula from "@/assets/partners/alula.jpg";
import logoTippingPoint from "@/assets/partners/tippingpoint.png";
import logoBliss from "@/assets/partners/bliss.png";
import logoUnderYourSkin from "@/assets/partners/underyourskin.jpg";
import logoCrimi from "@/assets/partners/crimi.jpg";
import logoUrsa from "@/assets/partners/ursa.png";
import logoNefertiti from "@/assets/partners/nefertiti.png";
import logoMusikensHus from "@/assets/partners/musikenshus.png";
import logoTradgarn from "@/assets/partners/tradgarn.svg";
import logoYakida from "@/assets/partners/yakida.jpg";
import logoSecretIsland from "@/assets/partners/secretisland.webp";
import logoKaterBlau from "@/assets/partners/katerblau.jpg";
import logoRingoArena from "@/assets/partners/ringoarena.webp";
import logoChihuahua from "@/assets/partners/chihuahua.jpg";

type Partner = { name: string; url: string; logo?: string; invert?: boolean };

const PARTNERS: Partner[] = [
  { name: "44 Hertz", url: "https://soundcloud.com/44-hertz", logo: logo44Hertz },
  { name: "Easy Tiger", url: "https://soundcloud.com/easy-tiger-jena", logo: logoEasyTiger },
  { name: "Afterhour Sounds", url: "https://afterhour-sounds.com/", logo: logoAfterhour },
  { name: "Rebellion der Träumer", url: "https://soundcloud.com/rebelliondertraumer", logo: logoRebellion },
  { name: "Alula Tunes", url: "http://www.alula-tunes.com/", logo: logoAlula },
  { name: "Tipping Point", url: "https://soundcloud.com/tipping-point-music", logo: logoTippingPoint },
  { name: "Bliss Recycle", url: "https://www.instagram.com/blissrecycle", logo: logoBliss },
  { name: "Under Your Skin", url: "https://solo.to/underyourskin", logo: logoUnderYourSkin },
  { name: "Criminal Bassline", url: "https://soundcloud.com/criminalbassline", logo: logoCrimi },
  { name: "House of Ursa", url: "https://soundcloud.com/houseofursa", logo: logoUrsa },
  { name: "Ringö Arena", url: "https://ringoarena.se", logo: logoRingoArena },
  { name: "Cafe Fluss", url: "https://www.instagram.com/cafefluss/" },
  { name: "Chihuahua Dockside", url: "https://www.instagram.com/chihuahuadockside/", logo: logoChihuahua },
  { name: "When Disco Goes Wrong", url: "https://www.instagram.com/whendiscogoeswrong/" },
  { name: "Fragmentvm", url: "https://www.instagram.com/fragmentvm/" },
  { name: "Secret Island Nation Festival", url: "https://www.secret-island.eu/", logo: logoSecretIsland },
  { name: "YRA | RYA", url: "https://www.instagram.com/yrafestivalrya/" },
  { name: "Jazzklubben Nefertiti", url: "https://www.nefertiti.se/", logo: logoNefertiti },
  { name: "Party Like Gatsby", url: "https://www.partylikegatsby.com/" },
  { name: "Trädgår'n", url: "https://www.tradgarn.se/", logo: logoTradgarn },
  { name: "Musikens Hus", url: "https://www.musikenshus.se/", logo: logoMusikensHus },
  { name: "Yaki-Da", url: "https://www.yakida.se/", logo: logoYakida },
  { name: "Operaen i Christiania", url: "https://www.operaen.dk/" },
  { name: "Kater Blau", url: "https://katerblau.de/", logo: logoKaterBlau },
  { name: "Locus Soundsystem", url: "https://www.instagram.com/locussoundsystem/" },
  { name: "Tillvaron Experience", url: "https://www.instagram.com/tillvaronexperience/" },
  { name: "Ivans Pilsnerbar", url: "https://www.instagram.com/ivanspilsnerbar/" },
];

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss · Inevent" },
      {
        name: "description",
        content:
          "Inevent har producerat event och hyrt ut tält, podium och teknik sedan 2001. Utgår från Göteborg, finns där du behöver oss.",
      },
      { property: "og:title", content: "Om Inevent" },
      { property: "og:description", content: "Människorna bakom tälten. Inevent sedan 2001." },
    ],
    links: [{ rel: "canonical", href: "https://ineventgbg.lovable.app/om-oss" }],
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
              Inevent startades 2001 i Göteborg av Mathias, och 2026 fick han sällskap av några eventveteraner till som
              tröttnat på halvdana produktioner. Sedan i år har vi ett av Sveriges största lager av cirkustält,
              eventtält, podium, ljus och teknik. Och, lika viktigt, ett team som vet exakt hur allt riggas.
            </p>
            <p>
              Enorma produktioner som kräver väldigt mycket egen personal. Vi är en liten verksamhet i kärnan som kan pussla ihop helheten i vårat grymma nätverk!
            </p>
            <p>Det vi lovar är enkelt: vi svarar noggrant, vi är ärliga med pris, och när dagen kommer fungerar allt.</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-px bg-border">
          {[
            { k: "2001", v: "Året vi startade" },
            { k: "Världen", v: "Geografisk räckvidd" },
            { k: "3", v: "Eventveteraner i coreteamet" },
            { k: "999m²", v: "Lagerareal i Göteborg" },
          ].map((s) => (
            <div key={s.k} className="bg-background p-8 flex justify-between items-baseline">
              <span className="text-display text-5xl text-foreground">{s.k}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HONEST: strengths & limits */}
      <section className="mt-32 border-t border-border pt-20">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Ärligt</span>
            <h2 className="text-display text-5xl lg:text-7xl mt-3">
              Vad vi <span className="text-primary">är</span>, och inte är.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground">
              Vi tror på att vara raka. Här är vad du kan förvänta dig av oss, och vad du
              bör söka någon annanstans för.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-10 lg:p-14">
            <h3 className="text-display text-3xl lg:text-4xl mb-8">Det vi är bra på nu</h3>
            <ul className="space-y-5 text-base text-foreground/90">
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>
                  Att slå upp ett cirkustält, en hel by av event-tält och
                  scenuppsättningar. Det har vi gjort i över tjugofem år.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Ärliga råd om vad du faktiskt behöver, och inte.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Att vara på plats och få det att fungera ordentligt.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Eventarkitektur. Vi designar rummet från skiss till sista detalj.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Belysning som lyfter stämningen, inte bara lyser upp.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Musikkunskap. Vi vet vem och vad som passar din stund.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary mt-1">›</span>
                <span>Webdesign, grafik, social media. Vi paketerar eventet digitalt också.</span>
              </li>
            </ul>
          </div>

          <div className="bg-background p-10 lg:p-14">
            <h3 className="text-display text-3xl lg:text-4xl mb-8">
              Vad vi inte är bäst på (ännu ;)
            </h3>
            <ul className="space-y-5 text-base text-foreground/90">
              <li className="flex gap-4">
                <span className="text-muted-foreground mt-1">›</span>
                <span>Att skicka offert supersnabbt. Räkna med några dagar, i samråd.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-muted-foreground mt-1">›</span>
                <span>Enorma produktioner som kräver väldigt mycket personal. Vi är en liten verksamhet från start, med en nysatsning nu!</span>
              </li>
              <li className="flex gap-4">
                <span className="text-muted-foreground mt-1">›</span>
                <span>
                  Helhetslösningar i lyxsegmentet utöver det vi gör med tält och scen.
                </span>
              </li>
            </ul>
            <div className="mt-10 space-y-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <p>
                Behöver du något vi inte har? Säg till. Tälten, scenerna, rumsdesignen,
                dekor, belysning och DJs är vår hemmaplan. Allt däromkring (särskild teknik, mat,
                fotograf, städ, annan extra personal) kopplar vi in via partners vi handplockat genom åren.
                En kontakt, ett upplägg.
              </p>
              <p>
                Vi går igenom offerter noga med er, och vi är inte många (ännu), men
                det vi har fungerar, och vi gör jobbet ordentligt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / referenser */}
      <section className="mt-32 border-t border-border pt-16">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Vänner</span>
            <h2 className="text-display text-3xl lg:text-4xl mt-2">Partners & referenser</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Ett urval av kollektiv, kollegor och kunder vi byggt med genom åren, eller anlitats av / ihop med. Av någon anledning är många av dem vänner från Berlin som vi har bjudit upp på disco, men vi är öppna för långt fler sorters genrer och samarbeten!
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-px bg-border border border-border">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
              className="group bg-background aspect-square flex items-center justify-center p-4 lg:p-6 transition-colors hover:bg-muted"
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className={`max-h-full max-w-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 ${p.invert ? "invert" : ""}`}
                />
              ) : (
                <span className="text-display text-center text-sm sm:text-base leading-tight uppercase tracking-wider text-foreground/70 transition-colors group-hover:text-primary">
                  {p.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Artister vi riggat för */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Scen & teknik</span>
            <h2 className="text-display text-3xl lg:text-4xl mt-2">
              Artister vi riggat för, spelat på samma scen med, varit turnéledare för, kört, bokat, värmt upp för
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Ett axplock av namn vars scener, ljus eller teknik vi varit med och byggt genom åren.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-4 text-display uppercase tracking-wider text-2xl lg:text-3xl">
          {["The Prodigy", "Europe", "David Bowie", "Spice Girls", "Infected Mushroom", "Damon Jee", "Jennifer Brown", "Frida Darko", "Dave Dinger", "Fred White", "Partiboi69"].map((name) => (
            <li key={name} className="text-foreground/80 hover:text-primary transition-colors">
              {name}
            </li>
          ))}
        </ul>
      </section>

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
