'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronDown, ChevronUp, Star, Award, Leaf } from 'lucide-react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import type { LessonDetail } from '@/app/lib/lessons';

/**
 * Interactive parts of the lesson page (video button, accordion sections).
 * The lesson itself is fetched on the server by `page.tsx`.
 */
export default function LessonView({ lesson }: { lesson: LessonDetail }) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [currentVideo, setCurrentVideo] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizNotice, setQuizNotice] = useState(false);

  const sections = lesson.sections ?? [];
  const totalSections = sections.length;
  const progress = totalSections
    ? Math.round((completedSections.length / totalSections) * 100)
    : 0;
  const allComplete =
    totalSections > 0 && completedSections.length === totalSections;

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleSectionComplete = (index: number) => {
    setCompletedSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleAllComplete = () => {
    setCompletedSections(allComplete ? [] : sections.map((_, index) => index));
  };


  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="bg-gradient-to-b from-sky-100 to-emerald-50 min-h-screen"
      >
      <div className="max-w-6xl mx-auto px-6 py-28">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <Star aria-hidden="true" className="fill-current" />
              {(lesson.subject ?? 'Lesson').toUpperCase()}
            </div>

            <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
              {lesson.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {lesson.description || "Discover the amazing hidden world of mushrooms, molds, and yeasts!"}
            </p>

            <div className="flex items-center gap-8 text-sm mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-white px-4 py-1 rounded-full shadow">
                  {lesson.duration || "8 minutes"}
                </div>
              </div>
              <div>{lesson.level || 'Beginner friendly'}</div>
              <div className="flex items-center gap-1">
                <Award aria-hidden="true" className="text-yellow-500" size={18} />
                {lesson.quizzes ? `${lesson.quizzes} quizzes included` : 'Self-paced'}
              </div>
            </div>

            {/* Video Preview */}
            <button
              type="button"
              onClick={() => setCurrentVideo(true)}
              aria-label="Play lesson introduction video"
              className="relative w-full block bg-black rounded-3xl overflow-hidden aspect-video cursor-pointer group mb-10 shadow-2xl"
            >
              <Image
                src={lesson.thumbnail || "https://picsum.photos/id/1015/800/450"}
                alt=""
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover opacity-75 group-hover:opacity-90 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                  <Play aria-hidden="true" size={40} className="text-emerald-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-1 rounded-full text-sm">
                {currentVideo ? 'Playing introduction' : 'Watch Introduction'}
              </div>
            </button>

            {currentVideo && (
              <div
                role="status"
                aria-live="polite"
                className="mb-10 rounded-2xl bg-white/80 border border-emerald-200 px-6 py-4 text-emerald-700"
              >
                <p className="font-medium">
                  The introduction video for this lesson will play here shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentVideo(false)}
                  className="mt-3 text-sm font-semibold underline"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Progress */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-8">
              <div className="text-center mb-6">
                <Award aria-hidden="true" className="mx-auto text-emerald-500 mb-3" size={48} />
                <div className="font-semibold">Your Progress</div>
                <div className="text-5xl font-bold text-emerald-600 mt-2">{progress}%</div>
                <div className="text-sm text-gray-500">
                  {totalSections
                    ? `${completedSections.length} of ${totalSections} sections complete`
                    : 'No sections published yet'}
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Lesson progress"
                  className="mt-4 h-2 w-full overflow-hidden rounded-full bg-emerald-100"
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAllComplete}
                disabled={totalSections === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg mb-4"
              >
                {allComplete ? 'Marked as Complete' : 'Mark as Complete'}
              </button>
              <button
                type="button"
                onClick={() => setQuizNotice(true)}
                className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-bold"
              >
                Take Quiz
              </button>

              {quizNotice && (
                <p
                  role="status"
                  className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3"
                >
                  Quizzes for this lesson are being prepared — check back soon.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Lesson Content */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Leaf aria-hidden="true" className="text-emerald-600" /> Lesson Content
          </h2>

          <div className="space-y-6">
            {sections.length === 0 && (
              <p className="text-gray-600">
                Lesson content is being prepared — please check back soon.
              </p>
            )}

            {sections.map((section, index) => {
              const isExpanded = expandedSections.includes(index);
              const isComplete = completedSections.includes(index);
              return (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden lesson-card">
                <button
                  type="button"
                  onClick={() => toggleSection(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`lesson-section-${index}`}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-emerald-50 text-left"
                >
                  <div className="flex items-center gap-4">
                    {isExpanded ?
                      <ChevronUp aria-hidden="true" size={28} className="text-emerald-600" /> :
                      <ChevronDown aria-hidden="true" size={28} className="text-emerald-600" />
                    }
                    <div>
                      <div className="text-xl font-semibold">{section.title}</div>
                      <div className="text-sm text-gray-500">{section.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isComplete && (
                      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    <span className="text-emerald-600 font-medium">
                      {isExpanded ? 'Collapse' : 'Tap to expand'}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div
                    id={`lesson-section-${index}`}
                    className="px-8 pb-8 expandable border-t"
                  >
                    {(section.subtopics ?? []).map((sub, idx) => (
                      <div key={idx} className="pt-8 first:pt-0 border-t mt-8 first:mt-0 first:border-none">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-gray-800">{sub.title}</h3>
                          <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                            {sub.duration}
                          </span>
                        </div>

                        <div className="prose text-lg leading-relaxed text-gray-700 max-w-3xl">
                          {sub.content}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={() => toggleSectionComplete(index)}
                        aria-pressed={isComplete}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                          isComplete
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {isComplete ? 'Mark as not complete' : 'Mark section complete'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </>
  );
}