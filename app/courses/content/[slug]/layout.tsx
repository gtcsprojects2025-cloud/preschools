import type { Metadata } from "next";
import { getLessonMeta } from "@/app/lib/lessons";
import { ogImage } from "@/app/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonMeta(slug);

  const title = lesson?.title ? `${lesson.title} — Lesson Content` : "Lesson Content";
  const description =
    lesson?.description?.trim() ||
    "Work through every section of this PFSchools course at your own pace.";

  const images = lesson?.thumbnail
    ? [{ url: lesson.thumbnail, alt: lesson.title }]
    : [ogImage];

  return {
    title,
    description,
    alternates: { canonical: `/courses/content/${slug}` },
    openGraph: {
      type: "article",
      url: `/courses/content/${slug}`,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export default function CourseContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
