module.exports = {
  reactStrictMode: true,
  profiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true
      }
    ]
  }
}
