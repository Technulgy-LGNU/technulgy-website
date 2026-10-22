# Website content API

TAS owns the content; the public website renders it. The website repository does not need FusionAuth credentials or an admin session to read `/website/*`.

## Configuration

```toml
[website]
public_url = "https://www.your-website.example"
allowed_origins = ["https://www.your-website.example", "http://localhost:3000"]

[website.contact]
smtp_host = "mail.technulgy.com"
smtp_port = 587
tls_mode = "starttls"
smtp_username = "noreply@technulgy.email"
smtp_password = "YOUR-PASSWORD"
from = "noreply@technulgy.email"
to = "elias.braun@technulgy.com"
```

`public_url` is the public website's base URL, used for article links (`/blog/{slug}?lang=...`). Change it to match that repository's development/production URL. `allowed_origins` contains exact origins (scheme, host and port, no trailing path). CORS is enabled only for `/website`, without credentials. Protected `/api/v1` endpoints retain their session, CSRF and role checks. An empty origin list does not enable cross-origin browser access; same-origin and server-to-server requests still work.

The SMTP password is intentionally left empty in the local config. The contact endpoint returns 503 until SMTP is configured. SMTP requires verified TLS: `starttls` normally uses port 587; `tls` normally uses port 465. Confirm the port with your mail provider if 587 is not available. Restart TAS after editing configuration.

Image URLs use Cloudflare flexible variants with `/format=webp`. Enable Flexible variants under Cloudflare Images → Delivery if using a different Cloudflare account. This has been checked on the configured account. Browsers advertising WebP support receive WebP; non-browser fetches should send `Accept: image/webp` when downloading image data. Original library images and their IDs stay unchanged. See [Cloudflare flexible variants](https://developers.cloudflare.com/images/optimization/hosted-images/enable-flexible-variants/) and [format handling](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/).

## Language and publishing

Append `?lang=de` or `?lang=en` to any public content endpoint. English is the default; other language values return 400. Responses include `Content-Language`, and content objects include the selected language. TAS stores German and English together; public responses contain only the requested text. There is no silent fallback to another language. Complete both translations before publishing.

All entries start as drafts. Check **Publish on website** and save to expose an entry. Blog articles also need a publication date; a future date schedules visibility. Unpublished/scheduled article detail endpoints return 404 and those articles never appear in Home's latest-three list. Scheduled visibility is evaluated on each request, so it needs no background job or rebuild. Responses use `Cache-Control: no-store` so unpublishing takes effect on the next fetch.

Editors and admins can create/update/publish content. Only admins can delete content. Image deletion is blocked while any draft or published content references the image, including images in article blocks. Removing content leaves library images intact. Events used by team results cannot be deleted until those references are removed. Unpublishing an event hides it and its results from public responses.

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| GET | `/website/home?lang=de` | Slideshow, About us, latest 3 articles, videos, contact availability |
| GET | `/website/teams?lang=en` | Active and retired teams, start image and results |
| GET | `/website/teams/{slug}?lang=en` | One team |
| GET | `/website/participation-history?lang=de` | Events, newest event date first, with team results |
| GET | `/website/events?lang=de` | Alias for the event list |
| GET | `/website/events/{slug}?lang=de` | One event |
| GET | `/website/sponsors?lang=en` | Sponsors |
| GET | `/website/sponsors/{slug}?lang=en` | One sponsor |
| GET | `/website/publications?lang=en` | Publication categories |
| GET | `/website/publications/{slug}?lang=en` | One publication category |
| GET | `/website/blog?lang=de` | Published article summaries, newest first |
| GET | `/website/blog/{slug}?lang=de` | Article summary plus translated content blocks |
| POST | `/website/contact?lang=de` | Send a contact message by email |

Collection responses are `{ "language": "en", "items": [], "page": 1, "pageSize": 50, "total": 0 }`. Use `&page=2` for further results. Teams, sponsors and categories use **Display order**, then creation date. Event lists use the event date descending; article lists use publication date descending. SSL is maintained in the public website repository and has no editable resource.

### Home

`GET /website/home?lang=en`:

```json
{
  "language": "en",
  "images": [
    { "id": "<TAS-image-id>", "url": "https://imagedelivery.net/<hash>/tas-<uuid>/format=webp", "alt": "Our team" }
  ],
  "aboutUs": "We build robots and share what we learn.",
  "blogs": [
    {
      "id": "<article-id>",
      "slug": "german-open-2026",
      "name": "German Open 2026",
      "description": "A short summary.",
      "url": "https://www.your-website.example/blog/german-open-2026?lang=en",
      "publishedAt": "2026-09-19T12:00:00Z",
      "image": { "id": "<image-id>", "url": "https://imagedelivery.net/<hash>/tas-<uuid>/format=webp", "alt": "The team at the competition" },
      "images": []
    }
  ],
  "videos": [{ "title": "Meet our robot", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }],
  "contact": { "endpoint": "/website/contact?lang=en", "enabled": false }
}
```

Image order is the slideshow order. `blogs` contains at most three entries. Image arrays contain the actual selected images; the example's empty blog `images` array is abbreviated. About us is plain text: render paragraphs/newlines in the website, not raw HTML. Home returns 404 until a Home entry is published.

### Teams and participation history

Teams include `id`, `slug`, localized `name` and `description`, ordered `images`, `startImage`, `image` (same selected cover), `status` (`active` or `retired`), and `awards`:

```json
{
  "eventId": "<event-id>",
  "event": "German Open",
  "date": "2026-07-01",
  "year": "2026",
  "league": "Rescue Line",
  "result": "First place"
}
```

An event represents one occurrence of a competition: for example name **German Open**, date **2026-07-01**, slug **german-open-2026**. Create another event for the following year. Event responses include `date`, `year`, images and a `results` array containing `teamId`, `team`, `teamSlug`, `league`, and `result`. Results are edited once in the team's editor and projected into event responses automatically. The same team can enter several leagues at one event.

Sponsors and publication categories include `id`, `slug`, localized `name`/`description`, ordered `images`, and an optional HTTPS `url`. Publication entries represent categories, as requested; individual downloadable publications can be added as a separate resource later.

### Article blocks

Article details add `textFormat: "markdown"` and `blocks`. The order of the array is the reading order. Every block has an `id` and `type`:

| Type | Rendering |
| --- | --- |
| `heading` | Plain `text`, heading `level` 2 or 3 |
| `text` | Markdown `text` supporting paragraphs, bold, italic, links, lists and code |
| `image` | One item in `images`, optional plain `text` caption |
| `gallery` | Ordered `images`, optional plain `text` caption |
| `video` | Canonical YouTube `url`, plain `text` title |

Each block's `images` uses the same `{ id, url, alt }` format. Text and alt text are already in the requested language. IDs refer to the TAS library; the backend resolves the current Cloudflare URLs. Authors pick images instead of copying delivery URLs into article text.

The public website chooses the layout and styles for these blocks. Render text blocks with a Markdown renderer configured with raw HTML disabled and unsafe URL schemes rejected. TAS uses `markdown-it` with `html: false`, and disables Markdown's image syntax so images are managed by image/gallery blocks. Never inject article text directly into `innerHTML`. Headings, captions, names, descriptions and alt text are plain strings and should be escaped by the website framework. YouTube video IDs are validated by TAS; use the canonical URL to create an iframe only for these video blocks, with the website's own consent/loading behavior.

## Contact submission

Send JSON without admin cookies:

```js
const response = await fetch(`${tasBase}/website/contact?lang=de`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Visitor name',
    email: 'visitor@example.org',
    subject: 'A question',
    message: 'Hello…',
    website: '', // Honeypot: keep empty, visually hide this optional form field.
  }),
});
if (!response.ok) throw new Error('Message could not be sent');
```

Successful SMTP handoff returns HTTP 202 with `{ "sent": true }`. Only then show a success message. Error statuses: 400 invalid fields, 413 oversized payload, 415 wrong content type, 429 rate limit, 503 not configured, 502 SMTP failure. The recipient comes exclusively from server configuration; form submitters cannot set recipients or mail headers. The visitor's validated email is used as `Reply-To`. Messages are plain-text emails and are not stored in PostgreSQL.

The contact endpoint permits five attempts per IP per hour per TAS process and rejects filled honeypots without sending email. JSON is limited to 20 KB; name/subject to 200 characters, message to 10,000, email to 254. Deployment behind a reverse proxy needs trusted client-IP forwarding configured before IP limits accurately distinguish visitors; do not blindly trust arbitrary forwarded headers.

## Admin API and persistence

`GET /api/v1/website/{kind}` lists all entries including drafts, with both translations. `POST /api/v1/website/{kind}` creates, `PUT /api/v1/website/{kind}/{id}` updates, and `DELETE /api/v1/website/{kind}/{id}` removes an entry. Valid kinds: `home`, `teams`, `events`, `sponsors`, `publications`, `blog`. Home is a singleton, enforced by the `home` slug. `GET /api/v1/website/settings` returns contact availability only, never SMTP credentials.

Admin bodies use a `content` object with localized fields `{ "de": "…", "en": "…" }`. Update requests must include the last received `version`; stale saves return 409 rather than overwriting another editor's changes. All mutations use the existing authenticated session, CSRF header, and role checks. The image picker can resolve metadata via the new protected `GET /api/v1/images/{id}` endpoint.

Startup migration creates `website_entries` (structured JSONB and publishing/version metadata) and `website_references` (image/event dependencies). Writes and deletions use a PostgreSQL transaction advisory lock to prevent a content save from racing an image deletion. No sample website content is published automatically.

## Verification

```sh
go test -race ./backend/...
# Optional PostgreSQL integration suite; temporary schemas and records are rolled back:
TAS_TEST_CONFIG="$PWD/config.toml" go test -race ./backend/...
cd frontend
npm run build
npx eslint .
npx oxlint .
```

The integration suite covers bilingual public projections, Home composition, scheduled/draft visibility, team/event joins, optimistic updates, reference checks, role restrictions, CORS, contact validation, rate limits and SMTP handoff failures with a fake mail sender. It sends no real email and does not call Cloudflare.
