/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
//live
    BASE_URL : 'http://3.109.196.67:3000/v1',
    BASE_URL_UPLOADS : 'http://3.109.196.67:3000/uploads/',
    trailingSlash: true,
  distDir: 'dist',
  

};

module.exports = nextConfig;

