"use client";
import { User, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRole } from "./RoleContext";
import { useRouter } from "next/navigation";

export default function Navbar({ onMenuClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useRole();
  const router = useRouter();

  useEffect(() => {
    // Check for mobile screen width
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md px-5 py-3 border-b border-emerald-100 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
          ⚡
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Voltup Draive
          </h1>
          <p className="text-xs text-gray-500 -mt-1">EV Platform</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center shadow">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-emerald-50 transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.email || "Admin"}
              </p>
              <p className="text-xs text-gray-500">{user?.role || "User"}</p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Hide Menu icon on mobile */}
        {!isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          >
            {/* no lucide-react import for Menu needed anymore */}
            ☰
          </button>
        )}
      </div>
    </nav>
  );
}
