import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
              Vi tar projekt från en enda dag till veckolånga festivaler. Från ett podium på en gata, via ett bröllop
              med 30 gäster till en företagsfest med 500 nöjda deltagare.
            </p>
            <p>Det vi lovar är enkelt: vi svarar noggrant, vi är ärliga med pris, och när dagen kommer fungerar allt.</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-px bg-border">
          {[
            { k: "2001", v: "Året vi startade" },
            { k: "300+", v: "Genomförda event" },
            { k: "Världen", v: "Geografisk räckvidd" },
            { k: "24-36h", v: "Svar på offerter" },
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
