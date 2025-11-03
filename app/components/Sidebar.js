"use client";
import Link from "next/link";
import { useRole } from "./RoleContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const { user } = useRole();
  const [isOpen, setIsOpen] = useState(true); // toggle sidebar for mobile

  if (!user) return null; // hide sidebar when not logged in

  const menu = {
    Admin: [
      { href: "/home", label: "Home" },
      { href: "/assets", label: "Assets" },
      { href: "/plans", label: "Plans" },
      { href: "/workorders", label: "Work Orders" },
    ],
    Technician: [
      { href: "/assets", label: "Assets" },
      { href: "/workorders", label: "Work Orders" },
    ],
    Support: [{ href: "/plans", label: "Plans" }],
  };

  const links = menu[user.role] || [];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-emerald-600 text-white p-2 rounded-lg shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white/90 backdrop-blur-md border-r border-emerald-100 shadow-md transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-0 md:w-64"
        } overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Voltup Draive
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            EV Management Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mt-4 px-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
