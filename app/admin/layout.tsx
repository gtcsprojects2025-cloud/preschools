import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminShell from './adminShell';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'PFSchools administration dashboard.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
