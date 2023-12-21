/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // BASE_URL: "https://api.korakagaj.com/v1",
  // BASE_URL_UPLOADS: "https://api.korakagaj.com/uploads/",
  // trailingSlash: false,
  // distDir: 'dist',
  // output: "export",
  // //live

  BASE_URL: "https://api.korakagaj.com/v1",
  BASE_URL_UPLOADS: "https://api.korakagaj.com/uploads/",
  trailingSlash: true,
  distDir: "dist",


  // satish
  // BASE_URL: "http://192.168.29.131:5000/v1",
  // BASE_URL_UPLOADS: "http://192.168.29.131:5000/uploads/",
  // trailingSlash: true,
  // distDir: "dist",
};

module.exports = nextConfig;
