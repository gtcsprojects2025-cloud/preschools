import mongoose, { Schema, Document } from 'mongoose';

export interface ISubTopic {
  title: string;
  duration: string;
  content: string;
  image?: string;
}

export interface ISection {
  title: string;
  duration: string;
  order: number;
  subtopics: ISubTopic[];
}

export interface ILesson extends Document {
  title: string;
  slug: string;
  description?: string;
  subject: string;
  grade: string;
  duration?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  sections: ISection[];
}

const SubTopicSchema = new Schema<ISubTopic>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
});

const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  order: { type: Number, default: 0 },
  subtopics: [SubTopicSchema],
});

const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    // Generated from the title by the pre-save hook below.
    slug: { type: String, index: true },
    description: { type: String },
    subject: { type: String, default: 'Science' },
    grade: { type: String, default: 'Grade 2' },
    duration: { type: String },
    thumbnail: { type: String },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

// Auto-generate a URL-safe slug before saving.
LessonSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }
});

const Lesson = mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);

export default Lesson;