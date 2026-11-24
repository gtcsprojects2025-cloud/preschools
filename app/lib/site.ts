/**
 * Single source of truth for the canonical site URL and brand strings used in
 * metadata, structured data, robots.txt and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in your deployment environment (e.g.
 * https://pfschools.com) so canonical URLs and Open Graph tags point at the
 * real production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pfschools.com"
).replace(/\/$/, "");

export const siteName = "PFSchools";

export const siteDescription =
  "PFSchools is an innovative online learning platform where children aged 5–10 build confidence, independence and a lifelong love of learning through English, Mathematics, Logic and Science.";

export const logoPath = "/pfslogo.png";

export const ogImage = {
  url: logoPath,
  width: 500,
  height: 500,
  alt: "PFSchools logo",
};
