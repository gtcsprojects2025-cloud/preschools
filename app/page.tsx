"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  Quote,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const heroSlides = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
  "https://images.unsplash.com/photo-1606768666853-9c0a8e5c7c8c?w=800",
];

const stats = [
  { icon: Users, label: "Happy Students", value: "500+" },
  { icon: Star, label: "Average Parent Rating", value: "4.9" },
  { icon: Award, label: "Qualified Teachers", value: "30+" },
  { icon: Clock, label: "Years in Operation", value: "3+" },
];

const journeySteps = [
  {
    number: "01",
    title: "Curated Daily Activities",
    desc: "No more hunting for learning plans. We provide engaging daily content.",
  },
  {
    number: "02",
    title: "Adapts to Your Child",
    desc: "Smart difficulty adjustment based on progress and performance.",
  },
  {
    number: "03",
    title: "Visible Mastery",
    desc: "Track real progress with beautiful milestone achievements.",
  },
];

const testimonials = [
  {
    text: "My experience here has been very rewarding and joyful. I've seen my child improve so much in her learning.",
    name: "Mick",
    role: "Parent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    text: "Enrolling my two year old has been one of the best decisions I've ever made.",
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
      { label: "Twitter", icon: <FaTwitter aria-hidden="true" /> },
      { label: "Instagram", icon: <FaInstagram aria-hidden="true" /> },
      { label: "Facebook", icon: <FaFacebook aria-hidden="true" /> },
    ],
  },
  {
    name: "Michael Roberts",
    role: "Head of Curriculum",
    bio: "Expert in developing engaging math and logic programs for children aged 5-10.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
    socials: [
      { label: "Twitter", icon: <FaTwitter aria-hidden="true" /> },
      { label: "Instagram", icon: <FaInstagram aria-hidden="true" /> },
      { label: "Facebook", icon: <FaFacebook aria-hidden="true" /> },
    ],
  },
  {
    name: "Sophia Chen",
    role: "Lead Teacher",
    bio: "Specializes in language development and creative arts. Makes learning fun and meaningful.",
    image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=600",
    socials: [
      { label: "Twitter", icon: <FaTwitter aria-hidden="true" /> },
      { label: "Instagram", icon: <FaInstagram aria-hidden="true" /> },
      { label: "Facebook", icon: <FaFacebook aria-hidden="true" /> },
    ],
  },
  {
    name: "David Okoro",
    role: "Technology & Innovation",
    bio: "Building interactive learning tools and ensuring a seamless digital experience for students.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    socials: [
      { label: "Twitter", icon: <FaTwitter aria-hidden="true" /> },
      { label: "Instagram", icon: <FaInstagram aria-hidden="true" /> },
      { label: "Facebook", icon: <FaFacebook aria-hidden="true" /> },
    ],
  },
];

interface Course {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  subject?: string;
  grade?: string;
  duration?: string;
  thumbnail?: string;
}

function extractCourses(data: unknown): Course[] {
  if (Array.isArray(data)) return data as Course[];
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { lessons?: unknown }).lessons)
  ) {
    return (data as { lessons: Course[] }).lessons;
  }
  return [];
}

export default function PFSchools() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/lessons", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            `We could not load the course list (status ${res.status}).`
          );
        }

        const data: unknown = await res.json();
        if (!controller.signal.aborted) setCourses(extractCourses(data));
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error && err.message
            ? err.message
            : "We could not load the course list right now."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCourses();

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <section className="min-h-screen pt-24 flex items-center relative overflow-hidden">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000"
            alt=""
            fill
            sizes="100vw"
            preload
            className="object-cover"
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
                The world has changed. It&apos;s time to rethink how we educate
                the next generation.
              </p>
              <p className="mt-8 text-lg text-zinc-300 max-w-lg">
                Innovative online learning platform where children develop
                independence, confidence, and a love for learning.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="px-8 py-4 bg-[#4E9FE5] hover:bg-[#3d8ed4] rounded-2xl font-semibold flex items-center gap-3 text-white transition-colors motion-safe:hover:scale-105 motion-safe:transform"
                >
                  Check Courses <ArrowRight aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-white/30 rounded-2xl hover:bg-white/5 transition text-white"
                >
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
              aria-hidden="true"
            >
              <div className="relative w-[420px] h-[520px] max-w-full">
                {/* Diagonal Shape Container */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 shadow-2xl overflow-hidden"
                  style={{
                    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                    borderRadius: "12px",
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
                    {heroSlides.map((slide) => (
                      <div key={slide} className="min-w-full h-full relative">
                        <Image
                          src={slide}
                          alt=""
                          fill
                          sizes="420px"
                          className="object-cover"
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
        <section
          aria-label="PFSchools at a glance"
          className="py-20 border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon
                  aria-hidden="true"
                  className="w-12 h-12 mx-auto mb-4 text-[#4E9FE5]"
                />
                <p className="text-5xl font-bold mb-1">{stat.value}</p>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Do - Two Column Layout */}
        <section id="about" className="py-24 bg-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800"
                    alt="Children engaged in learning activities"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
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
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[#4E9FE5] font-medium tracking-widest">
                    OUR APPROACH
                  </p>
                  <h2 className="text-5xl font-bold heading-font mt-3 leading-tight">
                    What We Do
                  </h2>
                </div>

                <div className="text-lg text-zinc-300 leading-relaxed space-y-6">
                  <p>
                    We provide a nurturing, stimulating, and innovative online
                    environment where children develop independence, confidence,
                    and a lifelong love for learning.
                  </p>
                  <p>
                    Our curriculum enhances language, literacy, mathematics,
                    logic, music, movement, art, and socialization through
                    play-based and interactive learning experiences.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen
                        aria-hidden="true"
                        className="w-5 h-5 text-violet-400"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Personalized Learning</h3>
                      <p className="text-sm text-zinc-400">
                        Daily milestones tailored to your child
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center flex-shrink-0">
                      <Users
                        aria-hidden="true"
                        className="w-5 h-5 text-fuchsia-400"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Guidance</h3>
                      <p className="text-sm text-zinc-400">
                        Qualified teachers supporting every step
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold mt-4 hover:bg-zinc-100 transition-colors motion-safe:hover:scale-105 motion-safe:transform"
                >
                  Explore Our Courses
                  <ArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Learning Journey */}
        <section
          aria-labelledby="journey-heading"
          className="py-24 bg-white text-black"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-violet-600 font-medium tracking-widest">
                SIMPLE PROCESS
              </p>
              <h2
                id="journey-heading"
                className="text-5xl font-bold heading-font mt-4"
              >
                Your Learning Journey
              </h2>
              <p className="mt-6 text-xl text-zinc-600 max-w-2xl mx-auto">
                From struggle to confidence — in three easy steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {journeySteps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-10 h-full hover:shadow-xl transition-shadow">
                    <span className="text-6xl font-bold text-violet-200 heading-font">
                      {step.number}
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-zinc-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section
          aria-labelledby="courses-heading"
          className="py-24 bg-zinc-50 text-black"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
              <div>
                <p className="text-violet-600 font-medium tracking-widest">
                  EXPLORE
                </p>
                <h2
                  id="courses-heading"
                  className="text-5xl font-bold heading-font mt-4"
                >
                  Featured Courses
                </h2>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
              >
                View all courses
                <ArrowRight aria-hidden="true" className="w-5 h-5" />
              </Link>
            </div>

            <div aria-live="polite" aria-busy={loading}>
              {loading && (
                <p className="text-zinc-600">Loading courses…</p>
              )}

              {!loading && error && (
                <div className="flex flex-col items-start gap-4">
                  <p className="text-red-600">{error}</p>
                  <button
                    type="button"
                    onClick={() => setReloadKey((key) => key + 1)}
                    className="px-6 py-3 bg-black text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!loading && !error && courses.length === 0 && (
                <p className="text-zinc-600">
                  New courses are being prepared — check back soon.
                </p>
              )}
            </div>

            {!loading && !error && courses.length > 0 && (
              <div className="grid md:grid-cols-3 gap-8">
                {courses.slice(0, 3).map((course) => (
                  <motion.article
                    key={course._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link
                      href={
                        course.slug
                          ? `/courses/content/${course.slug}`
                          : "/courses"
                      }
                      className="group block bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:shadow-2xl transition-shadow h-full"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={course.thumbnail || heroSlides[0]}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {course.subject && (
                          <span className="absolute top-4 left-4 bg-white/90 text-xs font-medium px-3 py-1 rounded-full">
                            {course.subject}
                          </span>
                        )}
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-semibold">
                          {course.title}
                        </h3>
                        {course.description && (
                          <p className="mt-3 text-zinc-600">
                            {course.description}
                          </p>
                        )}

                        <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
                          <span className="flex items-center gap-2">
                            <Clock aria-hidden="true" className="w-4 h-4" />
                            {course.duration || "Self-paced"}
                          </span>
                          <span className="flex items-center gap-2 font-semibold text-violet-600">
                            Start learning
                            <ArrowRight
                              aria-hidden="true"
                              className="w-4 h-4"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading" className="py-24 bg-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-violet-400 font-medium tracking-widest">
                OUR PEOPLE
              </p>
              <h2
                id="team-heading"
                className="text-5xl font-bold heading-font mt-4"
              >
                Meet Our Team
              </h2>
              <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
                Passionate professionals dedicated to your child&apos;s success.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden h-full hover:border-violet-500/40 transition-colors">
                    <div className="relative h-64">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-violet-300">{member.role}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {member.bio}
                      </p>
                      <ul
                        className="mt-4 flex items-center gap-3"
                        aria-label={`${member.name} on social media`}
                      >
                        {member.socials.map((social) => (
                          <li key={social.label}>
                            <a
                              href="#"
                              aria-label={`${member.name} on ${social.label}`}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              {social.icon}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          aria-labelledby="testimonials-heading"
          className="py-24 bg-white text-black"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-violet-600 font-medium tracking-widest">
                TESTIMONIALS
              </p>
              <h2
                id="testimonials-heading"
                className="text-5xl font-bold heading-font mt-4"
              >
                What Parents Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.figure
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 h-full flex flex-col"
                >
                  <Quote
                    aria-hidden="true"
                    className="w-8 h-8 text-violet-300 mb-4"
                  />
                  <blockquote className="text-zinc-700 leading-relaxed flex-1">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Image
                      src={testimonial.avatar}
                      alt=""
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-zinc-500">{testimonial.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="cta-heading"
          className="py-24 bg-gradient-to-br from-violet-600 to-fuchsia-600"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-bold heading-font leading-tight"
            >
              Ready to Give Your Child a Head Start?
            </h2>
            <p className="mt-6 text-xl text-white/80">
              Join hundreds of families learning with PFSchools every day.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-100 transition-colors motion-safe:hover:scale-105 motion-safe:transform"
              >
                Browse Courses
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/40 rounded-2xl font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
