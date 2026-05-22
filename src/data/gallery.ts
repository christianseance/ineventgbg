import circustalt from "@/assets/cat-circustalt.jpg";
import eventtalt from "@/assets/cat-eventtalt.jpg";
import ovrigaTalt from "@/assets/talt-hero-yurt.webp";
import hubTalt from "@/assets/talt-hub-inflatable.jpg";
import scen from "@/assets/cat-scen.jpg";
import teknik from "@/assets/cat-teknik.jpg";
import brollop from "@/assets/cat-brollop.jpg";
import foretag from "@/assets/cat-foretag.jpg";
import konferens from "@/assets/cat-konferens.jpg";
import sport from "@/assets/cat-sport.jpg";
import dj from "@/assets/cat-dj.jpg";
import arkitekt from "@/assets/cat-arkitekt.jpg";
import produktion from "@/assets/cat-produktion.jpg";
import installation from "@/assets/cat-installation.jpg";

export type Group = "uthyrning" | "event" | "funktioner";

export type Category = {
  slug: string;
  name: string;
  group: Group;
  cover: string;
  blurb: string;
};

export const GROUPS: Record<Group, { label: string; description: string }> = {
  uthyrning: {
    label: "Uthyrning",
    description: "Tält, scener, podium och teknik direkt från vårt lager.",
  },
  event: {
    label: "Event",
    description: "Kompletta produktioner från idé till genomförande. Berätta din vision så tar vi hand om allt runt omkring, så du kan fokusera på din viktiga händelse.",
  },
  funktioner: {
    label: "Funktioner",
    description: "Människorna som får ditt event att hända.",
  },
};

export const CATEGORIES: Category[] = [
  // Uthyrning
  {
    slug: "cirkustalt",
    name: "Cirkustält",
    group: "uthyrning",
    cover: circustalt,
    blurb: "Ikoniska big tops i flera storlekar. Perfekt för festivaler, släpp och pop-ups.",
  },
  {
    slug: "eventtalt",
    name: "Eventtält",
    group: "uthyrning",
    cover: eventtalt,
    blurb: "Eleganta party- och pagodtält. Vita, rena, väderskyddade.",
  },
  {
    slug: "ovriga-talt",
    name: "Övriga tält",
    group: "uthyrning",
    cover: ovrigaTalt,
    blurb: "Bastutält, taktält, nomadtält, yurthor, marknadstält och fler. Utforska hela utbudet.",
  },
  {
    slug: "uppblasbara-hubtalt",
    name: "Uppblåsbara hubtält",
    group: "uthyrning",
    cover: hubTalt,
    blurb: "Lättuppsatta hubar för expeditioner, crew-baser och snabba pop-ups. Uppe på minuter.",
  },
  {
    slug: "scen-podium",
    name: "Scen & Podium",
    group: "uthyrning",
    cover: scen,
    blurb: "Modulära scener, riser och podium i alla höjder och format.",
  },
  {
    slug: "teknik",
    name: "Belysning och teknik",
    group: "uthyrning",
    cover: teknik,
    blurb: "Moving heads, lasrar m.m,  och PA, riggat och kört av proffs.",
  },
  {
    slug: "installation-konst",
    name: "Installation & Konst",
    group: "uthyrning",
    cover: installation,
    blurb: "Skulpturala tygformationer, ljussatta installationer och konstnärliga rum som blir samtalsämnet.",
  },
  // Event
  {
    slug: "brollop",
    name: "Bröllop",
    group: "event",
    cover: brollop,
    blurb: "Romantiska kvällar under stjärnhimmel. Vi bygger drömscenografin.",
  },
  {
    slug: "foretagsevent",
    name: "Företagsevent",
    group: "event",
    cover: foretag,
    blurb: "Kick-offer, jubileum och galor som faktiskt sätter avtryck.",
  },
  {
    slug: "konferenser",
    name: "Konferenser",
    group: "event",
    cover: konferens,
    blurb: "Tekniskt vattentäta produktioner med scener.",
  },
  {
    slug: "sportevent",
    name: "Sportevent",
    group: "event",
    cover: sport,
    blurb: "Kiosker, prisutdelning och tak.",
  },
  // Funktioner
  {
    slug: "dj",
    name: "DJ",
    group: "funktioner",
    cover: dj,
    blurb: "Bekanta låtar i partyversioner, elektroniskt, classics, många olika genres täcker vi in. DJs för varje typ av kväll.",
  },
  {
    slug: "eventarkitekt",
    name: "Eventarkitekt",
    group: "funktioner",
    cover: arkitekt,
    blurb: "Vi designar rummet, från första skiss till sista detalj.",
  },
  {
    slug: "produktionsledare",
    name: "Produktionsledare",
    group: "funktioner",
    cover: produktion,
    blurb: "En person som äger kalendern, leverantörerna och deadline.",
  },
];
