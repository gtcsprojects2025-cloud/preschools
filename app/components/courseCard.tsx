import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, Award, Play } from 'lucide-react';
// import { Course } from '@/types';
import {Course} from '@/index';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'horizontal';
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star <= rating
              ? 'fill-amber-200 text-amber-400'
              : 'text-surface-300'
          }`}
        />
      ))}
    </div>
  );
}

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
};

export default function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/courses/${course.id}`} className="group">
        <div className="card flex gap-4 p-4 hover:border-brand-200">
          <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-surface-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {course.isFeatured && (
              <div className="absolute top-2 left-2 badge bg-brand-600 text-white text-xs">Featured</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm leading-snug">
                {course.title}
              </h3>
              <div className="text-right flex-shrink-0">
                {course.isFree ? (
                  <span className="text-emerald-600 font-bold text-sm">Free</span>
                ) : (
                  <span className="text-surface-900 font-bold text-sm">${course.price}</span>
                )}
              </div>
            </div>
            <p className="text-xs text-surface-500 mt-1">{course.instructor.name}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <StarRating rating={course.rating} />
                <span className="text-xs font-semibold text-amber-600">{course.rating}</span>
              </div>
              <span className="text-xs text-surface-400">({course.reviewCount.toLocaleString()})</span>
              <span className={`badge text-xs ${levelColors[course.level]}`}>{course.level}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="card overflow-hidden hover:-translate-y-1 hover:border-brand-200">
        {/* Thumbnail */}
        <div className="relative overflow-hidden bg-surface-100 aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-brand-600 ml-0.5" />
            </div>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {course.isFeatured && (
              <span className="badge bg-brand-600 text-white text-xs shadow-sm">⭐ Featured</span>
            )}
            {course.isFree && (
              <span className="badge bg-emerald-500 text-white text-xs shadow-sm">Free</span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className={`badge text-xs shadow-sm ${levelColors[course.level]}`}>{course.level}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{course.category}</span>

          {/* Title */}
          <h3 className="font-display font-bold text-surface-900 group-hover:text-brand-600 transition-colors mt-1 line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mt-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full bg-surface-200"
            />
            <span className="text-sm text-surface-500">{course.instructor.name}</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.students.toLocaleString()}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <StarRating rating={course.rating} />
            <span className="text-sm font-bold text-amber-600">{course.rating}</span>
            <span className="text-xs text-surface-400">({course.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
            <div>
              {course.isFree ? (
                <span className="text-xl font-display font-bold text-emerald-600">Free</span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-display font-bold text-surface-900">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-surface-400 line-through">${course.originalPrice}</span>
                  )}
                </div>
              )}
            </div>
            {course.certificate && (
              <span className="flex items-center gap-1 text-xs text-surface-500">
                <Award className="w-3.5 h-3.5 text-brand-500" />
                Certificate
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}