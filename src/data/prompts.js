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
      model: "Gemini",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&fit=crop"
    },
    {
      id: "ad19",
      title: "Product Close-Up Detail Shot",
      description: "Best for Quality showcase, premium positioning, materials and craftsmanship emphasis.",
      prompt: `Create an extreme close-up advertisement photograph of [PRODUCT] highlighting its quality and craftsmanship.\n\nShot type: Macro or extreme close-up — fill the entire frame with the product detail\nFocus area: The most impressive, beautiful, or quality-demonstrating part of [PRODUCT] — the texture / material / finish / intricate detail / precision engineering\nDepth of field: Very shallow — the focal point is razor sharp, everything else falls into beautiful blur\nLighting: Dramatic side lighting that rakes across the surface, revealing texture and depth\nBackground: The rest of the product itself, beautifully blurred into an abstract [COLOR] bokeh\nColor: Rich, accurate material colors — let the material beauty speak for itself\nDetail reveal: The image should reveal something about the product that you would miss at normal viewing distance\nMood: Premium, meticulous, quality-obsessed, artisanal\n\nThis image communicates "this product is made better than you realize."\nNo text. No props. Pure product detail.\nAspect ratio: 1:1`,
      tags: ["ad", "close-up", "detail"],
      model: "Gemini",
      imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80&fit=crop"
    },
    {
      id: "ad20",
      title: "Product Comparison (Us vs Them)",
      description: "Best for Competitive categories, switching campaigns, differentiation from generic alternatives.",
      prompt: `Create a product comparison advertisement image featuring [PRODUCT] versus a generic alternative.\n\nLayout: Two-column comparison design\nLEFT COLUMN — COMPETITOR / GENERIC:\n  - Header: "Other Brands" or "The Old Way"\n  - Visual: A generic, unbranded version of the product category — looks ordinary, cheap, or dated\n  - Below visual: 3-4 checkboxes with X marks (red) next to empty text areas\n  - Color treatment: Slightly desaturated, cooler tones\n  - Background: Light grey\n\nRIGHT COLUMN — [PRODUCT]:\n  - Header: [PRODUCT NAME SPACE] or "The Better Way"\n  - Visual: [PRODUCT] looking premium, clean, and impressive — identical framing to the left side but clearly superior\n  - Below visual: 3-4 checkboxes with checkmarks (green or [BRAND COLOR]) next to empty text areas\n  - Color treatment: Warm, vibrant, full color\n  - Background: White or very light [BRAND COLOR]\n\nDividing element: "VS" in a bold circle between the two columns\nWinner indicator: Subtle highlight, glow, or badge on the right column indicating it is the winner\nText areas: All feature text spaces are empty — only show the comparison layout structure\nOverall style: Clean, infographic-style, immediately readable\nMood: Confident, factual, clearly superior\n\nAspect ratio: 1:1 or 16:9`,
      tags: ["ad", "comparison", "us-vs-them"],
      model: "Gemini",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
    },
    {
      id: "beauty1",
      title: "The Bloom Explosion",
      description: "Concept: The product is the source of all beauty in nature. Best for Floral perfumes, rose-based skincare, vitamin-enriched serums.",
      prompt: `Create a hyper-surrealist beauty advertisement image.\n\nTHE CONCEPT: A single [PRODUCT] sitting at the center of the frame. From the product — from its opening, its tip, its cap, or its surface — thousands of fresh flowers are exploding outward in every direction. The flowers are mid-explosion, frozen in time, caught in a microsecond of pure beauty. Roses, peonies, cherry blossoms, and tiny wildflowers tumble and spin through the air in a perfect spherical explosion with the product at the epicenter.\n\nPRODUCT: [PRODUCT] sits perfectly still, pristine and beautiful, in the absolute center. It is the source. It is the origin point of all this beauty.\n\nFLOWERS: Ultra-detailed, photorealistic flower petals at every stage of bloom — some fully open, some still curled. Extreme variety of sizes. Petals catching light individually. Some translucent against the light source.\n\nBACKGROUND: Deep velvety black or deep midnight blue — makes the flowers glow like fireworks\n\nLIGHTING: The product glows with a warm internal golden light. The flowers nearest the product are most vivid. The outermost flowers fade slightly, their edges catching the dark background.\n\nCOLOR STORY: Rich, saturated floral colors — deep reds, blush pinks, cream whites, soft lavender — against the deep dark background\n\nSCALE: The flowers range from tiny (smaller than a fingernail) to large (bigger than the product) — extreme scale variation\n\nMOOD: Magical, explosive, overwhelmingly beautiful, dramatic, the feeling of opening something extraordinary\n\nPHOTOGRAPHY STYLE: Ultra-sharp product. Motion-blur on outermost flowers suggesting explosive movement. Shot from a 20-degree elevated angle.\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "surrealist", "floral"],
      model: "Gemini"
    },
    {
      id: "beauty2",
      title: "Liquid Universe",
      description: "Concept: The product's formula becomes an entire cosmos. Best for Serums, oils, ampoules, liquid foundations.",
      prompt: `Create a breathtaking macro-cosmic beauty advertisement image.\n\nTHE CONCEPT: A single drop or splash of [PRODUCT]'s formula — a droplet, a pour, or a splash — fills the entire frame. But when you look closely, the liquid has become a universe. The formula swirls like galaxies. Bubbles within it are planets. Iridescent particles floating inside it are stars. The liquid IS the cosmos.\n\nCENTRAL ELEMENT: The [PRODUCT] bottle or tube appears small in one corner — impossibly small compared to the vast liquid universe it contains. The product is humble. What it contains is infinite.\n\nTHE LIQUID: Fills 80% of the frame. Ultra-macro detail. Viscous, luminous, and alive. Colors shift — deep purple to gold to iridescent champagne to rose, like an aurora or galaxy. Individual droplets are perfect spheres catching the light.\n\nINSIDE THE LIQUID: Micro-particles appear as constellations. Tiny bubbles look like moons. Swirling patterns look exactly like spiral galaxies — this is intentional. The formula IS the universe.\n\nLIGHT SOURCE: A beautiful glow emanates from within the liquid itself — not lit from outside, lit from within. Like bioluminescence.\n\nBACKGROUND: Deep space black with tiny real star-like particles\n\nATMOSPHERE: Tiny wisps of vapor rise from the liquid surface\n\nSCALE DECEPTION: The liquid appears simultaneously microscopic (like a formula under a microscope) and cosmic (like a nebula viewed from a telescope). Both at once.\n\nMOOD: Awe-inspiring, scientific beauty, the feeling that this formula is something extraordinary and rare\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "macro", "cosmic"],
      model: "Gemini"
    },
    {
      id: "beauty3",
      title: "The Skin Transformation Sculpture",
      description: "Concept: Beautiful skin as living architecture. Best for Anti-aging serums, moisturizers, collagen creams.",
      prompt: `Create a surrealist sculptural beauty advertisement image.\n\nTHE CONCEPT: A woman's face — only the skin, from cheekbone to jaw — emerges from white marble like a Renaissance sculpture. But where the marble ends and real skin begins, there is a magical transition. The marble side of the face is cold, grey, slightly cracked, aged. As it transforms toward living skin, it becomes luminous, warm, alive — perfect skin texture visible in extraordinary macro detail.\n\nTHE PRODUCT: [PRODUCT] rests in the carved marble hand below the face, cradled like a precious jewel. The product is what bridges stone to skin.\n\nTHE SKIN: The living side of the face has the most extraordinary skin imaginable. Photographed in ultra-macro from a few inches away — every healthy pore, every light reflection, every subtle contour is visible. The skin literally glows from within. It looks like the best skin that has ever existed.\n\nTHE MARBLE: Photorealistic white Carrara marble with grey veining. As it transitions to skin, the marble cracks and the living face emerges from beneath.\n\nLIGHTING: Cool blue light on the marble side. Warm golden light on the skin side. The exact transition point where cold meets warm is the most dramatic part of the image.\n\nBACKGROUND: Pure white or extremely light grey — clean gallery space\n\nCOMPOSITION: Profile or three-quarter angle. Face filling the upper 60% of frame. Product in the lower third.\n\nMOOD: Transformative, artistic, the idea that the product resurrects beauty from stone\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "surrealist", "transformation"],
      model: "Gemini"
    },
    {
      id: "beauty4",
      title: "The Color Avalanche",
      description: "Concept: Pure pigment in motion — color as a force of nature. Best for Eyeshadow palettes, lipstick, blush.",
      prompt: `Create an explosively colorful beauty advertisement image.\n\nTHE CONCEPT: [PRODUCT] — a makeup compact, palette, or lipstick — sits at the bottom of the frame. From it erupts a massive avalanche of pure pigment powder. The pigment is alive. It moves like water, like smoke, like a storm. It fills the entire upper frame with a dramatic explosion of color.\n\nTHE PRODUCT: Clean, precise, beautiful at the bottom of the frame. The source of the chaos above it. The contrast between its controlled packaging and the wild color explosion above is the entire point.\n\nTHE PIGMENT EXPLOSION: Ultra-detailed powder particles caught mid-flight. Individual particles visible at micro level. The overall shape is like a wave about to crash, or a storm cloud, or a geyser. Colors layer and blend mid-air — the exact colors of [PRODUCT]'s actual shades.\n\nPARTICLE DETAIL: Some particles are crystalline and catch the light like glitter. Some are soft matte clouds. Some are translucent. The mix creates extraordinary depth and texture.\n\nCOLOR: The explosion uses only the colors of [PRODUCT] — if it is a rose gold palette, the explosion is rose, gold, and champagne. If it is a bold lip, the explosion is the exact lip color. MONOCHROMATIC OR CLOSELY RELATED COLORS ONLY — no rainbow unless the product is literally rainbow.\n\nBACKGROUND: Solid black — makes every particle of color visible with maximum drama\n\nLIGHTING: Multiple light sources hitting the pigment cloud from different angles — some particles glow, some cast tiny shadows on neighboring particles\n\nBOTTOM THIRD: The actual product, clean and perfect. Small text space below it.\n\nMOOD: Explosive, creative, pure emotion, the feeling of being a makeup artist with no rules\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "pigment", "explosive"],
      model: "Gemini"
    },
    {
      id: "beauty5",
      title: "The Water Goddess",
      description: "Concept: Product and water as one force. Best for Hydrating serums, moisturizers, toners.",
      prompt: `Create a breathtaking water-and-beauty fusion advertisement image.\n\nTHE CONCEPT: A woman's face and [PRODUCT] exist within and around cascading water simultaneously. The water flows through and around everything — the product bottle, the woman's glowing skin — in one seamless, magnificent composition.\n\nTHE WOMAN: Only a portion of her face is visible — the eye and cheekbone area. Her skin is extraordinarily luminous — lit from within, perfect, deeply hydrated. Water streams down her face like rain but makes her look MORE beautiful, not wet. Like water is her natural element.\n\nTHE WATER: Multiple streams and sheets of water flow at different speeds and angles. Some are crystal clear. Some catch the light and turn to pure white or gold. Some slow to individual droplets suspended mid-air. The water is the hero element of the image as much as the product.\n\nTHE PRODUCT: [PRODUCT] appears submerged in the water OR water flows directly out of or into it — the product and the water are connected. One causes the other.\n\nLIGHTING: Backlit through the water — creates a glowing, divine light quality. The water acts as a lens, bending and refracting light in beautiful ways.\n\nCOLOR: Deep teal to aquamarine to pure white where water catches light. The product's colors appear jewel-like within the cool water tones.\n\nUNDERWATER ELEMENT: Optional — the bottom of the frame transitions to looking slightly underwater, with light caustics (dancing light patterns) on the "floor."\n\nMOOD: Divine, refreshing, the purest hydration, ancient and modern simultaneously, overwhelming lushness\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "hydration"],
      model: "Gemini"
    },
    {
      id: "beauty6",
      title: "The Skin Microscope",
      description: "Concept: Make skin health visible at the cellular level. Best for Serums, treatments, retinol.",
      prompt: `Create a scientific-beautiful advertisement image that makes skin biology visually extraordinary.\n\nTHE CONCEPT: A split view — one side shows a beautiful macro photograph of glowing human skin. The other side shows what is happening INSIDE that skin — a gorgeous, colorful, scientifically-inspired visualization of skin cells, collagen networks, and the product working at a microscopic level. The two views are the same skin from two different distances.\n\nOUTER SKIN VIEW (left side):\nA strip of the most beautiful human skin ever photographed. Warm honey-gold tones. Ultra-macro — individual texture visible. Tiny light reflections on each micro-surface. The skin has a barely-visible inner glow.\n\nINNER SKIN VIEW (right side):\nA stylized but scientifically-grounded cross-section showing: skin layers as horizontal bands of color (epidermis / dermis / hypodermis), collagen fibers as glowing white threads running vertically, cells as perfect luminous spheres, and [PRODUCT]'s key ingredient as a glowing golden particle moving through the layers toward the surface.\n\nCONNECTING ELEMENT: A thin beam of light or a glowing line connects the two halves, showing they are the same skin viewed differently.\n\nTHE PRODUCT: [PRODUCT] appears small in one corner, with a thin glowing line connecting it to the micro-visualization — showing it is the source of what is happening inside the skin.\n\nCOLOR PALETTE: Warm skin tones on the left. Luminous blues, golds, and greens on the right (scientific palette). Where they meet: beautiful gradient transition.\n\nTYPOGRAPHY SPACE: Clean label areas for ingredient callouts around the micro-visualization.\n\nMOOD: Intelligent, trustworthy, visually extraordinary, the feeling of looking at beauty science for the first time\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "macro", "science"],
      model: "Gemini"
    },
    {
      id: "beauty7",
      title: "The Golden Ratio",
      description: "Concept: Beauty mathematics made visual — perfection through formula. Best for Precision serums, anti-aging.",
      prompt: `Create a mathematically beautiful advertisement image.\n\nTHE CONCEPT: The golden ratio spiral (Fibonacci spiral) is drawn in glowing gold lines over the face of a beautiful woman. The [PRODUCT] sits at the smallest point of the spiral — the origin point. The spiral expands outward from the product, through her skin, past her cheekbone, sweeping across her perfect features. The product is the mathematical origin of beauty itself.\n\nTHE WOMAN: High-fashion model. Perfect symmetrical features. Skin photographed in extraordinary detail — flawless, luminous. Not heavily edited — naturally extraordinary. She faces slightly to the side so the spiral has room to expand across her face.\n\nTHE GOLDEN RATIO OVERLAY: Precise, thin golden lines forming the Fibonacci spiral. Glowing softly — not harsh, not too bright. The spiral feels organic, not digital. As if it is etched by light into the air in front of her face.\n\nTHE PRODUCT: [PRODUCT] is placed at the innermost point of the spiral. It glows slightly. The spiral radiates outward from it. The message: "This is where beauty begins."\n\nBACKGROUND: Deep, dark, velvety — black or very deep midnight. Makes the gold lines and her skin glow.\n\nADDITIONAL MATHEMATICAL ELEMENTS (subtle): In the far background, barely visible — more mathematical formulas, geometry, sacred geometry patterns. Like wallpaper. Adds intellectual depth.\n\nCOLOR: Deep dark background. Golden spiral lines. Warm skin tones. [PRODUCT] in its natural packaging colors.\n\nMOOD: Intellectual luxury, scientific perfection, the intersection of art and science, timeless\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "math", "precision"],
      model: "Gemini"
    },
    {
      id: "beauty8",
      title: "The Ingredient Journey",
      description: "Concept: Show the hero ingredient in its most beautiful natural form. Best for Natural skincare, vitamin C.",
      prompt: `Create an epic ingredient-origin advertisement image.\n\nTHE CONCEPT: Three worlds in one image. World 1: The raw natural source of [PRODUCT]'s hero ingredient in its most spectacular natural form — a perfect lemon slice backlit by sun, a field of roses at dawn, a piece of volcanic glass, a honeycomb dripping gold. World 2: That same ingredient in its extracted, refined form — pure liquid or crystalline solid, glowing and perfect. World 3: [PRODUCT] — the final, beautiful result of this journey.\n\nVISUAL FLOW: The three elements are arranged diagonally across the frame — raw ingredient in the top left, refined ingredient in the center, final product in the bottom right. A subtle visual connection (a droplet path, a line of light, a trailing wisp of mist) connects all three.\n\nRAW INGREDIENT PHOTOGRAPHY:\nExtreme close-up, ultra-detailed. If it is citrus — backlit so light glows through the membrane segments. If it is a rose — individual dew drops on petals. If it is a plant — microscopic detail of the plant structure. It should look like the most beautiful photograph ever taken of this ingredient.\n\nREFINED INGREDIENT: A single droplet or crystal of the pure extracted ingredient. Glowing with internal light. Almost supernatural in its purity.\n\nTHE PRODUCT: [PRODUCT] beautiful and premium. The culmination of the journey.\n\nBACKGROUND: Deep dark or natural environment depending on the ingredient.\n\nCOLOR PALETTE: Drawn from the natural ingredient — if it is honey, the palette is deep amber and gold. If it is rose, it is blush and cream. If it is charcoal, it is dark and dramatic.\n\nMOOD: The entire journey from nature to your skin — pure, authentic, extraordinary sourcing\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "natural", "ingredients"],
      model: "Gemini"
    },
    {
      id: "beauty9",
      title: "The Texture Close-Up",
      description: "Concept: Make the product texture so visually satisfying it is impossible not to want it. Best for Creams, gel.",
      prompt: `Create a visually ASMR-inducing texture advertisement image.\n\nTHE CONCEPT: Pure, extreme close-up of [PRODUCT]'s texture in the most satisfying configuration possible. A spatula or finger gently pressing into or lifting from the product — caught at the precise perfect moment when the texture is doing something extraordinary. The image is so tactile, so satisfying, the viewer will feel the urge to touch their screen.\n\nTHE MOMENT: Choose the single most satisfying texture moment:\nOPTION A — The peak: Product scooped upward, forming a perfect mountain peak that defies gravity, holding its shape\nOPTION B — The drag: A finger dragging through the product, leaving a perfect valley that slowly fills back\nOPTION C — The ribbon: Product flowing in a perfect ribbon from a spatula, catching light as it falls\nOPTION D — The glisten: Product surface in extreme close-up, showing micro-reflections on each tiny surface wave\nOPTION E — The fold: A dollop of product being folded, showing perfect layers\n\nSURFACE DETAIL: Every micro-bubble, every tiny reflection, every subtle imperfection that proves it is real. Ultra-sharp. The texture fills 90% of the frame.\n\nLIGHTING: Multiple small light sources creating thousands of tiny reflections on the product surface. Makes the product look almost luminescent.\n\nCOLOR: The product's true, accurate color — vivid and rich. No color correction that makes it look artificial.\n\nHAND ELEMENT: If a hand or spatula is present — pristine skin, elegant proportion, only partially visible.\n\nBACKGROUND: Almost none — the product fills the frame entirely.\n\nMOOD: Deeply satisfying, indulgent, the physical sensation of luxury you can see\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "texture", "asmr"],
      model: "Gemini"
    },
    {
      id: "beauty10",
      title: "The Crystalline Formula",
      description: "Concept: Make the formula's active ingredients look like precious gemstones. Best for Active ingredient products.",
      prompt: `Create an extraordinary macro gemstone beauty advertisement image.\n\nTHE CONCEPT: [PRODUCT] sits at the top of the frame, tilted slightly, with its formula pouring downward in extreme slow motion. But as the formula falls, it crystallizes into thousands of perfect gemstones — tiny rubies, sapphires, diamonds, and emeralds, each one catching the light perfectly. The formula is literally liquid gemstones. The ingredients are this precious.\n\nTHE POUR: A thick, slow cascade from the product — almost honey-like in its movement. Ultra-macro detail on the liquid as it begins to crystallize.\n\nTHE CRYSTALS: At various points along the pour, individual crystals have fully formed. Some are perfect geometric shapes — octahedrons, cubes, spheres. Some are rough-cut. All are translucent and catching the light beautifully. They seem to have weight — falling at different speeds.\n\nTHE LIGHT: A pure white light source backlights the entire composition. Every crystal refracts the light into tiny rainbow prisms. The background is filled with thousands of tiny colored light points — the refracted light from the crystals.\n\nSCALE: The product is clear and recognizable at the top. The crystals range from the size of the product itself down to microscopic dust particles.\n\nBACKGROUND: Pure white or very deep black — both work but create entirely different moods. White: clinical luxury. Black: dramatic luxury.\n\nCOLOR OF CRYSTALS: Matches the product's ingredients — vitamin C = golden amber crystals. Rose extract = blush pink crystals. Charcoal = obsidian black crystals. Diamond = pure clear crystals.\n\nMOOD: The formula is worth more than you know. This is alchemy. Science as jewelry.\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "crystals", "formula"],
      model: "Gemini"
    },
    {
      id: "beauty11",
      title: "The Renaissance Portrait",
      description: "Concept: Old Masters painting meets modern beauty product. Best for Luxury skincare, foundation.",
      prompt: `Create a beauty advertisement image that merges Renaissance oil painting with modern photography.\n\nTHE CONCEPT: A woman photographed to look exactly like a Vermeer, Rembrandt, or Botticelli painting — but photorealistic. The chiaroscuro (light and shadow) technique of the Old Masters. The color palette of centuries-old oil paintings. The timeless composition. But the [PRODUCT] in her hand, at her vanity, or resting before her is completely modern, pristine, and contemporary.\n\nTHE WOMAN: Classic Renaissance beauty ideal — but expressed through modern photography. Strong bone structure. Calm, knowing expression. She is not posing for us — she is existing, and we are observing. Rich, elaborate fabric in the background or draped around her.\n\nTHE LIGHT: Pure Rembrandt lighting — one strong warm light source from the upper left or right. Deep shadows on the opposite side of her face. The light falls specifically on her cheekbone, her brow, her nose. Exactly as in an Old Masters painting.\n\nCOLOR PALETTE: Warm amber, deep brown, rich cream, gold — the palette of aged oil paintings. Her skin luminous within this warm darkness. The [PRODUCT] pops as a modern accent — its contemporary packaging gleaming.\n\nTHE PRODUCT: [PRODUCT] held delicately, placed on a dark wooden vanity, or resting beside period objects (a single rose, a small mirror, a string of pearls). It is clearly modern — this contrast IS the concept.\n\nPAINTING TEXTURE: Very subtle — as if the image has the texture of a canvas beneath it. Not obviously a filter. Just barely there.\n\nCOMPOSITION: Tight portrait, upper body only. Dark background. Classic beauty.\n\nMOOD: Timeless, artistic authority, the feeling that great beauty has always existed and always will\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "cinematic", "renaissance"],
      model: "Gemini"
    },
    {
      id: "beauty12",
      title: "The Neon Noir",
      description: "Concept: Film noir meets neon beauty — dark, dramatic, unforgettable. Best for Dark makeup lines, bold lipstick.",
      prompt: `Create a neon-noir beauty advertisement image.\n\nTHE CONCEPT: Film noir aesthetic meets futuristic neon beauty. Black and white photography but with ONLY the product and one specific makeup element rendered in vivid neon color — everything else remains in black and white.\n\nTHE SCENE: A woman in a dark, atmospheric setting — rain-wet window behind her, fog, shadows. Classic noir composition. She is looking away or at a 3/4 angle. Mysterious. The setting feels like 1940s Los Angeles reimagined in a cyberpunk future.\n\nBLACK AND WHITE: Everything — her skin, her clothes, the background, the shadow, the rain — is in perfect black and white photography. Ultra-high contrast. Deep blacks. Bright whites. Classic film grain.\n\nTHE NEON COLOR ACCENT: ONLY the [PRODUCT] and ONLY the makeup look it creates remain in color. If the product is a red lipstick — only the lips are in vivid red and the product package is red. Everything else: black and white. If the product is a purple eyeshadow — only the eyeshadow and the product are in that purple.\n\nTHE NEON GLOW: The color element glows slightly — as if it is lit from within. A subtle neon halo.\n\nLIGHTING: Hard dramatic shadows. A single light source from the side. Classic noir.\n\nRAIN ELEMENT: Rain streaks on a window behind her OR light mist in the air creating atmosphere.\n\nNEON SIGN ELEMENT: Very subtle — distant neon lights reflected in a wet surface. Just a color suggestion.\n\nMOOD: Dangerous beauty, cinematic drama, unforgettable, the kind of image you stop and stare at\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "cinematic", "noir"],
      model: "Gemini"
    },
    {
      id: "beauty13",
      title: "The Double Exposure Portrait",
      description: "Concept: Person and nature merged into one. Best for Natural skincare, organic beauty.",
      prompt: `Create a double-exposure beauty advertisement image.\n\nTHE CONCEPT: A beautiful woman's face and a lush natural landscape are combined in a perfect double exposure. The silhouette of her face contains an entire world — forests, flowers, waterfalls, blooming botanicals. She IS nature. And [PRODUCT] emerges from this natural world.\n\nTHE PORTRAIT SILHOUETTE: A clean, strong profile or 3/4 angle silhouette of a woman. The silhouette is the container for the entire natural world inside it.\n\nTHE WORLD WITHIN: Inside her silhouette — a lush, green, extraordinary landscape. Dense tropical forest canopy. A field of wildflowers at golden hour. A waterfall cascading. Sunlight filtering through leaves. All ultra-detailed, beautiful, real. The trees grow in her hair. The flowers bloom across her cheek. The waterfall flows along her jaw.\n\nTHE DOUBLE EXPOSURE TECHNIQUE: Her face is faintly visible within the nature — just barely. The edges of her features define the edges of the forest canopy, the horizon, the treeline. Nature and face are perfectly merged.\n\nTHE PRODUCT: [PRODUCT] appears in one of two ways:\nOPTION A: Held gently at the base of the image, in her real (not double-exposed) hand\nOPTION B: Floating within the natural world inside her silhouette — like it grows there naturally\n\nCOLOR: The woman's skin takes on the warm green, gold, and earthy tones of the nature within her. The overall palette is rich botanical — deep greens, warm golds, flower pinks.\n\nBACKGROUND: Very clean, very light — almost white or a pale sky color. Makes the double exposure silhouette maximum impact.\n\nMOOD: At one with nature, authentic, the product is literally born from the earth she contains\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "cinematic", "double-exposure"],
      model: "Gemini"
    },
    {
      id: "beauty14",
      title: "The Glass Skin Editorial",
      description: "Concept: The most beautiful skin ever photographed. Best for Foundations, BB creams, glass skin products.",
      prompt: `Create the most extraordinary skin photography advertisement image ever conceived.\n\nTHE CONCEPT: The entire image is dedicated to showcasing the single most perfect, luminous, glass-like skin ever photographed. Not a person — the SKIN. The [PRODUCT] creates this skin. Nothing else in the frame should distract from it.\n\nTHE SKIN: A portion of a woman's face — cheekbone to chin, or forehead to cheekbone — fills the frame. EXTREME macro. Every perfect pore is visible but looks like an artistic micro-texture, not a flaw. The surface of the skin reflects light exactly like a still water surface or polished glass. Multiple tiny light reflections create a constellation of highlights across the high points of her skin.\n\nTHE GLOW: The skin appears to be lit from WITHIN. Not from external light — from a genuine inner radiance. This is the glass skin effect. The entire surface has a uniform, extraordinary luminosity that looks simultaneously matte and dewy.\n\nTHE LIGHT: One strong backlight creates a halo around the edges of her face. One soft frontal fill light. The combination creates dimensional, almost holographic skin.\n\nMICRO DETAIL: At this extreme close-up level — tiny fine hairs catch the backlight and glow. Individual skin cells appear to have dimension. Micro-highlights sit at the very top of every microscopic skin surface. It looks like the most beautiful photograph of human skin ever taken.\n\nCOLOR: The skin color is warm, even, luminous — think Korean beauty "glass skin" taken to the absolute maximum. No visible pores in terms of texture — only ultra-fine micro-texture.\n\nTHE PRODUCT: Small, perfect, in the corner or bottom edge. Simple placement. Let the skin sell it.\n\nBACKGROUND: Completely blown out white. The skin floats in pure light.\n\nMOOD: The pinnacle of skin perfection. This is what the product does. This is what it looks like.\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "cinematic", "glass-skin"],
      model: "Gemini"
    },
    {
      id: "beauty15",
      title: "The Vanity Table Fantasy",
      description: "Concept: A woman's beauty world as a fantasy realm. Best for Makeup collections, skincare sets.",
      prompt: `Create a fantasy vanity table advertisement image.\n\nTHE CONCEPT: An impossibly beautiful vanity table — the ultimate beauty setup — exists in a dreamy, slightly surreal world. Everything about it is elevated beyond reality. The products are arranged as if by an artist. The setting is magical. And [PRODUCT] is the centerpiece of it all.\n\nTHE VANITY: An ornate, beautiful surface — antique gold-framed mirror, marble surface, or modern acrylic. The table is beautiful in itself.\n\nTHE SETUP: [PRODUCT] sits at the center, elevated slightly — on a small stand or resting on a velvet surface. Around it, a carefully curated world: a single perfect rose in a crystal vase, other beautiful products arranged with intention, small golden tools, a vintage perfume bottle, scattered petals, perhaps a trailing vine of small white flowers. Everything has purpose. Nothing is random.\n\nTHE LIGHTING: A practical light source in the scene — the mirror has lit bulbs, or candlelight, or a window of golden light. This light fills the scene with warmth. Some elements catch the light and sparkle.\n\nTHE SCALE: Slightly wrong in a magical way — the flowers might be slightly too large. The mirror might reflect a different, even more beautiful scene than what we see in reality. Just slightly off from reality, in a beautiful way.\n\nTHE MIRROR REFLECTION: The mirror shows a reflection — but the reflection is even more beautiful and idealized than the real table. In the reflection, the products glow slightly. The reflection is the aspirational version.\n\nCOLOR PALETTE: Rich, warm, feminine luxury — gold, deep rose, cream, blush, champagne, pearl white.\n\nATMOSPHERE: A small amount of atmospheric haze or golden dust particles in the air. Like the light itself is precious.\n\nMOOD: Aspirational perfection, feminine luxury, the beauty ritual as a sacred experience\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "cinematic", "lifestyle"],
      model: "Gemini"
    },
    {
      id: "beauty16",
      title: "The Color Drip Face",
      description: "Concept: Makeup as liquid art — color as emotional expression. Best for Bold lipstick, dramatic eyeshadow.",
      prompt: `Create an avant-garde beauty advertisement image.\n\nTHE CONCEPT: A woman's face — beautiful, strong-featured, with perfect skin — has [PRODUCT]'s color dripping down her face in controlled, perfect streams. But this is not accidental — it is intentional, beautiful, artistic. The drips are perfectly formed. They follow the contours of her face. They are art.\n\nTHE FACE: Strong, high-fashion model face. Minimal makeup except for the color drip effect. Her expression: calm, powerful, in control. She chose this. She is not a victim of the drip — she IS the drip.\n\nTHE DRIP: [PRODUCT]'s exact color — rich, saturated, vivid — dripping in perfect streams from: the outer corner of her eye, her lower lip, her cheekbone. The drips are thick and move slowly — caught at different stages. Some drips have just started (small, beading). Some are long streams. Some have reached her chin and are about to fall as a perfect drop.\n\nDRIP DETAIL: Ultra-close detail at some drip points — you can see the viscosity, the surface tension, the way light refracts through the color.\n\nHANDS: Her hands — with perfectly matching [PRODUCT COLOR] on her nails — frame her face or reach up to touch the drips. Accepting them. Celebrating them.\n\nBACKGROUND: Pure white — makes every color and skin tone pop with maximum contrast.\n\nLIGHTING: Clean, bright, beauty editorial lighting. Multiple sources. Perfect, even skin.\n\nCOMPOSITION: Face fills the frame, slightly off-center. Drips create vertical leading lines.\n\nMOOD: Bold, artistic, unapologetic, beauty as self-expression, the product as paint and her face as canvas\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "avant-garde", "art"],
      model: "Gemini"
    },
    {
      id: "beauty17",
      title: "The Mirror Infinite",
      description: "Concept: Beauty reflected into infinity. Best for Anti-aging, luxury serums.",
      prompt: `Create a hypnotic infinity-mirror beauty advertisement image.\n\nTHE CONCEPT: A woman stands between two mirrors facing each other, creating an infinite reflection tunnel. The reflections extend backward into infinite depth. But in each successive reflection, her skin is slightly different — younger, more radiant, more luminous. The [PRODUCT] is what creates this progression.\n\nTHE WOMAN: She faces the camera directly. Beautiful, confident, perhaps 35-45 years old — age is her power, not her problem. She holds [PRODUCT] in one hand, close to her chest.\n\nTHE MIRROR TUNNEL: On either side of her, the reflections extend backward in perfect perspective lines, creating the infinite tunnel effect. Warm light at the center where she stands. Slightly cooler, more blue light deep in the reflections.\n\nTHE PROGRESSION: In each successive reflection behind her, her skin appears at a different stage — not drastically, subtly. The furthest visible reflections show slightly more luminous skin. The [PRODUCT] in each reflection glows slightly brighter.\n\nTHE LIGHT: Warm golden light falls on the real her in the foreground. As the reflections recede, the light shifts from gold to champagne to soft white to a distant, almost divine glow at the infinite point.\n\nFLOOR AND CEILING: Mirrored surfaces top and bottom as well — the effect extends vertically, creating a cube of infinity.\n\nSINGLE FLOWER: One real flower petal floating at the center of the infinite space — its reflections multiplied to infinity in the mirrors. Tiny detail. Enormous visual impact.\n\nMOOD: Eternal, powerful, the product works across time, beauty is infinite, the self multiplied\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "avant-garde", "infinite"],
      model: "Gemini"
    },
    {
      id: "beauty18",
      title: "The Botanical Dissection",
      description: "Concept: Science and beauty fused — the ingredient as art. Best for Clinical skincare, botanical serums.",
      prompt: `Create a scientific-botanical advertisement image of extraordinary beauty.\n\nTHE CONCEPT: A scientific botanical illustration style — but photorealistic and contemporary, not vintage. The hero ingredient of [PRODUCT] is displayed as if for a scientific study, but elevated to pure art. It is simultaneously a science paper illustration and a luxury art print.\n\nTHE CENTRAL ELEMENT: The hero ingredient at every stage: the whole plant or fruit at upper left, a cross-section of it in the center (cut with a surgeon's precision to show the beautiful internal structure), isolated molecules or droplets at lower right. All on a cream or white background that looks like high-quality paper.\n\nTHE INGREDIENT DETAIL:\n- If citrus: a perfect lemon cross-section showing every segment in extreme detail, a floating peel, extracted oil droplets like tiny suns\n- If rose: a full rose at every stage of bloom, a single petal cross-section, rose oil droplets\n- If sea kelp: fronds in stunning detail, cellular structure visible, mineral particles isolated\nThe detail should be so extraordinary it looks like a discovery.\n\nBOTANICAL ILLUSTRATION ELEMENTS: Thin, precise measurement lines and callout lines (pointing to specific parts) with empty label spaces. Tiny scientific notation areas. A subtle grid pattern in the background like graph paper — very subtle.\n\nTHE PRODUCT: [PRODUCT] sits at the bottom of the composition, clean and modern. A thin line connects it to the botanical above — showing it is the result of all this extraordinary natural science.\n\nCOLOR: The botanical element's true colors — vivid, accurate, beautiful. Background: warm white cream. Lines: dark navy or forest green — classic scientific illustration.\n\nMOOD: Intelligent luxury, the science behind beauty made visible and beautiful, trust through knowledge\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "avant-garde", "science"],
      model: "Gemini"
    },
    {
      id: "beauty19",
      title: "The Chroma Key Explosion",
      description: "Concept: Pure color as a landscape. Best for Any single-hero-color product.",
      prompt: `Create an abstract color-landscape beauty advertisement image.\n\nTHE CONCEPT: The exact color of [PRODUCT] becomes the entire world of the image. Everything is that color — in every shade, tone, and value of that single hue. From darkest shadow to lightest highlight, the entire image exists in a monochromatic world built around [PRODUCT]'s signature color. And within that world, the product glows as the purest, most perfect expression of that color.\n\nTHE COLOR WORLD: Imagine a world that exists entirely in [PRODUCT COLOR]. The background is a deep, rich [COLOR]. Mid-ground elements — abstract shapes, swirling smoke, floating particles — are medium [COLOR]. Highlights are the palest, most luminous [COLOR] approaching white. Shadows are the deepest, almost black [COLOR].\n\nABSTRACT ELEMENTS: The world contains: flowing silk fabric in [COLOR]. Smoke or mist in [COLOR]. Powder explosions in [COLOR]. Petals in [COLOR]. All abstract, all moving, all [COLOR].\n\nTHE PRODUCT: [PRODUCT] sits at the center or lower-center. It is the ONLY element that is a different value — it is the most saturated, most perfect, most vivid version of [COLOR] in the entire image. It is the origin of the color. The world radiates from it.\n\nONE CONTRAST ELEMENT: One tiny element of white or complementary color — a single white petal, a gold accent — that makes the monochromatic world even more powerful by its absence from it.\n\nSKIN ELEMENT: Optional — a woman's lips or eye, rendered in [COLOR] tones, appear in the upper portion of the frame. Her makeup is the purest version of this color.\n\nLIGHTING: The light source itself appears to be [COLOR] — the entire world is bathed in this light.\n\nMOOD: Total commitment to this color, this shade, this exact product. Overwhelming beauty. One color rules everything.\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "avant-garde", "color"],
      model: "Gemini"
    },
    {
      id: "beauty20",
      title: "The Sacred Ritual",
      description: "Concept: Skincare as ceremony — beauty as a spiritual practice. Best for Luxury serums, holistic beauty brands.",
      prompt: `Create a deeply atmospheric, ceremonial beauty advertisement image.\n\nTHE CONCEPT: The application of [PRODUCT] is portrayed as a sacred ritual — ancient, intentional, spiritual. The imagery draws from: Japanese tea ceremony, ancient Greek temple offerings, alchemical practices, and modern meditative beauty. The product is precious. Its application is ceremony.\n\nTHE SCENE: A dark, intimate setting. A stone or marble surface in dim, warm light. Only the objects of the ritual are visible. [PRODUCT] sits at the center — elevated, perhaps on a small natural stone pedestal or nestled in dark petals.\n\nTHE RITUAL ELEMENTS ARRANGED AROUND THE PRODUCT:\nA single lit candle at one edge (warm flame, soft glow)\nA small dish of flower petals — the hero ingredient's flower\nA crystal or natural stone\nA dropper or applicator tool, carefully positioned\nPerhaps a small bowl of water with a floating flower\n\nHANDS: Entering from the bottom of the frame — elegant hands beginning to reach for the product. Deliberate. Slow. Ceremonial. This gesture alone conveys respect for what they are about to use.\n\nLIGHTING: The entire image is lit only by candlelight — warm, amber, flickering. Deep shadows surround the scene. Only the ritual objects are illuminated.\n\nSTEAM OR MIST: Very subtle — a thin wisp of steam rising from the candle or a nearby hot water element. Creates atmosphere and dimension.\n\nTHE PRODUCT GLOW: [PRODUCT] has a very subtle inner glow — warmer than the candlelight around it. As if it contains its own light.\n\nBACKGROUND: Absolute darkness. The ritual exists in its own small world of light.\n\nMOOD: Sacred, intentional, the product is precious, applying this is the most important moment of your day, ancient wisdom in modern form, the ritual IS the product\n\nPhotorealistic, ultra high resolution, commercial beauty campaign quality, shot by a world-class photographer for a luxury fashion magazine, cinematic color grading, award-winning art direction.`,
      tags: ["beauty", "avant-garde", "ritual"],
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
      imageUrl: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&q=80&fit=crop"
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
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80&fit=crop"
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
