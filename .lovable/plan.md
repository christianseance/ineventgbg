# Varför inga riktiga mejl kommer fram

Leverans-loggen visar att varje lead-submission **faktiskt triggar två mejl** (bekräftelse till kunden + notis till `seance@inevent.se`), så formulär-kopplingen och mallarna är redan rätt.

Båda mejlen misslyckas dock i e-postkön med detta fel, upprepat 5 gånger tills de hamnar i DLQ:

```
400 sender_domain_mismatch:
"From address domain must align with the sender domain"
```

Orsak finns i `src/server/email.ts`:

```ts
const SENDER_DOMAIN = "notify.inevent.se"   // verifierad sändar-subdomän ✅
const FROM_DOMAIN   = "www.inevent.se"      // används i From: ❌
// ...
from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`
```

`From:`-domänen (`www.inevent.se`) måste matcha sändar-domänen (`notify.inevent.se` eller dess rot `inevent.se`). `www.inevent.se` är en annan subdomän och avvisas därför av e-post-API:t.

# Vad jag ändrar

**Enbart en frontend/server-konstant — inga mallar, inget formulär, inga DNS-ändringar.**

I `src/server/email.ts`:

```diff
- const FROM_DOMAIN = "www.inevent.se";
+ const FROM_DOMAIN = "inevent.se";
```

Det ger avsändaradressen `Inevent <noreply@inevent.se>` (snyggare för mottagaren) medan själva sändningen fortsatt sker via den verifierade subdomänen `notify.inevent.se`. Det är exakt det `display_from_root`-mönstret är till för.

Om e-post-API:t fortfarande klagar (vissa konton kräver att From: är exakt sändar-subdomänen) faller jag tillbaka på:

```ts
const FROM_DOMAIN = "notify.inevent.se";
```

# Verifiering efter fixen

1. Skicka ett nytt test via kontaktformuläret.
2. Kör en query mot `email_send_log` och bekräfta att de två nya raderna går från `pending` → `sent` (inte `failed`/`dlq`).
3. Bekräfta att mejlet landar i `seance@inevent.se` och hos kundens adress.

# Vad jag INTE behöver göra

- Ingen ändring i `lead-confirmation.tsx` eller `lead-internal-notification.tsx` — mallarna är redan korrekta och matchar formulärfälten.
- Ingen ändring i `submitLead` — den anropar redan båda mallarna med rätt data.
- Inga nya migrations, ingen ny edge-funktion, ingen omkonfiguration av domänen.
