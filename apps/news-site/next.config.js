/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['clients', 'zod-validation'],
  experimental: {
    appDir: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',
  },
};
