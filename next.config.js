/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

/* PWA SETUP */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, // disable PWA in dev to avoid cache issues
});

/* SECURITY HEADERS */
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,

  /* PERFORMANCE */
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  /* IMAGES */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* EXPERIMENTAL (SAFE) */
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  /* ESLINT */
  eslint: {
    ignoreDuringBuilds: true, // avoids build failure on warnings
  },

  /* WEBPACK */
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },

  /* HEADERS */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);