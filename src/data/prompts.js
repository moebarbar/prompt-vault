export const CATEGORIES = [
  { id: "resume", label: "Resume Writing", icon: "📄", description: "Land your dream job with prompts that craft standout resumes" },
  { id: "interview", label: "Job Interview", icon: "🎯", description: "Ace interviews with prep prompts, mock Q&As, and answer frameworks" },
  { id: "marketing", label: "Marketing", icon: "📣", description: "Write campaigns, copy, and strategies that convert" },
  { id: "sales", label: "Sales", icon: "💼", description: "Close more deals with pitches, objection handlers, and outreach" },
  { id: "seo", label: "SEO", icon: "🔍", description: "Rank higher with content, meta, and keyword prompts" },
  { id: "social", label: "Social Media", icon: "📱", description: "Grow your audience with scroll-stopping content prompts" },
  { id: "branding", label: "Branding", icon: "🏷️", description: "Build a memorable brand identity with strategic prompts" },
  { id: "ecommerce", label: "Ecommerce", icon: "🛒", description: "Product descriptions, ads, and store copy that sells" },
  { id: "business", label: "Business", icon: "🏢", description: "Plans, proposals, and strategy prompts for founders" },
  { id: "hr", label: "HR", icon: "👥", description: "Job descriptions, policies, and performance review prompts" },
  { id: "legal", label: "Legal", icon: "⚖️", description: "Contracts, clauses, and legal document draft prompts" },
  { id: "accounting", label: "Accounting", icon: "📊", description: "Reports, analysis, and financial summary prompts" },
  { id: "it", label: "IT & Tech", icon: "💻", description: "Tech documentation, RFPs, and system planning prompts" },
  { id: "vibecoding", label: "Vibe Coding", icon: "🚀", description: "Build SaaS products as a non-technical founder with AI" },
  { id: "finance", label: "Finance", icon: "💰", description: "Investment, budgeting, and financial planning prompts" },
  { id: "projectmgmt", label: "Project Mgmt", icon: "📋", description: "Plans, timelines, and status update prompts" },
  { id: "realestate", label: "Real Estate", icon: "🏠", description: "Listings, outreach, and deal analysis prompts" },
  { id: "findinghome", label: "Finding Home", icon: "🔑", description: "Buyer checklists, negotiation, and search strategy prompts" },
  { id: "writing", label: "Writing", icon: "✍️", description: "Blog posts, essays, newsletters, and long-form prompts" },
  { id: "imagegen", label: "Image Gen", icon: "🎨", description: "Midjourney, DALL-E, and Flux prompt frameworks that work" },
  { id: "youtube", label: "YouTube", icon: "▶️", description: "Scripts, titles, descriptions, and hooks for videos" },
  { id: "content", label: "Content Creation", icon: "📝", description: "Repurpose, ideate, and batch content across platforms" },
  { id: "coding", label: "Coding", icon: "🧑‍💻", description: "Debug, build, and document code with AI assistance" },
  { id: "students", label: "Students", icon: "🎓", description: "Essays, study plans, research, and assignment prompts" },
  { id: "aiworkflows", label: "AI Workflows", icon: "🤖", description: "Automate tasks and chain AI agents for maximum output" },
  { id: "dataanalysis", label: "Data Analysis", icon: "📈", description: "Turn raw data into insights — clean, analyze, visualize, and communicate findings" },
  { id: "marketresearch", label: "Market Research", icon: "🔭", description: "Validate ideas, size markets, and understand customers before you build or launch" },
  { id: "videogen", label: "Video Gen", icon: "🎬", description: "Sora, Runway, Kling, and Pika prompt frameworks for AI-generated video" },
  { id: "freelancing", label: "Freelancing", icon: "💻", description: "Win clients, price your work, and manage projects as a freelancer" },
  { id: "dropshipping", label: "Dropshipping", icon: "📦", description: "Product research, ads, branding, and scaling for dropshipping stores" },
  { id: "emaillist", label: "Email List", icon: "📬", description: "Build, grow, and monetize your email list with proven frameworks" },
  { id: "affiliate", label: "Affiliate Marketing", icon: "🤝", description: "Build, grow, and scale an affiliate marketing income stream" },
];

export const PROMPTS = {
  resume: [
    {
      id: "r1",
      title: "ATS-Optimized Resume Bullet",
      description: "Turn a job description into power bullets that pass ATS scans",
      prompt: `Act as a professional resume writer and ATS optimization expert. I will give you my job title, the role I'm applying for, and a list of my responsibilities. Your job is to rewrite my experience as 5–7 impactful bullet points that:
- Start with strong action verbs
- Include measurable outcomes where possible (use [X%] or [X number] placeholders if I haven't provided numbers)
- Match the language and keywords from the job description
- Pass ATS filtering systems

My job title: [YOUR TITLE]
Role I'm applying for: [TARGET ROLE]
My responsibilities: [LIST YOUR TASKS]
Job description keywords: [PASTE JD KEYWORDS]`,
      tags: ["ats", "bullets", "resume"],
      model: "ChatGPT / Claude",
    },
    {
      id: "r2",
      title: "Professional Summary Generator",
      description: "Write a punchy 3-sentence summary that makes hiring managers stop scrolling",
      prompt: `You are a top-tier resume writer. Write a professional summary for my resume in exactly 3 sentences:
- Sentence 1: Who I am + years of experience + field
- Sentence 2: My top 2 skills and biggest career achievement
- Sentence 3: What I bring to my next employer + career goal

Keep it under 60 words. Use active voice. Do NOT use clichés like "results-driven" or "passionate".

My info:
- Name: [NAME]
- Field: [FIELD]
- Years of experience: [X years]
- Top achievement: [ACHIEVEMENT]
- Goal: [CAREER GOAL]`,
      tags: ["summary", "headline"],
      model: "ChatGPT / Claude",
    },
    {
      id: "r3",
      title: "Career Gap Explainer",
      description: "Address employment gaps confidently and professionally",
      prompt: `Help me write a brief, confident explanation for a gap in my resume that I can include in a cover letter or use in an interview. The tone should be honest, forward-looking, and professional — not apologetic.

Gap details:
- Duration: [e.g. 8 months, Jan 2022 – Sept 2022]
- Reason: [e.g. family caregiving, freelancing, health, travel, layoff]
- What I did during that time: [optional: courses, volunteering, projects]

Write 2 versions:
1. A 1-sentence resume note
2. A 3-sentence cover letter paragraph`,
      tags: ["gap", "cover letter"],
      model: "ChatGPT / Claude",
    },
    {
      id: "r4",
      title: "Skills Section Builder",
      description: "Build a targeted skills section based on the job you want",
      prompt: `I need to build the Skills section of my resume tailored to a specific role. Analyze the job description I'll paste and extract the top hard and soft skills I should list. Then suggest how to organize them into clean categories.

Job description: [PASTE JD HERE]
My current skills: [LIST YOUR SKILLS]

Output:
1. Top 10 skills to prioritize (from JD)
2. Suggested categories (e.g., Tools, Languages, Soft Skills)
3. Final formatted Skills section ready to copy-paste`,
      tags: ["skills", "ats"],
      model: "ChatGPT / Claude",
    },
    {
      id: "r5",
      title: "Resume Roast & Rewrite",
      description: "Get brutal honest feedback + an improved version",
      prompt: `You are a hiring manager who has reviewed 10,000+ resumes. Roast my resume — be brutally honest about what's weak, generic, or won't get me past ATS. Then rewrite the weakest section.

Paste your resume or section below:
[PASTE YOUR RESUME TEXT]

Target role: [ROLE]
Industry: [INDUSTRY]

Give me:
1. Top 3 problems with this resume
2. ATS score estimate (1–10) and why
3. Rewritten version of the weakest section`,
      tags: ["feedback", "rewrite"],
      model: "ChatGPT / Claude",
    },
  ],

  interview: [
    {
      id: "i1",
      title: "STAR Method Answer Generator",
      description: "Build perfect behavioral interview answers using the STAR framework",
      prompt: `Help me craft a STAR-method answer for a behavioral interview question. Make it specific, compelling, and under 2 minutes when spoken aloud (approximately 250–300 words).

Interview question: [e.g. "Tell me about a time you handled conflict at work"]
My situation: [BRIEF DESCRIPTION]
My role: [YOUR ROLE]
Company I'm interviewing at: [COMPANY]

Format the answer as:
- Situation (1–2 sentences)
- Task (1 sentence)
- Action (3–4 sentences, most of the answer)
- Result (1–2 sentences with measurable outcome)

Then give me 1 follow-up question the interviewer might ask and a brief answer for it.`,
      tags: ["behavioral", "star", "answer"],
      model: "ChatGPT / Claude",
    },
    {
      id: "i2",
      title: "Common Interview Q Prep Pack",
      description: "Generate tailored answers to the 10 most common interview questions",
      prompt: `I have an interview coming up. Generate tailored answers to the 10 most common interview questions based on my background and the role.

My background: [BRIEF BIO — role, years of experience, key skills]
Role I'm interviewing for: [ROLE]
Company: [COMPANY]
Industry: [INDUSTRY]

For each question, give:
- The question
- A tailored 3–4 sentence answer using my background
- 1 tip on delivery

Questions to cover:
1. Tell me about yourself
2. Why do you want this role?
3. What's your greatest strength?
4. What's your biggest weakness?
5. Where do you see yourself in 5 years?
6. Why are you leaving your current job?
7. What makes you the best candidate?
8. Describe your work style
9. How do you handle pressure?
10. Do you have any questions for us?`,
      tags: ["prep", "common questions"],
      model: "ChatGPT / Claude",
    },
    {
      id: "i3",
      title: "Mock Interview Simulator",
      description: "Simulate a full interview and get scored feedback",
      prompt: `Act as a senior hiring manager interviewing me for the role below. Run a mock interview:
1. Ask me 5 interview questions one at a time (wait for my answer before asking the next)
2. After all 5, give me a scorecard (1–10) for: Clarity, Relevance, Confidence, and Storytelling
3. Identify 2 things I did well and 2 things to improve

Role: [ROLE]
Company: [COMPANY]
Type of interview: [e.g. behavioral / technical / culture fit]

Start with: "Ready? Let's begin. Question 1:"`,
      tags: ["mock", "practice", "feedback"],
      model: "ChatGPT / Claude",
    },
  ],

  marketing: [
    {
      id: "m1",
      title: "Email Campaign Sequence",
      description: "Write a full 5-email nurture sequence for any product or offer",
      prompt: `Write a 5-email marketing sequence to nurture leads and convert them to buyers. Each email should have a clear goal, compelling subject line, and a single CTA.

Product/Service: [PRODUCT]
Target audience: [WHO THEY ARE]
Main pain point: [THEIR PROBLEM]
Main benefit: [HOW YOU SOLVE IT]
CTA destination: [LINK / BOOKING / PURCHASE]

Email 1 – Welcome + value (Day 0)
Email 2 – Educate / pain agitation (Day 2)
Email 3 – Social proof / case study (Day 4)
Email 4 – Objection handling (Day 6)
Email 5 – Urgency + final CTA (Day 8)

For each email include:
- Subject line (+ 1 A/B variant)
- Preview text
- Body copy (150–200 words)
- CTA button text`,
      tags: ["email", "nurture", "sequence"],
      model: "ChatGPT / Claude",
    },
    {
      id: "m2",
      title: "Ad Copy Trio",
      description: "Generate 3 ad variations (awareness, consideration, conversion) for any offer",
      prompt: `Write 3 Facebook/Instagram ad copy variations for the same offer at 3 different funnel stages.

Product/Offer: [PRODUCT OR SERVICE]
Target audience: [AGE, INTEREST, PAIN POINT]
Key benefit: [#1 REASON TO BUY]
Price or offer: [PRICE / DISCOUNT / FREE TRIAL]

Variation 1 — Awareness (Hook-based, problem-focused, no hard sell)
Variation 2 — Consideration (Story or social proof, soft CTA)
Variation 3 — Conversion (Urgency, clear offer, strong CTA)

For each write:
- Primary text (100 words max)
- Headline (10 words max)
- Description (25 words max)
- CTA button text`,
      tags: ["ads", "facebook", "copy"],
      model: "ChatGPT / Claude",
    },
    {
      id: "m3",
      title: "Marketing Strategy 1-Pager",
      description: "Get a full go-to-market plan for any product in one prompt",
      prompt: `Create a marketing strategy 1-pager for my product. Keep it concise and actionable.

Product: [PRODUCT]
Stage: [Pre-launch / Just launched / Growing]
Budget: [Budget range or "bootstrap"]
Team size: [Solo / Small team / Agency]
Goal: [e.g. 100 customers, $10k MRR, 10k followers]

Cover:
1. Target audience (3 customer personas, 1 sentence each)
2. Core positioning statement
3. Top 3 channels to focus on (with rationale)
4. 30-day action plan (weekly breakdown)
5. Key metrics to track
6. One "growth hack" specific to my product`,
      tags: ["strategy", "gtm", "plan"],
      model: "ChatGPT / Claude",
    },
  ],

  sales: [
    {
      id: "s1",
      title: "Cold Outreach Email",
      description: "Write personalized cold emails that get replies",
      prompt: `Write a cold outreach email that feels personal, not spammy. Keep it under 100 words. Focus on their world, not your product.

My product/service: [WHAT YOU OFFER]
Their company/role: [WHO YOU'RE EMAILING]
Their likely pain point: [PROBLEM THEY HAVE]
My value prop in 1 sentence: [WHAT YOU DO]
CTA: [ONE SPECIFIC ACTION — 15 min call, reply with X, etc.]

Write 3 subject line options and 2 email body versions:
- Version A: Problem-led
- Version B: Compliment + curiosity`,
      tags: ["cold email", "outreach", "b2b"],
      model: "ChatGPT / Claude",
    },
    {
      id: "s2",
      title: "Objection Crusher",
      description: "Generate confident responses to the 5 most common sales objections",
      prompt: `Generate responses to the 5 most common sales objections for my offer. Each response should acknowledge the concern, reframe it, and move toward the next step — not pressure or dismiss.

My offer: [PRODUCT/SERVICE]
Price point: [PRICE]
Audience: [WHO BUYS]

Objections to handle:
1. "It's too expensive"
2. "I need to think about it"
3. "I need to talk to my partner / boss"
4. "I'm already using [competitor]"
5. "Now's not a good time"

For each: write a 2–3 sentence response + a follow-up question to re-engage`,
      tags: ["objections", "closing", "script"],
      model: "ChatGPT / Claude",
    },
  ],

  seo: [
    {
      id: "se1",
      title: "Blog Post SEO Outline",
      description: "Get a fully structured, search-optimized article outline in seconds",
      prompt: `Create an SEO-optimized blog post outline for the following keyword. The article should rank for the primary keyword and capture related long-tail searches.

Primary keyword: [KEYWORD]
Target audience: [WHO WILL READ THIS]
Search intent: [Informational / Commercial / Navigational]
Word count target: [e.g. 1500 / 2500 / 4000]

Provide:
1. Recommended SEO title (include keyword, under 60 chars)
2. Meta description (include keyword, under 155 chars)
3. H1 heading
4. Full article outline with H2s and H3s
5. 5 LSI/related keywords to include naturally
6. Internal linking suggestions (placeholder anchors)
7. Suggested featured snippet format (paragraph / list / table)`,
      tags: ["blog", "outline", "keyword"],
      model: "ChatGPT / Claude",
    },
    {
      id: "se2",
      title: "Meta Tags Generator",
      description: "Write SEO meta titles and descriptions that improve click-through rates",
      prompt: `Write SEO meta titles and descriptions for the following pages. Optimize for both search engines and human click-through rate.

Pages to optimize:
1. [PAGE NAME] — Topic: [TOPIC]
2. [PAGE NAME] — Topic: [TOPIC]
3. [PAGE NAME] — Topic: [TOPIC]

Rules:
- Meta title: 50–60 characters, include primary keyword near the front
- Meta description: 140–155 characters, include keyword + a hook/CTA

For each page write:
- 2 meta title options
- 2 meta description options
- Recommended URL slug`,
      tags: ["meta", "title", "description"],
      model: "ChatGPT / Claude",
    },
  ],

  social: [
    {
      id: "so1",
      title: "30-Day Content Calendar",
      description: "Generate a full month of social content ideas across platforms",
      prompt: `Create a 30-day social media content calendar for my brand. Mix content types for maximum engagement.

Brand/Business: [YOUR BRAND]
Industry: [NICHE]
Platforms: [e.g. Instagram, TikTok, LinkedIn, X]
Tone: [e.g. casual + educational / professional / fun + witty]
Content goal: [e.g. grow followers, drive traffic, build community]

For each of 30 days provide:
- Content type (e.g. Carousel, Reel, Story, Text post)
- Platform
- Hook / Opening line
- Core topic
- CTA

Group into 4 weeks with a theme per week.`,
      tags: ["calendar", "planning", "instagram"],
      model: "ChatGPT / Claude",
    },
    {
      id: "so2",
      title: "Viral Hook Generator",
      description: "Write 10 scroll-stopping hooks for any topic or niche",
      prompt: `Generate 10 viral social media hooks for the topic below. Each hook should stop the scroll in the first 2 seconds and make the viewer want to keep watching or reading.

Topic: [YOUR TOPIC]
Platform: [TikTok / Instagram Reels / LinkedIn / X]
Audience: [WHO FOLLOWS YOU]

Use these hook frameworks (2 per framework):
1. Controversial opinion ("Nobody talks about…")
2. Curiosity gap ("I tried X for 30 days and…")
3. Listicle ("5 things [audience] never do…")
4. Relatability ("If you've ever felt like…")
5. Direct value ("Here's how to [result] in [time]")

Rate each hook 1–10 for expected engagement.`,
      tags: ["hooks", "viral", "reels"],
      model: "ChatGPT / Claude",
    },
  ],

  branding: [
    {
      id: "b1",
      title: "Brand Voice Guide",
      description: "Define your brand's personality, tone, and communication style",
      prompt: `Create a Brand Voice Guide for my business. This will be used by anyone writing copy, captions, emails, or content for the brand.

Business name: [NAME]
What we do: [PRODUCT/SERVICE]
Target customer: [AUDIENCE]
3 words that describe our personality: [e.g. Bold, Honest, Approachable]

Output:
1. Brand personality summary (50 words)
2. Voice attributes (4 traits with Do / Don't examples for each)
3. Tone variations (how voice shifts for: social media / emails / customer support / ads)
4. 3 example phrases we would say vs. 3 we'd never say
5. Writing checklist (5 questions to ask before publishing)`,
      tags: ["brand voice", "tone", "guide"],
      model: "ChatGPT / Claude",
    },
  ],

  ecommerce: [
    {
      id: "e1",
      title: "Product Description Writer",
      description: "Write high-converting product descriptions for any item",
      prompt: `Write a high-converting product description for an ecommerce listing. Focus on benefits over features and speak directly to the buyer's desire.

Product name: [PRODUCT NAME]
Category: [CATEGORY]
Key features: [LIST 3–5 FEATURES]
Target buyer: [WHO BUYS THIS]
Tone: [e.g. luxury / playful / minimalist / bold]
Platform: [Shopify / Amazon / Etsy / own store]

Write:
1. Short description (50 words — for above the fold)
2. Full description (150–200 words — benefits-led, scannable)
3. Bullet point features list (5 bullets, feature + benefit format)
4. SEO title tag suggestion
5. 3 possible product image caption ideas`,
      tags: ["product", "shopify", "copy"],
      model: "ChatGPT / Claude",
    },
  ],

  business: [
    {
      id: "bu1",
      title: "One-Page Business Plan",
      description: "Get a structured business plan for any idea in minutes",
      prompt: `Create a one-page business plan for my idea. Be concise and practical — this is for clarity and early planning, not investor pitch decks.

Business idea: [DESCRIBE YOUR IDEA]
Target market: [WHO YOU SERVE]
Stage: [Idea / Pre-revenue / Early revenue]

Cover all sections:
1. Problem (what pain you solve)
2. Solution (your product/service)
3. Target customer (1 clear persona)
4. Revenue model (how you make money)
5. Go-to-market (first 3 steps to get customers)
6. Competition (2–3 alternatives + your edge)
7. Key metrics to track (3 KPIs)
8. 90-day action plan`,
      tags: ["plan", "startup", "strategy"],
      model: "ChatGPT / Claude",
    },
  ],

  hr: [
    {
      id: "hr1",
      title: "Job Description Builder",
      description: "Write inclusive, compelling job postings that attract top talent",
      prompt: `Write a job description for the role below. Make it compelling, clear, and inclusive — avoid jargon and unrealistic requirements.

Role title: [ROLE]
Company: [COMPANY NAME]
Department: [DEPARTMENT]
Type: [Full-time / Part-time / Contract / Remote]
Salary range: [RANGE or "Competitive"]
Top 3 responsibilities: [LIST THEM]
Must-have skills: [LIST 3–5]
Nice-to-have skills: [LIST 2–3]
Culture note: [1 sentence about your team culture]

Structure:
- Role summary (3 sentences)
- What you'll do (5 bullet points)
- What you bring (requirements)
- Nice to haves
- What we offer (benefits + culture)
- How to apply`,
      tags: ["job post", "hiring", "recruitment"],
      model: "ChatGPT / Claude",
    },
  ],

  legal: [
    {
      id: "l1",
      title: "Terms & Conditions Draft",
      description: "Generate a basic T&C template for websites, apps, or digital products",
      prompt: `Draft a basic Terms & Conditions document for my website/product. This is a starting template — I will have it reviewed by a lawyer before publishing.

Business name: [NAME]
Type of product/service: [WEBSITE / APP / DIGITAL PRODUCT / SERVICE]
Country of operation: [COUNTRY]
Key areas to cover:
- User eligibility
- Acceptable use policy
- Intellectual property
- Payment and refunds (if applicable)
- Limitation of liability
- Privacy policy reference
- Governing law

Write in plain English — avoid excessive legalese. Note: Add "[REVIEW WITH LAWYER]" at any section that requires jurisdiction-specific review.`,
      tags: ["terms", "legal", "template"],
      model: "ChatGPT / Claude",
    },
  ],

  accounting: [
    {
      id: "ac1",
      title: "Monthly Finance Summary",
      description: "Turn raw numbers into a clear executive finance summary",
      prompt: `Write a monthly financial summary report for my business based on the numbers I'll provide. Make it clear, concise, and suitable for sharing with stakeholders.

Month: [MONTH/YEAR]
Revenue: [AMOUNT]
Expenses breakdown:
- [Category 1]: [AMOUNT]
- [Category 2]: [AMOUNT]
- [Category 3]: [AMOUNT]
Net profit/loss: [AMOUNT]
Previous month comparison: [BETTER / WORSE / SAME]
Key notes: [anything unusual — one-time expenses, late payments, etc.]

Output:
1. Executive summary (3 sentences)
2. Key metrics table (Revenue / Expenses / Net / MoM change)
3. Top 3 observations
4. 2 recommended actions for next month`,
      tags: ["finance", "report", "monthly"],
      model: "ChatGPT / Claude",
    },
  ],

  it: [
    {
      id: "it1",
      title: "Technical Specification Doc",
      description: "Generate a clear technical spec for any feature or system",
      prompt: `Write a technical specification document for the feature/system below. This will be used by developers and stakeholders.

Feature/System name: [NAME]
Overview: [1–2 sentence description]
Problem it solves: [PROBLEM]
Users/stakeholders affected: [WHO]
Tech stack (if known): [STACK]

Include sections:
1. Overview & goals
2. Functional requirements (what it must do)
3. Non-functional requirements (performance, security, scalability)
4. System architecture overview
5. Data model (key entities and relationships)
6. API endpoints (if applicable — placeholder format)
7. Edge cases and error handling
8. Out of scope
9. Success metrics`,
      tags: ["spec", "documentation", "dev"],
      model: "ChatGPT / Claude",
    },
  ],

  vibecoding: [
    {
      id: "vc1",
      title: "SaaS Build Prompt Sequence",
      description: "Generate a step-by-step AI build sequence for any SaaS app",
      prompt: `I'm a non-technical founder building a SaaS using AI tools (Cursor / Windsurf / Antigravity IDE). Generate a 12–15 step build sequence where each step is a self-contained prompt I can paste into the AI editor to build my app from scratch.

App idea: [DESCRIBE YOUR APP IN 2–3 SENTENCES]
Tech stack: Next.js 14, Tailwind CSS, Supabase (auth + database), Stripe (payments), Vercel (hosting)
Auth method: Email + Google OAuth

The prompts should go in this order:
1. Project setup + config
2. Supabase setup + schema
3. Auth pages (sign up / login)
4. Core data model / database tables
5. Main dashboard layout
6. [App-specific feature 1]
7. [App-specific feature 2]
8. [App-specific feature 3]
9. API routes
10. Stripe integration
11. User settings page
12. Landing page
13. Deployment prep

For each step: write the exact prompt to paste into the AI editor. Be specific about file paths, component names, and expected output.`,
      tags: ["saas", "build", "cursor", "no-code"],
      model: "Claude / ChatGPT",
    },
    {
      id: "vc2",
      title: "Debug This Code",
      description: "Paste broken code and get a fix + explanation",
      prompt: `I'm a non-technical founder using AI to build my app. The code below isn't working as expected. Please:
1. Identify the bug(s)
2. Explain what's wrong in plain English (no jargon)
3. Give me the corrected code
4. Tell me how to prevent this issue in the future

My tech stack: [e.g. Next.js 14 + Tailwind + Supabase]
What I expected to happen: [DESCRIBE EXPECTED BEHAVIOR]
What's actually happening: [DESCRIBE THE BUG / ERROR]
Error message (if any): [PASTE ERROR]

Code:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``,
      tags: ["debug", "fix", "non-technical"],
      model: "Claude / ChatGPT",
    },
    {
      id: "vc3",
      title: "Feature to Prompt Translator",
      description: "Turn a feature idea in plain English into a developer-ready AI prompt",
      prompt: `I want to add a feature to my app but I'm non-technical. Convert my plain-English description into a precise AI coding prompt I can paste into Cursor or Windsurf.

My app: [DESCRIBE YOUR APP BRIEFLY]
Tech stack: [YOUR STACK]
Feature I want: [DESCRIBE IN PLAIN ENGLISH]

Output:
1. The exact prompt to paste into my AI editor (be specific: file paths, component names, function names, what to create vs. modify)
2. Files I'll likely need to create or edit
3. Any dependencies I need to install first (with exact npm install command)
4. Anything I should test after it's built`,
      tags: ["feature", "cursor", "ai editor"],
      model: "Claude / ChatGPT",
    },
  ],

  finance: [
    {
      id: "fi1",
      title: "Personal Budget Planner",
      description: "Build a realistic monthly budget based on your income and goals",
      prompt: `Create a personal monthly budget plan based on my financial situation. Use the 50/30/20 rule as a starting framework but adjust based on my goals.

Monthly take-home income: [$AMOUNT]
Fixed expenses:
- [EXPENSE]: [$AMOUNT]
- [EXPENSE]: [$AMOUNT]
Financial goals: [e.g. pay off debt, save for house, build emergency fund]
Current savings: [$AMOUNT]
Biggest spending problem area: [e.g. eating out, subscriptions, shopping]

Provide:
1. Budget breakdown table (category / recommended / my current / difference)
2. 3 specific cuts I can make this month
3. Auto-savings strategy (how much to set aside and when)
4. 6-month financial milestone based on this budget`,
      tags: ["budget", "personal finance", "savings"],
      model: "ChatGPT / Claude",
    },
  ],

  projectmgmt: [
    {
      id: "pm1",
      title: "Project Kickoff Document",
      description: "Generate a complete project brief to align teams from day one",
      prompt: `Create a project kickoff document for the project below. This will be shared with the entire team before the first meeting.

Project name: [NAME]
Project owner: [NAME]
Start date: [DATE]
Deadline: [DATE]
Team members: [LIST ROLES]
Objective: [WHAT DOES SUCCESS LOOK LIKE?]
Key deliverables: [LIST 3–5]
Budget: [$AMOUNT or "TBD"]
Main risks: [LIST 2–3]

Include:
1. Project overview (5 sentences)
2. Goals and success metrics
3. Scope (in scope + out of scope)
4. Timeline / milestones (weekly)
5. Team roles and responsibilities
6. Communication plan (tools + cadence)
7. Risk register with mitigation`,
      tags: ["kickoff", "brief", "team"],
      model: "ChatGPT / Claude",
    },
  ],

  realestate: [
    {
      id: "re1",
      title: "Property Listing Description",
      description: "Write a listing that sells the lifestyle, not just the house",
      prompt: `Write a compelling real estate listing description for this property. Lead with lifestyle and emotion, then back it up with features.

Property type: [e.g. 3-bed house, 2-bed condo, studio]
Location: [NEIGHBORHOOD / CITY]
Key features: [LIST 5–7]
Target buyer: [e.g. young family, investor, first-time buyer, professional]
Price: [$PRICE]
Unique selling point: [THE #1 THING THAT SETS IT APART]

Write:
1. Headline (10 words max, emotion-driven)
2. Opening paragraph (40 words, paint the lifestyle)
3. Feature highlights (5 bullets, benefit-first format)
4. Neighborhood paragraph (40 words)
5. Closing CTA (1 sentence)`,
      tags: ["listing", "property", "copywriting"],
      model: "ChatGPT / Claude",
    },
  ],

  findinghome: [
    {
      id: "fh1",
      title: "Home Buyer Checklist",
      description: "Generate a personalized checklist for your home buying journey",
      prompt: `Create a personalized home buying checklist for my situation. Include financial, legal, and practical steps in the right order.

My situation:
- First-time buyer: [Yes/No]
- Budget: [$AMOUNT]
- Location: [CITY/STATE]
- Timeline: [When you want to move]
- Pre-approved: [Yes/No]
- Working with agent: [Yes/No]

Generate a step-by-step checklist organized into phases:
1. Pre-search (financial prep)
2. House hunting
3. Making an offer
4. Under contract
5. Closing day
6. Moving in

For each step include: what to do, who to contact, and any red flags to watch for.`,
      tags: ["buyer", "checklist", "first-time"],
      model: "ChatGPT / Claude",
    },
  ],

  writing: [
    {
      id: "w1",
      title: "Newsletter Issue Writer",
      description: "Write a full newsletter issue from a topic or rough notes",
      prompt: `Write a newsletter issue on the topic below. Match the format of top newsletters: punchy, personal, and packed with value.

Newsletter name: [NAME]
Topic/angle: [WHAT THIS ISSUE IS ABOUT]
Key insight or story: [YOUR MAIN POINT]
Audience: [WHO READS IT]
Tone: [e.g. conversational / professional / edgy]
Word count: [e.g. 400 / 600 / 800]

Structure:
1. Subject line (3 options)
2. Opening hook (2–3 sentences — personal story or provocative question)
3. Main body (the insight, broken into scannable sections)
4. Takeaway / summary (3 bullet points)
5. CTA (what should readers do next)
6. Sign-off (casual, 1 sentence)`,
      tags: ["newsletter", "email", "writing"],
      model: "ChatGPT / Claude",
    },
  ],

  imagegen: [
    {
      id: "ad1",
      title: "Clean Product Hero Shot",
      description: "Best for E-commerce listings, Google Shopping ads, Facebook carousel ads.",
      prompt: `Create a professional product advertisement photograph of [PRODUCT].\n\nShot style: Hero product shot, studio photography quality\nBackground: Pure white or very light grey gradient, completely clean\nLighting: Soft diffused studio lighting from the upper left, creating a subtle shadow on the right side that adds depth\nProduct placement: Centered in frame, taking up 60% of the image\nSurface: Product resting on a white reflective surface that shows a soft reflection beneath it\nPerspective: Slightly elevated angle, about 15 degrees above eye level\nPost-processing look: Sharp, crisp, high contrast, colors vivid but natural\nMood: Premium, trustworthy, professional\n\nThe image should look like it belongs on a high-end e-commerce website.\nNo text overlays. No props. Product only.\nAspect ratio: 1:1 square`,
      tags: ["ad", "ecommerce", "hero"],
      model: "Gemini",
      imageUrl: "/examples/clean_hero_earbuds_1775437900869.png"
    },
    {
      id: "ad2",
      title: "Dramatic Dark Background",
      description: "Best for Instagram feed ads, premium brand campaigns, beauty products, tech products.",
      prompt: `Create a dramatic advertising photograph of [PRODUCT].\n\nShot style: Dark studio product photography\nBackground: Deep black or very dark charcoal, smooth and seamless\nLighting: Single dramatic spotlight from above, creating a pool of bright light on the product with the edges fading to darkness. Rim lighting on one edge to define the product's silhouette.\nProduct placement: Slightly off-center, rule-of-thirds composition\nSurface: Dark reflective surface with subtle product reflection\nAccent: Tiny particles of light or dust suspended in the air around the product (optional)\nColor: One accent color — [COLOR] — appearing as a glow or light source behind the product\nMood: Luxurious, powerful, high-end, dramatic\n\nThe image should feel like a movie poster for a premium product.\nNo text. No people.\nAspect ratio: 4:5 for Instagram`,
      tags: ["ad", "instagram", "premium"],
      model: "Gemini",
      imageUrl: "/examples/dramatic_dark_earbuds_1775437912199.png"
    },
    {
      id: "ad3",
      title: "Flat Lay Arrangement",
      description: "Best for Pinterest ads, Instagram organic, lifestyle brands, beauty and wellness.",
      prompt: `Create a beautiful flat lay advertisement photograph featuring [PRODUCT] as the hero item.\n\nShot style: Top-down flat lay, editorial magazine style\nBackground: [Choose one: Marble surface / Linen fabric / Natural wood / Pastel colored paper]\nLayout: [PRODUCT] positioned as the focal point in the center or upper-center. Surrounded by 4-6 complementary props that tell a lifestyle story (fresh flowers, small plants, coffee cup, notebook, or other items relevant to the product category). Empty space in one corner for text overlay.\nLighting: Bright, natural daylight look. Even lighting with no harsh shadows. Soft and airy.\nColor palette: Cohesive color story — all props and background share [COLOR] tones\nStyling: Each item placed with intention. Some items slightly overlapping. Organic, curated feel.\nMood: Aspirational, beautiful, covetable, lifestyle-forward\n\nThe image should look like it belongs in a premium lifestyle magazine spread.\nAspect ratio: 1:1 or 4:5`,
      tags: ["ad", "pinterest", "lifestyle"],
      model: "Gemini",
      imageUrl: "/examples/flat_lay_earbuds_1775437923676.png"
    },
    {
      id: "ad4",
      title: "Floating Shot",
      description: "Best for Social media ads, tech products, innovative brands, attention-grabbing campaigns.",
      prompt: `Create a visually striking advertisement photograph of [PRODUCT] appearing to float or levitate.\n\nShot style: Conceptual product photography, CGI-quality realism\nBackground: Clean [BACKGROUND COLOR] gradient — light to slightly darker version of the same color\nEffect: [PRODUCT] suspended in mid-air at a dynamic angle, as if just tossed upward and caught in perfect position\nShadows: Soft shadow directly below the product on an invisible surface, confirming the levitation\nLighting: Clean studio lighting, product perfectly lit from multiple angles\nAdditional visual: Subtle motion lines or small particles radiating outward from the product, suggesting energy or movement\nColor: Product colors are vivid and saturated against the clean background\nMood: Dynamic, innovative, modern, eye-catching\n\nThe image should make someone pause their scroll immediately.\nNo people. No props.\nAspect ratio: 1:1 or 9:16 for Stories`,
      tags: ["ad", "tech", "innovative"],
      model: "Gemini",
      imageUrl: "/examples/floating_earbuds_1775437935512.png"
    },
    {
      id: "ad5",
      title: "Lifestyle In-Use Shot",
      description: "Best for Facebook and Instagram ads, brand awareness, relatability-focused campaigns.",
      prompt: `Create a lifestyle advertisement photograph showing a person using [PRODUCT].\n\nPerson: [DESCRIBE: A young professional woman in her late 20s / A fit man in his 30s / A diverse group of friends] — looking natural, not posed. Authentic expression, genuine emotion.\nSetting: [ENVIRONMENT: Modern home interior / Coffee shop / Outdoor park / Urban street / Gym] — environment feels real and lived-in, not staged\nAction: The person is actively using [PRODUCT] in a natural, everyday moment. Mid-action. Not looking at the camera.\nLighting: Natural light — golden hour outdoor light or soft window light indoors. Warm tones.\nPhotography style: Candid documentary style. Shallow depth of field with background softly blurred. Subject in sharp focus.\nColor grade: Warm, natural film-like color grading. Slightly desaturated but rich. Like a high-quality Instagram photo.\nMood: Authentic, aspirational, relatable, real-life beautiful\n\nThe person should look like someone the viewer wants to be — not a model in a studio.\nThe product should be clearly visible and recognizable.\nAspect ratio: 4:5`,
      tags: ["ad", "lifestyle", "authentic"],
      model: "Gemini",
      imageUrl: "/examples/lifestyle_inuse_earbuds_1775437949668.png"
    },
    {
      id: "ad6",
      title: "Hands-Only Shot",
      description: "Best for E-commerce, food and beverage, beauty, product focus campaigns.",
      prompt: `Create an advertisement photograph showing hands interacting with [PRODUCT].\n\nHands: Beautiful, well-groomed hands. Natural skin tone. [Optional: painted nails in [COLOR] / simple clean nails]. No jewelry unless it complements the product.\nAction: Hands gently holding / opening / using / presenting [PRODUCT] in the most visually appealing way possible.\nBackground: Clean, simple — [BACKGROUND: white marble / natural wood surface / solid [COLOR] background]\nLighting: Soft, even light from above. Makes the skin look warm and the product look its best.\nFraming: Hands fill approximately 60-70% of the frame. Product is clearly visible and in focus.\nStyle: Clean, editorial, aspirational. Like a high-end beauty campaign.\nColor: The skin tone and product colors are the only colors in the frame. Everything else is neutral.\nMood: Tactile, inviting, premium, personal\n\nThe image should make the viewer want to reach out and touch the product.\nAspect ratio: 1:1 or 4:5`,
      tags: ["ad", "beauty", "tactile"],
      model: "Gemini",
      imageUrl: "/examples/hands_only_earbuds_1775437977541.png"
    },
    {
      id: "ad7",
      title: "Before-and-After Split Frame",
      description: "Best for Health and wellness, beauty, home improvement, transformation products.",
      prompt: `Create a before-and-after advertisement image for [PRODUCT].\n\nLayout: Split frame — left side shows BEFORE / right side shows AFTER\nDivider: Clean vertical line or soft blend in the center separating the two sides\nBEFORE SIDE: [Describe the problem state — dull / messy / difficult / less optimal version of whatever the product improves]\nAFTER SIDE: [Describe the improved state — vibrant / clean / easy / better version after using the product]\nStyle: Both sides use identical framing, lighting, and angle — only the result changes. This makes the transformation obvious.\nText space: Small label in the top corners — "Before" on the left, "After" on the right, in a clean sans-serif font\nColor: Before side is slightly cooler and more desaturated. After side is warmer, brighter, more saturated.\nMood: Convincing, clear, transformative, credible\n\nThe transformation should be dramatic but believable — not impossible.\nAspect ratio: 16:9 horizontal or 1:1`,
      tags: ["ad", "transformation", "before-after"],
      model: "Gemini",
      imageUrl: "/examples/before_after_earbuds_1775437990523.png"
    },
    {
      id: "ad8",
      title: "Product in Natural Environment",
      description: "Best for Outdoor brands, food and beverage, sustainability brands, adventure products.",
      prompt: `Create a lifestyle advertisement photograph of [PRODUCT] placed in a beautiful natural environment.\n\nSetting: [ENVIRONMENT: Dense green forest / Sandy beach at golden hour / Snow-covered mountain landscape / Lush tropical setting / Rustic countryside field]\nProduct placement: [PRODUCT] is placed naturally within the environment — resting on a rock, sitting on a wooden surface, held by invisible hands, or positioned in the foreground with the landscape stretching behind it\nLighting: Natural golden hour or blue hour light. Dramatic, atmospheric, cinematic.\nDepth: Product in sharp focus in the foreground. Background environment slightly blurred but clearly recognizable and beautiful.\nColor: Rich, saturated natural colors. Deep greens, warm golds, soft blues — whichever matches the environment.\nMood: Adventurous, free, natural, premium, wanderlust-inducing\n\nThe product should look like it belongs in this world.\nThe image should make the viewer feel something — wanderlust, freedom, calm, or excitement.\nAspect ratio: 16:9 or 4:5`,
      tags: ["ad", "outdoor", "wanderlust"],
      model: "Gemini",
      imageUrl: "/examples/nature_earbuds_1775438001909.png"
    },
    {
      id: "ad9",
      title: "Instagram Story Ad",
      description: "Best for Instagram Stories ads, TikTok ads, Snapchat ads, Reels covers.",
      prompt: `Create a full-screen vertical advertisement graphic for [PRODUCT] designed for Instagram Stories.\n\nFormat: 9:16 vertical (1080 x 1920 pixels proportions)\nLayout structure:\n  - Top 20%: Brand logo area — clean, white or [COLOR] logo space\n  - Middle 60%: Hero visual — [PRODUCT] as the dominant element, styled beautifully\n  - Bottom 20%: Call-to-action area — space for text like "Shop Now" or "Learn More"\n\nHero visual style: [PRODUCT] photographed or rendered against [BACKGROUND COLOR] background. Product takes up most of the middle section. Dramatically lit.\nColor palette: [COLOR] as primary, white as secondary, one neutral as tertiary\nDesign elements: Simple, bold geometric shapes in [COLOR] framing the product. Clean modern typography space.\nMood: Bold, scroll-stopping, visually immediate\n\nThe image must work at phone-screen size — no small details that get lost.\nText areas are empty — design the layout for text to be added.\nAspect ratio: 9:16 vertical`,
      tags: ["ad", "instagram-story", "vertical"],
      model: "Gemini",
      imageUrl: "/examples/ig_story_ad_earbuds_1775438013625.png"
    },
    {
      id: "ad10",
      title: "Facebook Feed Ad (Horizontal)",
      description: "Best for Facebook feed ads, Google Display ads, LinkedIn sponsored content.",
      prompt: `Create a horizontal social media advertisement image for [PRODUCT] designed for Facebook feed.\n\nFormat: 16:9 or 1.91:1 horizontal\nLayout: Split composition — left 55% is the visual, right 45% is the message area\nLEFT SIDE (visual):\n  - [PRODUCT] beautifully photographed or styled\n  - Clean background in [BRAND COLOR] or white\n  - Product takes up 70% of the left panel\n  - Professional studio lighting\nRIGHT SIDE (message area):\n  - Clean white or [COLOR] background\n  - Space for headline text at top\n  - Space for subheadline or benefit text in middle\n  - Space for CTA button at bottom\n  - All text areas are empty — this is the design template\nDividing element: Clean vertical line or soft gradient transition between sides\nOverall mood: Professional, trustworthy, clear, direct\n\nThe design should look like a premium brand's paid social ad.\nAll text areas are blank — create the layout structure only.\nAspect ratio: 16:9`,
      tags: ["ad", "facebook", "horizontal"],
      model: "Gemini",
      imageUrl: "/examples/fb_feed_ad_earbuds_1775438029273.png"
    },
    {
      id: "ad11",
      title: "Carousel Ad Card",
      description: "Best for Facebook and Instagram carousel ads, product feature showcases.",
      prompt: `Create a single carousel ad card for [PRODUCT] highlighting one specific product feature.\n\nFormat: 1:1 square\nDesign style: Bold, graphic, modern — designed to be swiped through in a carousel sequence\nBackground: Solid [COLOR] background — rich, saturated, eye-catching\nProduct: [PRODUCT] displayed prominently. Either the full product or a close-up detail showing the specific feature being highlighted.\nFeature callout: A graphic element (arrow, line, circle) pointing to or highlighting the specific feature area of the product. Space for a short label like "Ultra-Light Design" or "48-Hour Battery" next to the callout.\nTypography area: Top of the card has space for the feature headline. Bottom has space for a brief description.\nNumber indicator: Small "1 of 5" style indicator in corner showing this is part of a series.\nMood: Informative, premium, clean, modern\n\nAll text spaces are empty — design the layout and visual hierarchy only.\nAspect ratio: 1:1 square`,
      tags: ["ad", "carousel", "features"],
      model: "Gemini",
      imageUrl: "/examples/carousel_ad_earbuds_1775438057733.png"
    },
    {
      id: "ad12",
      title: "UGC-Style Ad",
      description: "Best for Facebook, Instagram, TikTok — high-converting ad format that feels organic.",
      prompt: `Create a UGC-style (user-generated content) advertisement photograph featuring [PRODUCT].\n\nStyle: This should look like a real person took this photo on their phone, NOT a professional studio shot\nSetting: A real home environment — kitchen counter, bathroom shelf, bedroom dresser, living room table, or wherever this product is naturally used\nLighting: Imperfect natural light — window light, slightly uneven, realistic. Not studio perfect.\nProduct: [PRODUCT] is in the photo naturally, as if someone just pulled it out to show their followers. Maybe partially used. Not pristine.\nComposition: Slightly imperfect framing — not perfectly centered. A thumb might be visible at the edge. Background is real and lived-in.\nPhone frame: Optional — a subtle iPhone screenshot frame around the image, including the Instagram or TikTok interface elements (profile picture, username, like/comment buttons) to make it look like a real social post\nPerson element: Optional — a partial hand or arm visible, like someone is holding or pointing to the product\nMood: Authentic, relatable, trustworthy, "my friend recommended this"\n\nThe image should NOT look like an advertisement.\nThat is the entire point — it should feel real.\nAspect ratio: 9:16 or 4:5`,
      tags: ["ad", "ugc", "authentic"],
      model: "Gemini",
      imageUrl: "/examples/ugc_style_earbuds_1775438069721.png"
    },
    {
      id: "ad13",
      title: "Sale Announcement Ad",
      description: "Best for Black Friday, seasonal sales, flash sales, promotional campaigns.",
      prompt: `Create a high-impact promotional advertisement image for [PRODUCT] announcing a sale.\n\nDesign style: Bold, energetic, attention-commanding — this is a sale announcement\nBackground: Deep [COLOR — red / black / navy / orange] or a bold gradient from [COLOR 1] to [COLOR 2]\nProduct: [PRODUCT] featured prominently, photographed cleanly against the bold background\nSale elements: Large bold "SALE" or percentage discount badge in the design — bright contrasting color (yellow, white, or neon against the dark background). Badge style: circular stamp, explosive starburst, or bold rectangle.\nLayout: Product on one side, sale information area on the other. Clear visual hierarchy.\nUrgency element: Design includes a countdown-style element or "Limited Time" badge\nTypography areas:\n  - HEADLINE SPACE: Large, bold — space for "50% OFF" or similar\n  - SUBHEADLINE SPACE: Medium — space for the product name or offer detail\n  - CTA SPACE: Bottom — space for "Shop Now" button\nColor contrast: Maximum contrast for visibility. Should be readable as a thumbnail.\nMood: Urgent, exciting, too-good-to-miss\n\nAll text areas are empty — design the visual layout only.\nAspect ratio: 1:1 or 4:5`,
      tags: ["ad", "sale", "promo"],
      model: "Gemini",
      imageUrl: "/examples/sale_ad_earbuds_1775438082327.png"
    },
    {
      id: "ad14",
      title: "Bundle or Multi-Product Ad",
      description: "Best for E-commerce upsells, gift sets, value bundles, kit promotions.",
      prompt: `Create an advertisement image showing [PRODUCT] as part of a product bundle or collection.\n\nLayout: 3-5 products arranged in a beautiful flat lay or studio arrangement\nHero product: [PRODUCT] is the largest and most prominently placed — center or front\nSupporting products: 2-4 complementary products arranged around the hero\nArrangement style: [Choose: Organized grid layout / Organic scattered arrangement / Stacked or layered arrangement]\nBackground: Clean white or light neutral — lets the products be the focus\nLighting: Even, bright studio lighting on all products. No product is in shadow.\nConnection element: A subtle design element tying all products together — matching ribbon, same label color family, or a contained frame\nValue proposition space: One corner cleared for text like "Complete Kit" or "Everything You Need" or "Save 30% on the Bundle"\nMood: Generous, great value, complete, gift-worthy\n\nThis should feel like the most complete version of this product category.\nAll text areas are empty.\nAspect ratio: 1:1 or 16:9`,
      tags: ["ad", "bundle", "value"],
      model: "Gemini",
      imageUrl: "/examples/bundle_ad_earbuds_1775438098646.png"
    },
    {
      id: "ad15",
      title: "Free Shipping Offer Ad",
      description: "Best for E-commerce, SaaS, subscription products, first-purchase campaigns.",
      prompt: `Create a clean advertisement image for [PRODUCT] featuring a risk-free offer.\n\nDesign style: Clean, trustworthy, reassuring — this ad is about removing fear of buying\nBackground: Soft, light background — white, very light grey, or pale [COLOR]\nProduct: [PRODUCT] featured cleanly and professionally\nTrust icons: Design includes 3 small icon areas representing:\n  Icon 1: Free shipping (truck or package icon)\n  Icon 2: Money-back guarantee (shield or checkmark icon)\n  Icon 3: Easy returns or risk-free trial (arrow cycle icon)\nIcon style: Simple line-art icons, clean and professional\nLayout: Product takes up left 60%, trust icons arranged vertically or horizontally on the right or below\nColor: [BRAND COLOR] used as accent on icons and highlights only. Rest is clean and minimal.\nHeadline space: Top of image, space for "Try Risk-Free" or "Free Shipping on Orders Over $X"\nMood: Safe, trustworthy, confident, generous, welcoming\n\nThis ad should make someone feel comfortable clicking — not pressured.\nAll text areas are empty.\nAspect ratio: 1:1 or 16:9`,
      tags: ["ad", "offer", "trust"],
      model: "Gemini",
      imageUrl: "/examples/free_shipping_ad_1775438109819.png"
    },
    {
      id: "ad16",
      title: "Aspirational Lifestyle Ad",
      description: "Best for Premium brands, luxury products, aspirational campaigns, brand awareness.",
      prompt: `Create an aspirational lifestyle advertisement image for [PRODUCT].\n\nConcept: Do not show the product being used — show the LIFE that comes with using it\nScene: A beautiful aspirational moment — [CHOOSE: A perfectly styled home with morning light streaming through windows / A rooftop terrace overlooking a city at sunset / A pristine beach at golden hour / A beautiful mountain viewpoint at dawn]\nPerson (optional): One person in the scene, from behind or at a distance — the viewer should be able to put themselves in the scene. They look happy, successful, at peace.\nProduct: [PRODUCT] is visible but secondary — it is part of the scene, not the focus. Perhaps on a table nearby, in someone's hand, or subtly placed.\nPhotography: Cinematic, wide angle or medium shot. Professional color grading. Golden, warm tones.\nMood: Deeply aspirational. "This is the life I want." The product is the gateway to this feeling.\nColor: Warm, golden, filmic. Rich without being oversaturated.\n\nThe viewer should feel the emotion first and notice the product second.\nAspect ratio: 16:9 or 4:5`,
      tags: ["ad", "aspirational", "lifestyle"],
      model: "Gemini",
      imageUrl: "/examples/aspirational_lifestyle_earbuds_1775438147461.png"
    },
    {
      id: "ad17",
      title: "Problem-Solution Contrast Ad",
      description: "Best for Health and wellness, productivity tools, cleaning products, anything solving a pain point.",
      prompt: `Create a split-frame problem-solution advertisement image for [PRODUCT].\n\nLayout: Two side-by-side panels of equal size\nLEFT PANEL — THE PROBLEM:\n  - Color grade: Desaturated, slightly cold, grey tones\n  - Visual: A scene showing the frustrating situation BEFORE the product — messy, difficult, stressful, painful\n  - Optional: A person looking frustrated or struggling\n  - Mood: Tension, discomfort, frustration\n  - Small label space: "Before" or a frown icon\n\nRIGHT PANEL — THE SOLUTION:\n  - Color grade: Warm, bright, saturated, vibrant\n  - Visual: The same scene AFTER using [PRODUCT] — clean, easy, beautiful, successful\n  - [PRODUCT] is visible and clearly responsible for the improvement\n  - Optional: Same person looking relieved, happy, satisfied\n  - Mood: Relief, joy, success\n  - Small label space: "After" or a checkmark icon\n\nDividing element: A clean vertical line or a subtle arrow pointing from left to right\nOverall composition: Both panels use identical framing and angle — only the situation changes\nText space: Bottom banner across both panels for headline text\n\nThe contrast should be immediately obvious and emotionally impactful.\nAspect ratio: 1:1 or 16:9`,
      tags: ["ad", "problem-solution", "contrast"],
      model: "Gemini",
      imageUrl: "/examples/problem_solution_earbuds_1775438160645.png"
    },
    {
      id: "ad18",
      title: "Testimonial / Social Proof Ad",
      description: "Best for Retargeting campaigns, trust-building ads, converting warm audiences.",
      prompt: `Create a testimonial-style advertisement image for [PRODUCT].\n\nLayout: Clean, editorial design — feels like a magazine quote feature\nBackground: Soft neutral — warm white, light cream, or very light [COLOR]\nProduct: [PRODUCT] photographed cleanly and placed on one side (left or right) — takes up 35% of the frame\nTestimonial block: The other 65% of the frame contains:\n  - Large opening quotation mark in [BRAND COLOR] — decorative and large\n  - Empty space for the testimonial text (3-4 lines)\n  - Below the quote: small avatar circle placeholder for customer photo\n  - Customer name space and star rating (5 stars in [COLOR])\nDesign style: Elegant, trustworthy, editorial — like a high-end brand's website testimonial section\nRating element: 5 gold or [COLOR] stars prominently displayed\nVerified badge: Small "Verified Purchase" or "Real Customer" badge in corner\nMood: Credible, warm, trustworthy, human, reassuring\n\nThe design should make the testimonial feel real and significant — not like a fake review.\nAll text spaces are empty — only show the visual layout.\nAspect ratio: 4:5 or 1:1`,
      tags: ["ad", "testimonial", "social-proof"],
      model: "Gemini"
    },
    {
      id: "ad19",
      title: "Product Close-Up Detail Shot",
      description: "Best for Quality showcase, premium positioning, materials and craftsmanship emphasis.",
      prompt: `Create an extreme close-up advertisement photograph of [PRODUCT] highlighting its quality and craftsmanship.\n\nShot type: Macro or extreme close-up — fill the entire frame with the product detail\nFocus area: The most impressive, beautiful, or quality-demonstrating part of [PRODUCT] — the texture / material / finish / intricate detail / precision engineering\nDepth of field: Very shallow — the focal point is razor sharp, everything else falls into beautiful blur\nLighting: Dramatic side lighting that rakes across the surface, revealing texture and depth\nBackground: The rest of the product itself, beautifully blurred into an abstract [COLOR] bokeh\nColor: Rich, accurate material colors — let the material beauty speak for itself\nDetail reveal: The image should reveal something about the product that you would miss at normal viewing distance\nMood: Premium, meticulous, quality-obsessed, artisanal\n\nThis image communicates "this product is made better than you realize."\nNo text. No props. Pure product detail.\nAspect ratio: 1:1`,
      tags: ["ad", "close-up", "detail"],
      model: "Gemini"
    },
    {
      id: "ad20",
      title: "Product Comparison (Us vs Them)",
      description: "Best for Competitive categories, switching campaigns, differentiation from generic alternatives.",
      prompt: `Create a product comparison advertisement image featuring [PRODUCT] versus a generic alternative.\n\nLayout: Two-column comparison design\nLEFT COLUMN — COMPETITOR / GENERIC:\n  - Header: "Other Brands" or "The Old Way"\n  - Visual: A generic, unbranded version of the product category — looks ordinary, cheap, or dated\n  - Below visual: 3-4 checkboxes with X marks (red) next to empty text areas\n  - Color treatment: Slightly desaturated, cooler tones\n  - Background: Light grey\n\nRIGHT COLUMN — [PRODUCT]:\n  - Header: [PRODUCT NAME SPACE] or "The Better Way"\n  - Visual: [PRODUCT] looking premium, clean, and impressive — identical framing to the left side but clearly superior\n  - Below visual: 3-4 checkboxes with checkmarks (green or [BRAND COLOR]) next to empty text areas\n  - Color treatment: Warm, vibrant, full color\n  - Background: White or very light [BRAND COLOR]\n\nDividing element: "VS" in a bold circle between the two columns\nWinner indicator: Subtle highlight, glow, or badge on the right column indicating it is the winner\nText areas: All feature text spaces are empty — only show the comparison layout structure\nOverall style: Clean, infographic-style, immediately readable\nMood: Confident, factual, clearly superior\n\nAspect ratio: 1:1 or 16:9`,
      tags: ["ad", "comparison", "us-vs-them"],
      model: "Gemini"
    },
    {
      id: "ig1",
      title: "Midjourney Prompt Builder",
      description: "Build detailed Midjourney prompts for any style or concept",
      prompt: `Build a detailed Midjourney prompt for the image concept below. Structure it to produce a high-quality, specific result.

Image concept: [DESCRIBE WHAT YOU WANT TO CREATE]
Style references: [e.g. cinematic, editorial, anime, photorealistic, painterly]
Mood/Lighting: [e.g. golden hour, moody dark, bright studio, neon]
Color palette: [e.g. muted earth tones, vibrant pastels, monochrome]
Aspect ratio: [e.g. 16:9, 1:1, 9:16 for portrait]
Quality level: [Standard / High quality]

Output:
1. Full Midjourney prompt (ready to copy-paste with -- parameters)
2. 2 alternative variations (different styles, same concept)
3. Negative prompt suggestions (--no [elements to avoid])
4. Tip for getting consistent results across generations`,
      tags: ["midjourney", "ai art", "prompt"],
      model: "Midjourney",
    },
    {
      id: "ig2",
      title: "Flux / DALL-E Prompt",
      description: "Write precise image prompts for Flux 2 Pro and DALL-E 3",
      prompt: `Write an optimized image generation prompt for Flux 2 Pro or DALL-E 3. These models respond well to descriptive, natural language prompts.

What I want to create: [DESCRIBE YOUR IMAGE]
Use case: [e.g. product mockup, social media post, blog header, illustration]
Style: [e.g. flat design, photorealistic, oil painting, digital art]
Composition: [e.g. close-up, wide shot, overhead view, rule of thirds]
Exclude: [ANYTHING YOU DON'T WANT IN THE IMAGE]

Write:
1. DALL-E 3 optimized prompt (natural language, descriptive)
2. Flux 2 Pro optimized prompt (more technical, tag-based)
3. Suggested image dimensions
4. Regeneration tip if first result misses the mark`,
      tags: ["flux", "dall-e", "ai image"],
      model: "DALL-E / Flux",
    },
  ],

  youtube: [
    {
      id: "yt1",
      title: "YouTube Video Script",
      description: "Write a complete video script with hook, content, and CTA",
      prompt: `Write a complete YouTube video script for the topic below. Optimize for watch time and engagement.

Channel niche: [YOUR NICHE]
Video topic: [SPECIFIC TOPIC]
Target audience: [WHO WATCHES]
Video length target: [e.g. 8–10 min / 15 min / short 3–5 min]
CTA goal: [Subscribe / Click link / Buy product / Comment]

Script structure:
1. Hook (first 30 seconds — open loop or bold claim)
2. Intro (who you are + what viewer will get — 30 seconds)
3. Main content (organized into 3–5 sections with smooth transitions)
4. Pattern interrupts (2–3 re-engagement lines mid-video)
5. Outro + CTA (30 seconds)

Include: [B-roll suggestions in brackets], natural spoken language (not formal), and timestamps.`,
      tags: ["script", "youtube", "video"],
      model: "ChatGPT / Claude",
    },
    {
      id: "yt2",
      title: "YouTube Title & Thumbnail Copy",
      description: "Generate 10 title options and thumbnail text for any video",
      prompt: `Generate 10 YouTube title options and thumbnail copy for my video. Optimize for click-through rate without clickbait.

Video topic: [WHAT YOUR VIDEO IS ABOUT]
Target audience: [WHO WATCHES]
Main promise/outcome: [WHAT VIEWER WILL LEARN OR GAIN]
Tone: [e.g. educational / hype / story-based / listicle]

For titles:
- 3 curiosity-gap titles
- 3 outcome-based titles
- 2 listicle titles
- 2 story / personal titles

For each title, also write:
- Thumbnail main text (3–5 words max, high contrast)
- Thumbnail sub-text (optional, 2–3 words)
- Suggested thumbnail emotion/expression`,
      tags: ["title", "thumbnail", "ctr"],
      model: "ChatGPT / Claude",
    },
  ],

  content: [
    {
      id: "co1",
      title: "Content Repurposing Machine",
      description: "Turn one piece of content into 10 formats across platforms",
      prompt: `Take the content I'll paste below and repurpose it into 10 different formats for different platforms. Adapt the tone and format to each platform's best practices.

Original content: [PASTE YOUR BLOG POST / VIDEO TRANSCRIPT / NEWSLETTER]

Repurpose into:
1. Twitter/X thread (8–10 tweets)
2. LinkedIn post (200 words, professional tone)
3. Instagram caption (150 words + hashtags)
4. TikTok/Reels script (60 seconds)
5. YouTube Shorts script (30–60 seconds)
6. Email newsletter intro (150 words)
7. Pinterest pin description (100 words)
8. Facebook post (casual, community-focused)
9. Quote card text (1 powerful sentence)
10. Blog post intro paragraph (100 words, SEO-friendly)`,
      tags: ["repurpose", "cross-platform", "batch"],
      model: "ChatGPT / Claude",
    },
  ],

  coding: [
    {
      id: "cod1",
      title: "Code Review & Refactor",
      description: "Get your code reviewed for quality, bugs, and best practices",
      prompt: `Review the code below and provide a thorough code review. Act as a senior developer.

Language/Framework: [e.g. JavaScript / React / Python / Node.js]
What this code does: [BRIEF DESCRIPTION]
My main concerns: [e.g. performance, readability, security, scalability]

\`\`\`
[PASTE YOUR CODE HERE]
\`\`\`

Provide:
1. Overall code quality score (1–10) with reasoning
2. Bugs or issues found (critical first)
3. Performance improvements
4. Security concerns (if any)
5. Refactored version of the most problematic section
6. 3 best practices I should adopt going forward`,
      tags: ["review", "refactor", "best practices"],
      model: "Claude / ChatGPT",
    },
    {
      id: "cod2",
      title: "API Documentation Writer",
      description: "Generate clear API docs from code or endpoint descriptions",
      prompt: `Write developer-friendly API documentation for the endpoints below. Use a clear, consistent format similar to Stripe or Twilio docs.

API name: [API NAME]
Base URL: [BASE URL]
Authentication method: [e.g. Bearer token, API key]

Endpoints to document:
1. [METHOD] [ENDPOINT] — [WHAT IT DOES]
2. [METHOD] [ENDPOINT] — [WHAT IT DOES]
3. [METHOD] [ENDPOINT] — [WHAT IT DOES]

For each endpoint include:
- Description
- Request parameters (name / type / required / description)
- Request body example (JSON)
- Response example (success + error)
- Status codes
- Code example (in JavaScript or curl)`,
      tags: ["api", "docs", "developer"],
      model: "Claude / ChatGPT",
    },
  ],

  students: [
    {
      id: "st1",
      title: "Essay Outline Generator",
      description: "Get a structured essay outline for any topic or assignment",
      prompt: `Create a detailed essay outline for my assignment. I will use this as my writing plan before drafting.

Essay topic: [YOUR TOPIC]
Essay type: [Argumentative / Analytical / Descriptive / Comparative / Narrative]
Word count: [TARGET WORD COUNT]
Academic level: [High School / Undergraduate / Graduate]
Key argument/thesis: [YOUR MAIN POINT — or write "help me develop one"]
Sources I'm using: [LIST OR "suggest some for me"]

Provide:
1. Suggested thesis statement (2 options)
2. Full outline with:
   - Introduction (hook + context + thesis)
   - Body paragraphs (3–5) with topic sentences and supporting points
   - Counterargument + rebuttal (if argumentative)
   - Conclusion
3. Word count breakdown per section
4. 3 tips for strong academic writing in this essay type`,
      tags: ["essay", "outline", "academic"],
      model: "ChatGPT / Claude",
    },
  ],

  aiworkflows: [
    {
      id: "aw1",
      title: "AI Agent System Prompt",
      description: "Write a system prompt for any custom AI agent or GPT",
      prompt: `Write a detailed system prompt for a custom AI agent. This prompt will define its persona, capabilities, rules, and response style.

Agent name: [NAME]
Agent purpose: [WHAT IT DOES]
Target users: [WHO WILL USE IT]
Tone/Personality: [e.g. professional / friendly / concise / expert]
Main tasks it should do: [LIST 3–5]
Hard rules (what it should NEVER do): [LIST 2–3]
Output format preferences: [e.g. always use bullet points / always ask clarifying questions / respond in under 200 words]

Write a complete system prompt including:
1. Role definition
2. Behavior guidelines
3. Response format rules
4. Example interaction (user → agent)
5. Edge case handling instructions`,
      tags: ["agent", "system prompt", "gpt"],
      model: "Claude / ChatGPT / Any LLM",
    },
  ],
};
