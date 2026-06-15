"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, Award, Play } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Footer() {
  return (
          <footer className="bg-black border-t border-white/10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Left Column - Brand & Newsletter */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-white">PFSchools</span>
              </div>

              <p className="text-zinc-400 max-w-md">
                Rethinking education for the next generation. Innovative online learning 
                that builds confidence, independence, and a lifelong love for learning.
              </p>

              {/* Newsletter Form */}
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
                <p className="text-sm text-zinc-500 mb-4">
                  Get weekly learning tips, new course alerts, and parent resources.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-zinc-900 border border-white/10 focus:border-violet-500 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none flex-1 transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-2xl font-semibold whitespace-nowrap transition"
                  >
                    Subscribe
                  </motion.button>
                </form>
                <p className="text-xs text-zinc-500 mt-3">
                  We respect your inbox. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Right Column - Quick Links */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              <div>
                <h5 className="font-semibold mb-5 text-white">Platform</h5>
                <ul className="space-y-3 text-zinc-400">
                  <li><a href="#courses" className="hover:text-white transition">Courses</a></li>
                  <li><a href="#journey" className="hover:text-white transition">Learning Journey</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">For Schools</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-5 text-white">Company</h5>
                <ul className="space-y-3 text-zinc-400">
                  <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Our Teachers</a></li>
                  <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-5 text-white">Support</h5>
                <ul className="space-y-3 text-zinc-400">
                  <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Parent Resources</a></li>
                  <li><a href="#" className="hover:text-white transition">Safety & Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2026 PFSchools. All Rights Reserved.</p>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-4 md:mt-0">
              {[
                { icon: "𝕏", link: "#" },
                { icon: "📘", link: "#" },
                { icon: "📷", link: "#" },
                { icon: "▶️", link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="hover:text-violet-400 transition text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  )}