import { notFound } from 'next/navigation';
import { Clock, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import { getLessonDetail } from '@/app/lib/lessons';

type Props = { params: Promise<{ slug: string }> };

// Cache rendered course pages for 5 minutes: fast repeat visits, fresh content.
// An empty list means nothing is prerendered at build time, but the first
// request for a course is cached (on-demand ISR) instead of hitting Mongo.
export const revalidate = 300;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

/**
 * Server component: the lesson is fetched during the request so the page is
 * crawlable and a missing lesson returns a real 404 instead of a soft 404.
 */
export default async function CourseDetail({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonDetail(slug);

  if (result.status === 'unavailable') {
    throw new Error('Course details are temporarily unavailable. Please try again.');
  }

  if (result.status !== 'ok') {
    notFound();
  }

  const course = result.lesson;
  const sections = course.sections ?? [];

  return (
    <>
      <Navbar />

      <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Banner */}
        <div className="relative h-[500px]">
          <Image
            src={course.thumbnail || 'https://picsum.photos/id/1015/1200/600'}
            alt=""
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex items-center">
            <div>
              {course.grade && (
                <div className="text-violet-400 font-medium mb-3">{course.grade}</div>
              )}
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">{course.title}</h1>
              {course.subject && <p className="text-xl text-zinc-400 mt-3">{course.subject}</p>}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-semibold mb-6">About This Course</h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                {course.description || 'No description available.'}
              </p>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">What Your Child Will Learn</h3>
                <div className="grid gap-4">
                  {sections.length > 0 ? (
                    sections.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 bg-zinc-900 p-5 rounded-2xl">
                        <div aria-hidden="true" className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <p className="text-zinc-200">{item.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">Content coming soon...</p>
                  )}
                </div>
              </div>
            </div>


            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h3 className="font-semibold text-lg mb-6">Course Details</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Clock aria-hidden="true" className="w-5 h-5" />
                      Duration
                    </div>
                    <span className="font-medium">{course.duration || 'Lifetime'}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Award aria-hidden="true" className="w-5 h-5" />
                      Level
                    </div>
                    <span className="font-medium">{course.level || 'Beginner'}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Users aria-hidden="true" className="w-5 h-5" />
                      Students
                    </div>
                    <span className="font-medium">
                      {course.students ? `${course.students}+` : 'New'}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/courses/content/${course._id}`}
                  className="block text-center w-full mt-10 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl font-semibold text-lg transition"
                >
                  Start Course Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
