# PFSchools

Marketing site and lightweight LMS for PFSchools (Potasfield Schools), built with
Next.js App Router, React 19, Tailwind CSS v4 and MongoDB via Mongoose.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, `lucide-react`, `framer-motion` |
| Data | MongoDB + Mongoose 9 (`app/models/lesson.ts`) |
| Tooling | TypeScript 5, ESLint 9 (`eslint-config-next`) |

## Requirements

- Node.js 20+
- A MongoDB instance (MongoDB Atlas or self-hosted)

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | yes | MongoDB connection string, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/pfschools` |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical site origin used by `robots.txt` and `sitemap.xml` (defaults to `https://pfschools.com`) |

> **Never** prefix the database URI with `NEXT_PUBLIC_`. Any `NEXT_PUBLIC_*`
> value is inlined into the client bundle and would leak the credentials.
> `app/lib/mongodb.ts` only reads `MONGODB_URI` on the server and throws if it is
> missing, so a build/deploy with the wrong name fails fast instead of silently
> shipping a broken client.

## Scripts

```bash
npm run dev       # start the dev server on http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
npm run db:check  # verify MONGODB_URI resolves, connects and reports the lesson count
```

## Project structure

```
app/
├── page.tsx                     # landing page (hero, subjects, featured courses, team, testimonials)
├── about|contact|instructors/    # static marketing pages (each with its own metadata layout)
├── courses/
│   ├── page.tsx                 # course catalogue (client search/filter/pagination via /api/lessons)
│   └── [slug]/page.tsx          # course detail — server component, ISR (revalidate 300s)
│       └── content/[slug]/      # lesson viewer — server wrapper + client LessonView
├── admin/
│   ├── page.tsx                 # lesson create/delete form
│   └── dashboard/page.tsx       # stats over lessons
├── api/lessons/                 # GET (list, paginated) / POST (create) / [slug] (GET, DELETE)
├── lib/
│   ├── mongodb.ts               # cached Mongoose connection (server-only)
│   ├── lessons.ts               # typed, request-memoised data access
│   ├── dbError.ts               # maps driver/network failures to a 503 response
│   └── site.ts                  # canonical URLs / site constants
├── models/lesson.ts             # Mongoose schema + model
├── robots.ts · sitemap.ts       # generated SEO endpoints
├── error.tsx · not-found.tsx    # route error + 404 boundaries
└── components/                  # navbar, footer, course card, admin shell

scripts/check-db.mjs             # `npm run db:check` — connectivity diagnosis
```

## Data and rendering

- `GET /api/lessons` returns `{ success, count, lessons, pagination }`. Pass
  `?page=` / `?limit=` (max 50) to paginate — omitting `limit` returns every
  lesson, which is what the home page and admin dashboard rely on. Optional
  `?subject=` and `?q=` filters (searched across title and description) are
  applied server-side, so `/courses` search and subject chips cover the whole
  catalogue rather than the current page.
- If MongoDB cannot be reached the API answers **`503`** with
  `Retry-After: 30` and a generic message (`app/lib/dbError.ts`); the driver
  text is never echoed to the client. `/courses` shows that message with a retry
  button instead of failing silently — run `npm run db:check` to diagnose.
- `POST /api/lessons` creates a lesson and revalidates `/`, `/courses`, the new
  course page, its lesson page and `/sitemap.xml`.
- Course pages are server components that query MongoDB directly through
  `app/lib/lessons.ts`, so they are crawlable and return real `404`s. They use
  `revalidate = 300` with an empty `generateStaticParams()`, which gives
  on-demand ISR: the first request renders and caches, later requests are served
  from cache until it goes stale (or an admin publishes a lesson).
- `/admin` is `noindex` and disallowed in `robots.txt`.

## Deployment

1. Set `MONGODB_URI` (and optionally `NEXT_PUBLIC_SITE_URL`) in the hosting
   provider's environment settings.
2. `npm run build && npm run start` — or deploy to Vercel; no other
   configuration is required.
3. Whitelist the deployment's egress IPs in MongoDB Atlas if the cluster uses an
   IP access list.

## Security notes

- Keep `.env.local` out of version control — only `.env.example` is committed.
- Rotate the database password if it has ever been exposed (for example in a
  `NEXT_PUBLIC_*` variable or a commit).
- The admin area currently has **no authentication**; put it behind your
  platform's access control (e.g. Vercel password protection or a reverse-proxy
  rule) before exposing it publicly.
