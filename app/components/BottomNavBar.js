"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Package,
  ClipboardList,
  Wrench,
  User,
} from "lucide-react";

export default function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();

  // hide on login/signup pages
  if (pathname === "/" || pathname === "/login" || pathname === "/signup")
    return null;

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/assets", label: "Assets", icon: Package },
    { href: "/plans", label: "Plans", icon: ClipboardList },
    { href: "/workorders", label: "Work", icon: Wrench },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[75%] max-w-sm 
      bg-white/95 backdrop-blur-xl shadow-lg border border-emerald-100 
      rounded-full flex justify-center items-center py-1 px-2 z-60"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <motion.button
            key={href}
            whileTap={{ scale: 0.92 }}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center justify-center mx-2 transition-all duration-300 ${
              isActive ? "text-emerald-600 scale-105" : "text-gray-500"
            }`}
          >
            <div
              className={`p-1.5 rounded-full transition-all ${
                isActive
                  ? "bg-emerald-100 shadow-sm ring-2 ring-emerald-400/20"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </div>
            <span
              className={`text-[10px] mt-0.5 font-medium ${
                isActive ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}