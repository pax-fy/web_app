/** @type {import('next').NextConfig} */
const nextConfig = {
    const withPWA = require('next-pwa')({
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production',
      buildExcludes: [/chunks\/.*$/, /media\/.*$/],
      publicExcludes: ['!splashscreens/**/*', '!screenshots/**/*'],
      runtimeCaching,
    }),
    reactStrictMode: true,
    images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "ipfs.crossbell.io"
      }
    ]
      
    }
  }
  
  module.exports = nextConfig
  