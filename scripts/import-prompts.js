#!/usr/bin/env node
/**
 * PromptVault — Prompt Import Script
 * Reads all JSON files from prompt_vault_jsons/, enhances every prompt,
 * maps to PromptVault category IDs, and inserts into Supabase in batches.
 *
 * Run: node scripts/import-prompts.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://csxizhclipcwpkqrjdto.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGl6aGNsaXBjd3BrcXJqZHRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE1Njk1OSwiZXhwIjoyMDkwNzMyOTU5fQ.G5G21gBnCGg2ZKMTogtIm1DYM6bxdD-r_99dTwfbssA";

const JSON_DIR = path.join(
  "/Users/mohammedbarbar/Downloads/prompt_vault_jsons"
);
const BATCH_SIZE = 500;
const MIN_WORD_COUNT = 3; // only skip truly garbage entries (1-2 word labels)

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Category mapping ──────────────────────────────────────────────────────────
// Maps source file slug + subcategory keywords → PromptVault category_id
const CATEGORY_MAP = [
  // file-level mappings first (catches everything in that file)
  { file: "marketing",         sub: null,                    cat: "marketing"    },
  { file: "sales_outreach",    sub: null,                    cat: "sales"        },
  { file: "social_media",      sub: "YouTube",               cat: "youtube"      },
  { file: "social_media",      sub: "TikTok",                cat: "content"      },
  { file: "social_media",      sub: "Stories",               cat: "content"      },
  { file: "social_media",      sub: "Pinterest",             cat: "content"      },
  { file: "social_media",      sub: "UGC",                   cat: "content"      },
  { file: "social_media",      sub: null,                    cat: "social"       },
  { file: "business",          sub: "SaaS",                  cat: "vibecoding"   },
  { file: "business",          sub: "Agency",                cat: "business"     },
  { file: "business",          sub: null,                    cat: "business"     },
  { file: "seo",               sub: null,                    cat: "seo"          },
  { file: "copywriting",       sub: null,                    cat: "writing"      },
  { file: "e-commerce",        sub: null,                    cat: "ecommerce"    },
  { file: "finance_investing",  sub: null,                    cat: "finance"      },
  { file: "career_personal_dev",sub: "Resume",               cat: "resume"       },
  { file: "career_personal_dev",sub: "Career",               cat: "interview"    },
  { file: "career_personal_dev",sub: null,                   cat: "interview"    },
  { file: "lifestyle",         sub: "Airbnb",                cat: "realestate"   },
  { file: "lifestyle",         sub: null,                    cat: "writing"      },
  { file: "ai_automation",     sub: "Prompt Engineering",    cat: "aiworkflows"  },
  { file: "ai_automation",     sub: "AI Chatbots",           cat: "aiworkflows"  },
  { file: "ai_automation",     sub: "Act-As",                cat: "aiworkflows"  },
  { file: "ai_automation",     sub: null,                    cat: "aiworkflows"  },
  { file: "productivity",      sub: "Google Sheets",         cat: "it"           },
  { file: "productivity",      sub: "Microsoft Excel",       cat: "it"           },
  { file: "productivity",      sub: null,                    cat: "aiworkflows"  },
  { file: "technology",        sub: "No-Code",               cat: "vibecoding"   },
  { file: "technology",        sub: null,                    cat: "it"           },
  { file: "health_wellness",   sub: null,                    cat: "writing"      },
  { file: "monetization",      sub: null,                    cat: "business"     },
  { file: "creative_roleplay", sub: null,                    cat: "writing"      },
  { file: "education",         sub: null,                    cat: "students"     },
  { file: "best_of",           sub: null,                    cat: "marketing"    },
];

function getCategoryId(fileSlug, subcategory) {
  // Try specific subcategory match first
  for (const rule of CATEGORY_MAP) {
    if (rule.file === fileSlug && rule.sub && subcategory && subcategory.includes(rule.sub)) {
      return rule.cat;
    }
  }
  // Fall back to file-level match
  for (const rule of CATEGORY_MAP) {
    if (rule.file === fileSlug && !rule.sub) return rule.cat;
  }
  return "writing"; // default
}

// ── Text helpers ──────────────────────────────────────────────────────────────
function generateTitle(promptText, subcategory) {
  // Take the first sentence or up to 8 words, clean it up
  const clean = promptText
    .replace(/\[.*?\]/g, "")       // remove placeholders
    .replace(/\n/g, " ")
    .trim();

  // Remove leading verbs like "Write", "Create", "Draft" to make a noun title
  const words = clean.split(" ").filter(Boolean);
  const title = words.slice(0, 8).join(" ").replace(/[,.:;]$/, "");

  // If subcategory gives us context, prepend it
  if (subcategory && title.length < 20) {
    return `${subcategory}: ${title}`;
  }
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function generateDescription(promptText, subcategory) {
  const clean = promptText.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  // First 120 chars of the prompt make a decent description
  const snippet = clean.length > 120 ? clean.slice(0, 117) + "…" : clean;
  return snippet.charAt(0).toUpperCase() + snippet.slice(1);
}

// Role by category — used when expanding short prompts
const CAT_ROLES = {
  marketing:    "an expert digital marketer with 10+ years of experience across paid, organic, and email channels",
  sales:        "a senior B2B sales strategist who has closed $10M+ in deals and trained hundreds of reps",
  seo:          "an SEO specialist who has ranked hundreds of pages on page 1 of Google",
  social:       "a social media strategist who has grown brand accounts to 100k+ followers",
  branding:     "a brand strategist with experience building identities for startups and Fortune 500 companies",
  ecommerce:    "a conversion-focused ecommerce consultant who has scaled DTC brands to 7 figures",
  business:     "a business strategist and startup advisor who has helped 200+ founders launch and scale",
  hr:           "a senior HR professional and talent acquisition specialist",
  legal:        "a legal writing assistant (remind the user to consult a licensed attorney for actual legal advice)",
  accounting:   "a CPA and financial analyst with expertise in business accounting and reporting",
  it:           "a senior IT architect and technology consultant",
  vibecoding:   "a technical co-founder who specializes in helping non-technical founders build SaaS with AI coding tools",
  finance:      "a certified financial planner with expertise in personal finance, investing, and business finance",
  projectmgmt:  "a PMP-certified project manager who has delivered 50+ complex projects on time and under budget",
  realestate:   "a real estate professional with deep expertise in listings, deals, and market analysis",
  findinghome:  "a buyer's agent and real estate advisor who helps buyers navigate the market",
  writing:      "a professional writer and editor with expertise in long-form content, copywriting, and storytelling",
  imagegen:     "an AI image prompt engineer who creates production-ready prompts for Midjourney, DALL-E, and Flux",
  youtube:      "a YouTube strategist who has helped channels grow from 0 to 100k+ subscribers",
  content:      "a content strategist and creator who batches and repurposes content across platforms",
  coding:       "a senior software engineer with 12+ years of experience across multiple languages and frameworks",
  students:     "an academic coach and expert educator who helps students achieve top grades",
  aiworkflows:  "an AI automation architect who designs production workflows using Make, n8n, and Claude",
  resume:       "a professional resume writer and career coach with a track record of placing candidates at top companies",
  interview:    "an executive interview coach who has prepped candidates for roles at Google, McKinsey, and Goldman Sachs",
};

// Output format instructions by subcategory keyword
function getOutputInstructions(subcategory, topic) {
  const sub = (subcategory || "").toLowerCase();
  const t = topic.toLowerCase();

  if (sub.includes("email") || t.includes("email")) {
    return `Provide:\n1. A complete, copy-paste ready template\n2. Subject line options (3 variants)\n3. Key personalization tips\n4. What to avoid`;
  }
  if (sub.includes("ad") || t.includes("ad copy") || t.includes("facebook") || t.includes("google ad")) {
    return `Provide:\n1. 3 ad copy variants (short, medium, long)\n2. Headline options\n3. CTA recommendations\n4. Targeting notes`;
  }
  if (sub.includes("script") || t.includes("script") || t.includes("video")) {
    return `Provide:\n1. Full script with hook, body, and CTA\n2. Speaking notes\n3. B-roll suggestions`;
  }
  if (sub.includes("strategy") || t.includes("strategy") || t.includes("plan")) {
    return `Provide:\n1. Step-by-step action plan\n2. Key metrics to track\n3. Common mistakes to avoid\n4. Quick wins to implement first`;
  }
  if (t.includes("how to") || t.startsWith("how ")) {
    return `Provide:\n1. Step-by-step breakdown (numbered)\n2. Specific tools or resources needed\n3. Real example or case study\n4. Common mistakes and how to avoid them`;
  }
  if (sub.includes("outreach") || t.includes("outreach") || t.includes("dm") || t.includes("message")) {
    return `Provide:\n1. A complete message template (copy-paste ready)\n2. 2 alternative opening lines\n3. Follow-up message\n4. What to personalize`;
  }
  // Default: structured, actionable output
  return `Provide a detailed, actionable response with:\n1. Clear explanation\n2. Specific examples\n3. Step-by-step implementation\n4. Key tips and what to avoid`;
}

function expandShortPrompt(promptText, categoryId, subcategory) {
  const topic = promptText
    .replace(/^\d+\.\s*/, "")   // remove leading "1. 2. 3." numbering
    .replace(/\bChatGPT\b/gi, "AI") // normalize tool references
    .trim();

  const role = CAT_ROLES[categoryId] || "an expert professional";
  const outputInstructions = getOutputInstructions(subcategory, topic);

  // If it's a "how to" question, structure it as a guide request
  const isHowTo = /^how (to|can|do|should)/i.test(topic);
  const isQuestion = /\?$/.test(topic) || /^(what|why|how|when|where|which|can|should|is|are)/i.test(topic);

  let intro;
  if (isHowTo || isQuestion) {
    intro = `Act as ${role}.\n\nAnswer this question comprehensively and practically: "${topic.replace(/\.$/, "")}?"`;
  } else {
    intro = `Act as ${role}.\n\nHelp me with the following: ${topic.charAt(0).toUpperCase() + topic.slice(1).replace(/\.$/, "")}.`;
  }

  return `${intro}

Context:
- Industry/niche: [YOUR_INDUSTRY]
- Target audience: [YOUR_TARGET_AUDIENCE]
- Current situation: [DESCRIBE_YOUR_SITUATION]

${outputInstructions}

Keep your response specific, actionable, and immediately usable. No fluff.`;
}

function enhancePrompt(promptText, hasPlaceholder, placeholders, categoryId, subcategory) {
  let text = promptText.trim();

  // Strip leading list numbers like "1." "2." that got saved as standalone entries
  text = text.replace(/^\d+\.\s+/, "");

  const wordCount = text.split(/\s+/).length;

  // Standardize placeholder format to [ALL CAPS]
  if (hasPlaceholder && placeholders && placeholders.length > 0) {
    for (const ph of placeholders) {
      const escaped = ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      try {
        const regex = new RegExp(`\\[${escaped}\\]`, "gi");
        text = text.replace(regex, `[${ph.toUpperCase().replace(/\s+/g, "_")}]`);
      } catch (_) {
        text = text.split(`[${ph}]`).join(`[${ph.toUpperCase().replace(/\s+/g, "_")}]`);
      }
    }
  }

  // SHORT PROMPTS: expand into full, structured prompts
  if (wordCount < 15) {
    return expandShortPrompt(text, categoryId, subcategory);
  }

  // MEDIUM PROMPTS (15-25 words): add role + output structure if missing
  if (wordCount < 25 && !text.toLowerCase().startsWith("act as") && !text.toLowerCase().startsWith("you are")) {
    const role = CAT_ROLES[categoryId] || "an expert professional";
    text = `Act as ${role}.\n\n${text.charAt(0).toUpperCase() + text.slice(1)}`;
    if (!/[.?!]$/.test(text)) text += ".";
    text += `\n\nBe specific and actionable. Include examples and step-by-step guidance where relevant.`;
    return text;
  }

  // LONGER PROMPTS: just clean up and add role if missing
  if (!text.toLowerCase().startsWith("act as") && !text.toLowerCase().startsWith("you are") && wordCount < 40) {
    const role = CAT_ROLES[categoryId] || "an expert professional";
    text = `Act as ${role}.\n\n${text.charAt(0).toUpperCase() + text.slice(1)}`;
  }

  if (!/[.?!]$/.test(text)) text += ".";

  return text;
}

function buildTags(rawTags, subcategory, categoryId) {
  const tags = new Set();
  if (rawTags) rawTags.forEach((t) => tags.add(t.toLowerCase().replace(/\s+/g, "-")));
  if (subcategory) tags.add(subcategory.toLowerCase().replace(/\s+/g, "-"));
  if (categoryId) tags.add(categoryId);
  return [...tags].slice(0, 6);
}

// ── Deduplication ─────────────────────────────────────────────────────────────
const seenFingerprints = new Set();
function isDuplicate(promptText) {
  const fingerprint = promptText.slice(0, 80).toLowerCase().replace(/\s+/g, " ").trim();
  if (seenFingerprints.has(fingerprint)) return true;
  seenFingerprints.add(fingerprint);
  return false;
}

// ── Curated workflow prompts ──────────────────────────────────────────────────
// Hand-crafted, step-by-step, results-driven prompts for each category
const CURATED_PROMPTS = [
  // ── RESUME ─────────────────────────────────────────────────────────────────
  {
    id: "cur_r1", category_id: "resume",
    title: "ATS-Optimized Resume Bullet Writer",
    description: "Transform your job duties into measurable, keyword-rich bullets that pass ATS filters",
    prompt: `Act as a senior resume writer and ATS optimization specialist with 15+ years of experience placing candidates at Fortune 500 companies.

I'll give you my job title, the role I'm applying for, and my responsibilities. Rewrite my experience as 6–8 impactful bullet points that:
- Start with strong action verbs (Engineered, Spearheaded, Drove, Orchestrated)
- Include quantified outcomes (use [X%], [$X], or [X people] placeholders where I haven't provided numbers)
- Mirror exact keywords from the job description
- Pass ATS keyword filtering

My current title: [CURRENT_TITLE]
Role I'm applying for: [TARGET_ROLE]
Company: [TARGET_COMPANY]
My responsibilities: [LIST_YOUR_TASKS]
Key JD keywords: [PASTE_KEYWORDS_FROM_JD]

For each bullet, also tell me which ATS keyword it targets.`,
    tags: ["resume", "ats", "bullets", "job-search"],
  },
  {
    id: "cur_r2", category_id: "resume",
    title: "Executive Summary Generator",
    description: "Write a 3-sentence professional summary that makes hiring managers stop scrolling",
    prompt: `Act as an executive resume coach who has written summaries for C-suite leaders and senior professionals.

Write a professional summary for my resume in exactly 3 sentences:
- Sentence 1: Who I am + years of experience + field + top credential
- Sentence 2: My 2 biggest quantified achievements
- Sentence 3: What I bring to my next employer + career goal

Rules: under 70 words total, active voice, zero clichés (no "results-driven", "passionate", "dynamic"), no personal pronouns.

My details:
- Name: [NAME]
- Field: [FIELD]
- Years of experience: [YEARS]
- Top achievement #1: [ACHIEVEMENT_1]
- Top achievement #2: [ACHIEVEMENT_2]
- Target role: [TARGET_ROLE]
- Career goal: [GOAL]`,
    tags: ["resume", "summary", "executive"],
  },
  {
    id: "cur_r3", category_id: "resume",
    title: "Full Resume Rewrite from Scratch",
    description: "Complete resume rewrite tailored to a specific job description",
    prompt: `Act as a professional resume writer and career strategist. Rewrite my full resume optimized for the specific role below.

Output format:
1. Contact header
2. Professional summary (3 sentences)
3. Core competencies (10–12 keywords in 2-column grid)
4. Work experience (each role: title, company, dates, 5–7 ATS bullets)
5. Education
6. Certifications (if any)

Rules:
- Mirror the exact language from the JD
- Every bullet starts with a past-tense action verb
- Quantify every achievement possible
- Flag 3 places where I should add numbers later

My current resume: [PASTE_RESUME]
Target job description: [PASTE_JD]`,
    tags: ["resume", "full-rewrite", "job-search"],
  },

  // ── INTERVIEW ───────────────────────────────────────────────────────────────
  {
    id: "cur_i1", category_id: "interview",
    title: "STAR Method Answer Builder",
    description: "Build a perfect STAR answer for any behavioral interview question",
    prompt: `Act as an interview coach who has prepped hundreds of candidates for senior roles at Google, McKinsey, and Goldman Sachs.

Build a complete STAR-method answer for this behavioral question. Make it specific, confident, and 90–120 seconds when spoken aloud.

Structure:
- Situation (2 sentences — set the scene, stakes)
- Task (1 sentence — your specific responsibility)
- Action (3–4 sentences — what YOU specifically did, not the team)
- Result (2 sentences — quantified outcome + what it taught you)

Interview question: [QUESTION]
My role at the time: [YOUR_ROLE]
Situation I want to use: [DESCRIBE_THE_SITUATION]
Result/outcome: [WHAT_HAPPENED]

Also give me: 1 follow-up question the interviewer might ask, and my ideal answer.`,
    tags: ["interview", "star", "behavioral"],
  },
  {
    id: "cur_i2", category_id: "interview",
    title: "Mock Interview Full Session",
    description: "Run a complete mock interview with real-time feedback on your answers",
    prompt: `Act as a senior hiring manager at [COMPANY] interviewing for the [ROLE] position.

Run a full 45-minute mock interview with me.

Process:
1. Ask me 8 questions — mix of: 2 culture-fit, 2 technical/skills, 2 behavioral, 1 situational, 1 "why us"
2. After each of my answers, give me: a score 1–10, what worked, what to cut, and a stronger version of my answer
3. At the end, give me an overall assessment and the top 3 things to fix before the real interview

Start with: "Tell me about yourself" — and wait for my response before continuing.

Role: [TARGET_ROLE]
Company: [TARGET_COMPANY]
My background: [2-3_SENTENCE_SUMMARY]`,
    tags: ["interview", "mock", "practice"],
  },

  // ── MARKETING ───────────────────────────────────────────────────────────────
  {
    id: "cur_m1", category_id: "marketing",
    title: "Full Email Campaign Sequence (5 Emails)",
    description: "Write a complete 5-email nurture sequence that converts cold leads to buyers",
    prompt: `Act as a direct-response email copywriter who has written campaigns generating over $10M in revenue.

Write a 5-email marketing sequence to nurture leads from awareness to purchase. Each email must have:
- Subject line (and 1 A/B test variant)
- Preview text (50 chars max)
- Opening hook (first line they see in inbox)
- Body (conversational, no fluff)
- Single clear CTA
- P.S. line

Email sequence structure:
1. Welcome / value delivery (Day 0)
2. Problem agitation / story (Day 2)
3. Social proof / case study (Day 4)
4. Objection handling / FAQ (Day 6)
5. Urgency / last chance offer (Day 8)

Product/service: [PRODUCT_OR_SERVICE]
Target customer: [IDEAL_CUSTOMER]
Main pain point: [PAIN_POINT]
Key benefit: [CORE_BENEFIT]
Offer/CTA: [WHAT_YOU_WANT_THEM_TO_DO]
Brand voice: [PROFESSIONAL / CASUAL / BOLD]`,
    tags: ["marketing", "email", "sequence", "copywriting"],
  },
  {
    id: "cur_m2", category_id: "marketing",
    title: "High-Converting Facebook Ad (3 Variants)",
    description: "Write 3 tested Facebook ad copy variants with hooks, body, and CTAs",
    prompt: `Act as a performance marketing expert who manages $1M+ monthly ad spend on Meta.

Write 3 Facebook ad copy variants for split testing. Each variant uses a different hook strategy:
- Variant A: Pain-point hook ("Tired of [PROBLEM]?")
- Variant B: Social proof hook ("X people already [RESULT]")
- Variant C: Curiosity/contrarian hook (surprising or counterintuitive opening)

For each variant provide:
- Primary text (125 words max)
- Headline (40 chars max)
- Description (25 chars max)
- CTA button recommendation
- Target audience notes

Product/Service: [PRODUCT]
Core offer: [OFFER]
Target audience: [AUDIENCE]
Main benefit: [BENEFIT]
Desired action: [CTA_ACTION]
Budget level: [AWARENESS / CONVERSION / RETARGETING]`,
    tags: ["marketing", "facebook-ads", "paid-ads", "copywriting"],
  },
  {
    id: "cur_m3", category_id: "marketing",
    title: "Content Marketing Strategy (90 Days)",
    description: "Build a complete 90-day content marketing plan with channels, topics, and KPIs",
    prompt: `Act as a content marketing director who has scaled brands from 0 to 100k monthly readers.

Build a 90-day content marketing strategy with this structure:

1. AUDIENCE ANALYSIS
   - Primary persona (role, pain points, content they consume)
   - Secondary persona
   - Where they spend time online

2. CONTENT PILLARS (3–4 themes that align to our product)

3. 90-DAY CONTENT CALENDAR OVERVIEW
   - Month 1: Authority-building (what to publish, frequency, channels)
   - Month 2: Engagement & SEO (topic clusters, internal linking strategy)
   - Month 3: Conversion content (case studies, comparison posts, bottom-funnel)

4. CHANNEL STRATEGY (priority order with rationale)

5. KPIs & MEASUREMENT (what to track weekly, monthly)

6. FIRST 10 CONTENT TITLES (ready to assign to writers)

Business: [BUSINESS_DESCRIPTION]
Product/Service: [PRODUCT]
Target audience: [AUDIENCE]
Current content output: [CURRENT_STATE]
Main goal: [TRAFFIC / LEADS / BRAND_AWARENESS]`,
    tags: ["marketing", "content-strategy", "planning"],
  },

  // ── SALES ───────────────────────────────────────────────────────────────────
  {
    id: "cur_s1", category_id: "sales",
    title: "Cold Email Sequence (3-Touch)",
    description: "Write a 3-touch cold email sequence that gets replies from busy decision-makers",
    prompt: `Act as a B2B sales expert with a proven track record of booking meetings with C-suite executives at enterprise companies.

Write a 3-email cold outreach sequence. Rules:
- Email 1: Ultra-short (under 75 words), pattern-interrupt subject line, specific reason for reaching out, soft CTA
- Email 2 (Day 3): Value-add follow-up, share a relevant insight/stat, ask a different question
- Email 3 (Day 7): Final bump, add social proof, create light urgency, make it easy to say yes or no

For each email: subject line + body + P.S.

My company: [MY_COMPANY]
My role: [MY_ROLE]
Prospect title: [PROSPECT_TITLE]
Prospect company type: [COMPANY_TYPE]
What I'm offering: [VALUE_PROPOSITION]
Specific pain I solve: [PAIN_POINT]
Proof/result: [CASE_STUDY_OR_STAT]`,
    tags: ["sales", "cold-email", "outreach", "b2b"],
  },
  {
    id: "cur_s2", category_id: "sales",
    title: "Objection Handler (10 Common Objections)",
    description: "Scripts to handle the 10 most common sales objections without being pushy",
    prompt: `Act as a veteran sales trainer who has coached 500+ reps to consistently hit quota.

Write confident, non-pushy scripts for these 10 objections. For each: the objection, the psychology behind it, and a 2–3 sentence response that acknowledges → reframes → advances.

Objections to handle:
1. "It's too expensive"
2. "We don't have budget right now"
3. "I need to think about it"
4. "We're happy with our current solution"
5. "Send me more information"
6. "I need to talk to my boss/team"
7. "Now isn't a good time"
8. "We've tried something like this before and it didn't work"
9. "I don't see the ROI"
10. [CUSTOM_OBJECTION]

My product/service: [PRODUCT]
Price point: [PRICE]
Core value prop: [VALUE_PROP]
Ideal customer: [CUSTOMER]`,
    tags: ["sales", "objection-handling", "scripts"],
  },

  // ── SEO ─────────────────────────────────────────────────────────────────────
  {
    id: "cur_seo1", category_id: "seo",
    title: "Complete SEO Article Brief",
    description: "Generate a full SEO content brief a writer can use to produce a ranking article",
    prompt: `Act as an SEO content strategist who has ranked hundreds of articles on page 1 of Google.

Create a complete SEO content brief for a writer. Include:

1. KEYWORD INTEL
   - Primary keyword + monthly search volume estimate
   - 8–10 LSI/semantic keywords to naturally include
   - Search intent (informational / transactional / navigational)

2. SERP ANALYSIS
   - What the top 3 ranking pages have in common
   - Content gaps I can exploit
   - Featured snippet opportunity (yes/no + format)

3. ARTICLE STRUCTURE
   - Recommended H1
   - Full H2/H3 outline with notes on what each section should cover
   - Recommended word count range

4. ON-PAGE SEO CHECKLIST
   - Title tag (60 chars)
   - Meta description (155 chars)
   - URL slug
   - Internal linking suggestions

5. CONTENT ANGLE (what makes this better than what's ranking)

Primary keyword: [KEYWORD]
My website/niche: [WEBSITE_NICHE]
Target audience: [AUDIENCE]
My angle/USP: [WHY_MY_CONTENT_IS_DIFFERENT]`,
    tags: ["seo", "content-brief", "ranking", "keyword"],
  },

  // ── SOCIAL MEDIA ────────────────────────────────────────────────────────────
  {
    id: "cur_sm1", category_id: "social",
    title: "30-Day Social Media Content Calendar",
    description: "Build a full month of social content across all platforms in one prompt",
    prompt: `Act as a social media strategist who has grown brand accounts to 100k+ followers.

Create a 30-day content calendar for [PLATFORM]. Include:

WEEK-BY-WEEK THEMES (4 weeks, 1 theme per week)

For each of the 30 days:
- Content type (educational / entertaining / promotional / behind-the-scenes / UGC)
- Hook/opening line (first 2 sentences)
- Content summary (what the post covers)
- CTA
- Hashtag set (if applicable)

Posting frequency: [POSTS_PER_WEEK]
Ratio: 80% value / 20% promotional

Platform: [PLATFORM]
Brand/business: [BRAND_DESCRIPTION]
Target audience: [AUDIENCE]
Brand voice: [VOICE — e.g. bold and direct / warm and educational]
3 content pillars: [PILLAR_1] / [PILLAR_2] / [PILLAR_3]`,
    tags: ["social-media", "content-calendar", "planning"],
  },

  // ── BRANDING ────────────────────────────────────────────────────────────────
  {
    id: "cur_br1", category_id: "branding",
    title: "Complete Brand Identity Builder",
    description: "Define your brand voice, positioning, messaging, and visual direction in one session",
    prompt: `Act as a brand strategist who has built identities for both startups and Fortune 500 companies.

Build a complete brand identity document with these sections:

1. BRAND POSITIONING
   - One-sentence positioning statement (for internal use)
   - One-sentence tagline (for external use)
   - Category you're competing in + how you're different

2. BRAND PERSONALITY
   - 5 brand personality traits (with "we are X, not Y" contrasts)
   - Brand archetypes (primary + secondary)

3. BRAND VOICE GUIDE
   - Tone in 3 words
   - 5 writing rules (what to always do)
   - 5 writing rules (what to never do)
   - 3 before/after copy examples

4. CORE MESSAGING
   - Value proposition (one paragraph)
   - 3 key messages with supporting proof points

5. VISUAL DIRECTION
   - Color palette mood + 3 suggested HEX directions
   - Typography style (serif/sans, modern/classic, etc.)
   - Imagery style notes

Business: [BUSINESS_NAME]
What you do: [DESCRIPTION]
Target customer: [IDEAL_CUSTOMER]
Competitors: [3_COMPETITORS]
What makes you different: [DIFFERENTIATOR]`,
    tags: ["branding", "identity", "positioning", "voice"],
  },

  // ── ECOMMERCE ───────────────────────────────────────────────────────────────
  {
    id: "cur_ec1", category_id: "ecommerce",
    title: "High-Converting Product Description",
    description: "Write product descriptions that sell — not just describe features",
    prompt: `Act as a conversion copywriter specialized in ecommerce with experience at Shopify and DTC brands.

Write a product description that converts browsers into buyers. Structure:

1. HEADLINE (benefit-driven, not feature-driven, under 10 words)
2. OPENING HOOK (2 sentences — paint the problem or desire)
3. PRODUCT STORY (3–4 sentences — what it is, how it works, why it's different)
4. FEATURE → BENEFIT LIST (5 bullets: feature: what it means for the customer)
5. SOCIAL PROOF PULL-QUOTE (write a believable customer quote I can use as a placeholder)
6. CTA + URGENCY (1 sentence)

Also write: page title tag (60 chars) + meta description (155 chars) for SEO.

Product name: [PRODUCT_NAME]
Product category: [CATEGORY]
Key features: [LIST_FEATURES]
Price: [PRICE]
Target customer: [WHO_BUYS_THIS]
Main competitor: [COMPETITOR]
What makes it better: [DIFFERENTIATOR]`,
    tags: ["ecommerce", "product-description", "copywriting", "shopify"],
  },

  // ── BUSINESS ────────────────────────────────────────────────────────────────
  {
    id: "cur_biz1", category_id: "business",
    title: "One-Page Business Plan",
    description: "Create a crisp one-page business plan that covers the essentials investors and banks need",
    prompt: `Act as a business advisor and startup strategist who has helped 200+ founders launch and scale.

Create a one-page business plan with these sections (keep each concise and specific):

1. BUSINESS OVERVIEW (3 sentences — what it is, who it's for, how it makes money)
2. PROBLEM & SOLUTION (the pain + your fix)
3. TARGET MARKET (size, demographics, psychographics)
4. BUSINESS MODEL (how you make money — pricing, revenue streams)
5. COMPETITIVE ADVANTAGE (why you'll win)
6. GO-TO-MARKET STRATEGY (first 90 days to first customer)
7. KEY METRICS (3–5 KPIs you'll track)
8. FINANCIAL SNAPSHOT (Year 1 projections: revenue, costs, breakeven point)
9. TEAM (who's involved and why they can execute)
10. ASK / NEXT STEP (what you need to move forward)

Business idea: [DESCRIBE_YOUR_BUSINESS]
Stage: [IDEA / PRE-REVENUE / EARLY_REVENUE]
Industry: [INDUSTRY]
Target customer: [CUSTOMER]`,
    tags: ["business", "business-plan", "startup", "strategy"],
  },

  // ── HR ──────────────────────────────────────────────────────────────────────
  {
    id: "cur_hr1", category_id: "hr",
    title: "Job Description Writer",
    description: "Write job descriptions that attract top candidates and filter out bad fits",
    prompt: `Act as a talent acquisition specialist with expertise in writing JDs that attract A-players and reduce unqualified applicants by 60%.

Write a complete job description with:

1. JOB TITLE + SENIORITY LEVEL
2. COMPANY SNAPSHOT (3 sentences — culture, mission, why people love working here)
3. ROLE OVERVIEW (what this person will own and why it matters)
4. KEY RESPONSIBILITIES (6–8 bullets, outcome-focused not task-focused)
5. MUST-HAVE REQUIREMENTS (5–6 non-negotiables)
6. NICE-TO-HAVE (3–4 differentiators)
7. WHAT SUCCESS LOOKS LIKE IN 90 DAYS
8. COMPENSATION & BENEFITS
9. EQUAL OPPORTUNITY STATEMENT

Rules: No jargon. No "rockstar" or "ninja". Write to attract, not to impress.

Role: [JOB_TITLE]
Team: [TEAM_OR_DEPARTMENT]
Level: [JUNIOR / MID / SENIOR / LEAD]
Reports to: [MANAGER_TITLE]
Key outcomes needed: [WHAT_THIS_PERSON_MUST_ACHIEVE]
Compensation range: [SALARY_RANGE]`,
    tags: ["hr", "job-description", "recruiting", "hiring"],
  },

  // ── LEGAL ───────────────────────────────────────────────────────────────────
  {
    id: "cur_leg1", category_id: "legal",
    title: "Freelance Contract Essentials",
    description: "Generate the key clauses for a freelance services contract (always review with a lawyer)",
    prompt: `Act as a contract drafting assistant. Generate the essential clauses for a freelance services agreement.

⚠️ DISCLAIMER: This is a starting framework only — always have a licensed attorney review before signing.

Include these sections:
1. PARTIES (client + freelancer identification)
2. SCOPE OF WORK (deliverables, what's explicitly excluded)
3. TIMELINE & MILESTONES
4. PAYMENT TERMS (rate, invoice schedule, late payment penalty)
5. REVISION POLICY (how many rounds, what counts as a revision)
6. INTELLECTUAL PROPERTY (who owns the work, when ownership transfers)
7. CONFIDENTIALITY
8. TERMINATION CLAUSE (notice period, kill fee)
9. LIMITATION OF LIABILITY
10. DISPUTE RESOLUTION

My situation:
- Service I provide: [YOUR_SERVICE]
- Project scope: [PROJECT_DESCRIPTION]
- Payment: [RATE + SCHEDULE]
- Timeline: [START_AND_END_DATE]
- Jurisdiction: [STATE/COUNTRY]`,
    tags: ["legal", "contract", "freelance", "agreement"],
  },

  // ── CODING ──────────────────────────────────────────────────────────────────
  {
    id: "cur_cod1", category_id: "coding",
    title: "Senior Code Review",
    description: "Get a thorough code review covering bugs, security, performance, and best practices",
    prompt: `Act as a senior software engineer with 12+ years of experience doing code reviews at top tech companies.

Review my code and give me structured feedback across these dimensions:

1. BUGS & LOGIC ERRORS (anything that will break)
2. SECURITY VULNERABILITIES (XSS, injection, auth flaws, exposed secrets)
3. PERFORMANCE ISSUES (unnecessary loops, N+1 queries, memory leaks)
4. CODE QUALITY (readability, naming, complexity, DRY violations)
5. BEST PRACTICES (language/framework conventions I'm violating)
6. MISSING TESTS (what I should add test coverage for)

For each issue:
- Severity: Critical / Major / Minor
- Location (line number or function name)
- What the problem is
- Exact fix with corrected code

Language/Framework: [LANGUAGE_AND_FRAMEWORK]
Context: [WHAT_THIS_CODE_DOES]

\`\`\`
[PASTE_CODE_HERE]
\`\`\``,
    tags: ["coding", "code-review", "debugging", "best-practices"],
  },
  {
    id: "cur_cod2", category_id: "coding",
    title: "Vibe Coding Build Sequence",
    description: "Step-by-step AI coding session plan to build a full feature from idea to working code",
    prompt: `Act as a senior full-stack developer who specializes in helping non-technical founders build with AI coding tools like Cursor, Windsurf, and Claude.

Create a step-by-step build sequence for my feature. Break it into atomic prompts I can copy-paste into my AI coding tool one at a time.

For each step provide:
- Step number + title
- Exact prompt to paste into Cursor/Claude
- What to verify before moving to the next step
- Common errors that might occur + how to fix them

Also include:
- The files that will be created/modified
- Database changes needed
- Environment variables required

Feature to build: [DESCRIBE_THE_FEATURE]
Tech stack: [FRONTEND / BACKEND / DATABASE]
Existing codebase context: [BRIEF_DESCRIPTION_OF_EXISTING_CODE]
User story: As a [USER], I want to [ACTION] so that [OUTCOME].`,
    tags: ["coding", "vibe-coding", "build-sequence", "cursor"],
  },

  // ── VIBE CODING ─────────────────────────────────────────────────────────────
  {
    id: "cur_vc1", category_id: "vibecoding",
    title: "SaaS MVP Build Plan (Non-Technical)",
    description: "Get a complete build plan for your SaaS MVP using AI coding tools — no coding experience needed",
    prompt: `Act as a technical co-founder and product architect who has helped 50+ non-technical founders ship their first SaaS product using AI coding tools.

Create a complete build plan for my SaaS MVP:

1. FEATURE SCOPE (what to build in V1, what to cut for V2)
2. TECH STACK RECOMMENDATION (simple, battle-tested, explain why)
3. DATABASE SCHEMA (tables, key columns, relationships — in plain English)
4. PAGE LIST (every screen with its purpose)
5. STEP-BY-STEP BUILD ORDER (what to build first and why)
6. PROMPT SEQUENCE FOR CURSOR (first 5 prompts to get started)
7. LAUNCH CHECKLIST (what you need before going live)
8. ESTIMATED TIME (using AI coding tools, no prior experience)

My SaaS idea: [DESCRIBE_YOUR_IDEA]
Target user: [WHO_IS_IT_FOR]
Core problem it solves: [THE_PROBLEM]
How it makes money: [BUSINESS_MODEL]
Budget: [BUDGET]`,
    tags: ["vibe-coding", "saas", "mvp", "no-code", "founder"],
  },

  // ── WRITING ─────────────────────────────────────────────────────────────────
  {
    id: "cur_wr1", category_id: "writing",
    title: "Long-Form Blog Post (SEO-Optimized)",
    description: "Write a complete 2,000-word blog post optimized for search and human readers",
    prompt: `Act as an expert content writer and SEO specialist who creates articles that rank on page 1 and actually get read.

Write a complete [WORD_COUNT]-word blog post. Requirements:
- Hook opening (first paragraph must make them stay)
- Naturally include primary keyword in H1, first 100 words, and at least 3 H2s
- Use secondary keywords naturally throughout
- Short paragraphs (3 sentences max), clear H2/H3 structure
- Include: 1 stat or data point per major section, 1 real example or case study, 1 actionable takeaway per section
- Conversational but authoritative tone
- Conclusion with clear next step/CTA

Topic/Keyword: [TOPIC_OR_KEYWORD]
Target audience: [AUDIENCE]
Primary keyword: [PRIMARY_KW]
Secondary keywords: [SECONDARY_KWS]
Word count: [WORD_COUNT]
Goal of article: [INFORM / CONVERT / BUILD_AUTHORITY]
Tone: [CONVERSATIONAL / PROFESSIONAL / BOLD]`,
    tags: ["writing", "blog-post", "seo", "content"],
  },

  // ── YOUTUBE ─────────────────────────────────────────────────────────────────
  {
    id: "cur_yt1", category_id: "youtube",
    title: "YouTube Video Script (Hook to CTA)",
    description: "Write a complete YouTube script with a proven hook, structured story, and strong CTA",
    prompt: `Act as a YouTube scriptwriter who has written scripts for channels with 1M+ subscribers in the [NICHE] space.

Write a complete YouTube script for a [VIDEO_LENGTH] video.

Structure:
1. HOOK (first 30 seconds — pattern interrupt, bold claim, or open loop)
2. INTRO (who you are, what they'll get, why they should keep watching)
3. MAIN CONTENT (3–5 key sections with transitions between each)
4. MIDROLL CTA (at the natural midpoint — subscribe or click link)
5. CONCLUSION (summarize, insight or twist, tease next video)
6. END SCREEN CTA (what to watch next + subscribe prompt)

Also provide:
- 5 title options (optimized for CTR)
- Description (first 150 chars for above-fold + full description)
- 10 tags
- Thumbnail concept (what text + visual would drive clicks)

Topic: [VIDEO_TOPIC]
Target audience: [AUDIENCE]
Channel niche: [NICHE]
Video length: [LENGTH]
Main takeaway: [WHAT_VIEWERS_WILL_LEARN]`,
    tags: ["youtube", "script", "video", "content"],
  },

  // ── AI WORKFLOWS ────────────────────────────────────────────────────────────
  {
    id: "cur_ai1", category_id: "aiworkflows",
    title: "AI Agent Workflow Designer",
    description: "Design a multi-step AI automation workflow for any business process",
    prompt: `Act as an AI automation architect who builds production workflows using tools like Make, Zapier, n8n, and Claude.

Design a complete AI automation workflow for my use case:

1. WORKFLOW OVERVIEW (what gets triggered, what gets done, what's the output)
2. STEP-BY-STEP FLOW (each step with: trigger → action → condition → output)
3. TOOLS REQUIRED (specific apps and which tier/plan is needed)
4. AI PROMPTS NEEDED (write the exact prompt for each AI step in the workflow)
5. ERROR HANDLING (what breaks and what to do about it)
6. TESTING CHECKLIST (how to verify it works before going live)
7. ESTIMATED TIME SAVED (hours per week at scale)
8. COST ESTIMATE (monthly cost to run)

Process I want to automate: [DESCRIBE_THE_PROCESS]
Current manual steps: [LIST_WHAT_YOU_DO_NOW]
Tools I already use: [YOUR_TECH_STACK]
Volume: [HOW_MANY_TIMES_PER_DAY_WEEK]
Budget: [MONTHLY_BUDGET_FOR_TOOLS]`,
    tags: ["ai-workflows", "automation", "make", "zapier", "n8n"],
  },

  // ── STUDENTS ────────────────────────────────────────────────────────────────
  {
    id: "cur_st1", category_id: "students",
    title: "Essay Outline to Full Draft",
    description: "Turn any essay prompt into a structured outline then a polished first draft",
    prompt: `Act as an academic writing coach with expertise in [SUBJECT] who has helped students at top universities improve their writing by 2 full letter grades.

Take my essay prompt and produce:

STEP 1 — OUTLINE
- Thesis statement (1 sentence, arguable, specific)
- Introduction plan (hook strategy + context + thesis)
- 3–4 body paragraph outlines (topic sentence + 2–3 supporting points + evidence needed)
- Conclusion plan (restate thesis differently + broader implication)

STEP 2 — FULL DRAFT
Write the complete essay based on the outline. Requirements:
- Word count: [WORD_COUNT]
- Academic but not robotic — clear, direct sentences
- Each body paragraph: topic sentence → evidence → analysis → transition
- No padding, every sentence earns its place
- Cite sources as [SOURCE_NEEDED] where I need to add real references

Essay prompt: [PASTE_ESSAY_PROMPT]
Subject/course: [SUBJECT]
Word count: [WORD_COUNT]
My argument/position (if I have one): [YOUR_TAKE]
Key sources I'm using: [SOURCES_IF_ANY]`,
    tags: ["students", "essay", "academic-writing", "homework"],
  },

  // ── IMAGE GEN ───────────────────────────────────────────────────────────────
  {
    id: "cur_img1", category_id: "imagegen",
    title: "Midjourney Prompt Formula",
    description: "Generate production-ready Midjourney prompts using the proven structure that gets consistent results",
    prompt: `Act as a Midjourney prompt engineer who creates prompts for commercial photography, product design, and editorial illustration.

Generate 5 Midjourney prompt variations for my concept. Each prompt must follow this structure:

[SUBJECT] + [ACTION/POSE] + [ENVIRONMENT/SETTING] + [LIGHTING] + [CAMERA/LENS] + [STYLE/ARTIST REFERENCE] + [MOOD] + [TECHNICAL PARAMS]

Rules:
- Use specific, visual adjectives (not "beautiful" — use "golden-hour backlit", "rim-lit", etc.)
- Include aspect ratio --ar, quality --q 2, and stylize --s for each
- Vary the artistic style across the 5 versions
- Add a "what to tweak" note for each if I want to adjust

Also provide:
- Negative prompt (what to exclude with --no)
- The best model version to use (v6.1 / niji 6 / etc.)

My concept: [DESCRIBE_WHAT_YOU_WANT]
Purpose: [PERSONAL / COMMERCIAL / SOCIAL_MEDIA / PRODUCT]
Style preference: [PHOTOREALISTIC / ILLUSTRATION / 3D / PAINTERLY]
Color palette: [COLORS_IF_ANY]
Aspect ratio: [16:9 / 1:1 / 9:16 / etc.]`,
    tags: ["image-gen", "midjourney", "ai-art", "prompt-engineering"],
  },

  // ── FINANCE ─────────────────────────────────────────────────────────────────
  {
    id: "cur_fin1", category_id: "finance",
    title: "Personal Budget & Savings Plan",
    description: "Build a realistic monthly budget and 12-month savings plan based on your actual numbers",
    prompt: `Act as a certified financial planner who specializes in helping people take control of their finances without complicated tools.

Build a complete personal financial plan with:

1. BUDGET BREAKDOWN (using 50/30/20 as a starting framework — adjust if numbers don't fit)
   - Fixed expenses (necessities)
   - Variable expenses (wants)
   - Savings & debt repayment

2. CASH FLOW ANALYSIS
   - Monthly surplus or deficit
   - Top 3 areas to cut without killing quality of life

3. SAVINGS STRATEGY
   - Emergency fund target + monthly amount to reach it in [TIMEFRAME]
   - Priority order: emergency fund → high-interest debt → retirement → goals

4. 12-MONTH MILESTONE PLAN (what to achieve each quarter)

5. SPECIFIC ACTION ITEMS (5 things to do this week)

My situation:
- Monthly take-home income: [INCOME]
- Monthly fixed expenses: [FIXED_COSTS]
- Monthly variable spending: [VARIABLE_COSTS]
- Current savings: [SAVINGS]
- Debt (type + amount + interest rate): [DEBT]
- Financial goal: [GOAL_AND_TIMEFRAME]`,
    tags: ["finance", "budgeting", "savings", "personal-finance"],
  },

  // ── PROJECT MANAGEMENT ──────────────────────────────────────────────────────
  {
    id: "cur_pm1", category_id: "projectmgmt",
    title: "Project Kickoff Plan",
    description: "Build a complete project plan from goals to milestones to team assignments",
    prompt: `Act as a PMP-certified project manager who has delivered 50+ complex projects on time and under budget.

Create a complete project kickoff document:

1. PROJECT CHARTER
   - Project goal (SMART format)
   - Success criteria (how we know it's done and done well)
   - Scope (what's in, what's explicitly out)
   - Constraints (budget, time, resources)

2. STAKEHOLDER MAP (who's involved, their role, their interest level)

3. WORK BREAKDOWN STRUCTURE (WBS)
   - Phase 1, 2, 3 with deliverables under each

4. TIMELINE
   - Milestones with target dates
   - Critical path (what can't slip)

5. RISK REGISTER (top 5 risks + likelihood + impact + mitigation)

6. COMMUNICATION PLAN (who needs to know what, how often, in what format)

7. RACI MATRIX (Responsible / Accountable / Consulted / Informed for key tasks)

Project: [PROJECT_NAME_AND_DESCRIPTION]
Team size: [TEAM_SIZE_AND_ROLES]
Budget: [BUDGET]
Deadline: [DEADLINE]
Stakeholders: [KEY_STAKEHOLDERS]`,
    tags: ["project-management", "planning", "pmp", "kickoff"],
  },
];

// ── Main import logic ─────────────────────────────────────────────────────────
async function importFile(filePath, fileSlug) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  const prompts = data.prompts || [];

  const rows = [];
  let skippedShort = 0;
  let skippedDupe = 0;

  for (const p of prompts) {
    // Skip only truly empty/garbage entries (pure numbers, single words, empty)
    const wordCount = p.word_count || (p.prompt || "").split(/\s+/).length;
    const cleanText = (p.prompt || "").replace(/^\d+\.\s*/, "").trim();
    if (wordCount < MIN_WORD_COUNT || cleanText.length < 10) { skippedShort++; continue; }

    // Skip duplicates
    if (isDuplicate(p.prompt || "")) { skippedDupe++; continue; }

    const categoryId = getCategoryId(fileSlug, p.subcategory);
    const enhanced = enhancePrompt(p.prompt, p.has_placeholder, p.placeholders, categoryId, p.subcategory);
    const title = generateTitle(p.prompt, p.subcategory);
    const description = generateDescription(p.prompt, p.subcategory);
    const tags = buildTags(p.tags, p.subcategory, categoryId);

    rows.push({
      id: `${fileSlug}_${p.id}`,
      title,
      description,
      prompt: enhanced,
      category_id: categoryId,
      subcategory: p.subcategory || null,
      tags,
      model: "ChatGPT / Claude",
      source: "imported",
    });
  }

  console.log(`  ${fileSlug}: ${rows.length} prompts (skipped ${skippedShort} short, ${skippedDupe} dupes)`);
  return rows;
}

async function insertBatch(rows) {
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("prompts").upsert(batch, { onConflict: "id" });
    if (error) {
      console.error(`  ❌ Batch error at offset ${i}:`, error.message);
    } else {
      process.stdout.write(`  ✓ Inserted ${Math.min(i + BATCH_SIZE, rows.length)}/${rows.length}\r`);
    }
  }
  console.log();
}

async function main() {
  console.log("🚀 PromptVault Import Script\n");

  // Test connection
  const { error: testErr } = await supabase.from("prompts").select("id").limit(1);
  if (testErr) {
    console.error("❌ Cannot connect to Supabase:", testErr.message);
    console.error("Make sure the prompts table exists and service key is correct.");
    process.exit(1);
  }
  console.log("✅ Connected to Supabase\n");

  const files = fs.readdirSync(JSON_DIR).filter((f) => f.endsWith(".json") && f !== "index.json");

  let allRows = [];

  for (const file of files) {
    const fileSlug = file.replace(".json", "");
    const filePath = path.join(JSON_DIR, file);
    const rows = await importFile(filePath, fileSlug);
    allRows = allRows.concat(rows);
  }

  console.log(`\n📦 Total prompts to insert: ${allRows.length}`);
  console.log("⬆️  Inserting to Supabase...\n");

  await insertBatch(allRows);

  // Insert curated prompts
  console.log(`\n✨ Inserting ${CURATED_PROMPTS.length} curated workflow prompts...`);
  const curatedRows = CURATED_PROMPTS.map((p) => ({
    ...p,
    model: "ChatGPT / Claude",
    source: "curated",
    subcategory: null,
  }));
  const { error: curErr } = await supabase.from("prompts").upsert(curatedRows, { onConflict: "id" });
  if (curErr) console.error("❌ Curated insert error:", curErr.message);
  else console.log(`✅ Curated prompts inserted`);

  // Final count
  const { count } = await supabase.from("prompts").select("*", { count: "exact", head: true });
  console.log(`\n🎉 Done! Total prompts in database: ${count}`);

  // Per-category summary
  console.log("\n📊 Prompts per category:");
  const { data: cats } = await supabase.rpc("count_prompts_by_category").catch(() => ({ data: null }));
  if (!cats) {
    // Fallback: just show total
    console.log(`   Total: ${count}`);
  }
}

main().catch(console.error);
