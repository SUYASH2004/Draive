"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import KPISection from "../components/KPISection";
import BottomNavBar from "../components/BottomNavBar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCollapse={(collapsed) => setIsSidebarCollapsed(collapsed)}
      />

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[260px]"
        }`}
      >
        {/* Navbar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-6 mt-4">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                Voltup Draive Dashboard
              </span>{" "}
              ⚡
            </h1>
            <p className="text-gray-500 mt-2 text-base md:text-lg">
              Track and manage your EV ecosystem — assets, plans, and operations
              in one glance.
            </p>
          </header>

          <section className="mb-10">
            <KPISection />
          </section>
        </main>

        {/* Mobile Bottom Navbar */}
        <div className="md:hidden">
          <BottomNavBar />
        </div>
      </div>
    </div>
  );
}
