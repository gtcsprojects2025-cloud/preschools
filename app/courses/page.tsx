'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Star, Filter, Grid3X3, List, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  subject?: string;
  grade?: string;
  duration?: string;
  thumbnail?: string;
  category?: string;
  level?: string;
  free?: boolean;
  // Optional extras: the Lesson model does not require them, so always guard
  // before rendering (otherwise cards print "undefined Students").
  students?: number;
  quizzes?: number;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalLessons: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [requestedPage, setRequestedPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  // Debounce the search box so typing does not fire a request per keystroke.
  // Resetting the page here (rather than in a separate effect) keeps React from
  // rendering twice and avoids the set-state-in-effect lint rule.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setRequestedPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch courses whenever the page, search term or subject filter changes.
  useEffect(() => {
    const controller = new AbortController();

    const loadCourses = async () => {
      try {
        const params = new URLSearchParams({
          page: String(requestedPage),
          limit: "6",
        });

        if (debouncedSearch) params.set("q", debouncedSearch);
        if (selectedFilter !== "All") params.set("subject", selectedFilter);

        const res = await fetch(`/api/lessons?${params.toString()}`, {
          cache: 'no-store',
          signal: controller.signal,
        });

        // Read the body even on failure so the API's `message` (e.g. "catalogue
        // temporarily unavailable" for a 503) can be shown to the user.
        const data = await res.json().catch(() => null);

        if (controller.signal.aborted) return;

        if (!res.ok || !data?.success) {
          setError(
            data?.message ?? 'We could not load the courses right now. Please try again.'
          );
          if (process.env.NODE_ENV === 'development') {
            console.error(`[courses] /api/lessons responded ${res.status}`);
          }
          return;
        }

        setCourses(data.lessons || []);
        setPagination(data.pagination);
      } catch (err) {
        // AbortError is expected when the component unmounts or the page changes.
        if (controller.signal.aborted) return;
        if (process.env.NODE_ENV === 'development') console.error('[courses]', err);
        setError('We could not load the courses right now. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCourses();

    return () => controller.abort();
  }, [requestedPage, reloadKey, debouncedSearch, selectedFilter]);

  // Subject chips come from the loaded page (plus the well-known subjects) so a
  // new subject in the database shows up without a code change.
  const filterOptions = useMemo(() => {
    const defaults = ["Science", "Mathematics", "English", "Logic"];
    const fromData = courses
      .map((course) => course.subject ?? course.category)
      .filter((value): value is string => Boolean(value && value.trim()));

    return ["All", ...Array.from(new Set([...fromData, ...defaults]))];
  }, [courses]);

  const handlePageChange = (page: number) => {
    if (page < 1 || (pagination && page > pagination.totalPages)) return;
    setLoading(true);
    setError(null);
    setRequestedPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retryLoad = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        aria-busy={loading}
        className="min-h-screen bg-zinc-950 text-white"
      >
      {/* Hero Section */}
      <div className="relative h-[620px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000"
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
            Discover Engaging<br />Courses for Your Child
          </h1>
          <p className="mt-6 text-xl text-zinc-300">
            Interactive learning experiences designed for young minds
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-zinc-950 border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div
            className="flex flex-wrap items-center gap-4"
            role="group"
            aria-label="Filter courses by subject"
          >
            <Filter aria-hidden="true" className="w-5 h-5 text-violet-400" />
            {filterOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedFilter(cat);
                  setRequestedPage(1);
                }}
                aria-pressed={selectedFilter === cat}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  selectedFilter === cat ? 'bg-violet-600 text-white' : 'bg-zinc-900 hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <input
              id="course-search"
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-2xl px-6 py-3 w-full md:w-80 focus:border-violet-500"
            />
            <div
              className="flex border border-white/10 rounded-2xl p-1"
              role="group"
              aria-label="Course layout"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`p-3 rounded-xl ${viewMode === "grid" ? "bg-zinc-800" : ""}`}
              >
                <Grid3X3 aria-hidden="true" className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={`p-3 rounded-xl ${viewMode === "list" ? "bg-zinc-800" : ""}`}
              >
                <List aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {error ? (
          <div className="text-center py-16">
            <p role="alert" className="text-red-400">{error}</p>
            <button
              type="button"
              onClick={retryLoad}
              className="mt-6 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 transition"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <p role="status" aria-live="polite" className="text-center text-zinc-400 py-16">
            Loading amazing courses…
          </p>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ y: -8 }}
                className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden group"
              >
                <div className="relative h-56">
                  <Image
                    src={course.thumbnail || "https://picsum.photos/id/1015/600/400"}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-8">
                  <div className="text-violet-400 text-sm mb-2">{course.subject || course.category}</div>
                  <h3 className="text-2xl font-semibold mb-3">{course.title}</h3>
                  <p className="text-zinc-400 line-clamp-3 mb-6">{course.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2"><Clock aria-hidden="true" className="w-4 h-4" /> {course.duration || 'Self-paced'}</div>
                    <div className="flex items-center gap-2"><Award aria-hidden="true" className="w-4 h-4" /> {course.level || course.grade || 'All levels'}</div>
                    {typeof course.students === 'number' && (
                      <div className="flex items-center gap-2"><Users aria-hidden="true" className="w-4 h-4" /> {course.students} Students</div>
                    )}
                    {typeof course.quizzes === 'number' && (
                      <div className="flex items-center gap-2"><Star aria-hidden="true" className="w-4 h-4" /> {course.quizzes} Quizzes</div>
                    )}
                  </div>
                  
                  <Link
                    href={`/courses/content/${course._id}`}
                    className="block mt-6 w-full py-4 bg-white text-black text-center rounded-2xl font-semibold hover:bg-zinc-100 transition"
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden sm:flex"
              >
                <div className="relative h-52 sm:h-auto sm:w-64 flex-shrink-0">
                  <Image
                    src={course.thumbnail || "https://picsum.photos/id/1015/600/400"}
                    alt={course.title}
                    fill
                    sizes="(min-width: 640px) 256px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="text-violet-400 text-sm mb-1">
                    {course.subject || course.category}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-zinc-400 line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Clock aria-hidden="true" className="w-4 h-4" /> {course.duration || 'Self-paced'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award aria-hidden="true" className="w-4 h-4" /> {course.level || course.grade || 'All levels'}
                    </span>
                    {typeof course.students === 'number' && (
                      <span className="flex items-center gap-2">
                        <Users aria-hidden="true" className="w-4 h-4" /> {course.students} Students
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/courses/content/${course._id}`}
                    className="inline-block mt-5 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-100 transition"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <p className="text-center text-zinc-400 py-16">
            {debouncedSearch || selectedFilter !== 'All'
              ? 'No courses match your search. Try a different keyword or subject.'
              : 'No courses have been published yet. Check back soon.'}
          </p>
        )}

        {/* Pagination */}
        {!loading && !error && pagination && pagination.totalPages > 1 && (
          <nav
            aria-label="Course pagination"
            className="flex justify-center items-center mt-16 gap-4"
          >
            <button
              type="button"
              onClick={() => handlePageChange(requestedPage - 1)}
              disabled={requestedPage === 1}
              aria-label="Previous page"
              className="p-2 rounded-full bg-zinc-900 disabled:opacity-40 hover:bg-zinc-800 transition"
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            {Array.from({ length: pagination.totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePageChange(i + 1)}
                aria-label={`Page ${i + 1}`}
                aria-current={requestedPage === i + 1 ? "page" : undefined}
                className={`w-10 h-10 rounded-full ${requestedPage === i + 1 ? 'bg-violet-600' : 'bg-zinc-800'}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(requestedPage + 1)}
              disabled={requestedPage === pagination.totalPages}
              aria-label="Next page"
              className="p-2 rounded-full bg-zinc-900 disabled:opacity-40 hover:bg-zinc-800 transition"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
      </main>

      <Footer />
    </>
  );
}
