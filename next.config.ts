import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Tree-shake icon and 3D imports down to what is actually used.
  experimental: {
    optimizePackageImports: ["lucide-react", "three"],
  },

  /**
   * Permanent redirects from the previous static site's URLs, so links
   * already shared on LinkedIn, GitHub READMEs or CVs keep working.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/pages/:slug.html", destination: "/projects/:slug", permanent: true },
      { source: "/assets/:file", destination: "/:file", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
