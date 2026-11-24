import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  // Only the modules that are actually imported get bundled from these packages.
  // (lucide-react and react-icons/* are optimised by default in Next.js)
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  images: {
    // Serve modern formats first, fall back to WebP for older browsers.
    formats: ["image/avif", "image/webp"],
    // Cache optimised remote images for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Be explicit about which remote hosts may be optimised.
    // Add any additional CDN host here if course thumbnails live elsewhere.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
