import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales Restaurant Une Semaine Sur Deux · Grenoble" },
      {
        name: "description",
        content:
          "Mentions légales du restaurant Une Semaine Sur Deux à Grenoble. Éditeur, hébergeur et conception du site.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Mentions légales Une Semaine Sur Deux" },
      {
        property: "og:description",
        content: "Éditeur, hébergeur et conception du site.",
      },
    ],
    links: [{ rel: "canonical", href: "https://restaurant1sur2.fr/mentions-legales" }],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <p className="eyebrow mb-5">Informations</p>
      <h1 className="display-h1 mb-10">Mentions légales</h1>

      <div className="space-y-10 text-[15px] text-ivory font-light leading-loose">
        <div>
          <h2 className="font-serif italic font-light text-[1.5rem] text-ivory mb-3">
            Éditeur du site
          </h2>
          <address className="not-italic text-ivory-muted">
            Une Semaine Sur Deux
            <br />
            4 Place Championnet
            <br />
            38000 Grenoble
            <br />
            Téléphone :{" "}
            <a href="tel:+33476271375" className="hover:text-gold transition-colors">
              04 76 27 13 75
            </a>
            <br />
            Email :{" "}
            <a
              href="mailto:restaurant1sur2@gmail.com"
              className="hover:text-gold transition-colors"
            >
              restaurant1sur2@gmail.com
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-serif italic font-light text-[1.5rem] text-ivory mb-3">
            Directeur de publication
          </h2>
          <p className="text-ivory-muted">Pierrick Vasseur</p>
        </div>

        <div>
          <h2 className="font-serif italic font-light text-[1.5rem] text-ivory mb-3">
            Hébergeur
          </h2>
          <address className="not-italic text-ivory-muted">
            Vercel Inc.
            <br />
            340 Pine Street, Suite 701
            <br />
            San Francisco, CA 94104, USA
            <br />
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-gold transition-colors"
            >
              https://vercel.com
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-serif italic font-light text-[1.5rem] text-ivory mb-3">
            Conception et réalisation
          </h2>
          <p className="text-ivory-muted">
            Yamen Global —{" "}
            <a
              href="https://yamen-global.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-gold transition-colors"
            >
              yamen-global.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-14">
        <Link to="/" className="gold-link">
          ← Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
