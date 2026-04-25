export function PrivacyDisclosure() {
  return (
    <details className="group text-xs text-muted-foreground">
      <summary className="cursor-pointer select-none hover:text-foreground transition-colors inline-flex items-center gap-1.5">
        <span className="underline underline-offset-2 decoration-dotted">Så hanterar vi dina uppgifter</span>
        <span className="text-[10px] opacity-60 group-open:rotate-180 transition-transform inline-block">▾</span>
      </summary>
      <p className="mt-3 leading-relaxed max-w-prose">
        <strong className="text-foreground/80">Inevent Handelsbolag</strong> (org.nr 969680-9749) behandlar dina
        uppgifter för att besvara din förfrågan (rättslig grund: avtal/förfrågan, art. 6.1.b GDPR) och, om du anmäler
        dig, skicka nyhetsbrev (samtycke, art. 6.1.a — återkalla när du vill). Uppgifter lagras hos Lovable Cloud (EU)
        i max 24 månader efter senaste kontakt. Du har rätt till åtkomst, rättelse, radering, dataportabilitet och att
        klaga hos IMY. Frågor om personuppgifter:{" "}
        <a href="mailto:seance@inevent.se" className="text-primary hover:underline">
          seance@inevent.se
        </a>
        .
      </p>
    </details>
  );
}
