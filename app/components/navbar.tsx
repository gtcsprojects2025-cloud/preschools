"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/instructors", label: "Instructors" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close on Escape and stop the page behind the drawer from scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-6"
      >
        <div className="bg-white backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-8 flex items-center justify-between shadow-2xl text-black">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl"
            aria-label="PFSchools — home"
          >
            <span className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center border">
              <Image
                src="/pfslogo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="text-2xl font-bold tracking-tight">PFSchools</span>
          </Link>

          {/* Centered Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors ${
                  isActive(link.href)
                    ? "text-violet-600 font-semibold"
                    : "hover:text-violet-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
              className="hidden sm:inline-flex px-6 py-2.5 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition"
            >
              Start Free
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-black"
            >
              <svg
                aria-hidden="true"
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
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center border">
                  <Image
                    src="/pfslogo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <span className="text-2xl font-bold">PFSchools</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-600 hover:text-black transition"
              >
                <X size={28} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block px-5 py-4 text-lg font-medium rounded-2xl transition ${
                    isActive(link.href)
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-auto p-6 space-y-4 border-t">
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

