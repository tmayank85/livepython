import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/python-compiler',
                permanent: true, // Set to true for a permanent redirect (301)
            },
        ];
    },
    eslint: {
        // Disable ESLint checks during build
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
