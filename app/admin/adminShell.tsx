'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Menu,
} from 'lucide-react';

const sidebarLinks = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin',
    label: 'Create Lesson',
    icon: PlusCircle,
  },
  {
    href: '/admin/lessons',
    label: 'All Lessons',
    icon: BookOpen,
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-zinc-900 border-r border-zinc-800
          transition-all duration-300 ease-in-out
          flex flex-col
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo area */}
        <div className={`flex items-center h-16 px-4 border-b border-zinc-800 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <GraduationCap aria-hidden="true" size={18} className="text-white" />
              </div>
              <span className="font-semibold text-white text-lg">PFSchools</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/admin/dashboard" aria-label="PFSchools admin dashboard">
              <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <GraduationCap aria-hidden="true" size={18} className="text-white" />
              </div>
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
              setMobileSidebarOpen(false);
            }}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!sidebarCollapsed}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight aria-hidden="true" size={18} /> : <ChevronLeft aria-hidden="true" size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${isActive(link.href)
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}
              `}
              title={sidebarCollapsed ? link.label : undefined}
              aria-label={sidebarCollapsed ? link.label : undefined}
            >
              <link.icon aria-hidden="true" size={20} />
              {!sidebarCollapsed && <span className="font-medium">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-zinc-800 ${sidebarCollapsed ? 'text-center' : ''}`}>
          {!sidebarCollapsed && (
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Back to site
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/" aria-label="Back to site" className="text-zinc-500 hover:text-zinc-300">
              <LayoutDashboard aria-hidden="true" size={18} />
            </Link>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-zinc-800 bg-zinc-900">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileSidebarOpen}
            aria-controls="admin-sidebar"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Menu aria-hidden="true" size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div aria-hidden="true" className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <GraduationCap aria-hidden="true" size={14} className="text-white" />
            </div>
            <span className="font-semibold text-white">PFSchools Admin</span>
          </div>
          <div className="w-10" aria-hidden="true" /> {/* spacer */}
        </header>

        {/* Page content */}
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}