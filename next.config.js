/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "lh3.googleusercontent.com", // Add this line for Google user images
      },
    ],
  },
};
module.exports = nextConfig;
