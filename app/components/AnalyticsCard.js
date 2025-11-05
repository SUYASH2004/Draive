"use client";
import { motion } from "framer-motion";

export default function AnalyticsCard({ title, value, hint, icon = null, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white rounded-2xl p-4 shadow-md border border-emerald-50 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{value}</div>
          {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </motion.div>
  );
}
