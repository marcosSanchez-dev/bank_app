import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      const loggedOut = await logoutAccount();
      if (loggedOut) router.push("/sign-in");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const childVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.footer
      className="footer relative group"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover="hover"
    >
      {/* Avatar del usuario */}
      <motion.div
        variants={childVariants}
        className={`${type === "mobile" ? "footer_name-mobile" : "footer_name"} 
          relative overflow-hidden bg-bank-gradient hover:shadow-lg transition-shadow`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.p
          className="text-xl font-bold text-gray-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {user?.firstName[0]}
        </motion.p>

        {/* Efecto de hover en el avatar */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Información del usuario */}
      <motion.div
        variants={childVariants}
        className={`${
          type === "mobile" ? "footer_email-mobile" : "footer_email"
        } 
          space-y-1`}
      >
        <motion.h1
          className="text-14 truncate text-gray-700 font-semibold"
          whileHover={{ x: 5 }}
        >
          {user?.firstName}
        </motion.h1>
        <motion.p
          className="text-14 truncate font-normal text-gray-600"
          whileHover={{ x: 5 }}
        >
          {user?.email}
        </motion.p>
      </motion.div>

      {/* Botón de Logout */}
      <motion.div
        className="relative cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogOut}
        style={{ touchAction: "manipulation" }} // Mejorar interacción táctil
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.span
              className="absolute -top-8 right-0 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              Cerrar sesión
            </motion.span>
          )}
        </AnimatePresence>

        <div className="relative flex items-center justify-center">
          {isLoggingOut ? (
            <motion.div
              className="w-6 h-6 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="w-5 h-5 border-2 border-t-transparent border-red-500 rounded-full" />
            </motion.div>
          ) : (
            <LogOut className="text-red-500 w-6 h-6 transition-colors" />
          )}
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
