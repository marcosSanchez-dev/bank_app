import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

// Configuración condicional para Turbopack
export default process.env.TURBOPACK
  ? nextConfig
  : withSentryConfig(nextConfig, {
      org: "illuminv",
      project: "javascript-nextjs",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      disableLogger: true,
      automaticVercelMonitors: true,
    });
