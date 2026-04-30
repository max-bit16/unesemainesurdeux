import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="gold-divider mx-auto mb-8" />
        <h1 className="display-h1">Page non trouvée</h1>
        <p className="mt-5 text-[15px] text-ivory-muted font-light leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Une Semaine Sur Deux",
  description:
    "Restaurant bistronomique à Grenoble. Cuisine faite maison, produits frais en circuit court. Toque Gault & Millau 2026.",
  image: `${SITE_URL}/og-home.jpg`,
  url: `${SITE_URL}/`,
  telephone: "+33476271375",
  email: "restaurant1sur2@gmail.com",
  servesCuisine: ["French", "Bistronomique"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Place Championnet",
    addressLocality: "Grenoble",
    postalCode: "38000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.1857,
    longitude: 5.7224,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "19:00",
      closes: "21:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/1semainesur2restaurant/",
    "https://www.facebook.com/1sur2grenoble/",
  ],
  award: "Table Gourmande · Gault & Millau 2026",
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FAFAF7" },
      {
        title:
          "Restaurant Une Semaine Sur Deux à Grenoble Cuisine Bistronomique · Gault & Millau 2026",
      },
      {
        name: "description",
        content:
          "Restaurant bistronomique à Grenoble. Produits frais, circuit court, fait maison. Toque Gault & Millau 2026. Chef Pierrick Vasseur. ☎ 04 76 27 13 75",
      },
      { name: "author", content: "Une Semaine Sur Deux" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Restaurant bistronomique à Grenoble. Cuisine faite maison, produits de saison. Toque Gault & Millau 2026. Réservations : 04 76 27 13 75." },
      { name: "twitter:description", content: "Restaurant bistronomique à Grenoble. Cuisine faite maison, produits de saison. Toque Gault & Millau 2026. Réservations : 04 76 27 13 75." },
      { property: "og:image", content: `${SITE_URL}/og-home.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-home.jpg` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-ivory">
      <div className="scroll-progress" aria-hidden="true" />
      <a href="#main-content" className="skip-link">Aller au contenu</a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
