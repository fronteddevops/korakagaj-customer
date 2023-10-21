/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',

    BASE_URL : 'http://192.168.29.131:5000/v1',
    BASE_URL_UPLOADS : 'http://192.168.29.131:5000/uploads/',
    distDir: 'dist',
  }
   
  module.exports = nextConfig