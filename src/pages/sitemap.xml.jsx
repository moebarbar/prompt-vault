import { CATEGORIES } from "@/data/prompts";

const SITE_URL = "https://www.promptupp.com";

function generateSitemap(categories) {
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/library", priority: "0.9", changefreq: "daily" },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `/library?cat=${cat.id}`,
    priority: "0.8",
    changefreq: "weekly",
  }));

  const allPages = [...staticPages, ...categoryPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap(CATEGORIES);
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
