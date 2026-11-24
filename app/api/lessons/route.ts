import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import type { QueryFilter } from 'mongoose';
import connectDB from '../../lib/mongodb';
import { databaseUnavailable, isDatabaseUnavailable } from '../../lib/dbError';
import Lesson, { ILesson, ISection } from '../../models/lesson';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, description, subject, grade, duration, thumbnail, sections } = await req.json();

    const lesson = await Lesson.create({
      title,
      description,
      subject,
      grade,
      duration,
      thumbnail,
      sections: (sections as Partial<ISection>[]).map((section, index) => ({
        ...section,
        order: index,
      })),
    });

    // Invalidate the cached pages that display this lesson so new content shows
    // up immediately instead of waiting for the 5-minute ISR window.
    revalidatePath('/');
    revalidatePath('/courses');
    revalidatePath(`/courses/${lesson._id}`);
    revalidatePath(`/courses/content/${lesson._id}`);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (error: unknown) {
    if (isDatabaseUnavailable(error)) return databaseUnavailable(error);

    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to create lesson',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}



// GET

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    // Fetch single lesson by slug (most common for public pages)
    if (slug) {
      const lesson = await Lesson.findOne({ slug })
        .select('-__v') // Exclude version field
        .lean(); // Convert to plain JS object for better performance

      if (!lesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, lesson });
    }

    // Fetch single lesson by ID
    if (id) {
      const lesson = await Lesson.findById(id)
        .select('-__v')
        .lean();

      if (!lesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, lesson });
    }

    // Fetch all lessons. Pass `limit` (and optionally `page`) to paginate; the
    // home page and admin dashboard rely on the full, unpaginated list.
    const requestedLimit = Number(searchParams.get('limit'));
    const requestedPage = Number(searchParams.get('page'));
    const paginate = Number.isFinite(requestedLimit) && requestedLimit > 0;

    const limit = paginate ? Math.min(Math.floor(requestedLimit), 50) : 0;
    const page =
      paginate && Number.isFinite(requestedPage) && requestedPage > 0
        ? Math.floor(requestedPage)
        : 1;

    // Optional filters so search and subject chips query the whole catalogue
    // instead of only the current page.
    const subject = searchParams.get('subject')?.trim();
    const term = searchParams.get('q')?.trim();

    const filter: QueryFilter<ILesson> = {};

    if (subject) filter.subject = subject;

    if (term) {
      // Escape regex metacharacters so user input cannot break the query.
      const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: safeTerm, $options: 'i' } },
        { description: { $regex: safeTerm, $options: 'i' } },
      ];
    }

    const lessonQuery = Lesson.find(filter)
      .select('title slug description subject grade duration thumbnail createdAt')
      .sort({ createdAt: -1 });

    if (paginate) {
      lessonQuery.skip((page - 1) * limit).limit(limit);
    }

    const [totalLessons, lessons] = await Promise.all([
      Lesson.countDocuments(filter),
      lessonQuery.lean(),
    ]);

    return NextResponse.json({
      success: true,
      count: lessons.length,
      lessons,
      pagination: {
        currentPage: page,
        totalPages: paginate ? Math.max(1, Math.ceil(totalLessons / limit)) : 1,
        totalLessons,
      },
    });
  } catch (error: unknown) {
    if (isDatabaseUnavailable(error)) return databaseUnavailable(error);

    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch lessons',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

