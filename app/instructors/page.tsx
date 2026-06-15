'use client';

import { motion } from 'framer-motion';
import { Star, Users, BookOpen, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const instructors = [
  {
    id: 1,
    name: "Dr. Emily Thompson",
    title: "Early Childhood Education Expert",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 4.9,
    students: 12400,
    courses: 18,
    bio: "With over 15 years of experience in child psychology and early education, Dr. Thompson specializes in making complex concepts simple and fun for young learners.",
    specializations: ["Literacy", "Child Psychology", "Play-based Learning"],
  },
  {
    id: 2,
    name: "Michael Roberts",
    title: "Mathematics & Logic Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    rating: 4.8,
    students: 9800,
    courses: 14,
    bio: "Former STEM curriculum developer with a passion for building strong mathematical foundations through interactive and engaging methods.",
    specializations: ["Mathematics", "Logic", "Problem Solving"],
  },
  {
    id: 3,
    name: "Sophia Chen",
    title: "Language & Creative Arts",
    avatar: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=400",
    rating: 4.9,
    students: 7600,
    courses: 22,
    bio: "Award-winning educator focused on language development and creative expression. Makes learning English and arts exciting for children.",
    specializations: ["English", "Creative Writing", "Art"],
  },
  {
    id: 4,
    name: "David Okoro",
    title: "Science & Innovation Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    students: 8500,
    courses: 12,
    bio: "Passionate about making science accessible and wonder-filled. Former science communicator with experience in interactive digital learning.",
    specializations: ["Science", "Nature", "Critical Thinking"],
  },
];

// export const metadata = {
//   title: 'Meet Our Instructors | PFSchools',
//   description: 'Learn from world-class educators and experts dedicated to nurturing young minds.',
// };

export default function InstructorsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
<Navbar />

      {/* Instructors Banner / Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000')",
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-widest">WORLD-CLASS EDUCATORS</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold heading-font leading-none tracking-tighter">
              Meet Our<br />Exceptional<br />Instructors
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto">
              Learn from passionate experts who are dedicated to nurturing young minds and shaping the future.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-8 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">⭐</div>
              <div>
                <div className="font-semibold">4.9/5 Average Rating</div>
                <div className="text-zinc-400 text-xs">From 12,000+ reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌍</div>
              <div>
                <div className="font-semibold">50+ Countries</div>
                <div className="text-zinc-400 text-xs">Global teaching impact</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎓</div>
              <div>
                <div className="font-semibold">PhD & Masters Level</div>
                <div className="text-zinc-400 text-xs">Highly qualified faculty</div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Prompt */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-sm flex flex-col items-center"
          >
            Scroll to explore
            <span className="text-2xl mt-1">↓</span>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-24 pb-20 bg-gradient-to-br from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-violet-400 font-medium tracking-widest"
          >
            WORLD-CLASS EDUCATORS
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold heading-font mt-4 leading-tight"
          >
            Learn from the Best
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Our instructors are passionate experts who bring real-world experience and innovative teaching methods to every lesson.
          </motion.p>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '200+', label: 'Expert Instructors' },
              { value: '4.8', label: 'Average Rating' },
              { value: '50+', label: 'Countries Reached' },
              { value: '1.2M+', label: 'Students Taught' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#4E9FE5]">{stat.value}</div>
                <div className="text-sm text-zinc-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="group bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold">{instructor.name}</h3>
                <p className="text-violet-400 font-medium mt-1">{instructor.title}</p>

                <div className="flex items-center justify-between mt-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-medium">{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Users className="w-4 h-4" />
                    {(instructor.students / 1000).toFixed(1)}k Students
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <BookOpen className="w-4 h-4" />
                    {instructor.courses} Courses
                  </div>
                </div>

                <p className="mt-6 text-zinc-400 text-[15px] leading-relaxed line-clamp-4">
                  {instructor.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {instructor.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <Link href="/courses" className="block mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-100 transition"
                  >
                    View Courses <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Become an Instructor CTA */}
      <div className="bg-[#4E9FE5] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold heading-font text-white"
          >
            Share Your Expertise with the World
          </motion.h2>
          <p className="mt-5 text-xl text-white/90 max-w-lg mx-auto">
            Join our growing community of passionate educators and help shape the future of learning.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/contact"
                className="bg-white text-black font-semibold px-10 py-4 rounded-2xl inline-block hover:bg-zinc-100 transition"
              >
                Apply to Teach
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/about"
                className="border-2 border-white/60 text-white font-semibold px-10 py-4 rounded-2xl inline-block hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}