import type { Metadata } from "next";
import { ogImage } from "@/app/lib/site";

const title = "All Courses";
const description =
  "Browse every PFSchools course across English, Mathematics, Logic and Science. Filter by subject, grade and duration to find the right fit for your child.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    url: "/courses",
    title: `${title} | PFSchools`,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary",
    title: `${title} | PFSchools`,
    description,
    images: [ogImage.url],
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
