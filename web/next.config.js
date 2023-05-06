/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  output: "export",
  distDir: "../app/web-dist",
};

module.exports = nextConfig;
