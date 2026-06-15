'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Star, Award, Clock, Play, ArrowRight, Quote } from 'lucide-react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const popularCourses = [
  {
    title: "ENGLISH QUIZ (Age 7)",
    slug: "english-quiz-age-7",
    desc: "Quick and interactive English quiz to build language confidence.",
    duration: "1 Hour",
    level: "Beginner",
    students: 12,
    free: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", // Reading / English
  },
  {
    title: "LOGIC QUIZ (Age 7)",
     slug: "logic-quiz-age-7",
    desc: "Patterns, sequences, and logical reasoning to exercise young minds.",
    duration: "Lifetime",
    level: "Beginner",
    students: 8,
    free: true,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", // Puzzle / Logic
  },
  {
    title: "MATHEMATICS QUIZ (Age 7)",
    slug: "mathematics-quiz-age-7",
    desc: "Fun mathematical challenges designed for early learners.",
    duration: "Lifetime",
    level: "All Levels",
    students: 15,
    free: true,
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800", // Math
  },
  {
    title: "SCIENCE COURSE (Age 7)",
    slug: "science-course-age-7",
    desc: "Fungus / living things quiz and more exciting science topics.",
    duration: "Lifetime",
    level: "Beginner",
    students: 7,
    free: true,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", // Science
  },
];

const testimonials = [
  {
    text: "My experience here has been very rewarding and joyful. I’ve seen my child improve so much in her learning.",
    name: "Mick",
    role: "Parent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    text: "Enrolling my two year old has been one of the best decisions I’ve ever made.",
    name: "Sarah Chen",
    role: "Mother of Emma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    text: "The staff are professional, welcoming and show great respect for students and families.",
    name: "Anita",
    role: "Parent",
    avatar: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=200",
  },
];


const teamMembers = [
  {
    name: "Dr. Emily Thompson",
    role: "Founder & Director",
    bio: "Over 15 years of experience in early childhood education. Passionate about innovative learning approaches.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    socials: [
      { icon: <FaTwitter/>, link: "#" },
      { icon: <FaInstagram/>, link: "#" },
      { icon: <FaFacebook/>, link: "#" },
    ],
  },
  {
    name: "Michael Roberts",
    role: "Head of Curriculum",
    bio: "Expert in developing engaging math and logic programs for children aged 5-10.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
    socials: [
      { icon: <FaTwitter/>, link: "#" },
      { icon: <FaInstagram/>, link: "#" },
      { icon: <FaFacebook/>, link:"#"}
    ],
  },
  {
    name: "Sophia Chen",
    role: "Lead Teacher",
    bio: "Specializes in language development and creative arts. Makes learning fun and meaningful.",
    image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=600",
    socials: [
      { icon: <FaTwitter/>, link: "#" },
      { icon: <FaInstagram/>, link: "#" },
      { icon: <FaFacebook/>, link:"#"}
    ],
  },
  {
    name: "David Okoro",
    role: "Technology & Innovation",
    bio: "Building interactive learning tools and ensuring a seamless digital experience for students.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    socials: [
      { icon: <FaTwitter/>, link: "#" },
      { icon: <FaInstagram/>, link: "#" },
      { icon: <FaFacebook/>, link:"#"}
    ],
  },
];


const handleCourseDetailsRoute = (route:string)=>{

}

export default function PFSchools() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const router = useRouter()

  return (
    <>
      {/* Navbar */}
<Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="min-h-screen pt-24 flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000')",
          }}
        />

        {/* Dark Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight heading-font tracking-tighter text-white">
              Educating Your Children
            </h1>
            <p className="mt-6 text-2xl text-white">
              The world has changed. It’s time to rethink how we educate the next generation.
            </p>
            <p className="mt-8 text-lg text-zinc-300 max-w-lg">
              Innovative online learning platform where children develop independence, confidence, and a love for learning.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-[#4E9FE5] hover:bg-violet-700 rounded-2xl font-semibold flex items-center gap-3 text-white"
              >
                Check Courses <ArrowRight />
              </motion.a>
              <Link href={'/about'} className="px-8 py-4 border border-white/30 rounded-2xl hover:bg-white/5 transition text-white">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right: Diagonal Slanted Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-[420px] h-[520px]">
              {/* Diagonal Shape Container */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 shadow-2xl overflow-hidden"
                style={{
                  clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                  borderRadius: "12px"
                }}
              >
                {/* Sliding Images Carousel */}
                <motion.div
                  className="flex h-full"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
                    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800",
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
                    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
                    "https://images.unsplash.com/photo-1606768666853-9c0a8e5c7c8c?w=800",
                  ].map((img, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <img
                        src={img}
                        alt={`Learning scene ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Decorative Accents */}
              <div className="absolute -top-6 -right-6 bg-white text-black text-sm font-semibold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-10">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live Now
              </div>

              <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-white/20 text-xs px-5 py-2.5 rounded-2xl backdrop-blur-md z-10 text-white">
                Ages 5 — 10
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { icon: Users, label: "Happy Students", value: "500+" },
            { icon: Star, label: "Reviews", value: "4.9" },
            { icon: Award, label: "Qualified Teachers", value: "30+" },
            { icon: Clock, label: "Years in Operation", value: "3+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#4E9FE5]" />
              <div className="text-5xl font-bold mb-1">{stat.value}</div>
              <p className="text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      {/* What We Do - Two Column Layout */}
      <section id="about" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800" 
                  alt="Children engaged in learning activities"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative overlay */}
              <div className="absolute -bottom-6 -right-6 bg-[#4E9FE5] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                Active Learning in Progress
              </div>
            </motion.div>

            {/* Right: Writeup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[#4E9FE5] font-medium tracking-widest">OUR APPROACH</span>
                <h2 className="text-5xl font-bold heading-font mt-3 leading-tight">
                  What We Do
                </h2>
              </div>

              <div className="text-lg text-zinc-300 leading-relaxed space-y-6">
                <p>
                  We provide a nurturing, stimulating, and innovative online environment where children develop 
                  independence, confidence, and a lifelong love for learning.
                </p>
                <p>
                  Our curriculum enhances language, literacy, mathematics, logic, music, movement, art, 
                  and socialization through play-based and interactive learning experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalized Learning</h4>
                    <p className="text-sm text-zinc-400">Daily milestones tailored to your child</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Guidance</h4>
                    <p className="text-sm text-zinc-400">Qualified teachers supporting every step</p>
                  </div>
                </div>
              </div>

              <motion.a
                href="/courses"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold mt-4 hover:bg-zinc-100 transition"
              >
                Explore Our Courses
                <ArrowRight />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      {/* Learning Journey Section - Fully Redesigned */}
      <section id="journey" className="py-24 bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-violet-400 font-medium tracking-widest text-white">PERSONALIZED JOURNEY</span>
              <h2 className="text-5xl md:text-6xl font-bold heading-font leading-tight mt-4 text-white">
                Make Independent Learning<br />a Joyful Reality
              </h2>
              <p className="mt-6 text-xl text-zinc-400 max-w-lg ">
                Your child’s personalized learning journey — broken into meaningful daily milestones.
              </p>

              <div className="mt-12 space-y-8">
                {[
                  {
                    number: "01",
                    title: "Curated Daily Activities",
                    desc: "No more hunting for learning plans. We provide engaging daily content."
                  },
                  {
                    number: "02",
                    title: "Adapts to Your Child",
                    desc: "Smart difficulty adjustment based on progress and performance."
                  },
                  {
                    number: "03",
                    title: "Visible Mastery",
                    desc: "Track real progress with beautiful milestone achievements."
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-6"
                  >
                    <div className="text-5xl font-bold text-white">{item.number}</div>
                    <div>
                      <h4 className="text-2xl font-semibold">{item.title}</h4>
                      <p className="text-zinc-400 mt-2">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual / Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative hidden md:block"
            >
              <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-[3rem] p-8 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700" 
                  alt="Child learning journey"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Infinite Scrolling Animated Cartoons */}
          <div className="mt-20">
            <p className="text-center text-zinc-500 text-sm tracking-widest mb-6">SUBJECTS YOUR CHILD WILL MASTER</p>
            
            <div className="relative overflow-hidden py-6">
              <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* First set of icons */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-12">
                    {[
                      { icon: "📖", label: "English" },
                      { icon: "🔢", label: "Mathematics" },
                      { icon: "🧠", label: "Logic" },
                      { icon: "🌍", label: "Science" },
                      { icon: "🎨", label: "Art" },
                      { icon: "🎵", label: "Music" },
                      { icon: "🧩", label: "Problem Solving" },
                      { icon: "🌱", label: "Nature" },
                      { icon: "📝", label: "Writing" },
                      { icon: "🧮", label: "Counting" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        className="flex flex-col items-center text-center min-w-[100px]"
                      >
                        <div className="text-6xl mb-3 transition-transform">{item.icon}</div>
                        <p className="text-sm font-medium text-zinc-400">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-zinc-900 to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses
      <section id="courses" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-bold heading-font text-white">Our Popular Courses</h2>
              <p className="text-zinc-400 mt-2">Designed for curious minds aged 5–10</p>
            </div>
            <a href="#" className="text-violet-400 flex items-center gap-2 hover:text-violet-300">
              View All Courses <ArrowRight />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all"
              >
                <div className="h-52 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center relative">
                  <Play className="w-16 h-16 text-white/60 group-hover:scale-110 transition" />
                </div>

                <div className="p-7">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg leading-tight text-white">{course.title}</h3>
                    {course.free && <span className="text-emerald-400 text-xs font-bold">FREE</span>}
                  </div>

                  <p className="text-sm text-zinc-400 mt-3 line-clamp-3">{course.desc}</p>

                  <div className="mt-6 text-xs text-zinc-500 flex gap-4">
                    <div>{course.duration}</div>
                    <div>{course.level}</div>
                    <div>{course.students} Students</div>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(i)}
                    className="mt-8 w-full py-3.5 bg-white text-black rounded-2xl font-medium hover:bg-zinc-100 transition"
                  >
                    Start Course
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}


      {/* Popular Courses */}
      <section id="courses" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-bold heading-font text-white">Our Popular Courses</h2>
              <p className="text-zinc-400 mt-2">Designed for curious minds aged 5–10</p>
            </div>
            <a href={"/courses"} className="text-[#4E9FE5] flex items-center gap-2 hover:text-violet-300 transition">
              View All Courses <ArrowRight />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all duration-300"
              >
                {/* Course Image */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {course.free && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      FREE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="p-7">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg leading-tight text-white">{course.title}</h3>
                  </div>

                  <p className="text-sm text-zinc-400 mt-3 line-clamp-3">{course.desc}</p>

                  <div className="mt-6 text-xs text-zinc-500 flex gap-4">
                    <div>{course.duration}</div>
                    <div>•</div>
                    <div>{course.level}</div>
                    <div>•</div>
                    <div>{course.students} Students</div>
                  </div>

                  <Link href={`/courses/${course.slug}`} className="block mt-8">
                    <button 
                      className="w-full py-3.5 bg-white text-black rounded-2xl font-medium hover:bg-zinc-100 transition"
                    >
                      Start Course
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#4E9FE5] font-medium tracking-widest">OUR TEAM</span>
            <h2 className="text-5xl font-bold heading-font mt-3 text-white">Meet Our Dedicated Educators</h2>
            <p className="text-zinc-400 mt-4 max-w-md mx-auto">
              Passionate professionals committed to nurturing young minds
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -12 }}
                className="group bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
                  <p className="text-violet-400 mt-1">{member.role}</p>

                  <p className="text-sm text-zinc-400 mt-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Social Media */}
                  <div className="flex gap-4 mt-6">
                    {member.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        className="text-zinc-400 hover:text-white transition text-xl"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* Redesigned Testimonials */}
      <section id="testimonials" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#4E9FE5] font-medium tracking-widest">TESTIMONIALS</span>
            <h2 className="text-5xl font-bold heading-font mt-3 text-white">What Parents Say</h2>
            <p className="text-zinc-400 mt-4 max-w-md mx-auto">
              Real stories from families who transformed their children’s learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-violet-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <Quote className="w-9 h-9 text-violet-500/30 mb-4" />
                  <p className="text-lg leading-relaxed text-zinc-200">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-8 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-gradient-to-b from-zinc-900 to-black text-center">
        <div className="max-w-3xl mx-auto px-6 p-12">
          <h2 className="text-6xl font-bold heading-font text-white">Ready to Give Your Child the Best Learning Experience?</h2>
          <p className="mt-6 text-xl text-zinc-400">Join thousands of happy families today.</p>
          <Link href={'/courses'} className="block mt-8">
          <motion.button

            whileHover={{ scale: 1.05 }}
            className="mt-10 px-12 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg font-semibold rounded-3xl"
          >
            Start Free Trial Now
          </motion.button>
          </Link>
        </div>

        {/*   footer section */}

              {/* Footer */}
    <Footer />
      </section>
    </>
  );
}