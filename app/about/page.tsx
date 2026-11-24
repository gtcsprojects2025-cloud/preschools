'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Heart, Target, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Banner */}
      <div className="pt-24 relative h-[580px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=2000"
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold heading-font tracking-tighter"
          >
            About PFSchools
          </motion.h1>
          <p className="mt-6 text-2xl text-zinc-300 max-w-2xl mx-auto">
            Rethinking education for the next generation through innovation, care, and excellence.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <Target aria-hidden="true" className="w-12 h-12 text-violet-400" />
                <h2 className="text-4xl font-bold heading-font">Our Mission</h2>
              </div>
              <p className="text-lg text-zinc-300 leading-relaxed">
                To provide an innovative, nurturing, and stimulating online learning environment 
                where children develop independence, confidence, and a lifelong love for learning.
              </p>
              <p className="text-zinc-400">
                We believe every child deserves access to quality education that adapts to their unique pace and interests.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <Eye aria-hidden="true" className="w-12 h-12 text-fuchsia-400" />
                <h2 className="text-4xl font-bold heading-font">Our Vision</h2>
              </div>
              <p className="text-lg text-zinc-300 leading-relaxed">
                To become the leading online platform that transforms how young minds learn, 
                grow, and thrive in the digital age.
              </p>
              <p className="text-zinc-400">
                We envision a world where every child is empowered through joyful, personalized, and meaningful education.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold heading-font">What We Do</h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
              We create an environment where children develop through play, exploration, and structured learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Learning",
                desc: "Engaging courses in English, Mathematics, Logic, Science and more."
              },
              {
                icon: Users,
                title: "Personalized Growth",
                desc: "Daily milestones tailored to each child’s learning pace and style."
              },
              {
                icon: Heart,
                title: "Nurturing Environment",
                desc: "Building confidence, independence, and a positive sense of self."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800/80 transition group"
              >
                <item.icon aria-hidden="true" className="w-14 h-14 text-violet-400 mb-6 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold heading-font">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Excellence", desc: "We strive for the highest standards in education." },
              { title: "Innovation", desc: "Constantly evolving our methods and content." },
              { title: "Care", desc: "Every child matters. Every milestone celebrated." },
              { title: "Joy", desc: "Learning should be fun, engaging and meaningful." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border border-white/10 p-8 rounded-3xl hover:border-violet-500/50 transition"
              >
                <div className="text-6xl font-bold text-white mb-4">0{i+1}</div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-zinc-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-bold heading-font">Ready to Join Our Learning Community?</h2>
          <p className="mt-6 text-xl text-zinc-400">
            Give your child the gift of joyful, effective learning.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/courses"
              className="px-10 py-4 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold text-lg transition-colors motion-safe:hover:scale-105 motion-safe:transform"
            >
              Explore Courses
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-white/30 rounded-2xl font-semibold text-lg hover:bg-white/5 transition-colors"
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