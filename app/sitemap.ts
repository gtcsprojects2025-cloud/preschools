import type { MetadataRoute } from "next";
import { getLessonsForSitemap } from "./lib/lessons";
import { siteUrl } from "./lib/site";

// Regenerate the sitemap hourly so newly published courses are picked up.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/instructors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const lessons = await getLessonsForSitemap();

  const courseRoutes: MetadataRoute.Sitemap = lessons.flatMap((lesson) => [
    {
      url: `${siteUrl}/courses/${lesson.id}`,
      lastModified: lesson.updatedAt ? new Date(lesson.updatedAt) : lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/courses/content/${lesson.id}`,
      lastModified: lesson.updatedAt ? new Date(lesson.updatedAt) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...courseRoutes];
}
