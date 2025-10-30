"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Battery, FileText, Wrench, BarChart3,
  Settings, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/home" },
    { name: "Assets", icon: Battery, path: "/assets" },
    { name: "Plans", icon: FileText, path: "/plans" },
    { name: "Work Orders", icon: Wrench, path: "/workorders" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`relative h-screen bg-white/80 backdrop-blur-md shadow-xl rounded-r-2xl border-r border-emerald-100
      transition-all duration-300 flex flex-col
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="p-5 border-b border-emerald-50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-emerald-800">Navigation</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 bg-emerald-500 hover:bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center text-white shadow-lg"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={name}
              href={path}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? name : ""}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="text-sm font-medium">{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-emerald-50 space-y-2">
        {bottomItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            href={path}
            className={`
              flex items-center gap-3 p-3 rounded-xl text-gray-600
              hover:bg-emerald-50 hover:text-emerald-700 transition-all
              ${isCollapsed ? "justify-center" : ""}
            `}
            title={isCollapsed ? name : ""}
          >
            <Icon size={20} />
            {!isCollapsed && <span className="text-sm font-medium">{name}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}
