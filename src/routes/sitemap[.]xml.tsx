import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://restaurant1sur2.fr";
const ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/menu", priority: "0.9", changefreq: "monthly" },
  { path: "/chef", priority: "0.7", changefreq: "yearly" },
  { path: "/galerie", priority: "0.6", changefreq: "monthly" },
  { path: "/reserver", priority: "0.8", changefreq: "yearly" },
  { path: "/mentions-legales", priority: "0.1", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = ROUTES.map(
          (r) =>
            `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
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
