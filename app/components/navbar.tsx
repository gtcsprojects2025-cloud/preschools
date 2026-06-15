// "use client";

// import Link from 'next/link';
// import { BookOpen} from 'lucide-react';
// import Image from 'next/image';



// export default function Navbar() {
//   return (
//     <>
      


//             {/* Modern Centered Navbar */}
//       <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-6">
//         <div className="bg-white backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-8 flex items-center justify-between shadow-2xl text-black">
          
//           {/* Logo */}
//           <a href='/'>
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center">
              
//               <Image src="/pfslogo.png" alt='pfschools logo' width={40} height={40}/>
//             </div>
//             <span className="text-2xl font-bold tracking-tight">PFSchools</span>
//           </div>
//         </a>
//           {/* Centered Navigation Links */}
//           <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//             <Link href="/" className="hover:text-violet-400 transition">Home</Link>
//             <Link href="/about" className="hover:text-violet-400 transition">About</Link>
//             <Link href="/courses" className="hover:text-violet-400 transition">Courses</Link>
//             <Link href="/instructors" className="hover:text-violet-400 transition">Instructors</Link>
//             <Link href="/contact" className="hover:text-violet-400 transition">Contact</Link>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             <Link 
//               href="/login"
//               className="hidden md:block px-6 py-2.5 text-sm border border-white/20 rounded-2xl hover:bg-white/5 transition"
//             >
//               Login
//             </Link>
//             <Link 
//               href="/courses"
//               className="px-6 py-2.5 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition"
//             >
//               Start Free
//             </Link>
//           </div>

//           {/* Mobile Menu Button (Optional) */}
//           <button className="md:hidden text-white">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </nav>
//       </>
//   )
// }




'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modern Centered Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-6">
        <div className="bg-white backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-8 flex items-center justify-between shadow-2xl text-black">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center border">
              <Image 
                src="/pfslogo.png" 
                alt="PFSchools logo" 
                width={40} 
                height={40}
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">PFSchools</span>
          </a>

          {/* Centered Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-violet-600 transition">Home</Link>
            <Link href="/about" className="hover:text-violet-600 transition">About</Link>
            <Link href="/courses" className="hover:text-violet-600 transition">Courses</Link>
            <Link href="/instructors" className="hover:text-violet-600 transition">Instructors</Link>
            <Link href="/contact" className="hover:text-violet-600 transition">Contact</Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block px-6 py-2.5 text-sm border border-gray-300 rounded-2xl hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/courses"
              className=" hidden px-6 py-2.5 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition"
            >
              Start Free
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-black"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden bg-black/70 backdrop-blur-sm">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-300">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center border">
                  <Image 
                    src="/pfslogo.png" 
                    alt="PFSchools logo" 
                    width={40} 
                    height={40}
                  />
                </div>
                <span className="text-2xl font-bold">PFSchools</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-black transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="p-6 flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/courses", label: "Courses" },
                { href: "/instructors", label: "Instructors" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-2xl transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="absolute bottom-8 left-6 right-6 space-y-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-black text-center py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition"
              >
                Login
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}