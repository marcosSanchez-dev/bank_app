"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const AuthScene = dynamic(() => import("@/components/AuthScene"), {
  ssr: false,
  loading: () => (
    <div className="rounded-l-xl bg-gradient-to-br from-indigo-900 to-blue-900 w-full h-full animate-pulse" />
  ),
});

export default function AuthSceneWrapper() {
  return (
    <div className="relative h-full w-full" style={{ width: "50vw" }}>
      <AuthScene />
      <motion.div
        className="absolute bottom-8 left-8 right-8 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
}
