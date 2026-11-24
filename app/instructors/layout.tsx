import type { Metadata } from "next";
import { ogImage } from "@/app/lib/site";

const title = "Our Instructors";
const description =
  "Meet the qualified, DBS-checked teachers who lead PFSchools lessons — subject specialists who make learning feel like play.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/instructors" },
  openGraph: {
    type: "website",
    url: "/instructors",
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

export default function InstructorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
