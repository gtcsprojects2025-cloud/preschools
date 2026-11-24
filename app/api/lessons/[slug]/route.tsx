import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import { databaseUnavailable, isDatabaseUnavailable } from '../../../lib/dbError';
import Lesson from '../../../models/lesson';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const { slug } = await params;
    const id = searchParams.get('id');

    // Fetch single lesson by slug (most common for public pages)
    if (slug) {
      const lesson = await Lesson.findOne({ _id: slug })
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

    // Fetch all lessons (for listing page)
    const lessons = await Lesson.find({})
      .select('title slug description subject grade duration thumbnail createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: lessons.length,
      lessons,
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