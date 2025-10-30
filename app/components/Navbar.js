"use client";
import { User, Settings, LogOut, Bell } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-3 border-b border-emerald-100 rounded-b-2xl sticky top-0 z-50">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">⚡</span>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Voltup Draive
          </h1>
          <p className="text-xs text-gray-500 -mt-1 tracking-wide">
            EV Management Platform
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-50 transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                Admin User
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 transition-colors">
                <User size={16} /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 transition-colors">
                <Settings size={16} /> Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)} 
        />
      )}
    </nav>
  );
}
