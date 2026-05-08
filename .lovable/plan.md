## Plan: Ny bildserie "Så reser vi tältet" på /cirkustalt

Lägg till en ny gallerisektion direkt efter det befintliga galleriet ("Tälten i sitt rätta element") på `src/routes/cirkustalt.tsx`, som visar hela uppresningsprocessen i kronologisk ordning från tom äng till färdigrest tält.

### Steg

1. **Kopiera de 10 uppladdade bilderna** till `src/assets/` med beskrivande namn i kronologisk ordning:
   - `cirkustalt-rigg-01-fält.jpg` (tom äng/utsikt)
   - `cirkustalt-rigg-02-master-upp.jpg` (master-stänger reses, lådor på fält)
   - `cirkustalt-rigg-03-master-himmel.jpg` (master-stänger mot himmel, duk på mark)
   - `cirkustalt-rigg-04-duk-lyfts.jpg` (duk börjar lyftas över två master)
   - `cirkustalt-rigg-05-duk-spänns.jpg` (alla master uppe, duk spänns)
   - `cirkustalt-rigg-06-team-arbetar.jpg` (team i västar arbetar med duken)
   - `cirkustalt-rigg-07-stomme.jpg` (stomme reses, ATV i förgrund)
   - `cirkustalt-rigg-08-väggar.jpg` (väggar börjar resas)
   - `cirkustalt-rigg-09-spänd.jpg` (mörk vägg spänd)
   - `cirkustalt-rigg-10-färdig.jpg` (färdigrest blå tält-katedral)

2. **Importera bilderna** överst i `src/routes/cirkustalt.tsx`.

3. **Lägg till ny section** efter det nuvarande galleriet (efter den `<section>` som börjar med "Galleri" / "Tälten i sitt rätta element"):
   - Eyebrow: "Process" eller "Tidslinje"
   - Rubrik: "Från fält till katedral." (eller liknande)
   - Kort intronoter (1–2 meningar) om att ett cirkustält är en koreografi i sig.
   - Bildgrid i kronologisk ordning, design som matchar befintlig masonry-stil men distinkt — föreslår en horisontell asymmetrisk grid som leder ögat genom processen (t.ex. första bilden bred, sedan par av kvadrater, sista bilden bred för "färdig"-effekt).
   - Varje bild med beskrivande `alt` och numrerat steg-overlay (01 → 10) i hörnet för att förstärka tidslinjekänslan.

### Tekniska detaljer

- Endast frontend-ändringar i `src/routes/cirkustalt.tsx` + nya filer i `src/assets/`.
- Behåller befintlig design language (border, bg-card, aspect ratios, eyebrow text-primary uppercase tracking).
- Lazy loading på alla bilder.
- Ingen ändring av routing, data eller backend.

### Frågor

Vill du att jag inkluderar synliga stegnummer (01–10) som overlay för att tydliggöra tidslinjen, eller hålla det rent utan siffror?
