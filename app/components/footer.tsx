"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/#journey", label: "Learning Journey" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/instructors", label: "Our Instructors" },
      { href: "/#testimonials", label: "Testimonials" },
    ],
  },
  {
    heading: "Support",
    links: [{ href: "/contact", label: "Contact Us" }],
  },
];

const socialLinks = [
  { label: "X (Twitter)", icon: "𝕏" },
  { label: "Facebook", icon: "📘" },
  { label: "Instagram", icon: "📷" },
  { label: "YouTube", icon: "▶️" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "Newsletter signup is not connected yet — please use the contact page and we will add you to the list."
    );
    setEmail("");
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Column - Brand & Newsletter */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <span className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center">
                <Image
                  src="/pfslogo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <span className="text-3xl font-bold tracking-tight text-white">
                PFSchools
              </span>
            </Link>

            <p className="text-zinc-400 max-w-md">
              Rethinking education for the next generation. Innovative online
              learning that builds confidence, independence, and a lifelong love
              for learning.
            </p>

            {/* Newsletter Form */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Stay Updated
              </h3>
              <p id="newsletter-help" className="text-sm text-zinc-400 mb-4">
                Get weekly learning tips, new course alerts, and parent
                resources.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  aria-describedby="newsletter-help"
                  className="bg-zinc-900 border border-white/10 focus:border-violet-500 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-400 focus:outline-none flex-1 transition"
                />
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-2xl font-semibold whitespace-nowrap transition hover:scale-105 active:scale-95 motion-reduce:hover:scale-100"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-zinc-400 mt-3">
                We respect your inbox. Unsubscribe anytime.
              </p>

              <p role="status" aria-live="polite" className="text-sm text-zinc-300 mt-3">
                {status}
              </p>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((column) => (
              <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
                <h3
                  id={`footer-${column.heading}`}
                  className="font-semibold mb-5 text-white"
                >
                  {column.heading}
                </h3>
                <ul className="space-y-3 text-zinc-400">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} PFSchools. All Rights Reserved.</p>

          {/* Social Icons */}
          <ul className="flex gap-5 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href="#"
                  aria-label={`PFSchools on ${social.label}`}
                  className="hover:text-violet-400 transition-colors text-xl"
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
