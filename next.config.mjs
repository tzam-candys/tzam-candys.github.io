const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? basePath : '',
  assetPrefix: isProd ? basePath : '',
  reactStrictMode: true,
  devIndicators: false,
};

export default nextConfig;
