import circustalt from "@/assets/cat-circustalt.jpg";
import eventtalt from "@/assets/cat-eventtalt.jpg";
import scen from "@/assets/cat-scen.jpg";
import teknik from "@/assets/cat-teknik.jpg";
import brollop from "@/assets/cat-brollop.jpg";
import foretag from "@/assets/cat-foretag.jpg";
import konferens from "@/assets/cat-konferens.jpg";
import sport from "@/assets/cat-sport.jpg";
import dj from "@/assets/cat-dj.jpg";
import arkitekt from "@/assets/cat-arkitekt.jpg";
import produktion from "@/assets/cat-produktion.jpg";

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
    description: "Tält, scener, podium och teknik — direkt från vårt lager.",
  },
  event: {
    label: "Event",
    description: "Kompletta produktioner från idé till genomförande.",
  },
  funktioner: {
    label: "Funktioner",
    description: "Människorna som får ditt event att hända.",
  },
};

export const CATEGORIES: Category[] = [
  // Uthyrning
  { slug: "cirkustalt", name: "Cirkustält", group: "uthyrning", cover: circustalt,
    blurb: "Ikoniska big tops i flera storlekar — perfekt för festivaler, släpp och pop-ups." },
  { slug: "eventtalt", name: "Eventtält", group: "uthyrning", cover: eventtalt,
    blurb: "Eleganta party- och pagodtält. Vita, rena, väderskyddade." },
  { slug: "scen-podium", name: "Scen & Podium", group: "uthyrning", cover: scen,
    blurb: "Modulära scener, riser och podium i alla höjder och format." },
  { slug: "teknik", name: "Ljud, Ljus & Lasrar", group: "uthyrning", cover: teknik,
    blurb: "Moving heads, lasrar, rökmaskiner och PA — riggat och kört av proffs." },
  // Event
  { slug: "brollop", name: "Bröllop", group: "event", cover: brollop,
    blurb: "Romantiska kvällar under stjärnhimmel — vi bygger drömscenografin." },
  { slug: "foretagsevent", name: "Företagsevent", group: "event", cover: foretag,
    blurb: "Kick-offer, jubileum och galor som faktiskt sätter avtryck." },
  { slug: "konferenser", name: "Konferenser", group: "event", cover: konferens,
    blurb: "Tekniskt vattentäta produktioner med scener och LED-väggar." },
  { slug: "sportevent", name: "Sportevent", group: "event", cover: sport,
    blurb: "Arena-rigg, prisutdelning och underhållning för stora publikevent." },
  // Funktioner
  { slug: "dj", name: "DJ", group: "funktioner", cover: dj,
    blurb: "House, disco, classics — DJs för varje typ av kväll." },
  { slug: "eventarkitekt", name: "Eventarkitekt", group: "funktioner", cover: arkitekt,
    blurb: "Vi designar rummet — från första skiss till sista detalj." },
  { slug: "produktionsledare", name: "Produktionsledare", group: "funktioner", cover: produktion,
    blurb: "En person som äger kalendern, leverantörerna och deadline." },
];
