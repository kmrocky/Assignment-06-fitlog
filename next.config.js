/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The FitLog API's image host isn't known ahead of time, so images are
    // served unoptimized rather than maintaining a remotePatterns allowlist.
    unoptimized: true,
  },
};

module.exports = nextConfig;
