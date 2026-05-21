import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { ContactFloat } from "@/components/ContactFloat";
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
      { name: "author", content: "Inevent" },
      { property: "og:site_name", content: "Inevent" },
      { property: "og:locale", content: "sv_SE" },
      { property: "og:type", content: "website" },
      { name: "google-site-verification", content: "zlrq6HFe6QMZDW87s_eurESOr1ulk2ntFzT_a2yYsdo" },
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://ineventgbg.lovable.app/#organization",
              name: "Inevent",
              url: "https://ineventgbg.lovable.app/",
              logo: "https://ineventgbg.lovable.app/og-hero.jpg",
              foundingDate: "2001",
              areaServed: "SE",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Göteborg",
                addressCountry: "SE",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://ineventgbg.lovable.app/#website",
              url: "https://ineventgbg.lovable.app/",
              name: "Inevent",
              publisher: { "@id": "https://ineventgbg.lovable.app/#organization" },
              inLanguage: "sv-SE",
            },
          ],
        }),
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
      <ContactFloat />
      <Toaster richColors position="top-center" />
    </>
  );
}
