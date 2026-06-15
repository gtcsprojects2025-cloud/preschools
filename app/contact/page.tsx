'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("Thank you! Your message has been sent successfully.");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}

  <Navbar />
      {/* Banner / Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=2000')",
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

        {/* Banner Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold heading-font tracking-tighter">
              Get In Touch
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-zinc-200">
              We’re here to support your child’s learning journey
            </p>
            <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
              Have questions about our programs? Want to speak with our team? Reach out today.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm flex flex-col items-center gap-1">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 mt-12">
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We typically respond to all inquiries within <span className="text-violet-400 font-medium">24 hours</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            
            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-zinc-900 rounded-3xl p-10 border border-white/10">
                <h2 className="text-3xl font-semibold mb-8">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 focus:border-violet-500 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 focus:border-violet-500 outline-none transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 focus:border-violet-500 outline-none transition"
                      placeholder="Inquiry about courses"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={7}
                      className="w-full bg-zinc-950 border border-white/10 rounded-3xl px-6 py-4 focus:border-violet-500 outline-none transition resize-y"
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitted}
                    className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition disabled:opacity-70"
                  >
                    {submitted ? "Sending..." : "Send Message"}
                    <ArrowRight />
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-zinc-900 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a href="mailto:hello@pfschools.com" className="text-zinc-400 hover:text-white transition">
                        hello@pfschools.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <a href="tel:+2348030000000" className="text-zinc-400 hover:text-white transition">
                        +234 803 000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium">Visit Us</p>
                      <p className="text-zinc-400">
                        Potasfield Schools<br />
                        123 Learning Avenue<br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-zinc-400">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 rounded-3xl p-8">
                <p className="text-lg font-medium">
                  Our team is ready to help make your child’s learning experience exceptional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}