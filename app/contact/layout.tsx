import type { Metadata } from "next";
import { ogImage } from "@/app/lib/site";

const title = "Contact Us";
const description =
  "Questions about enrolment, timetables or pricing? Get in touch with the PFSchools team and we will reply within one working day.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
