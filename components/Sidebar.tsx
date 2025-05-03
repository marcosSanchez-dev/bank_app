"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: { scale: 1.05, originX: 0 },
  tap: { scale: 0.95 },
};

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.section
      className="sidebar"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      style={{ position: "relative" }}
    >
      <nav className="flex flex-col gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="mb-12 cursor-pointer items-center gap-2 flex"
          >
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={34}
              height={34}
              className="size-[24px] max-xl:size-14 transition-transform duration-300 hover:rotate-[15deg]"
            />
            <motion.h1
              className="sidebar-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Horizon
            </motion.h1>
          </Link>
        </motion.div>
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {sidebarLinks.map((item, index) => {
              const isActive =
                pathName === item.route ||
                pathName.startsWith(`${item.route}/`);

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    href={item.route}
                    className={cn(
                      "sidebar-link group relative overflow-hidden",
                      { "bg-bank-gradient": isActive }
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-bank-gradient"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="relative size-6 z-10">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn("transition-all duration-300", {
                          "brightness-[3] invert-0": isActive,
                          "group-hover:scale-110": !isActive,
                        })}
                      />
                    </div>

                    <motion.p
                      className={cn("sidebar-label z-10", {
                        "!text-white": isActive,
                        "group-hover:text-gray-700": !isActive,
                      })}
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      {item.label}
                    </motion.p>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        user
      </nav>

      <Footer user={user} type="desktop" />
    </motion.section>
  );
};

export default Sidebar;
