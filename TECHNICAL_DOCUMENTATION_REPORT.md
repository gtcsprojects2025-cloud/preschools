# PFSchools — Comprehensive Technical Documentation Report

**Generated:** June 17, 2026  
**Project:** PFSchools — Online Learning Platform for Kids  
**Repository Root:** `/Users/macbookair/Desktop/projects/pfschools/pfschools`

---

## Table of Contents

1. [Backend CMS / Platform](#1-backend-cms--platform)
2. [Admin Accounts & Access](#2-admin-accounts--access)
3. [Hosting & Deployment Information](#3-hosting--deployment-information)
4. [Languages & Frameworks](#4-languages--frameworks)
5. [Database Details](#5-database-details)
6. [Source Code Repositories](#6-source-code-repositories)
7. [Backup Procedures](#7-backup-procedures)
8. [Maintenance & Continuity Notes](#8-maintenance--continuity-notes)
9. [Technical Notes](#9-technical-notes)
10. [Summary](#10-summary)

---

## 1. Backend CMS / Platform

### CMS or Framework Used

PFSchools does **not** use a traditional CMS (e.g., WordPress, Strapi, Contentful). Instead, the platform is a **custom-built Learning Management System (LMS)** built from scratch on top of **Next.js 16 (App Router)**. Content is managed through:

- A **custom admin panel** at `/admin` — a form-based UI for creating and editing course lessons
- **MongoDB/Mongoose** as the content repository
- **Next.js API routes** (`/api/lessons`) serving as the content API layer

### Core Architecture

The architecture follows the **Next.js App Router** pattern with:

```
┌───────────────────────────────────────────────────┐
│                    Client Layer                     │
│  React 19 (useState, useEffect, useParams, etc.)   │
│  Framer Motion (animations)                        │
│  Lucide React / React Icons (UI Icons)             │
└───────────┬───────────────────────────────────────┘
            │ fetch() to API routes
            ▼
┌───────────────────────────────────────────────────┐
│               Next.js API Routes                   │
│  /api/lessons (GET - list/single by query param)   │
│  /api/lessons/[slug] (GET - single by slug/ID)     │
│  /api/lessons (POST - create lesson)               │
└───────────┬───────────────────────────────────────┘
            │ Mongoose
            ▼
┌───────────────────────────────────────────────────┐
│              MongoDB Atlas (Cloud DB)               │
│  Collection: lessons                                │
│  Documents with nested sections/subtopics           │
└───────────────────────────────────────────────────┘
```

**Key Architectural Pattern:**  
- **Hybrid Client-Server:** Pages use `'use client'` directive with `fetch()` calls to internal API routes, rather than Next.js Server Components or Server Actions.
- **No SSR/SSG for dynamic data:** Course detail pages fetch data client-side via `useEffect`.
- **Static pages:** The courses listing page currently uses hardcoded static data, not the API.

### Backend Services

| Service | Role | Status |
|---------|------|--------|
| **Next.js API Layer** | RESTful API for lessons CRUD | Active |
| **MongoDB Atlas** | Cloud-hosted NoSQL database | Active |
| **Cloudinary** | Image hosting & CDN for lesson thumbnails | Integrated via admin panel |

### API Structure

#### `GET /api/lessons`
- **Query params:** `?slug=...` (single by slug), `?id=...` (single by ID), none (all lessons)
- **Response:** `{ success: true, lesson(s), count? }`
- **Fields returned:** `title, slug, description, subject, grade, duration, thumbnail, createdAt` (list) or full document (single)

#### `GET /api/lessons/[slug]`
- **Param:** `slug` — used as `_id` value to query by MongoDB ObjectID
- **Response:** `{ success: true, lesson }`
- **⚠️ Design Issue:** Despite the route name `[slug]`, it queries by `_id` not by actual slug field

#### `POST /api/lessons`
- **Body:** `{ title, description, subject, grade, duration, thumbnail, sections[] }`
- **Sections:** nested array with `{ title, duration, order, subtopics[] }`
- **Subtopics:** nested array with `{ title, duration, content, image? }`
- **Response:** `{ success: true, lesson }` (201) or error (500)

### Key Integrations

| Integration | Purpose | Implementation |
|-------------|---------|----------------|
| **Cloudinary** | Image upload & CDN | Direct upload via unsigned preset `pfschools` from admin panel. Cloud name: `dsupdus2u` |
| **MongoDB Atlas** | Primary database | Mongoose ODM with connection caching pattern |
| **Google Fonts** | Typography | Inter & Playfair Display via `next/font` |
| **Unsplash** | Stock imagery | External hot-linked images for banners, cards, avatars |

---

## 2. Admin Accounts & Access

### Administrative Roles

There is **no authentication or authorization system** implemented. The platform currently identifies:

- **Admin/Content Creator:** Accessed via `/admin` route — a form interface for creating lessons
- **No student accounts, no parent accounts, no instructor accounts** exist in the codebase

### Authentication Methods

**None implemented.** There is:
- A "Login" link in the navbar (`/login`) that currently **leads nowhere** — no route handler exists for `/login`
- No session management, JWT, OAuth, or any auth mechanism
- The admin panel at `/admin` is **completely unprotected** with no authentication gate

### Access Control Mechanisms

**No access control exists.** The system currently relies entirely on obscurity of routes. The `/admin` page is publicly accessible to anyone who navigates to it.

### User Management Process

**Not implemented.** There is no user registration, profile management, password reset, or any user lifecycle management.

**Risk: Critical** — The absence of authentication means:
1. Anyone can create/edit/delete course content by navigating to `/admin`
2. Anyone can call the POST API directly to inject data
3. No way to track who made changes
4. No student progress tracking

---

## 3. Hosting & Deployment Information

### Hosting Provider

Based on codebase analysis:
- **Likely Provider:** Vercel (Next.js-optimized hosting). The `next.config.ts` is minimal/default, and the README references Vercel deployment.
- **Database:** MongoDB Atlas (`lms.kbbk3ms.mongodb.net` cluster)
- **Media:** Cloudinary CDN (`dsupdus2u` cloud)

### Deployment Workflow

No CI/CD configuration files (no `.github/workflows`, no `Dockerfile`, no `vercel.json`) are present in the codebase. Likely workflow:

```
git push → Vercel auto-deploy (if connected to Git)
```

### Environment Configuration

**File:** `.env.local` at root level

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_MONGODB_URI` | `mongodb+srv://gtcsprojects2025_db_user:miF3xmT7TJdkqz6Z@lms.kbbk3ms.mongodb.net/?appName=LMS` | MongoDB Atlas connection string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dsupdus2u` | Cloudinary cloud identifier |

**Security Concern:** Database credentials are stored with `NEXT_PUBLIC_` prefix, making them publicly exposed to browser JavaScript. This exposes the database credentials to anyone viewing the page source.

### CI/CD Setup

**None detected.** No GitHub Actions workflows, no Docker configuration, no build scripts beyond standard Next.js defaults.

### Domain and SSL Configuration

No domain configuration files present. Based on the business name:
- **Likely domain:** `pfschools.com` or similar
- **SSL:** Would be handled by Vercel (automatic Let's Encrypt via their edge network)

---

## 4. Languages & Frameworks

### Programming Languages Used

| Language | Usage |
|----------|-------|
| **TypeScript** 5.x | Entire codebase — strict mode enabled |
| **CSS** (with Tailwind v4) | Styling via utility classes |
| **HTML/JSX** | React component templates |

### Frontend Frameworks

| Framework | Version | Notes |
|-----------|---------|-------|
| **Next.js** | 16.2.7 | App Router, Turbopack-enabled |
| **React** | 19.2.4 | Client components (`'use client'`) |
| **Tailwind CSS** | v4 (PostCSS) | Utility-first styling, `@tailwindcss/postcss` plugin |

### Backend Frameworks

Backend is provided entirely by **Next.js API Routes** (Route Handlers) — no separate backend framework.

### Major Libraries and Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **mongoose** | ^9.7.0 | MongoDB ODM for data modeling |
| **framer-motion** | ^12.40.0 | Page/component animations |
| **lucide-react** | ^1.17.0 | Icon set (primary) |
| **react-icons** | ^5.6.0 | Icon set (supplementary, FontAwesome brands) |
| **react-hot-toast** | ^2.6.0 | Toast notifications (admin panel) |
| **next/font** | Built-in | Google Fonts optimization (Inter, Playfair Display) |
| **TypeScript** | ^5 | Type safety |
| **ESLint** | ^9 | Code linting via `eslint-config-next` |

---

## 5. Database Details

### Database Type

**MongoDB Atlas** — cloud-hosted NoSQL document database  
- Cluster: `lms.kbbk3ms.mongodb.net`
- Connection: Standard SRV string with user/password authentication

### Database Schema Overview

#### Collection: `lessons`

The schema uses **Mongoose** with nested subdocuments:

```
lessons
│
├── _id:           ObjectId (auto)
├── title:         String (required) — e.g. "What is Fungi?"
├── slug:          String (auto-generated from title via pre-save hook)
├── description:   String (optional)
├── subject:       String (default: "Science")
├── grade:         String (default: "Grade 2")
├── duration:      String (optional) — e.g. "8 minutes"
├── thumbnail:     String (optional) — URL to image
├── createdAt:     Date (auto via timestamps)
├── updatedAt:     Date (auto via timestamps)
└── sections:      [Section] (nested array)
                    │
                    ├── title:        String (required)
                    ├── duration:     String (required)
                    ├── order:        Number (default: 0)
                    └── subtopics:    [SubTopic] (nested array)
                                      │
                                      ├── title:    String (required)
                                      ├── duration: String (required)
                                      ├── content:  String (required)
                                      └── image:    String (optional)
```

### Key Collections/Tables

Only **one collection** currently exists: `lessons`.  
No collections for: users, enrollments, progress, quizzes, payments, or instructor profiles.

### Data Relationships

- **One-to-many:** Lesson → Sections (embedded array)
- **One-to-many:** Section → SubTopics (embedded array)
- **No relational references** between collections (only one collection exists)

### Backup Strategy

**None detected.** There is no backup script, cron job, or database dump configuration in the codebase. The only protection is MongoDB Atlas's automatic daily backups (if enabled in the Atlas cluster settings).

**Risk: High** — No automated backup scripts, no documented recovery procedure. Data loss could be catastrophic.

---

## 6. Source Code Repositories

### Repository Structure

```
pfschools/                          # Next.js project root
├── app/
│   ├── layout.tsx                  # Root layout (fonts, metadata)
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Global styles + Tailwind import
│   ├── favicon.ico
│   ├── about/page.tsx              # About Us
│   ├── admin/page.tsx              # Admin CMS panel (create lessons)
│   ├── contact/page.tsx            # Contact form
│   ├── courses/
│   │   ├── page.tsx                # Course listing (static data)
│   │   ├── [slug]/page.tsx         # Course detail (dynamic, API-driven)
│   │   └── content/page.tsx        # Fungi lesson content demo
│   ├── instructors/page.tsx        # Instructors listing
│   ├── api/
│   │   └── lessons/
│   │       ├── route.ts            # GET (list/single) + POST
│   │       └── [slug]/route.tsx    # GET by slug/ID
│   ├── components/
│   │   ├── navbar.tsx              # Navigation bar
│   │   ├── footer.tsx              # Footer
│   │   └── courseCard.tsx          # Course card (unused?)
│   ├── lib/
│   │   └── mongodb.ts              # MongoDB connection (caching pattern)
│   └── models/
│       └── lesson.ts               # Mongoose schema (Lesson, Section, SubTopic)
├── public/
│   ├── pfslogo.png
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
├── .env.local                      # Environment variables (credentials)
├── next.config.ts                  # Next.js config (minimal)
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

### Branching Strategy

**None detected.** Only a single branch appears to exist (default `main`/`master`). No feature branches, develop branches, or release tags are visible in the Git history.

### Important Modules

| Module | Path | Description |
|--------|------|-------------|
| **Lesson Model** | `app/models/lesson.ts` | Mongoose schema with nested subdocuments |
| **MongoDB Connection** | `app/lib/mongodb.ts` | Singleton caching connection pattern |
| **Lessons API** | `app/api/lessons/route.ts` | Full CRUD (GET by slug/id/list, POST) |
| **Admin CMS** | `app/admin/page.tsx` | Form-based lesson creation with Cloudinary upload |
| **Homepage** | `app/page.tsx` | Landing page with courses, testimonials, team |
| **Course Detail** | `app/courses/[slug]/page.tsx` | Dynamic course page fetching from API |
| **Navigation** | `app/components/navbar.tsx` | Responsive navbar with mobile drawer |

### Repository Links

- No remote Git URL is configured in the codebase
- No GitHub/GitLab/Bitbucket references found

---

## 7. Backup Procedures

### Current Backup Mechanism

**No automated backup mechanism exists** within the codebase. There are:
- No database dump scripts
- No scheduled backup jobs
- No export functionality in the admin panel
- No Git-based backup of content (database is separate from code)

### Backup Frequency

**Not configured.** The only potential backup source is MongoDB Atlas's built-in backup service (if enabled in the Atlas admin console).

### Recovery Process

**Not documented.** There is no restore script, migration tool, or recovery playbook.

### Risk Assessment

| Risk | Severity | Impact |
|------|----------|--------|
| No automated DB backups | **Critical** | All course content could be permanently lost |
| No export/import tools | **High** | Cannot migrate content between environments |
| Credentials in `.env.local` | **Critical** | MongoDB credentials exposed to client via `NEXT_PUBLIC_` prefix |
| No versioned content | **Medium** | No rollback capability for content changes |

---

## 8. Maintenance & Continuity Notes

### Monitoring Setup

**None detected.** No monitoring tools (Sentry, Datadog, New Relic, etc.) are configured in the project dependencies or code.

### Error Logging

**Minimal.** Error handling relies on:
- `console.error()` in API routes and client components
- `react-hot-toast` for user-facing error messages in admin panel
- No structured logging, no error aggregation service

### Update Procedures

- **Dependencies:** Managed via `package.json` with `npm update` / `npx npm-check-updates`
- **No automated dependency update tooling** (Dependabot, Renovate) configured
- **Migration Strategy:** No database migration tool (e.g., migrate-mongo) — schema changes would need to be handled manually in Mongoose

### Disaster Recovery Considerations

| Scenario | Current State | Recommendation |
|----------|---------------|----------------|
| Database corruption/loss | No backup to restore from | Configure MongoDB Atlas daily snapshots |
| Server failure | Vercel auto-scales, but DB depends on Atlas | Ensure Atlas has multi-region failover |
| Credential leak | `NEXT_PUBLIC_MONGODB_URI` is already exposed in client JS | **Immediate action required** |
| Codebase corruption | Git provides code history | Ensure regular Git pushes to remote |

---

## 9. Technical Notes

### Security Observations

| Issue | Severity | Details |
|-------|----------|---------|
| **Exposed Database Credentials** | 🔴 **Critical** | `NEXT_PUBLIC_MONGODB_URI` is prefixed with `NEXT_PUBLIC_`, making it accessible in client-side JavaScript bundles. Anyone can view the MongoDB connection string including username/password. |
| **No Authentication** | 🔴 **Critical** | Admin panel at `/admin` and POST API endpoint are fully public with no protection. |
| **No Input Validation (API)** | 🟡 **High** | API routes do not validate/sanitize input beyond Mongoose schema validation |
| **No Rate Limiting** | 🟡 **Medium** | POST endpoint has no rate limiting — vulnerable to abuse/spam |
| **Hardcoded API Key in Env** | 🟡 **Medium** | Unsigned Cloudinary upload preset (`pfschools`) could be abused by anyone |
| **No HTTPS Enforcement** | 🟢 **Low** | Handled by Vercel edge network by default |
| **No CORS Configuration** | 🟢 **Low** | Not needed for same-origin API calls in Next.js |

### Performance Considerations

| Aspect | Status | Notes |
|--------|--------|-------|
| **Client-side data fetching** | ⚠️ Suboptimal | Course detail pages fetch via `useEffect()` causing loading states instead of using SSR/SSG or Server Components |
| **No caching strategy** | ⚠️ Missing | `cache: 'no-store'` prevents any CDN/edge caching of course content |
| **External image hotlinking** | ⚠️ Risk | All images (Unsplash, Cloudinary) are hot-linked with no fallback for broken URLs |
| **Large bundle size** | ⚠️ Potential | Framer Motion + multiple icon libraries could add significant JS payload |
| **No image optimization** | ⚠️ Missing | Not using Next.js `<Image>` component for optimization/resizing |

### Known Technical Debt

| Item | Impact | Notes |
|------|--------|-------|
| **Route named `[slug]` queries by `_id`** | 🟡 **Bug** | The route at `/api/lessons/[slug]` treats the param as MongoDB `_id`, not the actual slug field. This is confusing and may cause 404s. |
| **Duplicate API logic** | 🟡 **Code Smell** | Both `route.ts` and `[slug]/route.tsx` have near-identical GET handler code |
| **Hardcoded static course data** | 🟡 **Inconsistency** | Courses listing page uses hardcoded data while homepage fetches from API — inconsistent user experience |
| **Unused code** | 🟢 **Minor** | `courseCard.tsx` component appears to exist but is not imported in any page |
| **Commented-out code** | 🟢 **Minor** | Large blocks of commented-out components in homepage |
| **`handleCourseDetailsRoute`** | 🟢 **Minor** | Empty function on homepage, never called |
| **Missing metadata** | 🟡 **SEO** | Several pages lack `metadata` export for SEO optimization |
| **Type safety gaps** | 🟡 **Medium** | Multiple `any` types used in API routes and state management |

### Improvement Recommendations

#### Immediate (Critical)

1. **🔴 Rotate MongoDB credentials immediately.** Remove `NEXT_PUBLIC_` prefix — rename to `MONGODB_URI` (without `NEXT_PUBLIC_`). Create a new database user and update the connection string. The current credentials should be considered compromised.
2. **🔴 Implement authentication.** Add at minimum a basic auth layer for the `/admin` panel and POST API endpoint. NextAuth.js or a simple JWT-based solution would suffice.
3. **🔴 Secure environment variables.** Move all secrets to server-only environment variables (remove `NEXT_PUBLIC_` prefix from database credentials).

#### Short-term (High Priority)

4. **✅ Configure MongoDB Atlas backups.** Enable daily automated snapshots. Set up a backup verification schedule.
5. **✅ Fix the `[slug]` route bug.** The route handler should query by the `slug` field, not `_id`. Alternatively, rename the route parameter and update the frontend.
6. **✅ Add rate limiting.** Implement rate limiting on POST and GET API routes using middleware or Vercel WAF rules.
7. **✅ Migrate to Server Components.** Move data fetching from client-side `useEffect` to Server Components or Next.js data fetching for better performance and SEO.

#### Medium-term

8. **Add user management system.** Student accounts, parent accounts, instructor profiles with proper roles and permissions.
9. **Implement progress tracking.** Track student progress through courses, quiz scores, completion status.
10. **Add proper error monitoring.** Integrate Sentry or similar for production error tracking.
11. **Implement database migrations.** Use a tool like `migrate-mongo` for schema versioning.
12. **Add CI/CD pipeline.** GitHub Actions for automated testing, linting, and deployment.
13. **Implement image optimization.** Use Next.js `<Image>` component for automatic optimization, lazy loading, and WebP conversion.

#### Long-term

14. **Add search functionality.** Implement full-text search for courses (MongoDB Atlas Search or Algolia).
15. **Build a proper quiz engine.** The current content page has a hardcoded quiz UI placeholder.
16. **Add payment integration.** If courses become paid, integrate Stripe/Paystack for payments.
17. **Implement caching strategy.** Use ISR (Incremental Static Regeneration) or Redis caching for frequently accessed content.
18. **Add comprehensive testing.** Unit tests (Jest/Vitest), integration tests, and E2E tests (Playwright/Cypress).

---

## 10. Summary

### System Overview

PFSchools is a **Next.js 16 + React 19** web application serving as an online learning platform for children (ages 5–10). It features a custom-built LMS with MongoDB Atlas for content storage and Cloudinary for media management.

### Current State

| Dimension | Assessment |
|-----------|------------|
| **Functionality** | ✅ Core pages work — Home, About, Courses, Instructors, Contact |
| **Content Management** | ⚠️ Basic — Custom admin panel works but is unprotected |
| **Data Architecture** | ⚠️ Minimal — Single collection, no user data, no progress tracking |
| **Security** | ❌ **Critical gaps** — Exposed credentials, no auth, no rate limiting |
| **Performance** | ⚠️ Suboptimal — Client-side fetching, no caching, no image optimization |
| **Code Quality** | ⚠️ Moderate — TypeScript strict mode, but with `any` types and code duplication |
| **Testing** | ❌ **None** — No test suite exists |
| **DevOps** | ❌ **Minimal** — No CI/CD, no monitoring, no backup automation |
| **Scalability** | ⚠️ Limited — No caching layer, no CDN strategy for dynamic content |

### Architecture Diagram (Text)

```
┌────────────────────────────────────────────────────────────┐
│                      PFSchools Platform                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Home    │  │  Courses │  │  About   │  │ Instruct │  │
│  │  /       │  │  /courses│  │  /about  │  │  /inst.. │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │             │             │         │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐ │
│  │  Contact │  │ Admin    │  │ Course   │  │ Lessons  │ │
│  │  /contact│  │ /admin   │  │ /[slug]  │  │ /content │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js API Routes Layer                 │  │
│  │  POST /api/lessons  │  GET /api/lessons              │  │
│  │  GET /api/lessons/[slug]                              │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                   │
│  ┌──────────────────────┴───────────────────────────────┐  │
│  │              Mongoose ODM Layer                       │  │
│  │  Lesson Schema (with embedded Section/SubTopic)       │  │
│  │  Connection caching via global variable               │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                   │
│  ┌──────────────────────┴───────────────────────────────┐  │
│  │              MongoDB Atlas (Cloud)                    │  │
│  │              Cluster: lms.kbbk3ms.mongodb.net         │  │
│  │              Database: (default)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  External Services:                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Cloudinary  │  │   Unsplash   │  │  Google Fonts    │ │
│  │  Media CDN   │  │  Stock Imgs  │  │  Inter/Playfair  │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Final Risk Matrix

| Risk | Severity | Likelihood | Priority |
|------|----------|------------|----------|
| Database credential exposure | Critical | Very High 🚨 | **IMMEDIATE** |
| Unauthorized admin access | Critical | High 🚨 | **IMMEDIATE** |
| Data loss (no backups) | High | Medium ⚠️ | **HIGH** |
| Content injection via public POST | High | Medium ⚠️ | **HIGH** |
| Broken course detail routing | Medium | High ⚠️ | **HIGH** |
| No user management | Medium | N/A | **MEDIUM** |
| No monitoring/error tracking | Medium | N/A | **MEDIUM** |
| No testing | Medium | N/A | **MEDIUM** |

### Key Contacts (Inferred from Codebase)

| Role | Name (Contact) |
|------|----------------|
| **Business Contact** | `hello@pfschools.com` (from contact page) |
| **Phone** | `+234 803 000 0000` (placeholder) |
| **Location** | Potasfield Schools, 123 Learning Avenue, Lagos, Nigeria |

---


---

## Addendum — Remediation Log (hardening pass)

The following items from this report have been addressed in code. Items marked
**ACTION REQUIRED** cannot be fixed from the repository alone.

| Finding | Status | Change |
|---------|--------|--------|
| Database credential exposure (`NEXT_PUBLIC_MONGODB_URI`) | Code fixed / **ACTION REQUIRED: rotate credentials** | `app/lib/mongodb.ts` now reads the server-only `MONGODB_URI` variable at call time and throws when it is missing. No connection string is committed in source; `.env.example` documents the variable and `.env.local` stays git-ignored. |
| Admin panel indexable by search engines | Partially fixed | `app/admin/layout.tsx` sets `robots: { index: false, follow: false }` and `/admin` is disallowed in `app/robots.ts`. **ACTION REQUIRED:** authentication is still missing. |
| Course pages not crawlable / broken detail routing | Fixed | `/courses/[slug]` and `/courses/content/[slug]` are now server components that read lessons straight from MongoDB, return real 404s for missing lessons and are cached with 5-minute on-demand ISR. |
| Connection handling (pool exhaustion, stuck rejected promise) | Fixed | The cached connection promise is cleared on failure so the next request can retry; `maxPoolSize` and `serverSelectionTimeoutMS` are set explicitly. |
| Untyped API payloads (`any`) | Fixed | API routes and admin pages use typed payloads plus `unknown` and `instanceof Error` in `catch` blocks. |
| Accessibility gaps in the admin shell and course cards | Fixed | Icon-only buttons have `type="button"` and `aria-label`; decorative icons and images use `aria-hidden` / `alt=""`; clickable overlays are real buttons. |
| Raw `<img>` tags bypassing the image optimiser | Fixed | All `<img>` elements were migrated to `next/image` with explicit `sizes`. |
| Course listing pagination silently broken | Fixed | `GET /api/lessons` now honours `?page` / `?limit` (capped at 50) and returns `pagination: { currentPage, totalPages, totalLessons }`; requests without `limit` still return the full list so the home page and admin dashboard keep working. |
| Placeholder list view on `/courses` | Fixed | The `List` toggle now renders real horizontal course cards (image, subject, description, duration/level/students, CTA) instead of the `<p>{course.title}</p>` stub. |
| Missing `<h1>` on `/admin/dashboard` loading/error states | Fixed | Both states render an `sr-only` `<h1>`; the spinner block is a `role="status"` live region. |
| MongoDB cluster unreachable from this environment | **ACTION REQUIRED** | `MONGODB_URI` points at `lms.kbbk3ms.mongodb.net`, which returns `ENOTFOUND` (`querySrv`), so `/api/lessons` answers 500 and course pages render their error boundary. Re-create/restore the Atlas cluster, rotate the credential and update `.env.local`. |
| Hard-coded copy on the lesson viewer | Fixed | The "SCIENCE COURSE" badge, "4.9" rating and "Lesson 1 of 4" placeholder are replaced with real lesson data (subject, level, quizzes, section count); the course hero shows the lesson's grade instead of "Ages 5-9". |
| Dead controls on the lesson viewer | Fixed | "Mark as Complete" and per-section "Mark section complete" now drive a real progress bar (`role="progressbar"`, 0–100 % from completed sections); "Take Quiz" shows an accessible status message instead of doing nothing. Course pages gained `generateMetadata` (title, description, canonical, OpenGraph/Twitter) plus a segment-level `error.tsx`. |
| `/api/lessons` returned `500` with the raw driver error when Atlas was unreachable | Fixed | New `app/lib/dbError.ts` classifies `ENOTFOUND` / `ECONNREFUSED` / `MongooseServerSelectionError` and the API now answers `503` + `Retry-After: 30` with a generic message; the connection string and driver stack are no longer echoed to the browser. `/courses` surfaces that message in a `role="alert"` block with a retry button instead of a `throw`. |
| `/courses` search and subject chips only filtered the current page (and the "Language" chip never matched anything) | Fixed | The API accepts `?subject=` and `?q=` (regex-escaped, title + description) and both `find` and `countDocuments` use the same filter, so results and `pagination` cover the whole catalogue. The client debounces the search box, resets to page 1 on filter/search change and builds chips from the subjects actually present. |
| Course cards printed "undefined Students" / "undefined Quizzes" | Fixed | `level`, `students` and `quizzes` are optional in the Lesson schema, so the cards now fall back to `grade`/`All levels`/`Self-paced` and only render the student/quiz rows when the numbers exist. |
| No quick way to diagnose database problems | Added | `npm run db:check` (`scripts/check-db.mjs`) resolves `MONGODB_URI` from `.env.local`, connects with a 5 s timeout and prints targeted guidance for `ENOTFOUND`, refused connections, auth failures and an empty collection. |

### Verification performed

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Clean (exit 0) |
| `npx eslint .` | Clean (exit 0) |
| `npx next build` | Success; `/courses/[slug]` and `/courses/content/[slug]` emitted as SSG with `revalidate: 300` in the compiled segment config; `/robots.txt`, `/about`, `/contact`, `/instructors`, `/admin` static |
| Smoke test (`next start`) | `/`, `/courses`, `/about`, `/contact`, `/instructors`, `/admin` → 200 with exactly one `<h1>` and a `#main-content` landmark; `/nope` → 404; `/robots.txt` disallows `/admin`; `/admin` emits `<meta name="robots" content="noindex, nofollow, nocache">`; `/sitemap.xml` served from cache (`x-nextjs-cache: HIT`) |
| On-demand ISR behaviour | Verified with a throwaway dynamic route using the same `revalidate` + empty `generateStaticParams()` pattern: request 1 `x-nextjs-cache: MISS` (render + cache), request 2 `HIT`, request after the revalidate window `STALE` (regenerated in the background), next request `HIT` again |
| DB-down behaviour | Course detail returns 500 through the error boundary (no soft 404, no cached error page) and `/api/lessons` returns 500 with a structured error body; `app/courses/[slug]/error.tsx` gives course-specific copy for client-side navigation failures |
| Docs | `README.md` rewritten with setup, environment variables, scripts, structure, rendering/ISR and security guidance |

*This report was generated through automated analysis of the PFSchools codebase. All findings should be verified manually before acting upon recommendations.*