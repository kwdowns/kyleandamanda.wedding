/** @type {import('next').NextConfig} */
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
let nextConfig = {
  images: {},
};

nextConfig = withVercelToolbar()(nextConfig);

export default nextConfig;

 
