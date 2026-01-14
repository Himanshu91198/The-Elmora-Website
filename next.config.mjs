/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qydwnmkdmpnoswanjwnr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname:
          "/a/ACg8ocKs0yau0EiMS-68Vxy3L9L6MwsuERLO7i_8XApGQqkpFbVyPPs=s96-c/**",
      },
      {
        protocol: "https",
        hostname: "authjs.dev",
        pathname: "/img/providers/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
