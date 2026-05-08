## Plan: Lägg till "Cirkustält"-knapp i hero-CTA på /talt

I `src/routes/talt.tsx`, mellan "Begär offert" och "Ring 0708-83 79 97" i hero-sektionen (rad ~117), lägg till en ny `<Link to="/cirkustalt">` med outline-stil som matchar ring-knappen men subtilt skiljer sig (t.ex. transparent kant utan backdrop-blur, eller ArrowRight-ikon för att signalera intern navigation).

### Förslag

```tsx
<Link
  to="/cirkustalt"
  className="group inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground hover:bg-primary/20 hover:border-primary transition-colors"
>
  Cirkustält
  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Link>
```

Den röda accenten knyter an till primary-färgen utan att konkurrera med "Begär offert" (full primary). Endast frontend-ändring i en fil.
