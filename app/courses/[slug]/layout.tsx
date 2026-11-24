import type { Metadata } from "next";
import { getLessonMeta } from "@/app/lib/lessons";
import { ogImage } from "@/app/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonMeta(slug);

  const title = lesson?.title || "Course Details";
  const description =
    lesson?.description?.trim() ||
    "Explore this PFSchools course: what your child will learn, how lessons are structured and how to enrol.";

  const images = lesson?.thumbnail
    ? [{ url: lesson.thumbnail, alt: title }]
    : [ogImage];

  return {
    title,
    description,
    alternates: { canonical: `/courses/${slug}` },
    openGraph: {
      type: "article",
      url: `/courses/${slug}`,
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

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
