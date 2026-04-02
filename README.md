# PromptVault

> 500+ expert copy-paste AI prompts across 25 professional categories.
> Built with Next.js 14, Tailwind CSS, Supabase, and the Clean Neubrutalism JS design kit.

---

## Table of Contents

1. [What This Is](#what-this-is)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Pages & Routes](#pages--routes)
5. [API Routes](#api-routes)
6. [Database Schema](#database-schema)
7. [Data Layer](#data-layer)
8. [Auth Flow](#auth-flow)
9. [Setup & Run Locally](#setup--run-locally)
10. [Deploy to Vercel](#deploy-to-vercel)
11. [Environment Variables](#environment-variables)
12. [Adding Prompts](#adding-prompts)
13. [Adding Categories](#adding-categories)
14. [Stripe / Payments (Future)](#stripe--payments-future)
15. [Design System](#design-system)
16. [Known Issues & Notes](#known-issues--notes)
17. [Quick Reference](#quick-reference)

---

## What This Is

PromptVault is a freemium SaaS prompt library. Users sign up for free, browse 500+ expert prompts organized across 25 professional categories, copy them with one click, and bookmark favorites.

**Business model:** Free now. Paid tier (Pro / Team) added later via Stripe — the architecture is already payment-ready.

**Core user flow:**
```
Landing page → Sign up (email or Google) → Library → Browse category → Click prompt → Copy → Paste into any AI tool
```

---

## Project Structure

```
promptvault/
├── src/
│   ├── components/
│   │   ├── email-capture/
│   │   │   └── EmailCapture.jsx       # Calls POST /api/waitlist
│   │   ├── feature-toggles/
│   │   │   ├── FeatureToggles.jsx
│   │   │   ├── FeatureDisplay.jsx
│   │   │   ├── ToggleButton.jsx
│   │   │   └── data.jsx               # ★ EDIT: Browse/Copy/Save/Search previews
│   │   ├── final-cta/
│   │   │   └── FinalCTA.jsx
│   │   ├── footer/
│   │   │   └── Footer.jsx
│   │   ├── hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── Copy.jsx               # ★ EDIT: Hero headline and CTA text
│   │   │   └── MockupScreen.jsx       # App mockup shown in hero section
│   │   ├── logos/
│   │   │   └── Logos.jsx              # "Works with ChatGPT, Claude..." bar
│   │   ├── navigation/
│   │   │   ├── ExpandableNavBar.jsx   # Main nav wrapper with mobile support
│   │   │   ├── Announcement.jsx       # ★ EDIT: Top banner text
│   │   │   ├── constants.js           # ★ EDIT: Nav dropdown links
│   │   │   ├── Logo.jsx               # Exports: Logo, LogoSmall, LogoLarge
│   │   │   ├── DesktopLinks.jsx
│   │   │   └── MobileLinks.jsx
│   │   ├── pricing/                   # Original kit component — wire to Stripe later
│   │   ├── shared/
│   │   │   ├── Button.jsx             # intent: primary | secondary | outline
│   │   │   ├── SectionHeading.jsx
│   │   │   └── SectionSubheading.jsx
│   │   ├── stats/
│   │   │   └── Stats.jsx              # ★ EDIT: Animated stat numbers
│   │   └── supports/
│   │       ├── Supports.jsx           # Testimonials section wrapper
│   │       ├── options.jsx            # ★ EDIT: Testimonial content
│   │       ├── Copy.jsx
│   │       ├── Users.jsx
│   │       └── CheckPill.jsx
│   │
│   ├── data/
│   │   └── prompts.js                 # ★★★ ALL PROMPTS LIVE HERE
│   │
│   ├── lib/
│   │   ├── supabase.js                # Supabase browser client (anon key)
│   │   ├── auth.js                    # AuthContext + useAuth hook
│   │   └── useSavedPrompts.js         # Hook: fetch/toggle saved prompts
│   │
│   ├── pages/
│   │   ├── _app.jsx                   # Wraps app in AuthProvider
│   │   ├── _document.jsx              # Loads Roboto font via <link> tag
│   │   ├── index.jsx                  # Landing page
│   │   ├── library.jsx                # Main prompt library page
│   │   ├── signup.jsx                 # Sign up page
│   │   ├── login.jsx                  # Login page
│   │   └── api/
│   │       ├── prompts/
│   │       │   ├── index.js           # GET /api/prompts
│   │       │   ├── [id].js            # GET /api/prompts/:id
│   │       │   └── categories.js      # GET /api/prompts/categories
│   │       ├── user/
│   │       │   ├── profile.js         # GET /api/user/profile (auth required)
│   │       │   └── saves.js           # GET/POST/DELETE /api/user/saves (auth required)
│   │       └── waitlist/
│   │           └── index.js           # POST /api/waitlist
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── fonts.js                       # Font config object (Roboto via <link>)
│
├── supabase-schema.sql                # ★★ Run this in Supabase SQL Editor first
├── .env.example                       # Copy to .env.local, fill in values
├── tailwind.config.js
├── next.config.mjs
├── package.json
└── README.md
```

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14 (Pages Router) | |
| Styling | Tailwind CSS | |
| Design Kit | Clean Neubrutalism JS | Uploaded zip — base component library |
| Animation | Framer Motion | Already in kit — cards, modals, stats |
| Icons | react-icons (Fi + Si + Fc sets) | |
| Auth | Supabase Auth | Email + Google OAuth |
| Database | Supabase (Postgres) | Profiles, saves, waitlist, copy events |
| Hosting | Vercel | Recommended — zero config |
| Fonts | Google Fonts via `<link>` | Roboto — loaded in `_document.jsx` |

---

## Pages & Routes

### `GET /` — Landing Page
Full marketing page built from the neubrutalism kit:
- Announcement banner + Nav (Log in / Sign up free)
- Hero: headline, subheadline, two CTAs, app mockup
- "Works with" logos bar (ChatGPT, Claude, Gemini, Midjourney...)
- Animated stats: 500+ prompts / 25 categories / $0 to start
- Feature toggles: Browse / Copy / Save / Search with live previews
- All 25 categories as a clickable grid (links to `/library?cat=...`)
- Testimonials carousel with 6 user personas
- Email capture newsletter form
- Final CTA + Footer

### `GET /library` — Prompt Library
The core product. Full-height two-panel layout:

**Left sidebar** — Logo + "All Prompts" + all 25 category buttons. Active state in indigo. Mobile: hidden, slides in as overlay via hamburger.

**Top bar** — Live search input + Saved toggle (logged-in users) + auth buttons (Log in / Sign up free).

**Prompt grid** — Responsive `auto-fill minmax(260px)`. Each card:
- Title, 2-line description, tag pills, model label
- Copy button: copies full prompt to clipboard, 2s "Copied!" feedback
- Bookmark button: saves/unsaves via Supabase (prompts login if not authed)

**Prompt modal** — Click any card to open. Shows full prompt text in scrollable code block + Copy + Save buttons. Close with ✕ button or Escape key.

**URL state** — `?cat=vibecoding` syncs sidebar selection. All category links are shareable.

### `GET /signup` — Sign Up
- Google OAuth + email/password
- Neubrutalism card style: thick border + drop shadow
- On success: "Check your email" confirmation screen

### `GET /login` — Login
- Google OAuth + email/password
- Redirects to `/library` on success

---

## API Routes

### Public (no auth required)

```
GET /api/prompts
    ?cat=marketing     — filter by category id
    ?search=cold email — search title, description, tags
    ?sort=alpha        — sort alphabetically
    Response: { count, prompts[] }

GET /api/prompts/:id
    Response: single prompt object, or 404

GET /api/prompts/categories
    Response: { count, categories[] }  — includes promptCount per category

POST /api/waitlist
     Body:     { email: string }
     Response: 201 { message } | 400 { error }
```

### Protected (require `Authorization: Bearer <supabase_access_token>`)

```
GET    /api/user/profile
       Response: { user: { id, email, plan, ... } }

GET    /api/user/saves
       Response: { saves: [{ prompt_id, category_id, saved_at }] }

POST   /api/user/saves
       Body:     { prompt_id, category_id }
       Response: 201 { save } | 409 already saved

DELETE /api/user/saves
       Body:     { prompt_id }
       Response: 200 { message }
```

> **Note:** The client-side save/unsave (in the library page) talks to Supabase directly via the JS client for speed. The `/api/user/saves` routes exist for external integrations (mobile apps, browser extensions, third-party tools).

---

## Database Schema

Run `supabase-schema.sql` once in Supabase SQL Editor. Tables:

### `profiles`
Auto-created on signup via database trigger. Extend as you grow.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK — matches `auth.users.id` |
| email | text | |
| full_name | text | |
| avatar_url | text | |
| plan | text | `'free'` \| `'pro'` \| `'team'` |
| created_at | timestamptz | |

### `saved_prompts`
User bookmarks. `prompt_id` matches the static `id` in `src/data/prompts.js`.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → auth.users |
| prompt_id | text | e.g. `"r1"`, `"m2"`, `"vc1"` |
| category_id | text | e.g. `"resume"`, `"marketing"` |
| saved_at | timestamptz | |

Unique constraint on `(user_id, prompt_id)`.

### `waitlist`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| email | text | UNIQUE |
| created_at | timestamptz | |

### `copy_events` (optional analytics)
Track which prompts get copied most. Insert a row client-side when a user copies a prompt.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| prompt_id | text | |
| user_id | uuid | NULLABLE |
| copied_at | timestamptz | |

All tables have **Row Level Security (RLS)** enabled. Users can only read/write their own rows.

---

## Data Layer

All prompts live in **`src/data/prompts.js`** as a static JS file. No database needed for prompts.

**Why static?**
- Zero DB reads = instant library load
- Easy to edit — no CMS or admin panel needed
- Prompts deploy with the app — always consistent

### Structure

```js
// 25 categories — defines sidebar order + metadata
export const CATEGORIES = [
  {
    id: "marketing",      // used in ?cat= URL param and PROMPTS key
    label: "Marketing",   // display name
    icon: "📣",           // emoji in sidebar + landing page grid
    description: "...",   // shown under page heading in library
  },
];

// Prompts keyed by category id
export const PROMPTS = {
  marketing: [
    {
      id: "m1",                       // MUST be globally unique across all categories
      title: "Email Campaign Sequence",
      description: "Short card description (2 lines max)",
      prompt: `Full prompt text with [PLACEHOLDERS]`,
      tags: ["email", "nurture"],     // shown as pills (first 2 visible on card)
      model: "ChatGPT / Claude",      // shown bottom-right of card
    },
  ],
};
```

---

## Auth Flow

Powered by Supabase Auth. `AuthProvider` wraps the app in `_app.jsx`.

```
Sign up → Supabase creates auth.users row
        → DB trigger creates profiles row
        → Confirmation email sent
        → User confirms link → session created → redirect to /library

Log in  → signIn(email, password) or signInWithGoogle()
        → Session stored in browser (Supabase handles storage)
        → redirect to /library

Log out → signOut() clears session
        → onAuthStateChange listener updates UI everywhere
```

### useAuth hook (import from `@/lib/auth`)
```js
const { user, loading, signUp, signIn, signInWithGoogle, signOut } = useAuth();
// user = null when logged out, Supabase User object when logged in
```

### useSavedPrompts hook (import from `@/lib/useSavedPrompts`)
```js
const { savedIds, toggleSave, loading } = useSavedPrompts(user);
// savedIds = Set<string> of saved prompt ids
// toggleSave(promptId, categoryId) — optimistic update, syncs to Supabase
```

---

## Setup & Run Locally

**Prerequisites:** Node.js 18+, a free [Supabase](https://supabase.com) account.

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and service role key

# 3. Run the database schema
# → Open Supabase dashboard → SQL Editor
# → Paste contents of supabase-schema.sql → Run

# 4. Start dev server
npm run dev
# Open http://localhost:3000
```

**Optional — Enable Google OAuth:**
- Supabase → Authentication → Providers → Google
- Create a Google OAuth app, paste credentials
- Add redirect URL: `http://localhost:3000`

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Then in Vercel dashboard → **Settings → Environment Variables**, add all four variables from `.env.example`.

Also update Supabase:
- **Authentication → URL Configuration → Site URL** → your production URL
- **Authentication → URL Configuration → Redirect URLs** → add your production URL

---

## Environment Variables

| Variable | Where to find it | Exposed to browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon/public | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role | **NO — server only** |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL | Yes |

> `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Only use it in `src/pages/api/` files. Never import it in components or client-side code.

---

## Adding Prompts

Open `src/data/prompts.js`. Find the category, add to its array:

```js
export const PROMPTS = {
  marketing: [
    // ...existing prompts
    {
      id: "m5",                               // unique across ALL categories
      title: "Instagram Bio Generator",
      description: "Write a punchy bio that converts visitors to followers",
      prompt: `Write 3 Instagram bio options for my brand.

Brand name: [NAME]
What I do: [ONE LINE]
Target audience: [WHO]
Tone: [bold / witty / professional]
CTA: [link in bio / DM me / shop now]

For each: under 150 characters, 1 emoji, ends with CTA.`,
      tags: ["instagram", "bio", "social"],
      model: "ChatGPT / Claude",
    },
  ],
};
```

Save the file. The prompt appears instantly in the library. No database changes, no deploy needed in dev.

---

## Adding Categories

**Step 1** — Add to `CATEGORIES` array in `src/data/prompts.js`:
```js
{ id: "podcast", label: "Podcasting", icon: "🎙️", description: "Scripts, show notes, and episode planning prompts" },
```

**Step 2** — Add matching key to `PROMPTS`:
```js
export const PROMPTS = {
  // ...existing
  podcast: [
    { id: "pod1", title: "Episode Outline", ... },
  ],
};
```

**Step 3 (optional)** — Add to nav in `src/components/navigation/constants.js`.

The sidebar, landing page category grid, and URL routing all update automatically.

---

## Stripe / Payments (Future)

The codebase is payment-ready. When you want to charge:

**1. Add columns to profiles:**
```sql
alter table public.profiles
  add column stripe_customer_id      text unique,
  add column stripe_subscription_id  text,
  add column plan_expires_at         timestamptz;
```

**2. Install Stripe:**
```bash
npm install stripe @stripe/stripe-js
```

**3. Add env vars:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**4. Create API routes:**
```
POST /api/billing/create-checkout   → creates Stripe Checkout session
POST /api/billing/portal            → Stripe customer portal URL
POST /api/webhooks/stripe           → handles subscription events, updates profiles.plan
```

**5. Gate features by plan:**
```js
const { user } = useAuth();
// Fetch profile.plan from Supabase, then:
if (profile.plan === "free") { /* show upgrade nudge */ }
```

**Suggested tiers:**
- Free: browse all categories, unlimited copies
- Pro ($9/mo): saves, weekly prompt drops, prompt customizer
- Team ($29/mo): 5 seats, shared folders, API access

---

## Design System

Based on the **Clean Neubrutalism JS** kit. Key conventions:

### Colors
- **Primary accent:** `indigo-600` (#4f46e5) — buttons, active states, tags
- **Headings:** `zinc-900`
- **Body text:** `zinc-500`–`zinc-600`
- **Borders:** `zinc-200` default, `zinc-900` for emphasis
- **Page bg:** `zinc-50` for sections, `white` for cards

### Neubrutalism shadow (used on modals and auth cards)
```jsx
className="border-2 border-zinc-900 shadow-[6px_6px_0px_#18181b]"  // auth cards
className="border-2 border-zinc-900 shadow-[8px_8px_0px_#18181b]"  // modal
```

### Shared Button
```jsx
import { Button } from "@/components/shared/Button";
<Button intent="primary">Save</Button>    // indigo background
<Button intent="secondary">Cancel</Button>// dark background
<Button intent="outline">Browse</Button>  // white + border
```

### Fonts
Roboto loaded via `<link>` tag in `_document.jsx`. Configured in `tailwind.config.js` as the default sans-serif. The `font` export from `src/fonts.js` provides an inline style object used on full-page layouts (library, auth pages) that don't use the full `ExpandableNavBar` wrapper.

---

## Known Issues & Notes

**Google Fonts at build time**
`next/font/google` fetches fonts during `next build` and fails in environments without internet access. This project loads Roboto via `<link>` in `_document.jsx` instead. The font is identical; it just loads at runtime rather than build time.

**Supabase free tier**
- 500MB database, 50,000 MAU — plenty to launch
- Projects pause after 1 week of inactivity → visit dashboard to wake
- Upgrade to Pro ($25/mo) when you have paying users

**Static prompts vs DB prompts**
Prompts are in a static file by design. If you want an admin UI to manage prompts without editing code, the path is:
1. Create a `prompts` table in Supabase
2. Seed it with the data from `src/data/prompts.js`
3. Replace the imports in `src/pages/api/prompts/index.js` with Supabase queries
4. Keep the static file as a fallback / seed reference

**Adding copy analytics**
The `copy_events` table is ready. To track copies, add this to the copy handler in `library.jsx`:
```js
if (user) {
  supabase.from("copy_events").insert({ prompt_id: prompt.id, user_id: user.id });
}
```
Then query counts in the API to enable "sort by popular".

---

## Quick Reference

```bash
npm run dev        # Start dev server → localhost:3000
npm run build      # Production build
npm start          # Start production server
vercel --prod      # Deploy to Vercel
```

### Key files to edit

| What you want to change | File |
|---|---|
| Add or edit prompts | `src/data/prompts.js` → `PROMPTS` |
| Add a new category | `src/data/prompts.js` → `CATEGORIES` + `PROMPTS` |
| Change nav links | `src/components/navigation/constants.js` |
| Change hero text | `src/components/hero/Copy.jsx` |
| Change announcement banner | `src/components/navigation/Announcement.jsx` |
| Change testimonials | `src/components/supports/options.jsx` |
| Change stat numbers | `src/components/stats/Stats.jsx` |
| Change footer links | `src/components/footer/Footer.jsx` |
| Add a new page | `src/pages/your-page.jsx` |
| Add an API route | `src/pages/api/your-route.js` |
| Change Supabase tables | `supabase-schema.sql` + run in SQL Editor |
