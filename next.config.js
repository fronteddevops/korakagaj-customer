/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
 
  BASE_URL: "https://app.applatus.com:5000/v1",
  BASE_URL_UPLOADS: "https://app.applatus.com:5000/uploads/",
  trailingSlash: true,
  distDir: "out",
};

module.exports = nextConfig;
