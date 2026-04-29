import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://restaurant1sur2.fr";
const ROUTES = ["/", "/menu", "/chef", "/galerie", "/reserver"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = ROUTES.map(
          (path) =>
            `  <url><loc>${SITE}${path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
