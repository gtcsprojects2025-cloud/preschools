import { cache } from "react";
import connectDB from "./mongodb";
import Lesson from "../models/lesson";

// Keep metadata fetch from blocking the HTML response if Mongo is slow/down.
const QUERY_TIMEOUT_MS = 2500;

function withTimeout<T>(
  promise: Promise<T>,
  ms: number = QUERY_TIMEOUT_MS
): Promise<T | null> {
  return Promise.race([
    promise.catch(() => null),
    new Promise<null>((resolve) => setTimeout(resolve, ms)),
  ]);
}

export interface LessonMeta {
  title: string;
  description: string;
  thumbnail?: string;
}

/**
 * Read the fields needed to build SEO tags for a course page.
 *
 * Reuses the request-scoped cached lesson lookup so `generateMetadata` and the
 * page itself only hit MongoDB once per request.
 */
export async function getLessonMeta(id: string): Promise<LessonMeta | null> {
  const result = await getLessonDetail(id);

  if (result.status !== "ok") return null;

  return {
    title: result.lesson.title || "Course",
    description: result.lesson.description ?? "",
    thumbnail: result.lesson.thumbnail,
  } satisfies LessonMeta;
}

export interface LessonSectionDetail {
  title: string;
  duration: string;
  order: number;
  subtopics?: {
    title: string;
    duration: string;
    content: string;
    image?: string;
  }[];
}

export interface LessonDetail {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  subject?: string;
  grade?: string;
  duration?: string;
  thumbnail?: string;
  level?: string;
  students?: number;
  quizzes?: number;
  sections?: LessonSectionDetail[];
  updatedAt?: Date | string;
}

export type LessonLookup =
  | { status: "ok"; lesson: LessonDetail }
  | { status: "not-found" }
  | { status: "unavailable" };

/**
 * Load a full lesson for server-rendered course pages.
 *
 * Distinguishes "does not exist" (404) from "database unavailable" (500) so a
 * transient outage never tells Google that a real course has been deleted.
 */
export async function getLessonDetail(id: string): Promise<LessonLookup> {
  return loadLessonDetail(id);
}

/**
 * Request-scoped memoised lookup (React `cache`) so a layout's
 * `generateMetadata` and the page body share a single MongoDB query.
 */
const loadLessonDetail = cache(async (id: string): Promise<LessonLookup> => {
  if (!id) return { status: "not-found" };

  try {
    const lesson = (await Promise.race([
      (async () => {
        await connectDB();
        return Lesson.findById(id).select("-__v").lean();
      })(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Lesson query timed out")), QUERY_TIMEOUT_MS)
      ),
    ])) as LessonDetail | null;

    return lesson ? { status: "ok", lesson } : { status: "not-found" };
  } catch (error) {
    console.error("Failed to load lesson detail:", error);
    return { status: "unavailable" };
  }
});

/**
 * Used by the sitemap to include every published course.
 */
export async function getLessonsForSitemap(): Promise<
  { id: string; updatedAt?: Date | string }[]
> {
  const lessons = await withTimeout(
    (async () => {
      await connectDB();
      return (await Lesson.find({})
        .select("_id updatedAt")
        .sort({ createdAt: -1 })
        .lean()) as { _id: unknown; updatedAt?: Date | string }[];
    })()
  );

  return (lessons ?? [])
    .map((lesson) => ({
      id: String(lesson._id),
      updatedAt: lesson.updatedAt,
    }))
    .filter((lesson) => lesson.id);
}
