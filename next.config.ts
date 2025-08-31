import type { NextConfig } from "next";

const NextConfig = {
    experimental: {
        typedRoutes: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};
export default NextConfig;
