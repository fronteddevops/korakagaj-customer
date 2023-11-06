/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',

     BASE_URL : 'http://3.109.196.67:3000/v1',
    BASE_URL_UPLOADS : 'http://3.109.196.67:3000/uploads/', 
    trailingSlash: true,
     distDir: 'dist',
    //satish
    //  BASE_URL : 'http://192.168.29.131:5000/v1',
    //  BASE_URL_UPLOADS : 'http://192.168.29.131:5000/uploads/',
    // distDir: 'dist',
  }
   
  module.exports = nextConfig