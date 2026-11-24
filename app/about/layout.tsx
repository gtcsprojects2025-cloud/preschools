import type { Metadata } from "next";
import { ogImage } from "@/app/lib/site";

const title = "About Us";
const description =
  "Meet the team behind PFSchools and learn how our small-group, child-led online lessons help children aged 5–10 grow into confident, independent learners.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
