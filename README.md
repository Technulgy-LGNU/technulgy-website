# Technulgy Website

Vue website using public content from the Technulgy Admin Software (TAS). The API contract is in [website-api.md](website-api.md).

## Development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/website/*` to `http://localhost:2005` by default. Start TAS on that port, or change `TAS_PROXY_TARGET` in `.env.local`. Restart Vite after changing environment variables.

The browser uses the development proxy by default. To call a different API directly, set `VITE_TAS_BASE_URL` to its base URL, without `/website` (for example `https://tas.technulgy.com`). Direct cross-origin requests require the website origin in TAS's `website.allowed_origins`.

No admin credentials or API keys belong in this repository. Public requests omit cookies and bypass the browser content cache.

## Content management

Publish content in TAS to update the website:

- **Home:** ordered slideshow images, About us, videos, and contact availability. The latest three published articles appear automatically.
- **Teams:** active/retired teams, descriptions, galleries, selected start image, and competition results.
- **Events:** participation history, event galleries, and the results entered on teams.
- **Sponsors:** names, descriptions, galleries, and optional HTTPS links.
- **Publications:** categories, descriptions, galleries, and optional HTTPS links.
- **Blog:** article summaries and detail pages at `/blog/{slug}?lang=de` or `?lang=en`. Detail pages render heading, Markdown, image, gallery, and video blocks.

All collection pages fetch subsequent API pages. German/English switching fetches fresh translated content. Missing, unpublished, empty, and failed responses display localized states; failed loads can be retried. Content refreshes on navigation, reload, and language changes, without a site rebuild.

Images have small previous/next arrows when there is more than one. Only homepage galleries advance automatically (every five seconds). Autoplay pauses on hover, keyboard focus, a hidden browser tab, or the pause button, and respects reduced-motion preferences. Team galleries begin with the selected start image. Videos connect to YouTube only after the visitor clicks to load them.

The contact form follows Home's `contact.enabled` setting. Configure SMTP in TAS to enable it. The form sends name, email, subject, message, and an empty honeypot; success requires HTTP 202 with `sent: true`.

Interface labels live in `src/locales`. Published descriptions, images, results, articles, and About us come from TAS. Links and legal pages remain website-maintained because the public API has no resources for them. SSL is also website-maintained; no editable SSL resource is introduced.

## Production

```sh
npm run build
npm run preview
```

Production builds default to `https://tas.technulgy.com`. Override it with `VITE_TAS_BASE_URL` at build time. TAS must allow the exact public website origin in `website.allowed_origins`. Set TAS's `website.public_url` to the website origin so article links point here.

```sh
docker build --build-arg VITE_TAS_BASE_URL=https://tas.technulgy.com -t technulgy-website .
```

The Docker image includes an nginx SPA fallback so direct article and other page URLs work. If hosting elsewhere, rewrite non-file paths to `/index.html`. Old `/#/...` bookmarks are upgraded to the corresponding path. Production environment variables are compiled into the bundle; changing the API base requires rebuilding the image.

## Checks

```sh
npm test
npm run build
npm exec oxlint -- . -D correctness --ignore-path .gitignore
```

Tests cover pagination, language request races, unavailable content, gallery navigation/autoplay, Markdown safety, video consent, and contact submission outcomes. They mock the public API and do not send email.
