"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import KPISection from "../components/KPISection";
import BottomNavBar from "../components/BottomNavBar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
      {/* Sidebar only on desktop */}
      {!isMobile && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCollapse={(collapsed) => setIsSidebarCollapsed(collapsed)}
        />
      )}

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !isMobile
            ? isSidebarCollapsed
              ? "md:ml-[80px]"
              : "md:ml-[260px]"
            : ""
        }`}
      >
        <Navbar
          onMenuClick={() => {
            if (!isMobile) setIsSidebarOpen(true);
          }}
        />

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
        {isMobile && <BottomNavBar />}
      </div>
    </div>
  );
}
