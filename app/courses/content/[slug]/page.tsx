import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLessonDetail, getLessonMeta } from '@/app/lib/lessons';
import { ogImage } from '@/app/lib/site';
import LessonView from './lessonView';

type Props = { params: Promise<{ slug: string }> };

// Cache rendered lesson pages for 5 minutes: fast repeat visits, fresh content.
// An empty list means nothing is prerendered at build time, but the first
// request for a lesson is cached (on-demand ISR) instead of hitting Mongo.
export const revalidate = 300;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonMeta(slug);

  const title = lesson?.title ? `${lesson.title} — Lesson` : 'Lesson';
  const description =
    lesson?.description?.trim() ||
    'Follow this PFSchools lesson section by section, at your child’s own pace.';

  const images = lesson?.thumbnail
    ? [{ url: lesson.thumbnail, alt: lesson.title ?? title }]
    : [ogImage];

  return {
    title,
    description,
    alternates: { canonical: `/courses/content/${slug}` },
    openGraph: {
      type: 'article',
      url: `/courses/content/${slug}`,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

/**
 * Server component: renders the lesson on the server so the content is
 * crawlable and missing lessons return a real 404 status.
 */
export default async function LessonContentPage({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonDetail(slug);

  if (result.status === 'unavailable') {
    throw new Error('This lesson is temporarily unavailable. Please try again.');
  }

  if (result.status !== 'ok') {
    notFound();
  }

  return <LessonView lesson={result.lesson} />;
}
