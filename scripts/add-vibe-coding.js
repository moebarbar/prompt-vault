#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PROMPTS = [
  {
    id: "vc_01_project_blueprint",
    title: "Project Blueprint",
    description: "First message of any session — sets full context so AI never misunderstands your project scope.",
    prompt: `You are a senior full-stack developer. I am building [PROJECT NAME].

Core goal: [1 sentence description]
Target user: [who uses this]
Tech stack: Next.js 14, Supabase, Stripe, Tailwind CSS, TypeScript
Deployment: Vercel + Supabase

Do NOT start coding yet. Confirm you understand the full scope and ask me any critical clarifying questions before we begin.`,
    subcategory: "SaaS Building",
    tags: ["foundation", "planning", "scope"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_02_feature_scope_lock",
    title: "Feature Scope Lock",
    description: "Locks MVP before a single line of code is written — prevents scope creep that kills indie projects.",
    prompt: `Based on this project: [PROJECT NAME]

List the EXACT MVP features needed — nothing more.
Format:
- Must have (blocks launch)
- Should have (adds value)
- Do NOT build (scope creep)

Be ruthless. I want to ship in [X weeks]. Prioritize speed over perfection.`,
    subcategory: "SaaS Building",
    tags: ["mvp", "scope", "planning"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_03_folder_architecture",
    title: "File & Folder Architecture",
    description: "Generate a complete folder structure before writing any code — saves massive refactoring later.",
    prompt: `Generate the complete folder structure for [PROJECT NAME] using:
- Next.js 14 App Router
- Supabase for DB + auth
- Stripe for payments
- Tailwind + shadcn/ui

Include:
/app routes, /components, /lib, /hooks, /types, /utils
Show full tree. Add a 1-line comment on each folder's purpose.
Do not write code yet — structure only.`,
    subcategory: "Architecture",
    tags: ["architecture", "structure", "next.js"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_04_database_schema",
    title: "Database Schema Design",
    description: "Design your full Supabase schema with RLS policies before touching the UI — schema is your source of truth.",
    prompt: `Design the full Supabase database schema for [PROJECT NAME].

For each table provide:
- Table name + purpose
- All columns (name, type, nullable, default)
- Foreign key relationships
- RLS policies (who can read/write)

Output as SQL CREATE TABLE statements ready to run in Supabase SQL editor.
Include indexes for commonly queried fields.`,
    subcategory: "Database",
    tags: ["supabase", "database", "schema", "sql"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_05_auth_flow_setup",
    title: "Auth Flow Setup",
    description: "Build complete Supabase authentication first — every other feature depends on user identity.",
    prompt: `Set up complete authentication for [PROJECT NAME] using Supabase Auth.

Requirements:
- Email + password signup/login
- Google OAuth
- Protected routes middleware (Next.js 14 App Router)
- Session persistence
- Redirect logic: unauthenticated → /login, authenticated → /dashboard

Output: full working code for:
1. /app/auth/login/page.tsx
2. /app/auth/callback/route.ts
3. middleware.ts
4. /lib/supabase/server.ts + client.ts`,
    subcategory: "Auth",
    tags: ["auth", "supabase", "next.js", "middleware"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_06_component_system",
    title: "Component System Builder",
    description: "Build your full base component library before any pages — components first, pages second.",
    prompt: `Build the base component library for [PROJECT NAME] using shadcn/ui + Tailwind.

Create these reusable components:
- Button (primary, secondary, destructive, ghost variants)
- Input + FormField with error state
- Card container
- PageHeader with title + subtitle
- LoadingSpinner + Skeleton loaders
- Toast notifications setup (sonner)

Each component: TypeScript, clean props interface, dark mode ready.
Output each component as a complete file.`,
    subcategory: "UI Components",
    tags: ["ui", "components", "shadcn", "tailwind"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_07_api_integration",
    title: "API & Service Integration Layer",
    description: "Wire up all external services as isolated modules — keeps your codebase clean and swappable.",
    prompt: `Create the API integration layer for [PROJECT NAME].

Integrations needed:
- [e.g. Anthropic Claude API for X]
- [e.g. Stripe for subscriptions]
- [e.g. Resend for email]

For each integration:
1. Create /lib/[service].ts with typed helper functions
2. Create /app/api/[service]/route.ts for server-side calls
3. Add proper error handling + rate limiting
4. Never expose API keys client-side

Output complete, production-ready files.`,
    subcategory: "Integrations",
    tags: ["api", "stripe", "integrations", "typescript"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_08_error_handling",
    title: "Error Handling Layer",
    description: "Add a bulletproof error handling system before any user testing — prevents naked crashes going live.",
    prompt: `Add a complete error handling system to [PROJECT NAME].

Implement:
1. Global error boundary (error.tsx + global-error.tsx)
2. Loading states (loading.tsx) for all main routes
3. Not found page (not-found.tsx)
4. API route error response helper (consistent JSON format)
5. Client-side toast error feedback using sonner

All errors must:
- Show user-friendly messages (never raw errors)
- Log details server-side only
- Degrade gracefully

Output complete files for each.`,
    subcategory: "Error Handling",
    tags: ["errors", "ux", "reliability", "next.js"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_09_env_deploy_config",
    title: "Environment & Deploy Config",
    description: "Lock all env vars and deployment pipeline before going live — the step most vibe coders skip.",
    prompt: `Set up production deployment config for [PROJECT NAME].

Output:
1. .env.example with ALL required variables + descriptions
2. .env.local template (never committed)
3. vercel.json with any required config
4. Environment variable checklist for Vercel dashboard
5. Supabase production checklist (RLS on, API keys rotated, custom domain)
6. Pre-launch checklist: auth, payments, emails, error logging

Flag any security risks I might have missed.`,
    subcategory: "Deployment",
    tags: ["deploy", "vercel", "env", "production"],
    model: "ChatGPT / Claude",
  },
  {
    id: "vc_10_audit_harden",
    title: "Pre-Launch Security Audit",
    description: "Full pre-flight audit before launch — covers security, performance, UX gaps, and Supabase RLS.",
    prompt: `Do a full pre-launch audit of [PROJECT NAME].

Review this codebase for:
1. Security: exposed keys, missing auth checks, SQL injection, XSS
2. Performance: unnecessary re-renders, missing loading states, large bundles
3. UX: empty states, edge cases, mobile responsiveness gaps
4. Supabase: RLS policies on all tables, no public data leaks
5. Stripe: webhook signature verification, idempotency keys

For each issue found:
- Severity: Critical / Medium / Low
- Location in codebase
- Exact fix

Output as a prioritized action list.`,
    subcategory: "Security",
    tags: ["security", "audit", "launch", "supabase"],
    model: "ChatGPT / Claude",
  },
];

async function main() {
  console.log("🚀 Adding Vibe Coding prompts to Supabase...\n");

  const rows = PROMPTS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    prompt: p.prompt,
    category_id: "vibecoding",
    subcategory: p.subcategory,
    tags: p.tags,
    model: p.model,
    source: "curated",
  }));

  const { data, error } = await supabase
    .from("prompts")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }

  console.log(`✅ Inserted/updated ${rows.length} Vibe Coding prompts`);

  // Verify
  const { count } = await supabase
    .from("prompts")
    .select("*", { count: "exact", head: true })
    .eq("category_id", "vibecoding");
  console.log(`   vibecoding category now has ${count} prompts total`);
}

main().catch(console.error);
