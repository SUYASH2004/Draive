"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  Package,
  ClipboardList,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRole } from "./RoleContext";

export default function Sidebar({ isOpen, onClose, onCollapse }) {
  const { user } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const allMenu = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/assets", label: "Assets", icon: Package },
    { href: "/plans", label: "Plans", icon: ClipboardList },
    { href: "/workorders", label: "Work Orders", icon: Wrench },
  ];

  // ✅ Role-based filtering logic
  const menu = useMemo(() => {
    if (!user) return allMenu; // show all if not logged in yet

    switch (user.role) {
      case "Admin":
        return allMenu;
      case "Operations Head":
        return allMenu.filter(({ label }) =>
          ["Home", "Work Orders"].includes(label)
        );
      case "Sales Head":
        return allMenu.filter(({ label }) =>
          ["Home", "Assets", "Plans"].includes(label)
        );
      default:
        return allMenu.filter(({ label }) => label === "Home");
    }
  }, [user]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapse) onCollapse(newState);
  };

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.15, ease: "linear" }}
        className="hidden md:flex fixed left-0 top-0 h-full bg-white/90 backdrop-blur-md border-r border-emerald-100 shadow-lg flex-col z-40"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            {!isCollapsed && (
              <h2 className="text-lg font-bold text-emerald-700 transition-all duration-100">
                Voltup Draive
              </h2>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-emerald-50"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 flex flex-col mt-4 px-2 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 px-3 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all relative"
            >
              <Icon size={20} />
              {!isCollapsed && <span>{label}</span>}
              {isCollapsed && (
                <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3 text-xs text-gray-500 text-center">
          {isCollapsed ? "⚡" : "© 2025 Voltup"}
        </div>
      </motion.aside>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-[260px] bg-white/95 backdrop-blur-md border-r border-emerald-100 shadow-2xl z-50 flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold">
                    ⚡
                  </div>
                  <h2 className="text-lg font-bold text-emerald-700">
                    Voltup Draive
                  </h2>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-emerald-50"
                  onClick={onClose}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Menu */}
              <nav className="flex-1 flex flex-col mt-4 px-4 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100">
                {menu.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-gray-100 p-3 text-xs text-gray-500 text-center">
                © 2025 Voltup
              </div>
            </motion.aside>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
