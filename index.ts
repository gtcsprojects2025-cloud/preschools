export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: Instructor;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  isFeatured: boolean;
  tags: string[];
  curriculum: Module[];
  learningOutcomes: string[];
  requirements: string[];
  lastUpdated: string;
  language: string;
  certificate: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isPreview: boolean;
  isCompleted?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  specializations: string[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  courseId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}