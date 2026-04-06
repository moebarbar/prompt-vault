/**
 * node scripts/seed-experts.js
 * Assigns expert attribution to all 29 Goal Pack bundles.
 * Replace YOUR_PHOTO_URL with your hosted headshot URL before running.
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Replace this with your actual hosted photo URL ────────────────────────────
const MOE_PHOTO = "YOUR_PHOTO_URL";
// ─────────────────────────────────────────────────────────────────────────────

// randomuser.me gives real human face photos — stable URLs
const r = (n, gender = "men") => `https://randomuser.me/api/portraits/${gender}/${n}.jpg`;

// Expert assignments — keyed by partial title match
const EXPERTS = [
  // ── Your bundles (coding / SaaS / tech) ──────────────────────────────────
  {
    titleIncludes: "SaaS",
    expert_name: "Moe Barbar",
    expert_title: "SaaS Founder & Full-Stack Engineer",
    expert_bio: "Builder of multiple SaaS products. Passionate about turning ideas into scalable software fast.",
    expert_image_url: MOE_PHOTO,
    expert_twitter: "immoebarbar",
    expert_website: "https://promptupp.com",
  },
  {
    titleIncludes: "Vibe Cod",
    expert_name: "Moe Barbar",
    expert_title: "SaaS Founder & Full-Stack Engineer",
    expert_bio: "Builder of multiple SaaS products. Passionate about turning ideas into scalable software fast.",
    expert_image_url: MOE_PHOTO,
    expert_twitter: "immoebarbar",
    expert_website: "https://promptupp.com",
  },
  {
    titleIncludes: "MVP",
    expert_name: "Moe Barbar",
    expert_title: "SaaS Founder & Full-Stack Engineer",
    expert_bio: "Builder of multiple SaaS products. Passionate about turning ideas into scalable software fast.",
    expert_image_url: MOE_PHOTO,
    expert_twitter: "immoebarbar",
    expert_website: "https://promptupp.com",
  },
  {
    titleIncludes: "Digital Product",
    expert_name: "Moe Barbar",
    expert_title: "SaaS Founder & Product Builder",
    expert_bio: "Launched 5 digital products in 12 months. Obsessed with fast execution and validated ideas.",
    expert_image_url: MOE_PHOTO,
    expert_twitter: "immoebarbar",
    expert_website: "https://promptupp.com",
  },

  // ── Other experts ─────────────────────────────────────────────────────────
  {
    titleIncludes: "10,000 Followers",
    expert_name: "Alex Rivera",
    expert_title: "Social Media Growth Strategist",
    expert_bio: "Grew 3 accounts to 100K+ followers organically. Teaches creators how to build real audiences.",
    expert_image_url: r(12),
    expert_twitter: "alexrivera",
  },
  {
    titleIncludes: "Freelance Client",
    expert_name: "Sarah Mitchell",
    expert_title: "6-Figure Freelance Consultant",
    expert_bio: "Left corporate after landing her first $10K client. Now helps freelancers close premium deals.",
    expert_image_url: r(44, "women"),
    expert_linkedin: "sarahmitchell",
  },
  {
    titleIncludes: "Email Subscriber",
    expert_name: "James Okafor",
    expert_title: "Newsletter Operator & Growth Expert",
    expert_bio: "Grew his newsletter to 50K subscribers in 18 months. Monetization-first mindset.",
    expert_image_url: r(33),
    expert_twitter: "jamesokafor",
  },
  {
    titleIncludes: "Funding",
    expert_name: "Priya Nair",
    expert_title: "Venture-Backed Founder & Pitch Coach",
    expert_bio: "Raised $2M seed round. Helps founders craft compelling investor narratives.",
    expert_image_url: r(55, "women"),
    expert_linkedin: "priyanair",
  },
  {
    titleIncludes: "Full-Time Freelancer",
    expert_name: "Marcus Webb",
    expert_title: "Freelance Business Coach",
    expert_bio: "Quit his 9-to-5 and hit $15K/month in freelance income within 8 months.",
    expert_image_url: r(7),
    expert_twitter: "marcuswebb",
  },
  {
    titleIncludes: "Newsletter",
    expert_name: "Laila Hassan",
    expert_title: "Newsletter Monetization Expert",
    expert_bio: "Turned a free newsletter into a $8K/month business. Writes about creator economics.",
    expert_image_url: r(22, "women"),
    expert_twitter: "lailahassan",
  },
  {
    titleIncludes: "New Job",
    expert_name: "Daniel Park",
    expert_title: "Career Strategist & Ex-Recruiter",
    expert_bio: "Former tech recruiter turned career coach. Helped 200+ professionals land dream roles.",
    expert_image_url: r(18),
    expert_linkedin: "danielpark",
  },
  {
    titleIncludes: "E-Commerce",
    expert_name: "Sofia Reyes",
    expert_title: "E-Commerce & DTC Brand Builder",
    expert_bio: "Launched 3 e-commerce stores. One crossed $500K revenue in year one.",
    expert_image_url: r(31, "women"),
    expert_twitter: "sofiareyes",
  },
  {
    titleIncludes: "Thought Leader",
    expert_name: "Nathan Brooks",
    expert_title: "Personal Brand & Content Strategist",
    expert_bio: "Built a 7-figure personal brand from scratch. LinkedIn Top Voice in Marketing.",
    expert_image_url: r(5),
    expert_linkedin: "nathanbrooks",
  },
  {
    titleIncludes: "$10K",
    expert_name: "Carmen Torres",
    expert_title: "Sales Coach & Closer",
    expert_bio: "Closed over $2M in consulting contracts. Teaches consultants to land premium clients.",
    expert_image_url: r(48, "women"),
    expert_twitter: "carmentorres",
  },
  {
    titleIncludes: "Viral",
    expert_name: "Alex Rivera",
    expert_title: "Social Media Growth Strategist",
    expert_bio: "Grew 3 accounts to 100K+ followers organically. Teaches creators how to build real audiences.",
    expert_image_url: r(12),
    expert_twitter: "alexrivera",
  },
  {
    titleIncludes: "SEO",
    expert_name: "Owen Caldwell",
    expert_title: "SEO Lead & Organic Growth Consultant",
    expert_bio: "Drove 10M+ monthly organic visits across client sites. Google algorithm obsessive.",
    expert_image_url: r(40),
    expert_website: "https://promptupp.com",
  },
  {
    titleIncludes: "Cold Email",
    expert_name: "Carmen Torres",
    expert_title: "Sales Coach & Closer",
    expert_bio: "Closed over $2M in consulting contracts. Teaches consultants to land premium clients.",
    expert_image_url: r(48, "women"),
    expert_twitter: "carmentorres",
  },
  {
    titleIncludes: "LinkedIn",
    expert_name: "Nathan Brooks",
    expert_title: "Personal Brand & Content Strategist",
    expert_bio: "Built a 7-figure personal brand from scratch. LinkedIn Top Voice in Marketing.",
    expert_image_url: r(5),
    expert_linkedin: "nathanbrooks",
  },
  {
    titleIncludes: "YouTube",
    expert_name: "Kenji Yamamoto",
    expert_title: "YouTube Strategist & Creator Coach",
    expert_bio: "Grew a channel to 250K subscribers in 14 months. Teaches the algorithm-proof content system.",
    expert_image_url: r(60),
    expert_twitter: "kenjiyamamoto",
  },
  {
    titleIncludes: "Podcast",
    expert_name: "Olivia Grant",
    expert_title: "Podcast Host & Audio Brand Expert",
    expert_bio: "Launched a top-50 business podcast from zero. Helps founders amplify their voice.",
    expert_image_url: r(35, "women"),
    expert_twitter: "oliviagrant",
  },
  {
    titleIncludes: "Brand",
    expert_name: "Sofia Reyes",
    expert_title: "Brand Strategist & DTC Expert",
    expert_bio: "Launched 3 e-commerce stores. One crossed $500K revenue in year one.",
    expert_image_url: r(31, "women"),
    expert_twitter: "sofiareyes",
  },
  {
    titleIncludes: "Dropship",
    expert_name: "Sofia Reyes",
    expert_title: "E-Commerce & DTC Brand Builder",
    expert_bio: "Launched 3 e-commerce stores. One crossed $500K revenue in year one.",
    expert_image_url: r(31, "women"),
    expert_twitter: "sofiareyes",
  },
  {
    titleIncludes: "Affiliate",
    expert_name: "James Okafor",
    expert_title: "Affiliate & Passive Income Expert",
    expert_bio: "Earns $30K/month in affiliate income across 4 niches. Systems-over-hustle approach.",
    expert_image_url: r(33),
    expert_twitter: "jamesokafor",
  },
  {
    titleIncludes: "Consulting",
    expert_name: "Priya Nair",
    expert_title: "Consulting Business Coach",
    expert_bio: "Built a 7-figure consulting practice in 3 years. Helps experts monetize their knowledge.",
    expert_image_url: r(55, "women"),
    expert_linkedin: "priyanair",
  },
  {
    titleIncludes: "Productiv",
    expert_name: "Owen Caldwell",
    expert_title: "Systems & Productivity Coach",
    expert_bio: "Helps founders reclaim 20+ hours per week with smart workflows and AI tools.",
    expert_image_url: r(40),
    expert_website: "https://promptupp.com",
  },
];

async function run() {
  const { data: bundles, error } = await supabase
    .from("prompt_bundles")
    .select("id, title")
    .or("is_published.eq.true,status.eq.published");

  if (error) { console.error("fetch error:", error.message); process.exit(1); }

  console.log(`Found ${bundles.length} published bundles\n`);

  for (const bundle of bundles) {
    const expert = EXPERTS.find((e) => bundle.title.toLowerCase().includes(e.titleIncludes.toLowerCase()));
    if (!expert) {
      console.log(`⏭  No expert match: "${bundle.title}"`);
      continue;
    }

    const { titleIncludes, ...expertFields } = expert;
    const { error: ue } = await supabase
      .from("prompt_bundles")
      .update(expertFields)
      .eq("id", bundle.id);

    if (ue) {
      console.log(`❌ Failed: "${bundle.title}" — ${ue.message}`);
    } else {
      console.log(`✅ "${bundle.title}" → ${expert.expert_name}`);
    }
  }

  console.log("\nDone!");
}

run();
