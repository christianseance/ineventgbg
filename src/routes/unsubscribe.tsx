import { useEffect, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

const searchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: searchSchema,
  component: UnsubscribePage,
  head: () => ({
    meta: [
      { title: "Avregistrera nyhetsbrev · Inevent" },
      {
        name: "description",
        content:
          "Avregistrera din e-postadress från Inevents utskick. Bekräfta avregistreringen här så slutar vi mejla dig.",
      },
      { property: "og:title", content: "Avregistrera nyhetsbrev · Inevent" },
      {
        property: "og:description",
        content:
          "Avregistrera din e-postadress från Inevents utskick. Bekräfta avregistreringen här så slutar vi mejla dig.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Status =
  | "validating"
  | "ready"
  | "already"
  | "invalid"
  | "submitting"
  | "success"
  | "error";

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("validating");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.valid) setStatus("ready");
        else if (res.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setStatus("submitting");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const json = await res.json();
      if (json.success) setStatus("success");
      else if (json.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
          <Mail size={22} />
        </div>

        {status === "validating" && (
          <>
            <h1 className="text-2xl">Bekräftar din länk…</h1>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" /> Vänta ett ögonblick
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <h1 className="text-2xl">Avregistrera från Inevent?</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Klicka nedan för att bekräfta att du inte längre vill ta emot mejl från oss.
            </p>
            <button
              onClick={confirm}
              className="mt-6 inline-flex w-full items-center justify-center bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow"
            >
              Bekräfta avregistrering
            </button>
          </>
        )}

        {status === "submitting" && (
          <>
            <h1 className="text-2xl">Behandlar…</h1>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" /> Avregistrerar
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={32} className="mx-auto text-primary" />
            <h1 className="mt-3 text-2xl">Klart!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Du är avregistrerad och kommer inte få fler mejl från Inevent.
            </p>
          </>
        )}

        {status === "already" && (
          <>
            <CheckCircle2 size={32} className="mx-auto text-primary" />
            <h1 className="mt-3 text-2xl">Redan avregistrerad</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Den här adressen är redan borttagen från vår sändlista.
            </p>
          </>
        )}

        {(status === "invalid" || status === "error") && (
          <>
            <XCircle size={32} className="mx-auto text-destructive" />
            <h1 className="mt-3 text-2xl">
              {status === "invalid" ? "Länken är ogiltig" : "Något gick fel"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {status === "invalid"
                ? "Länken har gått ut eller är felaktig. Kontakta oss om du behöver hjälp."
                : "Försök igen om en stund eller hör av dig till oss direkt."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
