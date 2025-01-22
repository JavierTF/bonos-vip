/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'pg' module on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        pg: false,
      }
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'pg', 'pg-hstore'],
  },
}

module.exports = nextConfig