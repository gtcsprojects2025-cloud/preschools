"use client";

import Link from 'next/link';
import { BookOpen} from 'lucide-react';
import Image from 'next/image';



export default function Navbar() {
  return (
    <>
      


            {/* Modern Centered Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-6">
        <div className="bg-white backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-8 flex items-center justify-between shadow-2xl text-black">
          
          {/* Logo */}
          <a href='/'>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center">
              
              <Image src="/pfslogo.png" alt='pfschools logo' width={40} height={40}/>
            </div>
            <span className="text-2xl font-bold tracking-tight">PFSchools</span>
          </div>
        </a>
          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-violet-400 transition">Home</Link>
            <Link href="/about" className="hover:text-violet-400 transition">About</Link>
            <Link href="/courses" className="hover:text-violet-400 transition">Courses</Link>
            <Link href="/instructors" className="hover:text-violet-400 transition">Instructors</Link>
            <Link href="/contact" className="hover:text-violet-400 transition">Contact</Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login"
              className="hidden md:block px-6 py-2.5 text-sm border border-white/20 rounded-2xl hover:bg-white/5 transition"
            >
              Login
            </Link>
            <Link 
              href="/courses"
              className="px-6 py-2.5 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Menu Button (Optional) */}
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      </>
  )
}