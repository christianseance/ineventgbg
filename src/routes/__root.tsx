import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-[8rem] leading-none text-primary">404</h1>
        <h2 className="mt-2 text-3xl">Sidan finns inte</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Sidan du letar efter har flyttats eller existerar inte.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground hover:bg-crimson-glow"
          >
            Tillbaka till start
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inevent — Eventproduktion & uthyrning av tält, scen och teknik" },
      {
        name: "description",
        content:
          "Vi löser allt inom event. Cirkustält, eventtält, scener, podium, ljus, lasrar, DJ, bröllop och företagsevent. Utgår från Göteborg — finns där du behöver oss.",
      },
      { name: "author", content: "Inevent" },
      { property: "og:title", content: "Inevent — Eventproduktion & uthyrning" },
      { property: "og:description", content: "Tält, scener, teknik och kompletta produktioner. Begär offert idag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      <SiteFooter />
      <StickyCta />
      <Toaster richColors position="top-center" />
    </>
  );
}
