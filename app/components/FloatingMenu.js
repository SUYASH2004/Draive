"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ Fix hydration mismatch
  const router = useRouter();

  // ✅ Ensure component only renders after mounting (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { label: "Plans", path: "/plans" },
    { label: "Assets", path: "/assets" },
    { label: "Work Orders", path: "/workorders" },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
      {open && (
        <div className="flex gap-4 mb-3 bg-white shadow-xl rounded-full px-6 py-3 transition-all duration-300">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="text-gray-700 font-semibold hover:text-emerald-600 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-emerald-600 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-emerald-700 transition"
      >
        {open ? "×" : "≡"}
      </button>
    </div>
  );
}
