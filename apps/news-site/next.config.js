/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["clients"],
  experimental: {
    appDir: true,
  }
};
