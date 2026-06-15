'use client';

import { use } from 'react';           // ← Important: Import use()
import { motion } from 'framer-motion';
import { Clock, Users, Award, Star, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';

const courses = [
  {
    id: 1,
    slug: "english-quiz-age-7",
    title: "ENGLISH QUIZ (Age 7)",
    category: "Language",
    desc: "Quick and interactive English quiz to build language confidence.",
    longDesc: "This engaging English quiz helps children aged 7 develop strong reading, vocabulary, and comprehension skills through fun, interactive questions.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    duration: "1 Hour",
    level: "Beginner",
    students: 12,
    quizzes: 1,
    free: true,
    age: "5-7",
    whatYouWillLearn: [
      "Improve vocabulary and spelling",
      "Enhance reading comprehension",
      "Build sentence formation skills",
      "Develop confidence in English"
    ]
  },
  {
    id: 2,
    slug: "logic-quiz-age-7",
    title: "LOGIC QUIZ (Age 7)",
    category: "Logic",
    desc: "Patterns, sequences, and logical reasoning to exercise young minds.",
    longDesc: "Develop critical thinking and problem-solving abilities through exciting pattern recognition and logical challenges.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200",
    duration: "Lifetime",
    level: "Beginner",
    students: 8,
    quizzes: 3,
    free: true,
    age: "6-8",
    whatYouWillLearn: [
      "Pattern recognition",
      "Sequential thinking",
      "Problem solving skills",
      "Logical reasoning"
    ]
  },
  {
    id: 3,
    slug: "mathematics-quiz-age-7",
    title: "MATHEMATICS QUIZ (Age 7)",
    category: "Mathematics",
    desc: "Fun mathematical challenges designed for early learners.",
    longDesc: "Build a strong foundation in mathematics with interactive quizzes covering numbers, shapes, and basic arithmetic.",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=1200",
    duration: "Lifetime",
    level: "All Levels",
    students: 15,
    quizzes: 12,
    free: true,
    age: "5-7",
    whatYouWillLearn: [
      "Number sense and counting",
      "Basic addition and subtraction",
      "Shape recognition",
      "Pattern understanding"
    ]
  },
  {
    id: 4,
    slug: "science-course-age-7",
    title: "SCIENCE COURSE (Age 7)",
    category: "Science",
    desc: "Fungus / living things quiz and more exciting science topics.",
    longDesc: "Explore the wonders of science through interactive lessons on living things, nature, and basic scientific concepts.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200",
    duration: "Lifetime",
    level: "Beginner",
    students: 7,
    quizzes: 2,
    free: true,
    age: "6-9",
    whatYouWillLearn: [
      "Living vs non-living things",
      "Basic biology concepts",
      "Nature and environment",
      "Scientific observation skills"
    ]
  },
];

export default function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);        // ← This fixes the error

  const course = courses.find(c => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
    <Navbar />

      {/* Hero Banner */}
      <div className="pt-24 relative h-[500px]">
        <img 
          src={course.image} 
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex items-center">
          <div>
            <div className="text-violet-400 font-medium mb-3">{course.category} • Ages {course.age}</div>
            <h1 className="text-5xl md:text-6xl font-bold heading-font leading-tight">{course.title}</h1>
            {course.free && (
              <span className="inline-block mt-4 bg-emerald-500 text-black font-bold px-6 py-2 rounded-full">
                FREE COURSE
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-semibold mb-6">About This Course</h2>
            <p className="text-lg text-zinc-300 leading-relaxed">{course.longDesc}</p>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">What Your Child Will Learn</h3>
              <div className="grid gap-4">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-zinc-900 p-5 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-zinc-200">{item}</p>
                  </div>
                ))}
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
                    <Clock className="w-5 h-5" />
                    Duration
                  </div>
                  <span className="font-medium">{course.duration}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Award className="w-5 h-5" />
                    Level
                  </div>
                  <span className="font-medium">{course.level}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Users className="w-5 h-5" />
                    Students
                  </div>
                  <span className="font-medium">{course.students}+</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Star className="w-5 h-5" />
                    Quizzes
                  </div>
                  <span className="font-medium">{course.quizzes}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full mt-10 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl font-semibold text-lg"
              >
                Start Course Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}