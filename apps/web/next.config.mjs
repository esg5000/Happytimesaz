/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
      // Subdomains (e.g. regional / project CDNs) — `*.sanity.io` is not valid in all Next versions
      { protocol: 'https', hostname: '**.sanity.io', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }
    ]
  }
};

export default nextConfig;
