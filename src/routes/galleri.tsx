import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { CATEGORIES, GROUPS, type Group } from "@/data/gallery";

const searchSchema = z.object({
  group: z.enum(["uthyrning", "event", "funktioner"]).optional(),
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/galleri")({
  head: () => ({
    meta: [
      { title: "Galleri — Inevent" },
      {
        name: "description",
        content:
          "Bläddra bland våra kategorier: cirkustält, eventtält, podium, belysning, bar-bord/stolar, bröllop, företagsevent, konferenser, sport, DJs och mer.",
      },
      { property: "og:title", content: "Galleri — Inevent" },
      { property: "og:description", content: "Filtrera, sök och utforska allt vi hyr ut och producerar." },
    ],
  }),
  validateSearch: zodValidator(searchSchema),
  component: Galleri,
});

function Galleri() {
  const { group, category, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/galleri" });
  const [localQ, setLocalQ] = useState(q ?? "");
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el) return;
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const filtered = useMemo(() => {
    return CATEGORIES.filter((c) => {
      if (group && c.group !== group) return false;
      if (category && c.slug !== category) return false;
      if (q && !`${c.name} ${c.blurb}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [group, category, q]);

  const setGroup = (g?: Group) => {
    navigate({ search: (s: z.infer<typeof searchSchema>) => ({ ...s, group: g, category: undefined }) });
    scrollToResults();
  };
  const setCategory = (slug?: string) => {
    navigate({ search: (s: z.infer<typeof searchSchema>) => ({ ...s, category: slug }) });
    scrollToResults();
  };
  const applySearch = () =>
    navigate({ search: (s: z.infer<typeof searchSchema>) => ({ ...s, q: localQ || undefined }) });
  const clearAll = () => {
    setLocalQ("");
    navigate({ search: {} });
  };

  const visibleCategories = group ? CATEGORIES.filter((c) => c.group === group) : CATEGORIES;

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20">
      {/* Header */}
      <div className="grid lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Galleri</span>
          <h1 className="text-display text-6xl lg:text-8xl mt-3">
            Allt vi <span className="text-primary">hyr</span> & <br />
            allt vi <span className="text-stroke">bygger</span>.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:self-end">
          <p className="text-muted-foreground">
            Filtrera per grupp, kategori eller sök fritt. Klicka på en kategori för att se mer — eller hoppa direkt till
            offert.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-card border border-border p-5 mb-8 space-y-5 lg:sticky lg:top-20 z-30 backdrop-blur-xl bg-card/90">
        {/* Group tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setGroup(undefined)}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              !group ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Alla grupper
          </button>
          {(Object.keys(GROUPS) as Group[]).map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                group === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {GROUPS[g].label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applySearch()}
                onBlur={applySearch}
                placeholder="Sök kategori..."
                className="w-full bg-input border border-border pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            {(group || category || q) && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                Rensa <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(undefined)}
            className={`px-3 py-1.5 text-xs border transition-colors ${
              !category
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            Alla kategorier
          </button>
          {visibleCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(category === c.slug ? undefined : c.slug)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                category === c.slug
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mb-6 text-xs uppercase tracking-widest text-muted-foreground">
        <span>
          Visar <span className="text-foreground">{filtered.length}</span> av {CATEGORIES.length} kategorier
        </span>
      </div>

      {/* Masonry-style grid */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">Inga träffar. Prova att rensa filtret.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cat, i) => (
            <article
              key={cat.slug}
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
                    {GROUPS[cat.group].label}
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
                <Link
                  to="/kontakt"
                  search={{ subject: cat.name }}
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all"
                >
                  Begär offert
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
