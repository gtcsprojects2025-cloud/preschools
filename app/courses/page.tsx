'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, Star, Filter, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const courses = [
  {
    id: 1,
    slug: "english-quiz-age-7",
    title: "ENGLISH QUIZ (Age 7)",
    category: "Language",
    desc: "Quick and interactive English quiz to build language confidence.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    duration: "1 Hour",
    level: "Beginner",
    students: 12,
    quizzes: 1,
    free: true,
    age: "5-7",
  },
  {
    id: 2,
    slug: "logic-quiz-age-7",
    title: "LOGIC QUIZ (Age 7)",
    category: "Logic",
    desc: "Patterns, sequences, and logical reasoning to exercise young minds.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    duration: "Lifetime",
    level: "Beginner",
    students: 8,
    quizzes: 3,
    free: true,
    age: "6-8",
  },
  {
    id: 3,
    slug: "mathematics-quiz-age-7",
    title: "MATHEMATICS QUIZ (Age 7)",
    category: "Mathematics",
    desc: "Fun mathematical challenges designed for early learners.",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800",
    duration: "Lifetime",
    level: "All Levels",
    students: 15,
    quizzes: 12,
    free: true,
    age: "5-7",
  },
  {
    id: 4,
    slug: "science-course-age-7",
    title: "SCIENCE COURSE (Age 7)",
    category: "Science",
    desc: "Fungus / living things quiz and more exciting science topics.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    duration: "Lifetime",
    level: "Beginner",
    students: 7,
    quizzes: 2,
    free: true,
    age: "6-9",
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // New state

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || course.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
    <Navbar />

          {/* Courses Banner / Hero Section */}
      <div className="relative h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000')",
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="uppercase tracking-[3px] text-sm font-medium">Explore Our Curriculum</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold heading-font tracking-tighter leading-none">
              Discover Engaging<br />Courses for Your Child
            </h1>

            <p className="mt-8 text-xl text-zinc-200 max-w-2xl mx-auto">
              Interactive, age-appropriate courses designed to build confidence, 
              creativity, and a lifelong love for learning.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-6 text-center"
          >
            {[
              { number: "50+", label: "Fun Courses" },
              { number: "4.9", label: "Average Rating" },
              { number: "8,000+", label: "Happy Students" },
              { number: "Free", label: "Starter Courses" },
            ].map((stat, i) => (
              <div key={i} className="min-w-[140px]">
                <div className="text-4xl font-bold text-[#4E9FE5]">{stat.number}</div>
                <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center text-sm"
          >
            Scroll to explore courses
            <span className="text-2xl mt-1">↓</span>
          </motion.div>
        </div>
      </div>

      {/* Hero Banner */}
      {/* <div className="pt-24 pb-16 bg-gradient-to-br from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold heading-font">Our Courses</h1>
          <p className="mt-4 text-2xl text-zinc-400">Discover engaging learning experiences for your child</p>
        </div>
      </div> */}

      {/* Filters & Controls */}
      <div className="sticky top-0 bg-zinc-950 border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Category Filters */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-violet-400" />
            {["All", "Language", "Mathematics", "Logic", "Science"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  selectedFilter === cat ? "bg-violet-600 text-white" : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + View Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-2xl px-6 py-3 w-full md:w-80 focus:border-violet-500 outline-none"
            />

            {/* View Toggle Switch */}
            <div className="flex border border-white/10 rounded-2xl p-1 bg-zinc-900">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition ${viewMode === "grid" ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition ${viewMode === "list" ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {viewMode === "grid" ? (
          /* Grid Layout */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 group"
              >
                <div className="relative h-56">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  {course.free && <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full">FREE</div>}
                </div>

                <div className="p-8">
                  <div className="text-violet-400 text-sm font-medium mb-2">{course.category}</div>
                  <h3 className="text-2xl font-semibold">{course.title}</h3>
                  <p className="text-zinc-400 mt-3 line-clamp-3">{course.desc}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {course.duration}</div>
                    <div className="flex items-center gap-2"><Award className="w-4 h-4" /> {course.level}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {course.students} Students</div>
                    <div className="flex items-center gap-2"><Star className="w-4 h-4" /> {course.quizzes} Quizzes</div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link href={`/courses/${course.slug}`} className="flex-1">
                      <button className="w-full border border-white/30 py-4 rounded-2xl hover:bg-white/5 transition">
                        View Details
                      </button>
                    </Link>
                    <button className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-100 transition">
                      Start Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List Layout */
          <div className="space-y-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-violet-500/50 transition group"
              >
                <div className="md:w-72 h-48 md:h-auto rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-violet-400 text-sm font-medium">{course.category} • Ages {course.age}</div>
                      <h3 className="text-2xl font-semibold mt-2">{course.title}</h3>
                    </div>
                    {course.free && <span className="bg-emerald-500 text-black text-xs font-bold px-4 py-2 rounded-full">FREE</span>}
                  </div>

                  <p className="text-zinc-400 mt-4">{course.desc}</p>

                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-zinc-400">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {course.duration}</div>
                    <div className="flex items-center gap-2"><Award className="w-4 h-4" /> {course.level}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {course.students} Students</div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Link href={`/courses/${course.slug}`} className="flex-1 md:flex-none">
                      <button className="w-full md:w-auto px-8 py-4 border border-white/30 rounded-2xl hover:bg-white/5 transition">
                        View Details
                      </button>
                    </Link>
                    <button className="flex-1 md:flex-none bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-100 transition">
                      Start Course
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 text-2xl text-zinc-400">
            No courses found.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}