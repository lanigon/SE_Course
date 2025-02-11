/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/meme/:path*",
        destination: "http://192.168.1.53:3000/api/coins/meme/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://*.tradingview.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
