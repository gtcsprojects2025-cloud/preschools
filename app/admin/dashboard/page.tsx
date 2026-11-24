'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Layers,
  ListTree,
  Clock,
  PlusCircle,
  GraduationCap,
  Sparkles,
  TrendingUp,
  CalendarDays,
  Loader2,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Trash2,
  ChevronRight,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
interface LessonSummary {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  subject: string;
  grade: string;
  duration?: string;
  thumbnail?: string;
  createdAt: string;
  sections?: Array<{ title: string; subtopics: Array<unknown> }>;
}

interface DashboardStats {
  totalLessons: number;
  totalSections: number;
  totalSubtopics: number;
  lessonsThisWeek: number;
  subjectBreakdown: Array<{ subject: string; count: number }>;
  gradeBreakdown: Array<{ grade: string; count: number }>;
  recentLessons: LessonSummary[];
  lessonsByDay: Array<{ date: string; count: number }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateRelative(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateStr);
}

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

// ─── Stat Card ───────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  subtitle,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-zinc-400">{title}</p>
      {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
    </div>
  );
}

// ─── Bar Chart Mini ──────────────────────────────────────────────────
function BarChart({
  data,
  maxValue,
}: {
  data: Array<{ label: string; value: number; color?: string }>;
  maxValue?: number;
}) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 w-20 truncate text-right">
            {item.label}
          </span>
          <div className="flex-1 bg-zinc-800 rounded-full h-5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${item.color ?? 'bg-emerald-500'}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-zinc-300 w-6 text-left">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Mini Activity Timeline ──────────────────────────────────────────
function ActivityTimeline({ lessons }: { lessons: LessonSummary[] }) {
  const recent = lessons.slice(0, 6);
  return (
    <div className="space-y-0">
      {recent.map((lesson, i) => (
        <div key={lesson._id} className="relative flex gap-4 pb-4 last:pb-0">
          {/* Timeline line */}
          {i < recent.length - 1 && (
            <div className="absolute left-[7px] top-5 bottom-0 w-px bg-zinc-800" />
          )}
          {/* Dot */}
          <div className="relative mt-1">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-emerald-500 bg-zinc-900" />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {lesson.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-zinc-500">{lesson.subject}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-xs text-zinc-500">{lesson.grade}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-xs text-zinc-500">
                {timeAgo(lesson.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
      {recent.length === 0 && (
        <p className="text-sm text-zinc-500 text-center py-6">
          No activity yet. Create your first lesson!
        </p>
      )}
    </div>
  );
}

// ─── Recent Lessons Table ────────────────────────────────────────────
function RecentLessonsTable({ lessons }: { lessons: LessonSummary[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-2 text-zinc-400 font-medium">Title</th>
            <th className="text-left py-3 px-2 text-zinc-400 font-medium">Subject</th>
            <th className="text-left py-3 px-2 text-zinc-400 font-medium">Grade</th>
            <th className="text-left py-3 px-2 text-zinc-400 font-medium">Duration</th>
            <th className="text-left py-3 px-2 text-zinc-400 font-medium">Created</th>
            <th className="text-right py-3 px-2 text-zinc-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.slice(0, 8).map((lesson) => (
            <tr
              key={lesson._id}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
            >
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  {lesson.thumbnail ? (
                    <Image
                      src={lesson.thumbnail}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={14} className="text-zinc-500" />
                    </div>
                  )}
                  <span className="font-medium text-white truncate max-w-[180px]">
                    {lesson.title}
                  </span>
                </div>
              </td>
              <td className="py-3 px-2 text-zinc-300">{lesson.subject}</td>
              <td className="py-3 px-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                  {lesson.grade}
                </span>
              </td>
              <td className="py-3 px-2 text-zinc-400">{lesson.duration ?? '—'}</td>
              <td className="py-3 px-2 text-zinc-400 text-xs">
                {formatDateRelative(lesson.createdAt)}
              </td>
              <td className="py-3 px-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/courses/${lesson.slug}`}
                    className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    title="View lesson"
                  >
                    <Eye size={15} />
                  </Link>
                  <button
                    type="button"
                    aria-label="Delete lesson (not available yet)"
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete (placeholder)"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={40} className="mx-auto text-zinc-700 mb-3" />
          <p className="text-zinc-500">No lessons yet</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-emerald-400 hover:text-emerald-300"
          >
            <PlusCircle size={14} />
            Create your first lesson
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────────
export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all lessons
        const res = await fetch('/api/lessons');
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch lessons');
        }

        const lessons: LessonSummary[] = data.lessons ?? [];

        // Compute statistics from the lesson data
        const totalLessons = lessons.length;

        // Count total sections and subtopics
        let totalSections = 0;
        let totalSubtopics = 0;
        lessons.forEach((lesson) => {
          const sections = lesson.sections ?? [];
          totalSections += sections.length;
          sections.forEach((sec) => {
            totalSubtopics += (sec.subtopics ?? []).length;
          });
        });

        // Lessons created this week
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const lessonsThisWeek = lessons.filter(
          (l) => new Date(l.createdAt) >= startOfWeek
        ).length;

        // Subject breakdown
        const subjectMap = new Map<string, number>();
        lessons.forEach((l) => {
          const subj = l.subject || 'Uncategorized';
          subjectMap.set(subj, (subjectMap.get(subj) ?? 0) + 1);
        });
        const subjectBreakdown = Array.from(subjectMap.entries())
          .map(([subject, count]) => ({ subject, count }))
          .sort((a, b) => b.count - a.count);

        // Grade breakdown
        const gradeMap = new Map<string, number>();
        lessons.forEach((l) => {
          const g = l.grade || 'Uncategorized';
          gradeMap.set(g, (gradeMap.get(g) ?? 0) + 1);
        });
        const gradeBreakdown = Array.from(gradeMap.entries())
          .map(([grade, count]) => ({ grade, count }))
          .sort((a, b) => b.count - a.count);

        // Lessons by day (last 30 days)
        const dayMap = new Map<string, number>();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        lessons
          .filter((l) => new Date(l.createdAt) >= thirtyDaysAgo)
          .forEach((l) => {
            const d = new Date(l.createdAt).toISOString().slice(0, 10);
            dayMap.set(d, (dayMap.get(d) ?? 0) + 1);
          });
        const lessonsByDay = Array.from(dayMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));

        // Recent lessons sorted by createdAt desc
        const recentLessons = [...lessons].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setStats({
          totalLessons,
          totalSections,
          totalSubtopics,
          lessonsThisWeek,
          subjectBreakdown,
          gradeBreakdown,
          recentLessons,
          lessonsByDay,
        });
      } catch (err: unknown) {
        console.error('Dashboard fetch error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while loading dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center" role="status" aria-live="polite">
          <h1 className="sr-only">Admin Dashboard</h1>
          <Loader2 size={40} aria-hidden="true" className="animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-zinc-400">Loading dashboard data…</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <h1 className="sr-only">Admin Dashboard</h1>
          <AlertCircle size={48} aria-hidden="true" className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Failed to Load Dashboard</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // ── Chart colors ───────────────────────────────────────────────
  const chartColors = [
    'bg-emerald-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-fuchsia-500',
    'bg-lime-500',
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Overview of your PFSchools content library
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/20"
          >
            <PlusCircle size={18} />
            Create Lesson
          </Link>
          <Link
            href="/admin/lessons"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all duration-200"
          >
            <BookOpen size={18} />
            All Lessons
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Lessons"
          value={stats.totalLessons}
          icon={BookOpen}
          color="bg-emerald-600"
          subtitle="In your content library"
        />
        <StatCard
          title="Total Sections"
          value={stats.totalSections}
          icon={Layers}
          color="bg-sky-600"
          subtitle={`Across ${stats.totalLessons} lessons`}
        />
        <StatCard
          title="Total Subtopics"
          value={stats.totalSubtopics}
          icon={ListTree}
          color="bg-violet-600"
          subtitle="Individual learning units"
        />
        <StatCard
          title="Created This Week"
          value={stats.lessonsThisWeek}
          icon={Sparkles}
          trend={stats.lessonsThisWeek > 0 ? `+${stats.lessonsThisWeek}` : undefined}
          color="bg-amber-600"
          subtitle="Since Sunday"
        />
      </div>

      {/* ── Two-column layout ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Subject Breakdown (bar chart) ──────────────────────── */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                <BarChart3 size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Subject Distribution</h2>
            </div>
            <span className="text-xs text-zinc-500">
              {stats.totalLessons} total lessons
            </span>
          </div>
          {stats.subjectBreakdown.length > 0 ? (
            <BarChart
              data={stats.subjectBreakdown.map((s, i) => ({
                label: s.subject,
                value: s.count,
                color: chartColors[i % chartColors.length],
              }))}
            />
          ) : (
            <p className="text-sm text-zinc-500 text-center py-8">
              No data yet
            </p>
          )}
        </div>

        {/* ── Grade Breakdown ────────────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-violet-600/20 flex items-center justify-center">
              <PieChart size={18} className="text-violet-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Grade Levels</h2>
          </div>
          {stats.gradeBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.gradeBreakdown.map((g, i) => {
                const perc = Math.round(
                  (g.count / stats.totalLessons) * 100
                );
                return (
                  <div key={g.grade} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${chartColors[i % chartColors.length]}`}
                      />
                      <span className="text-sm text-zinc-300">{g.grade}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${chartColors[i % chartColors.length]}`}
                          style={{ width: `${perc}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 w-8 text-right">
                        {g.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-zinc-500 text-center py-8">No data yet</p>
          )}
        </div>
      </div>

      {/* ── Recent Lessons + Activity ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lessons Table */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-600/20 flex items-center justify-center">
                <BookOpen size={18} className="text-sky-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Lessons</h2>
            </div>
            <Link
              href="/admin/lessons"
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View all
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="p-2">
            <RecentLessonsTable lessons={stats.recentLessons} />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-amber-600/20 flex items-center justify-center">
              <Activity size={18} className="text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <ActivityTimeline lessons={stats.recentLessons} />
        </div>
      </div>

      {/* ── Lessons Created (Last 30 Days) ─────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 flex items-center justify-center">
              <CalendarDays size={18} className="text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Lessons Created (Last 30 Days)
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock size={12} />
            <span>
              {stats.lessonsByDay.length > 0
                ? `${stats.lessonsByDay[0]?.date ?? ''} – ${stats.lessonsByDay[stats.lessonsByDay.length - 1]?.date ?? ''}`
                : 'No data'}
            </span>
          </div>
        </div>
        {stats.lessonsByDay.length > 0 ? (
          <div className="h-44 flex items-end gap-1">
            {stats.lessonsByDay.map((day, i) => {
              const maxVal = Math.max(
                ...stats.lessonsByDay.map((d) => d.count),
                1
              );
              const heightPerc = (day.count / maxVal) * 100;
              const dayLabel = new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {dayLabel}: {day.count} lesson{day.count !== 1 ? 's' : ''}
                  </div>
                  {/* Bar */}
                  <div
                    className="w-full max-w-[24px] rounded-t-md bg-emerald-500/70 hover:bg-emerald-400 transition-all cursor-pointer"
                    style={{ height: `${Math.max(heightPerc, 2)}%` }}
                  />
                  {/* Label (show every 5th) */}
                  {i % 5 === 0 && (
                    <span className="text-[10px] text-zinc-500 mt-1.5 -rotate-45 origin-left whitespace-nowrap">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <p className="text-sm text-zinc-500">No lessons created in the last 30 days</p>
          </div>
        )}
      </div>

      {/* ── Quick Links Footer ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin"
          className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-600/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <PlusCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white">Create New Lesson</h3>
          </div>
          <p className="text-sm text-zinc-500">Add fresh content to your library</p>
        </Link>
        <Link
          href="/admin/lessons"
          className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-sky-600/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={20} className="text-sky-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white">Manage Lessons</h3>
          </div>
          <p className="text-sm text-zinc-500">Edit, delete, and organize content</p>
        </Link>
        <Link
          href="/"
          className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-violet-600/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap size={20} className="text-violet-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white">View Public Site</h3>
          </div>
          <p className="text-sm text-zinc-500">See how students experience content</p>
        </Link>
      </div>
    </div>
  );
}