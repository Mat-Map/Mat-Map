/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // enables SSR support + smaller class names
  },
};

export default nextConfig;