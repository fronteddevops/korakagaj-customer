/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
   //satish
  BASE_URL : 'http://192.168.29.131:5000/v1',
  BASE_URL_UPLOADS : 'http://192.168.29.131:5000/uploads/',
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,
   
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
   
    // Optional: Change the output directory `out` -> `dist`
    distDir: 'dist',
  }
   
  module.exports = nextConfig